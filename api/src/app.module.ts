import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({}),
    DatabaseModule,
    PostModule,
    UsersModule,
  ],
  providers: [AppService],
})
export class AppModule {}
