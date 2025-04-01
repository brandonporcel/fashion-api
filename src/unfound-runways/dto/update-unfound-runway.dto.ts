import { PartialType } from '@nestjs/mapped-types';
import { CreateUnfoundRunwayDto } from './create-unfound-runway.dto';

export class UpdateUnfoundRunwayDto extends PartialType(CreateUnfoundRunwayDto) {}
