import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  @Expose({ name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png'
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Keks'
  })
  @Expose()
  public userName: string;

  @ApiProperty({
    description: 'Post count',
    example: '2'
  })
  @Expose()
  public countPost: number;

  @ApiProperty({
    description: 'Subscribe count',
    example: '5'
  })
  @Expose()
  public countSubscribe: number;
}
