import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuotesService } from './quotes.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('quotes')
@ApiTags('Quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of all quotes' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.quotesService.findAll(paginationDto);
  }

  @Get('random')
  @ApiResponse({ status: 200, description: 'Random quote' })
  getRandomQuote() {
    return this.quotesService.getRandom();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Quote found' })
  @ApiResponse({ status: 404, description: 'Quote not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quotesService.findOne(id);
  }
}
