import { IsNotEmpty, MinLength } from 'class-validator';

export class BlogDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly title: string;

  @IsNotEmpty()
  readonly body: string;
}
