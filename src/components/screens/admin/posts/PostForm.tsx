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
  Textarea,
  MultipleSelector,
  Option,
  CategoryDialog, FileUploader, FileInput, FileUploaderContent, FileUploaderItem, AspectRatio, SubmitButton, Checkbox,
} from '@/components';
import {TCategory, TPost} from '@/types';
import {FieldPath, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoaderCircle, Save, CloudUpload, FileVideo} from 'lucide-react';
import {createPostSchema} from '@/lib/validations';
import {z} from 'zod';
import {createPost} from '@/server';
import {useFormState, useFormStatus} from 'react-dom';
import {useEffect} from 'react';
import {DropzoneOptions} from 'react-dropzone';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

type TPostFormProps = {
  categories: Array<TCategory & {id: string}>
}

type TPostForm = z.infer<typeof createPostSchema>;

export const PostForm = ({ categories = [] }: TPostFormProps) => {
  const router = useRouter();
  const categoryOptions: Option[] = categories.map(({ id, name, isActive}) => ({
    label: name,
    value: id,
    disable: !isActive,
  }));

  const form = useForm<TPostForm>({
    mode: 'all',
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      name: '',
      description: '',
      categories: [],
      files: [],
      isActive: true,
    }
  });

  const dropzone = {
    multiple: true,
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif"],
      "video/*": [".mp4", ".mkv"],
    },
  } satisfies DropzoneOptions;

  const {control, setError} = form;
  const [state, action] = useFormState(createPost, null);

  useEffect(() => {
    if (!state) {
      return;
    }
    if (!state.success) {
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<TPostForm>, {
          message: error.message,
        });
      });
    }
    if (state.success) {
      router.push('/admin/posts');
    }
  }, [state, setError, router]);

  return (
    <Form {...form}>
      <form action={action} className="space-y-8">
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
                         <MultipleSelector
                           {...field}
                           options={categoryOptions}
                           placeholder="Select categories"
                           emptyIndicator={<p>There are no one item</p>}
                         />
                       </FormControl>
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
                         <Textarea placeholder="Description" {...field} />
                       </FormControl>
                       <FormMessage/>
                     </FormItem>
                   )}
        />

        <FormField name="files"
                   control={control}
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>Images and videos</FormLabel>
                       <FormControl>
                         <FileUploader
                           value={field.value}
                           onValueChange={field.onChange}
                           dropzoneOptions={dropzone}
                           orientation="horizontal"
                           className="relative bg-background border border-input p-2"
                         >
                           <FileInput name="files" className="outline-dashed outline-1 outline-white">
                             <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
                               <CloudUpload size={45}/>
                               <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                 <span className="font-semibold">Click to upload</span>
                                 &nbsp; or drag and drop
                               </p>
                               <p className="text-xs text-gray-500 dark:text-gray-400">
                                 <strong>Images: </strong>SVG, PNG, JPG or GIF
                               </p>
                               <p className="text-xs text-gray-500 dark:text-gray-400">
                                 <strong>Videos: </strong>MP4, MKV, MOV
                               </p>
                             </div>
                           </FileInput>
                           <FileUploaderContent>
                             {field.value && field.value.length > 0 &&
                               field.value.map((file, i) => (
                                 <FileUploaderItem key={i} index={i} className="size-20">

                                   <AspectRatio className="size-full">
                                     {file.type.includes('image')
                                       ? <Image src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            className="object-cover"
                                            fill
                                     />
                                       : <FileVideo className="size-full" />
                                     }
                                   </AspectRatio>
                                 </FileUploaderItem>
                               ))}
                           </FileUploaderContent>
                         </FileUploader>
                       </FormControl>
                       <FormMessage/>
                     </FormItem>
                   )}
        />

        <FormField name="isActive"
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

        <SubmitButton />
      </form>
    </Form>
  );
};
