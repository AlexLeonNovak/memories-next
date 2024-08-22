'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { SubmitButton } from '@/components/shared/SubmitButton';
import {
  FloatingFormLabel,
  FloatingInput,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { useFormCheck } from '@/hooks';
import { createLeadSchema } from '@/lib/validations';
import { createLead } from '@/server/actions/leads.actions';
import { TLead } from '@/types';
import { cn } from '@/lib/utils';

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
      <form action={action}>
        <FormField
          name='organisation'
          control={control}
          render={({ field }) => (
            <FormItem>
              <div className='relative'>
                <FormControl>
                  <FloatingInput {...field} className='aria-invalid:border-destructive aria-invalid:ring-destructive' />
                </FormControl>
                <FloatingFormLabel className='required text-base uppercase' {...field}>
                  {t('Organisation')}
                </FloatingFormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='name'
          control={control}
          render={({ field }) => (
            <FormItem>
              <div className='relative'>
                <FormControl>
                  <FloatingInput {...field} className='aria-invalid:border-destructive aria-invalid:ring-destructive' />
                </FormControl>
                <FloatingFormLabel className='required text-base uppercase' {...field}>
                  {t('Name')}
                </FloatingFormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='email'
          control={control}
          render={({ field }) => (
            <FormItem>
              <div className='relative'>
                <FormControl>
                  <FloatingInput {...field} className='aria-invalid:border-destructive aria-invalid:ring-destructive' />
                </FormControl>
                <FloatingFormLabel className='required text-base uppercase' {...field}>
                  {t('E-mail')}
                </FloatingFormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='phone'
          control={control}
          render={({ field }) => (
            <FormItem>
              <div className='relative'>
                <FormControl>
                  <FloatingInput {...field} className='aria-invalid:border-destructive aria-invalid:ring-destructive' />
                </FormControl>
                <FloatingFormLabel className='required text-base uppercase' {...field}>
                  {t('Phone')}
                </FloatingFormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='mt-5'>
          <SubmitButton label={t('I want to help')} pendingLabel={t('Sending feedback')} />
        </div>
      </form>
    </Form>
  );
};
