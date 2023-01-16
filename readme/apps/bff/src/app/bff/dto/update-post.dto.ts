import {ApiProperty} from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdatePostDto {

  @IsOptional()
  @ApiProperty({
    description: 'Post name',
    example: 'My first post'
  })
  public name: string;

  @IsOptional()
  @ApiProperty({
    description: 'Original post id',
    example: '12345678'
  })
  public idOriginal: number;

  @IsOptional()
  @ApiProperty({
    description: 'Draft flag',
    example: 'false'
  })
  public isDraft: boolean;

  @IsOptional()
  @ApiProperty({
    description: 'Video link',
    example: 'https://youtube.com/id12345678'
  })
  public videoURL: string;

  @IsOptional()
  @ApiProperty({
    description: 'Photo link',
    example: 'image.jpg'
  })
  public photoURL: string;

  @IsOptional()
  @ApiProperty({
    description: 'Abstract of post',
    example: 'Small text'
  })
  public textPreview: string;

  @IsOptional()
  @ApiProperty({
    description: 'Text of post',
    example: 'It is my first post. ...'
  })
  public text: string;

  @IsOptional()
  @ApiProperty({
    description: 'Text of quote',
    example: 'learn learn learn'
  })
  public quoteText: string;

  @IsOptional()
  @ApiProperty({
    description: 'Author of quote',
    example: 'Lenin'
  })
  public quoteAuthor: string;

  @IsOptional()
  @ApiProperty({
    description: 'Link description',
    example: 'Monkey learn JS ..'
  })
  public linkText: string;

  @IsOptional()
  @ApiProperty({
    description: 'Link URL',
    example: 'http://google.com/monkey'
  })
  public linkURL: string;

  @IsOptional()
  @ApiProperty({
    description: 'List of tags',
    example: '#monkee'
  })
  public tags: string;

  @IsOptional()
  @ApiProperty({
    description: 'Author of post',
    example: 'Dimitar'
  })
  public author: string;
}

