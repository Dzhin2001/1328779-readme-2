import {User} from '@readme/shared-types';
import {genSalt, hash, compare} from 'bcrypt';
import {SALT_ROUNDS} from './blog-user.constant';

export class BlogUserEntity implements User {
  public _id: string;
  public avatar: string;
  public email: string;
  public userName: string;
  public passwordHash: string;

  constructor(blogUser: User) {
    this.fillEntity(blogUser);
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(blogUser: User) {
    this._id = blogUser._id;
    this.avatar = blogUser.avatar;
    this.email = blogUser.email;
    this.userName = blogUser.userName;
    this.passwordHash = blogUser.passwordHash;
  }
}
