import { Injectable, NotFoundException } from '@nestjs/common';
import { Designer } from '@prisma/client';
import { validate as isUUID } from 'uuid';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DesignersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset = 0 } = paginationDto;

    const designers = await this.prismaService.designer.findMany({
      take: limit,
      skip: offset,
    });

    return designers;
  }

  async findOnePlain(term: string) {
    return await this.findOne(term);
  }

  private async findOne(term: string) {
    let designer: Designer | null = null;

    if (isUUID(term)) {
      designer = await this.prismaService.designer.findUnique({
        where: { id: term },
      });
    } else {
      designer = await this.prismaService.designer.findFirst({
        where: { slug: term + ''.toLowerCase() },
      });
    }

    if (!designer) throw new NotFoundException(`Designer not found`);

    return designer;
  }
}
