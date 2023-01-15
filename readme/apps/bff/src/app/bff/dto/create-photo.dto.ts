import {ApiProperty} from '@nestjs/swagger';

export class CreatePhotoDto {
  @ApiProperty({
    description: 'Photo link',
    example: 'image.jpg'
  })
  public photoURL: string;

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

