import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class CommentRdo {
  @ApiProperty({
    description: 'The uniq comment ID',
    example: '13'
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Post id',
    example: '12345678'
  })
  @Expose()
  public postId: number;

  @ApiProperty({
    description: 'UserId',
    example: 'id12345678'
  })
  @Expose()
  public userId: String;

  @ApiProperty({
    description: 'Text of comment',
    example: 'Its my first comment. ...'
  })
  @Expose()
  public text: string;

}
