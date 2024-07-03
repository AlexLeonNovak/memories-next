'use client';

import {z} from 'zod';
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
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Save} from 'lucide-react';
import {useEffect} from 'react';

const formSchema: z.ZodType<TCategory> = z.object({
  name: z.string().min(1, 'Required'),
  isEnabled: z.boolean(),
})

type TCategoryFormProps = {
  onFormSubmit?: (data: TCategory) => void,
  submitRequested?: boolean;
  isShowSubmitButton?: boolean;
}

export const CategoryForm = ({onFormSubmit, submitRequested, isShowSubmitButton = true}: TCategoryFormProps) => {
  const form = useForm<TCategory>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      isEnabled: true,
    }
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: TCategory) => {
    const res = await fetch('/api/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    onFormSubmit && onFormSubmit(data);
  }

  useEffect(() => {
    console.log(submitRequested);
    if (submitRequested) {
      handleSubmit(onSubmit)();
    }
  }, [submitRequested]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                   render={({field}) => (
                     <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                       <FormControl>
                         <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                       </FormControl>
                       <div className="space-y-1 leading-none">
                         <FormLabel>Is active</FormLabel>
                       </div>
                       <FormMessage/>
                     </FormItem>
                     )}
          />
        {isShowSubmitButton && (
          <Button type="submit">
            <Save />
            <span>Save</span>
          </Button>
        )}
      </form>
    </Form>
  );
}
