export const DEFAULT_COMMENT_COUNT_LIMIT = 50;

export enum CommentValidationMessage {
  CommentCreateExistsError = 'Post does not exists.',
  CommentCreateForbidden = 'Post status does not allow creating COMMENT.',
  CommentAlreadyExists = 'COMMENT already exists for this Post.',
  CommentDeleteForbidden = 'User not allowed to delete COMMENT.',
  CommentDoesntExistsError = 'COMMENT does not exists.',
}

