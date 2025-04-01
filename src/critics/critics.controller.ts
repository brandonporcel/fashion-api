import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { CriticsService } from './critics.service';
import { ApiResponse } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('critics')
export class CriticsController {
  constructor(private readonly criticsService: CriticsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of all critics' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.criticsService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Critic found' })
  @ApiResponse({ status: 404, description: 'Critic not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.criticsService.findOne(id);
  }
}
