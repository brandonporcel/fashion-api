import { ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    default: 10,
    description: 'How many rows do you need',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional({
    default: 0,
    description:
      'The initial position of the record subset, which indicates how many records to skip',
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;

  @ApiPropertyOptional({ description: 'Sort the results' })
  @IsOptional()
  @IsString()
  sort?: string;
}
