import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlogsService } from './blog.service';
import { Blog as BlogEntity } from './blog.entity';
import { BlogDto } from './dto/blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogService: BlogsService) {}

  @Get()
  async findAll() {
    // get all blogs in the db
    return await this.blogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<BlogEntity> {
    // find the blog with this id
    const blog = await this.blogService.findOne(id);

    // if the blog doesn't exit in the db, throw a 404 error
    if (!blog) {
      throw new NotFoundException("This Blog doesn't exist");
    }

    // if blog exist, return the blog
    return blog;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() blog: BlogDto, @Request() req): Promise<BlogEntity> {
    // create a new blog and return the newly created blog
    return await this.blogService.create(blog, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() blog: BlogDto,
    @Request() req,
  ): Promise<BlogEntity> {
    // get the number of row affected and the updated blog
    const { numberOfAffectedRows, updatedBlog } = await this.blogService.update(
      id,
      blog,
      req.user.id,
    );

    // if the number of row affected is zero,
    // it means the blog doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Blog doesn't exist");
    }

    // return the updated blog
    return updatedBlog;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete the blog with this id
    const deleted = await this.blogService.delete(id, req.user.id);

    // if the number of row affected is zero,
    // then the blog doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This Blog doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
