import { Module } from '@nestjs/common';
import { BlogsService } from './blog.service';
import { BlogsController } from './blog.controller';
import { blogsProviders } from './blog.providers';

@Module({
  providers: [BlogsService, ...blogsProviders],
  controllers: [BlogsController],
})
export class BlogModule {}
