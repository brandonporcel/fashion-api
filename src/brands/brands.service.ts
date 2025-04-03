import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '@prisma/client';
import { validate as isUUID } from 'uuid';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

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
}
