import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CvsModule } from './cvs/cvs.module';

@Module({
  imports: [
    UsersModule,
    CvsModule,
    DatabaseModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
})
export class AppModule {}
