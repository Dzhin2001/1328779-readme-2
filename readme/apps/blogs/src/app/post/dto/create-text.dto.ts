import {ApiProperty} from '@nestjs/swagger';

export class CreateTextDto {
  @ApiProperty({
    description: 'Post name',
    example: 'My first post'
  })
  public name: string;

  @ApiProperty({
    description: 'Abstract of post',
    example: 'Small text'
  })
  public textPreview: string;

  @ApiProperty({
    description: 'Text of post',
    example: 'It is my first post. ...'
  })
  public text: string;

  @ApiProperty({
    description: 'List of tags',
    example: '#monkee'
  })
  public tags: string;

  @ApiProperty({
    description: 'Author of post',
    example: 'Dimitar'
  })
  public author: string;

}

