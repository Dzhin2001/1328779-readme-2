import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class SubscribeRdo {
  @ApiProperty({
    description: 'The uniq like ID',
    example: '13'
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Author',
    example: '12345678'
  })
  @Expose()
  public author: string;

  @ApiProperty({
    description: 'UserId',
    example: 'id12345678'
  })
  @Expose()
  public userId: String;


}
