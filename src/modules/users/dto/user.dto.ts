import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class UserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  readonly gender: string;
}
