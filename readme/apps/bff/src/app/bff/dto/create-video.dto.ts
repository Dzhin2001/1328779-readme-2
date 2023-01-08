import {ApiProperty} from '@nestjs/swagger';

export class CreateVideoDto {
  @ApiProperty({
    description: 'Post name',
    example: 'My first post'
  })
  public name: string;

  @ApiProperty({
    description: 'Video link',
    example: 'https://youtube.com/id12345678'
  })
  public videoURL: string;

  @ApiProperty({
    description: 'List of tags',
    example: '#monkee'
  })
  public tags: string;

}

