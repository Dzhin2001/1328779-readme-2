import {HttpException, HttpStatus, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import { CommandEvent, User } from '@readme/shared-types';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
  RABBITMQ_SERVICE,
} from './auth.constant';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import {ChangePasswordUserDto} from './dto/change-password-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import {UpdateUserDto} from './dto/update-user.dto';
import {fillObject} from '@readme/core';

@Injectable()
export class AuthService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}


  async register(dto: CreateUserDto) {
    const {email, userName, password} = dto;
    const blogUser = {
      email,
      userName,
      avatar: '',
      passwordHash: ''
    };

    const existUser = await this.blogUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new HttpException(AUTH_USER_EXISTS, HttpStatus.FORBIDDEN );
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(password)

    const createdUser = await this.blogUserRepository
      .create(userEntity);

    this.rabbitClient.emit(
      { cmd: CommandEvent.AddSubscriber },
      {
        email: createdUser.email,
        name: createdUser.userName,
        userId: createdUser._id.toString(),
      }
    );

    return createdUser;
  }

  async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND);
    }

    const blogUserEntity = new BlogUserEntity(existUser);
    if (! await blogUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return blogUserEntity.toObject();
  }

  async changePassword(dto: ChangePasswordUserDto) {
    const {email, password, newPassword} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND);
    }

    const blogUserEntity = new BlogUserEntity(existUser);
    if (! await blogUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    await blogUserEntity.setPassword(newPassword);

    return await this.blogUserRepository.update(blogUserEntity._id, blogUserEntity);
  }

  async updateById(userId: string, dto: User) {
    const blogUserEntity = new BlogUserEntity(dto);
    return await this.blogUserRepository.update(userId, blogUserEntity);
  }

  async getUserByEmail(email: string) {
    return await this.blogUserRepository.findByEmail(email);
  }

  async getUser(id: string) {
    return await this.blogUserRepository.findById(id);
  }

  async loginUser(user: User) {
    const payload = {
      sub: user._id,
      email: user.email,
      name: user.userName
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
