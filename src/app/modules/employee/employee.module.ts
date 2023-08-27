import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './services/employee.service';
import { Employee } from './entities/employee.entity';
import { EmployeeController } from './controllers/employee.controller';

const modules = [];
const entities = [Employee];
const services = [EmployeeService];
const controllers = [EmployeeController];

@Module({
  controllers: [...controllers],
  imports: [TypeOrmModule.forFeature(entities), ...modules],
  providers: [...services],
  exports: [...services],
})
export class EmployeeModule {}
