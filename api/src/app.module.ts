import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({}),
    DatabaseModule,
    PostModule,
  ],
  providers: [AppService],
})
export class AppModule {}
