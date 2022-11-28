import {ApiProperty} from '@nestjs/swagger';

export class CreateRepostDto {
  @ApiProperty({
    description: 'Original post id',
    example: 'id12345678'
  })
  public idOriginal: string;

}

