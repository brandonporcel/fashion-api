import { Injectable, NotFoundException } from '@nestjs/common';
import { Runway } from '@prisma/client';
import { validate as isUUID } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class RunwaysService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const runways = await this.prismaService.runway.findMany({
      take: limit,
      skip: offset,
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
        where: { slug: term + ''.toLowerCase() },
      });
    }
    if (!runway) throw new NotFoundException(`Runway not found`);

    return runway;
  }
}
