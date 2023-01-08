import {ApiProperty} from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'post id ',
    example: '12345678'
  })
  public idPost: number;

  @ApiProperty({
    description: 'Comment text',
    example: 'Good.'
  })
  public text: string;

}
