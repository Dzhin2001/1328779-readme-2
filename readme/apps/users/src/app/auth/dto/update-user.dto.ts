import {IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  public userName?: string;

  @IsOptional()
  public avatar?: string;

}
