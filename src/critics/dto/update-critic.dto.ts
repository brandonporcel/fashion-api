import { PartialType } from '@nestjs/swagger';
import { CreateCriticDto } from './create-critic.dto';

export class UpdateCriticDto extends PartialType(CreateCriticDto) {}
