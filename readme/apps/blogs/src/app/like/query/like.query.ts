import {IsNumber, IsArray, IsOptional, IsString} from 'class-validator';
import {Expose, Transform} from 'class-transformer';
import {ReactionTypeEnum} from '@readme/shared-types';

export class LikeQuery {
  @Transform(({ value } ) => +value)
  @IsNumber()
  @IsOptional()
  @Expose()
  public limit;

  @Transform(({ value } ) => +value)
  @IsNumber()
  @IsOptional()
  public postId: number;

  @IsString()
  @IsOptional()
  public author: string;

  @Transform(({ value }) => value.split(',').map((id) => +id))
  @IsArray({})
  @IsOptional()
  public ids: number[] = [];

  public type: string = ReactionTypeEnum.Like;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
