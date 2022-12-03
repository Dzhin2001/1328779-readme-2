import {ApiProperty} from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty({
    description: 'post id ',
    example: 'id12345678'
  })
  public idPost: string;

}
