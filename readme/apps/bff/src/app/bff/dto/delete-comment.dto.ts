import {ApiProperty} from '@nestjs/swagger';

export class DeleteCommentDto {
  @ApiProperty({
    description: 'id ',
    example: '12345678'
  })
  public id: number;

}
