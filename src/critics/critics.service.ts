import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CriticsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const critics = await this.prismaService.critic.findMany({
      take: limit,
      skip: offset,
    });

    return critics;
  }

  async findOne(id: string) {
    const critic = await this.prismaService.critic.findUnique({
      where: { id },
    });

    if (!critic) throw new NotFoundException(`Critic not found`);

    return critic;
  }
}
