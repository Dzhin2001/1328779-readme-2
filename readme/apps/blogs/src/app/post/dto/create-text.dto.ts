import {ApiProperty} from '@nestjs/swagger';
import {Transform} from 'class-transformer';
import {transformTags} from '@readme/core';
import {Validate} from "class-validator";
import {CustomTagsValidate} from '../validate/custom-tags-validate';
import {TAGS_ERROR} from '../post.constant';

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
  @Transform( transformTags )
  @Validate(CustomTagsValidate,{message: TAGS_ERROR} )
  public tags: string;

  @ApiProperty({
    description: 'Author of post',
    example: 'Dimitar'
  })
  public author: string;

}

