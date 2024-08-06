'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components';
import { TTranslation, TTranslationEntity } from '@/types';
import { i18n } from '@/i18n';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { updateTranslation } from '@/server/actions/translations.actions';
import { useFormCheck } from '@/hooks';
import { toast } from 'sonner';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

type TTranslationFormProps = {
  translation: TTranslationEntity;
  onFormSubmit?: (data: TTranslationEntity) => void;
  onFinally?: () => void;
  submitRequested?: boolean;
};
export const TranslationForm = ({ translation, onFormSubmit, onFinally, submitRequested }: TTranslationFormProps) => {
  const { id, key, namespace } = translation;
  const tAdm = useTranslations('Admin');
  const t = useTranslations('AdminTranslations');

  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<TTranslation>({
    mode: 'all',
    defaultValues: translation,
  });

  const { control, setError } = form;
  const [state, action] = useFormState(updateTranslation, null);

  useFormCheck<TTranslationEntity>({
    state,
    setError,
    onError: () => toast.error(tAdm('One or more fields have an error. Please check them and try again.')),
    onSuccess: (state) => {
      toast.success(t('Translation successfully updated!'));
      onFormSubmit && onFormSubmit(state.data);
    },
    onFail: (state) => toast.error(tAdm(state.message)),
    onFinally,
  });

  useEffect(() => {
    if (submitRequested) {
      action(new FormData(formRef.current!));
    }
  }, [action, submitRequested]);

  return (
    <Form {...form}>
      <form action={action} ref={formRef} className='space-y-3'>
        <Input type='hidden' name='id' value={id} />
        <div className='space-y-2'>
          {namespace && (
            <p className='space-x-2'>
              <strong>{tAdm('Namespace:')}</strong>
              <span>{namespace}</span>
            </p>
          )}
          <p className='space-x-2'>
            <strong>{tAdm('Key:')}</strong>
            <span>{key}</span>
          </p>
        </div>

        {i18n.locales.map((locale) => (
          <FormField
            key={locale}
            name={locale}
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase'>{locale}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </form>
    </Form>
  );
};
