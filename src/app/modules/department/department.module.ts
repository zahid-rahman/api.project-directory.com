import { Module } from '@nestjs/common';
import { DepartmentSerivce } from './services/department.service';
import { DepartmentController } from './controllers/department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';

const modules = [];
const entities = [Department];
const services = [DepartmentSerivce];
const controllers = [DepartmentController];

@Module({
  controllers: [...controllers],
  imports: [TypeOrmModule.forFeature(entities), ...modules],
  providers: [...services],
  exports: [...services],
})
export class DepartmentModule {}
