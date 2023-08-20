import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

const modules = [UserModule, ConfigModule.forRoot()];

@Module({
  controllers: [AppController],
  imports: [...modules],
})
export class AppModule {}
