'use client';

import {useEffect} from 'react';
import {FieldPath, FieldValues, UseFormSetError} from 'react-hook-form';
import {TFormState, TFormStateFail, TFormStateError, TFormStateSuccess} from '@/types';

type TFormCheckArgs<T extends FieldValues, F extends FieldValues = T> = {
  state: TFormState<T> | null;
  setError: UseFormSetError<F>;
  onError?: (state: TFormStateError) => void,
  onFail?: (state: TFormStateFail) => void,
  onSuccess?: (state: TFormStateSuccess<T>) => void,
  onFinally?: () => void,
}

export const useFormCheck = <T extends FieldValues, F extends FieldValues = T>({
  state,
  setError,
  onSuccess,
  onError,
  onFail,
  onFinally,
}: TFormCheckArgs<T, F>) => {
  useEffect(() => {
    if (!state) {
      return;
    }
    switch (state.status) {
      case 'fail':
        onFail && onFail(state);
        break;
      case 'error':
        state.errors?.forEach((error) => {
          setError(error.path as FieldPath<F>, {
            message: error.message,
          });
        });
        onError && onError(state);
        break;
      case 'success':
        onSuccess && onSuccess(state);
        break;
      default:
        break;
    }
    onFinally && onFinally();
  }, [state]);

};
