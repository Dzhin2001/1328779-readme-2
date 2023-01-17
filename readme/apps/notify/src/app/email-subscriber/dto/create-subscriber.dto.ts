import { IsEmail, IsNotEmpty } from 'class-validator';
import {EmailValidationMessage} from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EmailValidationMessage.EmailNotValid })
  email: string;

  @IsNotEmpty({ message: EmailValidationMessage.EmailUserNameIsEmpty })
  name: string;

  @IsNotEmpty({ message: EmailValidationMessage.EmailUserIdIsEmpty })
  userId: string;
}
