import {Injectable} from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import {HttpService} from '@nestjs/axios';
import {AxiosError} from 'axios';

@Injectable()
export class BffService {
  constructor(private readonly httpService: HttpService) {}

  async bffPost<T>(
    url: string,
    dto: object,
    token?: string | undefined
  ) {
    console.log(`BFF service - post - url=${url}`);
    console.log(dto);
    console.log(token);
    const {data} = await firstValueFrom(
      this.httpService
        .post<T>(
          url,
          dto,
          token ? {headers: {'Authorization': token}} : null
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw error.response.data;
          }),),
    );
    console.log(data);
    return data;
  }

  async bffDelete<T>(
    url: string,
    token?: string | undefined
  ) {
    console.log(`BFF service - delete - url=${url}`);
    console.log(token);
    const {data} = await firstValueFrom(
      this.httpService
        .delete<T>(
          url,
          token ? {headers: {'Authorization': token}} : null
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw error.response.data;
          }),),
    );
    console.log(data);
    return data;
  }

  async bffGet<T>(
    url: string,
    token?: string | undefined
  ) {
    console.log(`BFF service - get - url=${url}`);
    console.log(token);
    const {data} = await firstValueFrom(
      this.httpService
        .get<T>(
          url,
          token ? {headers: {'Authorization': token}} : null
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw error.response.data;
          }),),
    );
    console.log(data);
    return data;
  }

}
