import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RunwaysService } from './runways.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Runway } from './entities/runway.entity';
import { CreateRunwayDto } from './dto/create-runway.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

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

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  @ApiResponse({
    status: 201,
    description: 'Runway created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(
    @Body() createRunwayDto: CreateRunwayDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.runwaysService.create(createRunwayDto, images);
  }
}
