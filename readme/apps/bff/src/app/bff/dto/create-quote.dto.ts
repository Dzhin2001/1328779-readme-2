import {ApiProperty} from '@nestjs/swagger';

export class CreateQuoteDto {
  @ApiProperty({
    description: 'Text of quote',
    example: 'learn learn learn'
  })
  public quoteText: string;

  @ApiProperty({
    description: 'Author of quote',
    example: 'Lenin'
  })
  public quoteAuthor: string;

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

