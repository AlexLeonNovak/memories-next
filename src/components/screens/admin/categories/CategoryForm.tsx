'use client';

import {TCategory} from '@/types';
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';
import {FieldPath, useForm} from 'react-hook-form';
import { useFormStatus, useFormState } from 'react-dom';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoaderCircle, Save} from 'lucide-react';
import {useEffect, useRef} from 'react';
import {createCategorySchema} from '@/lib/validations';
import {createCategory} from '@/server';

type TCategoryFormProps = {
  onFormSubmit?: (data: TCategory) => void,
  submitRequested?: boolean;
  isShowSubmitButton?: boolean;
}

const initialState: TCategory = {
  name: '',
  isEnabled: true,
}

export const CategoryForm = ({onFormSubmit, submitRequested, isShowSubmitButton = true}: TCategoryFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<TCategory>({
    mode: 'all',
    resolver: zodResolver(createCategorySchema),
    defaultValues: initialState
  });

  const [state, action] = useFormState(createCategory, null);
  const { pending } = useFormStatus();

  const { control, handleSubmit, setError } = form;

  // const onSubmit = async (data: TCategory) => {
  //   setIsLoading(true);
  //   const res = await fetch('/api/categories', {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     next: { tags: ['categories'] }
  //   });
  //
  //   const category: TCategory = await res.json();
  //   setIsLoading(false);
  //   onFormSubmit && onFormSubmit(category);
  // }

  // const onSubmit = async (data: TCategory) => {
  //   'use server';
  //   await CategoryRepository.create(data)
  // }

  useEffect(() => {
    if (!state) {
      return;
    }
    if (!state.success) {
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<TCategory>, {
          message: error.message,
        });
      });
    }
    if (state.success) {
      onFormSubmit && onFormSubmit(state.data);
    }
  }, [state, setError]);

  useEffect(() => {
    if (submitRequested) {
      action(new FormData(formRef.current!));
    }
  }, [action, submitRequested]);

  return (
    <Form {...form}>
      <form action={action} ref={formRef} className='space-y-8'>
        <FormField name="name"
                   control={control}
                   render={({field}) => (
                     <FormItem>
                       <FormLabel>Name <span className="text-red-600">*</span></FormLabel>
                       <FormControl>
                         <Input placeholder="Name" {...field} />
                       </FormControl>
                       <FormDescription>
                         Enter category name
                       </FormDescription>
                       <FormMessage/>
                     </FormItem>
                   )}
        />

        <FormField name="isEnabled"
                   control={control}
                   render={({field: { name, value, onChange}}) => (
                     <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                       <FormControl>
                         <Checkbox name={name} checked={value} onCheckedChange={onChange}/>
                       </FormControl>
                       <div className="space-y-1 leading-none">
                         <FormLabel>Is active</FormLabel>
                       </div>
                       <FormMessage/>
                     </FormItem>
                     )}
          />
        {isShowSubmitButton && (
          <Button type="submit" disabled={pending}>
            {pending
              ? (<><LoaderCircle className="animate-spin" /><span>Please wait...</span></>)
              : (<><Save /><span>Save</span></>)
            }
          </Button>
        )}
      </form>
    </Form>
  );
}
