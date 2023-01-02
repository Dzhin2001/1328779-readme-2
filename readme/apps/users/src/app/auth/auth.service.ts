import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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
import {ChangePasswordUserDto} from "./dto/change-password-user.dto";
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';

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
      throw new Error(AUTH_USER_EXISTS);
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

    return this.blogUserRepository.update(blogUserEntity._id, blogUserEntity);
  }


  async getUser(id: string) {
    return this.blogUserRepository.findById(id);
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
