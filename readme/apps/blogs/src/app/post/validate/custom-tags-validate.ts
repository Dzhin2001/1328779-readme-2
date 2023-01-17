import {
  ValidatorConstraint,
  ValidatorConstraintInterface, Validate
} from 'class-validator';
import {TAGS_MAX_COUNT, TAGS_MAX_LENGTH, TAGS_MIN_LENGTH} from '../post.constant';

@ValidatorConstraint()
export class CustomTagsValidate implements ValidatorConstraintInterface {
  validate(value: string) {
    if (!value) return true;
    const arr = value.split(' ');
    if (arr.length > TAGS_MAX_COUNT)
      return false;
    if (arr.findIndex( (tag) => tag.length < TAGS_MIN_LENGTH || tag.length > TAGS_MAX_LENGTH) !== -1)
      return false;
    if (arr.findIndex( (tag) => {let re = /^[^a-z]$/i; return re.test(tag[0])}) !== -1)
      return false;
    return true;
  }
}
