import {ApiProperty} from '@nestjs/swagger';

export class CreateRepostDto {
  @ApiProperty({
    description: 'Original post id',
    example: '12345678'
  })
  public idOriginal: number;

}

