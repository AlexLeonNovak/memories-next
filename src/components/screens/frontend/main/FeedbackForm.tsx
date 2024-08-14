'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, SubmitButton } from '@/components';
import { useFormCheck } from '@/hooks';
import { createLeadSchema } from '@/lib/validations';
import { createLead } from '@/server/actions/leads.actions';
import { TLead } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

const defaultValues: TLead = {
  organisation: '',
  name: '',
  email: '',
  phone: '',
};

export const FeedbackForm = () => {
  const tAdm = useTranslations('Admin');
  const t = useTranslations('MainFeedbackForm');
  const form = useForm<TLead>({
    mode: 'all',
    resolver: zodResolver(createLeadSchema),
    defaultValues,
  });

  const { control, setError, reset } = form;
  const [state, action] = useFormState(createLead, null);

  useFormCheck<TLead>({
    state,
    setError,
    onError: () => toast.error(tAdm('One or more fields have an error. Please check them and try again.')),
    onSuccess: () => {
      toast.success(t('Feedback was successfully sent!'));
      reset(defaultValues);
    },
    onFail: (state) => toast.error(tAdm(state.message)),
  });

  return (
    <Form {...form}>
      <form>
        <FormField
          name='organisation'
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* eslint-disable-next-line react/jsx-no-literals */}
                {t('Organisation')} <span className='text-red-600'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={t('Enter your organisation')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='name'
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* eslint-disable-next-line react/jsx-no-literals */}
                {t('Name')} <span className='text-red-600'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={t('Enter your name')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='email'
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* eslint-disable-next-line react/jsx-no-literals */}
                {t('E-mail')} <span className='text-red-600'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={t('Enter your e-mail')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='phone'
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* eslint-disable-next-line react/jsx-no-literals */}
                {t('Phone')} <span className='text-red-600'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={t('Enter your phone')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton label={t('I want to help')} pendingLabel={t('Sending feedback')} />
      </form>
    </Form>
  );
};
