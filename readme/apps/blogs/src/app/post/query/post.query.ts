import {IsIn, IsNumber, IsArray, IsOptional, IsString, IsBoolean} from 'class-validator';
import { Transform, Expose } from 'class-transformer';
import { PostQueryDefault } from '../post.constant';

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

  @IsBoolean()
  @IsOptional()
  public isDraft = false;

  @IsString()
  @IsOptional()
  public name: string;

  @IsString()
  @IsOptional()
  public tags: string;

  @Transform(({ value }) => value.split(',').map((author) => author))
  @IsArray({})
  @IsOptional()
  public authors: string[];

  @Transform(({ value }) => value.split(',').map((postType) => postType))
  @IsArray({})
  @IsOptional()
  public postTypes: string[];

  @IsIn(['createdAt', 'likeCount', 'subscribeCount'])
  @IsOptional()
  public sortField: 'createdAt' | 'likeCount' | 'commentCount' = 'createdAt';

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = PostQueryDefault.PostQuerySortDirection;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
