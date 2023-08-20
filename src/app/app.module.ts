import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { DepartmentModule } from './modules/department/department.module';
import { TeamleaderModule } from './modules/teamleader/teamleader.module';

const modules = [
  UserModule,
  ConfigModule.forRoot(),
  DatabaseModule,
  DepartmentModule,
  TeamleaderModule,
];

@Module({
  controllers: [AppController],
  imports: [...modules],
})
export class AppModule {}
