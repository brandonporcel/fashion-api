import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { DesignersService } from './designers.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('designers')
export class DesignersController {
  constructor(private readonly designersService: DesignersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of all designers' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.designersService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Designer found' })
  @ApiResponse({ status: 404, description: 'Designer not found' })
  findOnePlain(@Param('term') term: string) {
    return this.designersService.findOnePlain(term);
  }
}
