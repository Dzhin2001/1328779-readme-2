import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class LikeRdo {
  @ApiProperty({
    description: 'The uniq like ID',
    example: '13'
  })
  @Expose({ name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'Post id',
    example: 'id12345678'
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'UserId',
    example: 'id12345678'
  })
  @Expose()
  public userId: String;

}
