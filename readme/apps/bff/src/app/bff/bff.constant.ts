export enum AuthValidationMessage {
  AuthUserExists = 'User with this email exists',
  AuthUserNotFound = 'User not found',
  AuthUserPasswordWrong = 'User password is wrong',
  AuthUserEmailNotFound = 'The email is not valid',
  AuthUserOnlyAnonymous = 'Only for anonymous user',
  AuthUserNotAuthorised = 'User not authirised',
}

export enum PostQueryDefault {
  PostQueryCountLimit = 25,
  PostQuerySearchLimit = 20,
  PostQuerySortDirection = 'desc',
}

export enum HttpServiceDefault {
  HttpTimeout = 5000,
  HttpMaxRedirects = 5,
}

export const ServiceUrl = {
  Register: () => `http://${process.env.USERS_HOST}:${process.env.USERS_PORT}/api/auth/register`,
  Login:  () => `http://${process.env.USERS_HOST}:${process.env.USERS_PORT}/api/auth/login`,
  User: () => `http://${process.env.USERS_HOST}:${process.env.USERS_PORT}/api/auth`,
  Password: () => `http://${process.env.USERS_HOST}:${process.env.USERS_PORT}/api/auth/password`,
  Likes: () => `http://${process.env.BLOGS_HOST}:${process.env.BLOGS_PORT}/api/likes`,
  Comments: () => `http://${process.env.BLOGS_HOST}:${process.env.BLOGS_PORT}/api/comments`,
  Posts: () => `http://${process.env.BLOGS_HOST}:${process.env.BLOGS_PORT}/api/posts`,

}
