import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';
import {PostTypeEnum} from "@readme/shared-types";

export class PostRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  @Expose({ name: 'id'})
  public id: number;

  @ApiProperty({
    description: 'Original post id',
    example: '12345678'
  })
  @Expose()
  public idOriginal: number;

  @ApiProperty({
    description: 'Repost flag',
    example: 'true'
  })
  @Expose()
  public isRepost: String;

  @ApiProperty({
    description: 'Type of post',
    example: 'Video'
  })
  @Expose()
  public type: PostTypeEnum;

  @ApiProperty({
    description: 'List of tags',
    example: '#monkee'
  })
  @Expose()
  public tags: string;

  @ApiProperty({
    description: 'Author of post',
    example: 'Dimitar'
  })
  @Expose()
  public author: string;

  @ApiProperty({
    description: 'Date of post',
    example: '2022-12-12'
  })
  @Expose()
  public date: string;

  @ApiProperty({
    description: 'Post name',
    example: 'My first post'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Video link',
    example: 'https://youtube.com/id12345678'
  })
  @Expose()
  public videoURL: string;

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
    description: 'Photo link',
    example: 'image.jpg'
  })
  public photoURL: string;

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

}
