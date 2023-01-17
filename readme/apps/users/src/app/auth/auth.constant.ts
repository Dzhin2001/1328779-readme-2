export enum AuthValidationMessage {
  AuthUserExists = 'User with this email exists',
  AuthUserNotFound = 'User not found',
  AuthUserPasswordWrong = 'User password is wrong',
  AuthUserEmailNotFound = 'The email is not valid',
}

export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');

export const UploadPath = () => `./${process.env.UPLOAD_DIR}`
