'use client'

import {useFormState} from 'react-dom';
import {createLead} from '@/server';
import {useEffect} from 'react';
import {toast} from 'sonner';
import {FieldPath, useForm} from 'react-hook-form';
import {TLead} from '@/types';
import {zodResolver} from '@hookform/resolvers/zod';
import {createLeadSchema} from '@/lib/validations';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  SubmitButton,
} from '@/components';

const defaultValues: TLead = {
  organisation: '',
  name: '',
  email: '',
  phone: '',
}

export const FeedbackForm = () => {
  const form = useForm<TLead>({
    mode: 'all',
    resolver: zodResolver(createLeadSchema),
    defaultValues,
  });

  const {control, setError, reset} = form;

  const [state, action] = useFormState(createLead, null);

  useEffect(() => {
    if (!state) {
      return;
    }
    if (!state.success) {
      toast.error('One or more fields have an error. Please check them and try again.');
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<TLead>, {
          message: error.message,
        });
      });
    }
    if (state.success) {
      toast.success('Feedback was successfully sent!');
      reset(defaultValues);
    }
  }, [state, setError, reset]);

  return (
    <Form {...form}>
      <form action={action}>

        <FormField name="organisation"
                   control={control}
                   render={({field}) => (
                     <FormItem>
                       <FormLabel>Organisation <span className="text-red-600">*</span></FormLabel>
                       <FormControl>
                         <Input placeholder="Organisation" {...field} />
                       </FormControl>
                       <FormMessage/>
                     </FormItem>
                   )}
        />

        <FormField name="name"
                   control={control}
                   render={({field}) => (
                     <FormItem>
                       <FormLabel>Name <span className="text-red-600">*</span></FormLabel>
                       <FormControl>
                         <Input placeholder="Name" {...field} />
                       </FormControl>
                       <FormMessage/>
                     </FormItem>
                   )}
        />

        <FormField name="email"
                   control={control}
                   render={({field}) => (
                     <FormItem>
                       <FormLabel>E-mail <span className="text-red-600">*</span></FormLabel>
                       <FormControl>
                         <Input placeholder="E-mail" {...field} />
                       </FormControl>
                       <FormMessage/>
                     </FormItem>
                   )}
        />

        <FormField name="phone"
                   control={control}
                   render={({field}) => (
                     <FormItem>
                       <FormLabel>Phone <span className="text-red-600">*</span></FormLabel>
                       <FormControl>
                         <Input placeholder="Phone" {...field} />
                       </FormControl>
                       <FormMessage/>
                     </FormItem>
                   )}
        />

        <SubmitButton label='I want to help'
                      pendingLabel='Sending feedback...'
        />

      </form>
    </Form>
  );
}
