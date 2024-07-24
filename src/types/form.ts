import {FieldValues} from 'react-hook-form';

export type TFormStateFail = {
  status: 'fail';
  message: string;
};

export type TFormStateError = {
  status: 'error';
  errors: Array<{
    path: string;
    message: string;
  }>;
};

export type TFormStateSuccess<T extends FieldValues> = {
  status: 'success';
  data: T;
};

export type TFormState<T extends FieldValues> = TFormStateFail | TFormStateError | TFormStateSuccess<T>;

export type TDeleteFormState = {
  success: boolean;
  message?: string;
};
