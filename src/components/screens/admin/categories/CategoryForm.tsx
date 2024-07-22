'use client';

import {TCategory, TCategoryEntity} from '@/types';
import {
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  SubmitButton,
} from '@/components';
import {FieldPath, useForm} from 'react-hook-form';
import {useFormState} from 'react-dom';
import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect, useRef} from 'react';
import {createCategorySchema} from '@/lib/validations';
import {createCategory, updateCategory} from '@/server';
import {Save} from 'lucide-react';
import {toast} from 'sonner';

type TCategoryFormProps = {
  category?: TCategoryEntity;
  onFormSubmit?: (data: TCategory) => void,
  submitRequested?: boolean;
  isShowSubmitButton?: boolean;
}

export const CategoryForm = ({category, onFormSubmit, submitRequested, isShowSubmitButton = true}: TCategoryFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<TCategory>({
    mode: 'all',
    resolver: zodResolver(createCategorySchema),
    defaultValues: category || {
      name: '',
      isActive: true,
      order: 0,
    },
  });

  const serverAction = category?.id ? updateCategory : createCategory;

  const {control, setError} = form;
  const [state, action] = useFormState(serverAction, null);

  useEffect(() => {
    if (!state) {
      return;
    }
    if (!state.success) {
      toast.error('One or more fields have an error. Please check them and try again.');
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<TCategory>, {
          message: error.message,
        });
      });
    }
    if (state.success) {
      toast.success(`Successfully ${category?.id ? 'updated' : 'created'}!`);
      onFormSubmit && onFormSubmit(state.data);
    }
  }, [state, setError, category]);

  useEffect(() => {
    if (submitRequested) {
      action(new FormData(formRef.current!));
    }
  }, [action, submitRequested]);

  return (
    <Form {...form}>
      <form action={action} ref={formRef} className="space-y-8">

        { category?.id && <Input type='hidden' name='id' value={category.id} /> }

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

        <FormField name="isActive"
                   control={control}
                   render={({field: {name, value, onChange}}) => (
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

        <FormField name="order"
                   control={control}
                   render={({field}) => (
                     <FormItem>
                       <FormLabel>Sort order</FormLabel>
                       <FormControl>
                         <Input placeholder="Sort order" {...field} />
                       </FormControl>
                       <FormMessage/>
                     </FormItem>
                   )}
        />

        {isShowSubmitButton && <SubmitButton label="Save"
				                                     pendingLabel="Please wait..."
				                                     icon={<Save/>}
				/>
        }
      </form>
    </Form>
  );
};
