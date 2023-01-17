import {IsIn, IsNumber, IsArray, IsOptional, IsString} from 'class-validator';
import { Transform, Expose } from 'class-transformer';
import { PostQueryDefault } from '../bff.constant';

export class PostQuery {
  @Transform(({ value } ) => +value || PostQueryDefault.PostQueryCountLimit)
  @IsNumber()
  @IsOptional()
  @Expose()
  public limit: number = PostQueryDefault.PostQueryCountLimit;

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
  public sortDirection: 'desc' | 'asc' = PostQueryDefault.PostQuerySortDirection;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
