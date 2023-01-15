import {Injectable} from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';
import {HttpService} from '@nestjs/axios';
import {AxiosError, AxiosResponse} from 'axios';
import Axios from 'axios';
import {ServiceUrl} from './bff.constant';
import { RestApiError } from '@readme/shared-types';
import {UserRdo} from './rdo/user.rdo';

@Injectable()
export class BffService {
  constructor(private readonly httpService: HttpService) {}

  async bffValidateToken(
    token: string | undefined
  ) {
    const url = ServiceUrl.User();
    const resp = {
      status: false,
      user: {},
    };

    if (!token) return resp;

    try {

      const {data} = await firstValueFrom(
        this.httpService
          .post<UserRdo | RestApiError>(
            url,
            {},
            token ? {headers: {'Authorization': token}} : null
          )
          .pipe(
            catchError((error: AxiosError) => {
              throw error.response.data;
            }),),
      );

      resp.status = true;
      resp.user = data;

    } catch (e) {}

    return resp;
  }

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

  async bffGetFile(
    url: string
  ) {
    console.log(`BFF service - get file - url=${url}`);
    const res = await Axios({
      method: "GET",
      url,
      responseType: "blob"
    }).then((res: AxiosResponse<Blob>) => res);
    // const {data} = await firstValueFrom(
    //   this.httpService
    //     .get(url, { responseType: 'blob'})
    //     .pipe( map((result: AxiosResponse<Blob>) => {
    //       return result;
    //       })
    //     )
    // );
    console.log(res);
    return res.data;
  }
}
