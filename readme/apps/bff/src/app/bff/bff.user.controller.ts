import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Headers,
  HttpException,
  Res,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {BffService} from './bff.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UserRdo} from './rdo/user.rdo';
import {HttpService} from '@nestjs/axios';
import {AuthValidationMessage, ServiceUrl} from './bff.constant';
import {LoggedUserRdo} from './rdo/logged-user.rdo';
import {LoginUserDto} from './dto/login-user.dto';
import {ChangePasswordUserDto} from './dto/change-password-user.dto';
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import * as mime from 'mime-types';
import {nanoid} from 'nanoid';
import {User} from '@readme/shared-types';

@ApiTags('bff')
@Controller('bff')
export class BffUserController {
  constructor(
    private readonly httpService: HttpService,
    private readonly bffService: BffService
  ) {}

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Available Only for anonymous user.'
  })
  async register(
    @Body() dto: CreateUserDto,
    @Headers('Authorization') token: string
  ) {
    const auth = await this.bffService.bffValidateToken(token);
    if (auth.status) {
      throw new HttpException(AuthValidationMessage.AuthUserOnlyAnonymous, HttpStatus.FORBIDDEN);
    }
    return this.bffService.bffPost<UserRdo>(ServiceUrl.Register(), dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  async login(
    @Body() dto: LoginUserDto
  ) {
    return await this.bffService.bffPost<LoggedUserRdo>(ServiceUrl.Login(), dto);
  }

  @Get('user/:id')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authorized.',
  })
  async user(
    @Param('id') id: string,
    @Headers('Authorization') token: string
  ) {
    return await this.bffService.bffGet<UserRdo>(`${ServiceUrl.User()}/${id}`, token);
  }

  @Post('password')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User password has been changed.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  async changePassword(
    @Body() dto: ChangePasswordUserDto,
    @Headers('Authorization') token: string
  ) {
    return await this.bffService.bffPost<UserRdo>(ServiceUrl.Password(), dto, token);
  }

  @Post('avatar/:id')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './upload',
      filename: (_req, file, callback) => {

        const extension = mime.extension(file.mimetype);
        const filename = nanoid();

        callback(null, `${filename}.${extension}`);
      }
    })
  }))
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  async avatar(
    @Param('id') id: string,
    @UploadedFile() file,
    @Headers('Authorization') token: string
  ) {
    const dto = {avatar: file.filename}
    return await this.bffService.bffPatch<UserRdo>(`${ServiceUrl.User()}/${id}`, dto as User, token);
  }

  @Get('avatar/:imgpath')
  async seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return await res.sendFile(image, { root: './upload' });
  }
}
