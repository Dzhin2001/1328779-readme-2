import {ApiProperty} from '@nestjs/swagger';

export class CreateSubscribeDto {
  @ApiProperty({
    description: 'user id ',
    example: '12345678'
  })
  public author: string;

}
