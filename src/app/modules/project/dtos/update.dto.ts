import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ENUM_COLUMN_TYPES } from 'src/shared/db.utils';

export class UpdateProjectDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsUUID()
  @IsOptional()
  teamleaderId: ENUM_COLUMN_TYPES.UUID;
}
