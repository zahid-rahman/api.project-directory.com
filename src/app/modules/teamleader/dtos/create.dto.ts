import { IsString } from 'class-validator';

export class CreateTeamleaderDTO {
  @IsString()
  name: string;
}
