import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Brand } from '@prisma/client';
import { validate as isUUID } from 'uuid';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandsService {
  private readonly logger = new Logger(BrandsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset = 0 } = paginationDto;

    const brands = await this.prismaService.brand.findMany({
      take: limit,
      skip: offset,
    });

    return brands;
  }

  async findOnePlain(term: string) {
    return await this.findOne(term);
  }

  private async findOne(term: string) {
    let brand: Brand | null = null;

    if (isUUID(term)) {
      brand = await this.prismaService.brand.findUnique({
        where: { id: term },
      });
    } else {
      brand = await this.prismaService.brand.findFirst({
        where: { slug: term + ''.toLowerCase() },
      });
    }

    if (!brand) throw new NotFoundException(`Brand not found`);

    return brand;
  }

  async create(createBrandDto: CreateBrandDto) {
    try {
      const slug = createBrandDto.name
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');

      const brand = await this.prismaService.brand.create({
        data: { ...createBrandDto, slug, validated: false },
      });

      // TODO: Send email to admin

      return brand;
    } catch (error) {
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
