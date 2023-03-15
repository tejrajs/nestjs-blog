import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';

@Module({
  imports: [PostModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
