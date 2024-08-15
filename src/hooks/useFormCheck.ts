'use client';

import { useEffect } from 'react';
import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';
import { TFormState, TFormStateError, TFormStateFail, TFormStateSuccess } from '@/types';

type TFormCheckArgs<T extends FieldValues, F extends FieldValues = T> = {
  state: TFormState<T> | null;
  setError?: UseFormSetError<F>;
  onError?: (state: TFormStateError) => unknown;
  onFail?: (state: TFormStateFail) => unknown;
  onSuccess?: (state: TFormStateSuccess<T>) => unknown;
  onFinally?: () => unknown;
};

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
    const checkStatus = async (state: TFormState<T>) => {
      switch (state.status) {
        case 'fail':
          onFail && (await Promise.resolve(onFail(state)));
          break;
        case 'error':
          setError &&
            state.errors?.forEach(error => {
              setError(error.path as FieldPath<F>, {
                message: error.message,
              });
            });
          onError && (await Promise.resolve(onError(state)));
          break;
        case 'success':
          onSuccess && (await Promise.resolve(onSuccess(state)));
          break;
        default:
          break;
      }
      onFinally && (await Promise.resolve(onFinally()));
    };
    checkStatus(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
};
