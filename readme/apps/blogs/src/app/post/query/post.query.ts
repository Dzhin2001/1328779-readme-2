import {IsIn, IsNumber, IsArray, IsOptional, IsString} from 'class-validator';
import { Transform, Expose } from 'class-transformer';
import { DEFAULT_POST_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from '../post.constant';

export class PostQuery {
  @Transform(({ value } ) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  @Expose()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @Transform(({ value } ) => +value)
  @IsNumber()
  @IsOptional()
  public idOriginal: number;

  @IsString()
  @IsOptional()
  public name: string;

  @Transform(({ value }) => value.split(',').map((postType) => postType))
  @IsArray({})
  @IsOptional()
  public postTypes: string[];

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
