import {ApiProperty} from '@nestjs/swagger';

export class CreateLinkDto {
  @ApiProperty({
    description: 'Link description',
    example: 'Monkey learn JS ..'
  })
  public linkText: string;

  @ApiProperty({
    description: 'Link URL',
    example: 'http://google.com/monkey'
  })
  public linkURL: string;

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

