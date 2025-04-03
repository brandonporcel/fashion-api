import { Controller, Get, Param, Query } from '@nestjs/common';
import { UnfoundRunwaysService } from './unfound-runways.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('unfound-runways')
@ApiTags('Unfound Runways')
export class UnfoundRunwaysController {
  constructor(private readonly unfoundRunwaysService: UnfoundRunwaysService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of all brands' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.unfoundRunwaysService.findAll(paginationDto);
  }

  @Get(':term')
  @ApiResponse({ status: 200, description: 'Brand found' })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  findOnePlain(@Param('term') term: string) {
    return this.unfoundRunwaysService.findOnePlain(term);
  }
}
