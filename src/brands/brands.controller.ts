import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BrandsService } from './brands.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Brand } from './entities/brand.entity';

@Controller('brands')
@ApiTags('Brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of all brands' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.brandsService.findAll(paginationDto);
  }

  @Get(':term')
  @ApiResponse({ status: 200, description: 'Brand found' })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  findOnePlain(@Param('term') term: string) {
    return this.brandsService.findOnePlain(term);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Brand created successfully',
    type: Brand,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }
}
