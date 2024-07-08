export type TFormStateBase<T extends object = {}> = {
  message?: string;
  data?: T;
};

export type TFormStateError = {
  success: false;
  errors: Array<{
    path: string;
    message: string;
  }>;
};

export type TFormStateSuccess = {
  success: true;
};

export type TFormState<T extends object = {}> = TFormStateBase<T> & (TFormStateError | TFormStateSuccess);
