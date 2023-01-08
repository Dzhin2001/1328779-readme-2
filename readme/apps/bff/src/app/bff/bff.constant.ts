export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';
export const AUTH_USER_EMAIL_NOT_VALID = 'The email is not valid';

export const DEFAULT_POST_COUNT_LIMIT = 10;
export const DEFAULT_SORT_DIRECTION = 'desc';

export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');

export const ServiceUrl = {
  Register: () => `http://${process.env.USERS_HOST}:${process.env.USERS_PORT}/api/auth/register`,
  Login:  () => `http://${process.env.USERS_HOST}:${process.env.USERS_PORT}/api/auth/login`,
  User: () => `http://${process.env.USERS_HOST}:${process.env.USERS_PORT}/api/auth`,
  Password: () => `http://${process.env.USERS_HOST}:${process.env.USERS_PORT}/api/auth/password`,
  Likes: () => `http://${process.env.BLOGS_HOST}:${process.env.BLOGS_PORT}/api/likes`,
  Comments: () => `http://${process.env.BLOGS_HOST}:${process.env.BLOGS_PORT}/api/comments`,
  Posts: () => `http://${process.env.BLOGS_HOST}:${process.env.BLOGS_PORT}/api/posts`,

}
