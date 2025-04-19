import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Runway } from '@prisma/client';
import { validate as isUUID } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateRunwayDto } from './dto/create-runway.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class RunwaysService {
  private readonly logger = new Logger('RunwaysService');
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0, sort } = paginationDto;

    const validSorts: Record<'popularity' | 'recent', any> = {
      popularity: { popularity: 'desc' },
      recent: { createdAt: 'desc' },
    };

    const orderBy =
      sort && sort in validSorts
        ? validSorts[sort as keyof typeof validSorts]
        : validSorts['recent'];

    const runways = await this.prismaService.runway.findMany({
      take: limit,
      skip: offset,
      orderBy,
    });

    return runways;
  }

  findOnePlain(term: string) {
    return this.findOne(term);
  }

  private async findOne(term: string) {
    let runway: Runway | null = null;

    if (isUUID(term)) {
      runway = await this.prismaService.runway.findUnique({
        where: { id: term },
      });
    } else {
      runway = await this.prismaService.runway.findFirst({
        where: { slug: term },
        include: {
          brand: true,
          images: true,
          designer: true,
          contributors: true,
          tags: true,
        },
      });
    }
    if (!runway) throw new NotFoundException(`Runway not found`);

    return runway;
  }

  async create(createRunwayDto: CreateRunwayDto, files: Express.Multer.File[]) {
    const config = {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    };
    cloudinary.config(config);

    const slug = (createRunwayDto.collectionType + '_' + createRunwayDto.year)
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');

    try {
      const runway = await this.prismaService.runway.create({
        data: {
          link: createRunwayDto.youtubeLink + randomUUID(),
          designerId: createRunwayDto.designerId,
          slug: slug + randomUUID(),
          description: createRunwayDto.description,
          brandId: createRunwayDto.brandId,
          collectionType: createRunwayDto.collectionType,
          year: createRunwayDto.year,
        },
      });

      for (const file of files) {
        const uploadResult: any = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'runways',
              public_id: file.originalname.split('.')[0],
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );
          uploadStream.end(file.buffer);
        });

        await this.prismaService.runwayImage.create({
          data: {
            runwayId: runway.id,
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
            format: uploadResult.format,
            width: uploadResult.width,
            height: uploadResult.height,
          },
        });
      }

      return { message: 'Runway creado con imágenes' };
    } catch (error) {
      console.error(error);
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
