import { IsString } from 'class-validator';

export class UpdateTeamleaderDTO {
  @IsString()
  name: string;
}
