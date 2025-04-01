import { PartialType } from '@nestjs/swagger';
import { CreateRunwayDto } from './create-runway.dto';

export class UpdateRunwayDto extends PartialType(CreateRunwayDto) {}
