export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';
export const AUTH_USER_EMAIL_NOT_VALID = 'The email is not valid';

export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');

export const UploadPath = () => `./${process.env.UPLOAD_DIR}`
