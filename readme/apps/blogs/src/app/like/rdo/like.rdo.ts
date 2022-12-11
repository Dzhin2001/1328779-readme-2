import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class LikeRdo {
  @ApiProperty({
    description: 'The uniq like ID',
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
    description: 'Deletion flag',
    example: 'true/false'
  })
  @Expose()
  public isDelete: boolean;

}
