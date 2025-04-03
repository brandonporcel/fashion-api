import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RunwaysService } from './runways.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('runways')
@ApiTags('Runways')
export class RunwaysController {
  constructor(private readonly runwaysService: RunwaysService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of all runways' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.runwaysService.findAll(paginationDto);
  }

  @Get(':term')
  @ApiResponse({ status: 200, description: 'Runway found' })
  @ApiResponse({ status: 404, description: 'Runway not found' })
  findOne(@Param('term') term: string) {
    return this.runwaysService.findOnePlain(term);
  }
}
