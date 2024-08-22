'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CloudUpload, FileVideo, LoaderCircle, Save } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { DropzoneOptions } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { mutate } from 'swr';
import { useLocale } from 'use-intl';
import { z } from 'zod';
import { CategoryDialog } from '@/components/screens';
import { SubmitButton } from '@/components/shared';
import {
  AspectRatio,
  Button,
  Checkbox,
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  MultipleSelector,
  Option,
  Textarea,
} from '@/components/ui';
import { i18n, TLocale } from '@/config';
import { useFormCheck, useGetCategories } from '@/hooks';
import { COLLECTION_PATH } from '@/lib/constants';
import { getFileJs } from '@/lib/firebase';
import { uploadMediaFiles } from '@/lib/services';
import { useStateStore } from '@/lib/store';
import { cn, defineLocaleValues, getFileType } from '@/lib/utils';
import { createPostSchema, MAX_SIZE_IMAGE, MAX_SIZE_VIDEO } from '@/lib/validations';
import { useRouter } from '@/navigation';
import { bulkCreateMedias, bulkDeleteMedias } from '@/server/actions/medias.actions';
import { createPost, deletePost, updatePost } from '@/server/actions/posts.actions';
import { TMediaEntity, TPostEntity } from '@/types';

type TPostFormProps = {
  post?: TPostEntity;
  medias?: TMediaEntity[];
  swrKey?: string;
  onFormSubmit?: (data: TPostEntity) => void;
};

type TPostForm = z.infer<typeof createPostSchema>;

export const PostForm = ({ post, swrKey, medias, onFormSubmit }: TPostFormProps) => {
  const { setStateValue } = useStateStore();
  const tAdm = useTranslations('Admin');
  const t = useTranslations('AdminPosts');
  const categories = useGetCategories();

  const [isMediaLoading, setIsMediaLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const locale = useLocale() as TLocale;
  const categoryOptions: Option[] =
    categories?.data?.map(({ id, name, isActive }) => ({
      label: name[locale] || '',
      value: id,
      disable: !isActive,
    })) || [];

  if (post && typeof post?.name !== 'object') {
    post.name = defineLocaleValues(post.name);
  }

  if (post && typeof post?.description !== 'object') {
    post.description = defineLocaleValues(post.description);
  }

  const defaultValues: TPostForm = {
    name: post?.name || defineLocaleValues(''),
    description: post?.description || defineLocaleValues(''),
    categories: post?.categories ? categoryOptions.filter(({ value }) => post.categories.includes(value)) : [],
    isActive: post ? post.isActive : true,
    files: [],
  };

  const form = useForm<TPostForm>({
    mode: 'all',
    resolver: zodResolver(createPostSchema),
    defaultValues,
  });

  const dropzone = {
    multiple: true,
    maxFiles: 5,
    maxSize: Infinity,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
      'video/*': ['.mp4', '.mkv', '.mov'],
    },
  } satisfies DropzoneOptions;

  const { control, setError, setValue, getValues } = form;
  const serverAction = post?.id ? updatePost : createPost;
  const [state, action] = useFormState(serverAction, null);

  useFormCheck({
    state,
    setError,
    onSuccess: async (state) => {
      const { id } = state.data;
      try {
        const files = getValues('files');
        const { mediasToCreate, mediasToDelete } = await uploadMediaFiles(id, files, medias);
        await bulkDeleteMedias(mediasToDelete);
        const result = await bulkCreateMedias(mediasToCreate);
        if (result.status === 'error') {
          setError('files', { message: t('Save files error') });
          throw new Error(result.errors.map(({ message }) => message).join('\n'));
        }
        if (result.status === 'fail') {
          throw new Error(result.message);
        }
        toast.success(t(`Post successfully ${post?.id ? 'updated' : 'created'}!`));
        onFormSubmit && onFormSubmit(state.data);
        setStateValue('revalidatePosts', true);
        router.push('/admin/posts');
      } catch (e) {
        toast.error(tAdm((e as Error).message));
        if (!post) {
          const fd = new FormData();
          fd.set('id', id);
          await deletePost(null, fd);
        }
      }
      swrKey ? await mutate(swrKey) : await mutate(COLLECTION_PATH.POSTS);
    },
    onError: () => toast.error(tAdm('One or more fields have an error. Please check them and try again.')),
    onFail: (state) => toast.error(tAdm(state.message)),
    onFinally: () => setPending(false),
  });

  useEffect(() => {
    if (medias?.length) {
      setIsMediaLoading(true);
      Promise.all(medias.map(({ url }) => getFileJs(url)))
        .then((files) => setValue('files', files))
        .finally(() => setIsMediaLoading(false));
    }
  }, [medias, setValue, setIsMediaLoading]);

  return (
    <Form {...form}>
      <form action={action} onSubmit={() => setPending(true)}>
        {post?.id && <Input type='hidden' name='id' value={post.id} />}

        {i18n.locales.map((locale, index) => (
          <FormField
            key={`name.${locale}`}
            name={`name.${locale}`}
            control={control}
            render={({ field }) => (
              <FormItem className={cn(!!index && 'mt-2')}>
                <FormLabel className='space-x-1'>
                  <span className='text-muted-foreground uppercase'>{tAdm(`[${locale}]`)}</span>
                  <span>{t('Name')}</span>
                  {/* eslint-disable-next-line react/jsx-no-literals */}
                  <span className='text-red-600'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder={t('Post name')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {i18n.locales.map((locale, index) => (
          <FormField
            key={`description.${locale}`}
            name={`description.${locale}`}
            control={control}
            render={({ field }) => (
              <FormItem className={cn(!!index && 'mt-2')}>
                <FormLabel className='space-x-1'>
                  <span className='text-muted-foreground uppercase'>{tAdm(`[${locale}]`)}</span>
                  <span>{t('Description')}</span>
                </FormLabel>
                <FormControl>
                  <Textarea placeholder={t('Description')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <FormField
          name='categories'
          control={control}
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>
                {/* eslint-disable-next-line react/jsx-no-literals */}
                {tAdm('Categories')} <span className='text-red-600'>*</span>
              </FormLabel>
              <div className='flex items-center'>
                <FormControl className='flex items-center'>
                  <MultipleSelector
                    {...field}
                    options={categoryOptions}
                    placeholder={t('Select categories')}
                    emptyIndicator={<p>{t('There are no one item')}</p>}
                  />
                </FormControl>
                <CategoryDialog />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='files'
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Images and videos')}</FormLabel>
              <FormControl>
                <FileUploader
                  value={field.value}
                  onValueChange={field.onChange}
                  dropzoneOptions={dropzone}
                  orientation='horizontal'
                  className='relative bg-background border border-input p-2'
                >
                  <FileInput className='outline-dashed outline-1 outline-white'>
                    <div className='flex items-center justify-center flex-col pt-3 pb-4 w-full '>
                      <CloudUpload size={45} />
                      <p className='mb-1 text-sm text-gray-500 dark:text-gray-400'>
                        {/* eslint-disable-next-line react/jsx-no-literals */}
                        <span className='font-semibold'>Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>
                        {/* eslint-disable-next-line react/jsx-no-literals */}
                        <strong>Images: </strong>SVG, PNG, JPG or GIF&nbsp;
                        {/* eslint-disable-next-line react/jsx-no-literals */}
                        <span className='text-muted-foreground'>(Max {MAX_SIZE_IMAGE}MB)</span>
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>
                        {/* eslint-disable-next-line react/jsx-no-literals */}
                        <strong>Videos: </strong>MP4, MKV, MOV&nbsp;
                        {/* eslint-disable-next-line react/jsx-no-literals */}
                        <span className='text-muted-foreground'>(Max {MAX_SIZE_VIDEO}MB)</span>
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {isMediaLoading && <LoaderCircle className='animate-spin size-10' />}
                    {!isMediaLoading &&
                      field.value &&
                      field.value.length > 0 &&
                      field.value.map((file, i) => (
                        <FileUploaderItem key={i} index={i} className='size-20'>
                          <AspectRatio className='size-full'>
                            {getFileType(file) === 'image' ? (
                              <Image
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className='object-cover'
                                loading='eager'
                                fill
                              />
                            ) : (
                              <FileVideo className='size-full' />
                            )}
                          </AspectRatio>
                        </FileUploaderItem>
                      ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='isActive'
          control={control}
          render={({ field: { name, value, onChange } }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
              <FormControl>
                <Checkbox name={name} checked={value} onCheckedChange={onChange} />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>{tAdm('Is active')}</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='mt-10 flex gap-2'>
          <SubmitButton label={t('Save post')} isPending={pending} pendingLabel={tAdm('wait')} icon={<Save />} />
          <Button variant='secondary' type='button' onClick={() => router.back()}>
            {tAdm('Cancel')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
