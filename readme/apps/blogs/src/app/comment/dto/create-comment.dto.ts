import {ApiProperty} from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'post id ',
    example: 'id12345678'
  })
  public idPost: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'Good.'
  })
  public text: string;

}
