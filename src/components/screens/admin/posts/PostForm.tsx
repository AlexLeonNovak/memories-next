'use client';

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
  CategoryDialog
} from '@/components';
import {z} from 'zod';
import {EPostMediaType, TPost} from '@/types';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Save} from 'lucide-react';

const formSchema: z.ZodType<TPost> = z.object({
  name: z.string(),
  description: z.string().optional(),
  mediaType: z.nativeEnum(EPostMediaType),
  mediaUrl: z.string(),
  categories: z.array(z.string()).nonempty(),
});

export const PostForm = () => {
  const form = useForm<TPost>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [],
    }
  });

  const {control, handleSubmit} = form;

  const onSubmit = (data: TPost) => {
    console.log(data);
  };

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
                         Enter post name
                       </FormDescription>
                       <FormMessage/>
                     </FormItem>
                   )}
        />

        <div className="flex items-center">
        <FormField name="categories"
                   control={control}
                   render={({field}) => (
                     <FormItem className="w-full">
                       <FormLabel>Categories <span className="text-red-600">*</span></FormLabel>
                       <FormControl>
                         <MultiSelector values={field.value}
                                        onValuesChange={field.onChange}
                                        loop
                         >
                           <MultiSelectorTrigger>
                             <MultiSelectorInput placeholder="Select categories" />
                           </MultiSelectorTrigger>
                           <MultiSelectorContent>
                             <MultiSelectorList>
                               <MultiSelectorItem value="" disabled>There are no one item</MultiSelectorItem>
                             </MultiSelectorList>
                           </MultiSelectorContent>
                         </MultiSelector>
                       </FormControl>
                       <FormDescription>
                         Enter post name
                       </FormDescription>
                       <FormMessage/>
                     </FormItem>
                   )}
        />
          <CategoryDialog />
        </div>

        <FormField name="description"
                   control={control}
                   render={({field}) => (
                     <FormItem>
                       <FormLabel>Description</FormLabel>
                       <FormControl>
                         <Input placeholder="Description" {...field} />
                       </FormControl>
                       <FormMessage/>
                     </FormItem>
                   )}
        />

        <Button type="submit">
          <Save />
          <span>Save</span>
        </Button>
      </form>
    </Form>
  );
};
