import {ApiProperty} from '@nestjs/swagger';
import {Transform} from 'class-transformer';
import {transformTags} from '@readme/core';
import {Validate} from 'class-validator';
import {CustomTagsValidate} from '../validate/custom-tags-validate';
import {TAGS_ERROR} from '../post.constant';

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
  @Transform( transformTags )
  @Validate(CustomTagsValidate,{message: TAGS_ERROR} )
  public tags: string;

  @ApiProperty({
    description: 'Author of post',
    example: 'Dimitar'
  })
  public author: string;

}

