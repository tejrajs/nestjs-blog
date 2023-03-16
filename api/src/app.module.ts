import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';


@Module({
  imports: [
    ConfigModule.forRoot({}),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
