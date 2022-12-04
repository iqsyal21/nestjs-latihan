import { Blog } from './blog.entity';
import { BLOG_REPOSITORY } from '../../core/constants';

export const blogsProviders = [
  {
    provide: BLOG_REPOSITORY,
    useValue: Blog,
  },
];
