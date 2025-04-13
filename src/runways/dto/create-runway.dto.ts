import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CollectionType } from '@prisma/client';
import { IsIn, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateRunwayDto {
  @ApiProperty({ description: 'Brand id', format: 'uuid' })
  @IsUUID()
  brandId: string;

  @ApiProperty({
    description: 'Collection id',
    nullable: false,
    example: 'spring_couture',
  })
  @IsIn([
    'SS_RTW',
    'FW_RTW',
    'FALL_COUTURE',
    'SPRING_COUTURE',
    'COUTURE',
    'CAPSULE',
    'RESORT',
    'PRE_FALL',
    'COLLABORATION',
    'BRIDAL',
  ])
  collectionType: CollectionType;

  @ApiProperty({
    description: 'Designer id',
    nullable: false,
    format: 'uuid',
  })
  @IsUUID()
  designerId: string;

  @ApiPropertyOptional({
    description: 'Runway description',
  })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Youtube runway link',
    example: 'https://www.youtube.com/watch?v=Q8z0b_s83nY',
    type: String,
  })
  @IsString()
  youtubeLink: string;

  @ApiProperty({
    description: 'Runway year',
    example: 2021,
    type: Number,
  })
  @IsNumber()
  year: number;
}
