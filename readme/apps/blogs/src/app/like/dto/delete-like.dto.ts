import {ApiProperty} from '@nestjs/swagger';

export class DeleteLikeDto {
  @ApiProperty({
    description: 'id ',
    example: '12345678'
  })
  public id: number;

}
