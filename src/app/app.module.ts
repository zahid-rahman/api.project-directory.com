import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { DepartmentModule } from './modules/department/department.module';
import { TeamleaderModule } from './modules/teamleader/teamleader.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { ProjectModule } from './modules/project/project.module';

const modules = [
  UserModule,
  ConfigModule.forRoot(),
  DatabaseModule,
  DepartmentModule,
  TeamleaderModule,
  EmployeeModule,
  ProjectModule,
];

@Module({
  controllers: [AppController],
  imports: [...modules],
})
export class AppModule {}
