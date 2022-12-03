import {ApiProperty} from '@nestjs/swagger';

export class DeleteLikeDto {
  @ApiProperty({
    description: 'id ',
    example: 'id12345678'
  })
  public id: string;

}
