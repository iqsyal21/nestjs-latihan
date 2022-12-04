import { Injectable, Inject } from '@nestjs/common';
import { Blog } from './blog.entity';
import { BlogDto } from './dto/blog.dto';
import { User } from '../users/user.entity';
import { BLOG_REPOSITORY } from '../../core/constants';

@Injectable()
export class BlogsService {
  constructor(
    @Inject(BLOG_REPOSITORY) private readonly postRepository: typeof Blog,
  ) {}

  async create(blog: BlogDto, userId): Promise<Blog> {
    return await this.postRepository.create<Blog>({ ...blog, userId });
  }

  async findAll(): Promise<Blog[]> {
    return await this.postRepository.findAll<Blog>({
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async findOne(id): Promise<Blog> {
    return await this.postRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id, userId) {
    return await this.postRepository.destroy({ where: { id, userId } });
  }

  async update(id, data, userId) {
    const [numberOfAffectedRows, [updatedBlog]] =
      await this.postRepository.update(
        { ...data },
        { where: { id, userId }, returning: true },
      );

    return { numberOfAffectedRows, updatedBlog };
  }
}
