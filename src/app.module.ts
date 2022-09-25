import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/user-rest-app-v1'), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
