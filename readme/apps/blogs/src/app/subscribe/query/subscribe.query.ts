import {IsNumber, IsArray, IsOptional, IsString, IsIn} from 'class-validator';
import {Expose, Transform} from 'class-transformer';
import {ReactionTypeEnum} from '@readme/shared-types';
import {DEFAULT_POST_COUNT_LIMIT, DEFAULT_SORT_DIRECTION} from "../../post/post.constant";

export class SubscribeQuery {
  @Transform(({ value } ) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  @Expose()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @IsString()
  @IsOptional()
  public userId: string;

  @IsString()
  @IsOptional()
  public author: string;

  @Transform(({ value }) => value.split(',').map((id) => +id))
  @IsArray({})
  @IsOptional()
  public ids: number[] = [];

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

}
