import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuotesService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const quotes = await this.prismaService.quote.findMany({
      take: limit,
      skip: offset,
    });

    return quotes;
  }

  async findOne(id: number) {
    const quote = await this.prismaService.quote.findUnique({ where: { id } });
    if (!quote) throw new NotFoundException(`Quote with id ${id} not found`);

    return quote;
  }

  async getRandom() {
    const count = await this.prismaService.quote.count();
    const randomIndex = Math.floor(Math.random() * count);

    const quote = await this.prismaService.quote.findFirst({
      skip: randomIndex,
    });

    if (!quote) throw new NotFoundException(`Quote not found`);

    return quote;
  }
}
