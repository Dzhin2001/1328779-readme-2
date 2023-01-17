export enum LikeValidationMessage {
  LikeCreateExistsError = 'Post does not exists.',
  LikeCreateForbidden = 'Post status does not allow creating LIKE.',
  LikeAlreadyExists = 'LIKE already exists for this Post.',
  LikeDeleteForbidden = 'User not allowed to delete LIKE.',
  LikeDoesntExistsError = 'LIKE does not exists.',
}
