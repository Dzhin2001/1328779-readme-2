export enum SubscribeQueryDefault {
  SubscribeQueryCountLimit = 25,
  SubscribeQuerySortDirection = 'desc',
}

export enum SubscribeValidationMessage {
  SubscribeCreateExistsError = 'Post does not exists.',
  SubscribeCreateForbidden = 'Post status does not allow creating SUBSCRIBE.',
  SubscribeAlreadyExists = 'SUBSCRIBE already exists for this Post.',
  SubscribeDeleteForbidden = 'User not allowed to delete SUBSCRIBE.',
  SubscribeDoesntExistsError = 'SUBSCRIBE does not exists.',
  SubscribeUserDefineError = 'User must be defined.',
}
