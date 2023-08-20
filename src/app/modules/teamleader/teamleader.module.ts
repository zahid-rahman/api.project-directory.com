import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teamleader } from './entities/teamleader.entity';
import { TeamleaderService } from './services/teamleader.service';
import { TeamleaderController } from './controllers/teamleader.controller';

const modules = [];
const entities = [Teamleader];
const services = [TeamleaderService];
const controllers = [TeamleaderController];

@Module({
  controllers: [...controllers],
  imports: [TypeOrmModule.forFeature(entities), ...modules],
  providers: [...services],
  exports: [...services],
})
export class TeamleaderModule {}
