import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectService } from './services/project.service';
import { ProjectController } from './controllers/project.controller';
import { EmployeeProject } from './entities/EmployeeProject.entity';

const modules = [];
const entities = [Project, EmployeeProject];
const services = [ProjectService];
const controllers = [ProjectController];

@Module({
  controllers: [...controllers],
  imports: [TypeOrmModule.forFeature(entities), ...modules],
  providers: [...services],
  exports: [...services],
})
export class ProjectModule {}
