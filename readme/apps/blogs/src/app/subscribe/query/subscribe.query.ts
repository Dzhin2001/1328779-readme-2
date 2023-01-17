import {IsNumber, IsArray, IsOptional, IsString, IsIn} from 'class-validator';
import {Expose, Transform} from 'class-transformer';
import {SubscribeQueryDefault} from '../subscribe.constant';


export class SubscribeQuery {
  @Transform(({ value } ) => +value || SubscribeQueryDefault.SubscribeQueryCountLimit)
  @IsNumber()
  @IsOptional()
  @Expose()
  public limit: number = SubscribeQueryDefault.SubscribeQueryCountLimit;

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
  public sortDirection: 'desc' | 'asc' = SubscribeQueryDefault.SubscribeQuerySortDirection;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

}
