'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, SubmitButton } from '@/components';
import { useFormCheck } from '@/hooks';
import { LogIn } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from '@/navigation';
import { useForm } from 'react-hook-form';
import { TCredentials, TTranslationEntity } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validations';
import { useFormState } from 'react-dom';
import { loginWithEmailAndPassword } from '@/server/actions/auth.actions';
import { toast } from 'sonner';
import { UserInfo } from '@firebase/auth-types';
import { useAuthStore } from '@/lib/store';
import { useTranslations } from 'next-intl';

const defaultValues: TCredentials = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  const tAdm = useTranslations('Admin');
  const t = useTranslations('LoginForm');
  const { setUser } = useAuthStore();
  const router = useRouter();
  const form = useForm<TCredentials>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const { control, setError, reset } = form;
  const [state, action] = useFormState(loginWithEmailAndPassword, null);

  useFormCheck<UserInfo, TCredentials>({
    state,
    setError,
    onError: () => {
      toast.error(tAdm('One or more fields have an error. Please check them and try again.'));
      reset(defaultValues);
    },
    onSuccess: (state) => {
      setUser(state.data);
      toast.success(t('You successfully logged in!'));
      router.replace('/admin');
    },
    onFail: (state) => toast.error(tAdm(state.message)),
  });

  return (
    <div className='p-6 bg-white border rounded'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <Image className='mx-auto h-10 w-auto' src='/logo.svg' alt='Zberezhemo logo' width={175} priority height={37} />
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          {t('Sign in to your account')}
        </h2>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <Form {...form}>
          <form className='space-y-5' action={action}>
            <FormField
              name='email'
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Email')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('exampleEmail')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='password'
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Password')}</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder={t('Your password')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-center'>
              <SubmitButton label={t('Sign in')} icon={<LogIn />} pendingLabel={tAdm('wait')} />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
