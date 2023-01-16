import {ApiProperty} from '@nestjs/swagger';
import { Validate } from 'class-validator';
import {Transform} from 'class-transformer';
import {transformTags} from '@readme/core';
import {CustomTagsValidate} from '../validate/custom-tags-validate';
import {TAGS_ERROR} from '../post.constant';


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
  @Transform( transformTags )
  @Validate(CustomTagsValidate,{message: TAGS_ERROR} )
  public tags: string;

  @ApiProperty({
    description: 'Author of post',
    example: 'Dimitar'
  })
  public author: string;
}

