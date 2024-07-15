export type TFormStateBase = {
  message?: string;
};

export type TFormStateError = {
  success: false;
  errors: Array<{
    path: string;
    message: string;
  }>;
};

export type TFormStateSuccess<T extends object = {}> = {
  success: true;
  data: T;
};

export type TFormState<T extends object = {}> = TFormStateBase & (TFormStateError | TFormStateSuccess<T>);

export type TDeleteFormState = Pick<TFormState, 'success' | 'message'>;
