import {IsNumber, IsArray, IsOptional} from 'class-validator';
import {Expose, Transform} from 'class-transformer';
import {ReactionTypeEnum} from '@readme/shared-types';

export class LikeQuery {
  @Transform(({ value } ) => +value)
  @IsNumber()
  @IsOptional()
  @Expose()
  public limit: number;

  @Transform(({ value } ) => +value)
  @IsNumber()
  @IsOptional()
  public postId: number;

  @Transform(({ value }) => value.split(',').map((id) => +id))
  @IsArray({})
  @IsOptional()
  public ids: number[] = [];

  public type: string = ReactionTypeEnum.Like;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
