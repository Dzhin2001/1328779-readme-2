import {ApiProperty} from '@nestjs/swagger';

export class DeleteCommentDto {
  @ApiProperty({
    description: 'id ',
    example: 'id12345678'
  })
  public id: string;

}
