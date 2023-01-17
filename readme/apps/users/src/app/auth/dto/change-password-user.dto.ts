import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString} from 'class-validator';
import {AuthValidationMessage} from '../auth.constant';

export class ChangePasswordUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  @IsEmail(
    {},
    {message: AuthValidationMessage.AuthUserEmailNotFound},
  )
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  public password: string;

  @ApiProperty({
    description: 'User new password',
    example: '123456'
  })
  @IsString()
  public newPassword: string;
}
