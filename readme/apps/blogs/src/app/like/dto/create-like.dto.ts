import {ApiProperty} from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty({
    description: 'post id ',
    example: '12345678'
  })
  public idPost: number;

}
