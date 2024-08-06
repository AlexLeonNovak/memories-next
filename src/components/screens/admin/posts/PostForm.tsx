'use client';

import {
  AspectRatio,
  CategoryDialog,
  Checkbox,
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  MultipleSelector,
  Option,
  SubmitButton,
  Textarea,
} from '@/components';
import { useFormCheck } from '@/hooks';
import { MediaRepository, PostRepository } from '@/lib/repositories';
import { getFileJs } from '@/lib/services';
import { cn, defineLocaleValues, getFileType } from '@/lib/utils';
import { MAX_SIZE_IMAGE, MAX_SIZE_VIDEO, createPostSchema } from '@/lib/validations';
import { createPost, updatePost } from '@/server/actions/posts.actions';
import { TCategory, TPostEntity } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { CloudUpload, FileVideo, LoaderCircle, Save } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from '@/navigation';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { DropzoneOptions } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useLocale } from 'use-intl';
import { i18n, TLocale } from '@/i18n';

type TPostFormProps = {
  categories: Array<TCategory & { id: string }>;
  post?: TPostEntity;
};

type TPostForm = z.infer<typeof createPostSchema>;

export const PostForm = ({ post, categories = [] }: TPostFormProps) => {
  const tAdm = useTranslations('Admin');
  const t = useTranslations('AdminPosts');

  const [isMediaLoading, setIsMediaLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const locale = useLocale() as TLocale;
  const categoryOptions: Option[] = categories.map(({ id, name, isActive }) => ({
    label: name[locale] || '',
    value: id,
    disable: !isActive,
  }));

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
    isActive: post?.isActive || true,
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
        await MediaRepository.saveMedia(id, files);
        toast.success(t(`Post successfully ${post?.id ? 'updated' : 'created'}!`));
        router.push('/admin/posts');
      } catch (e) {
        toast.error(tAdm((e as Error).message));
        await PostRepository.delete(id);
        await MediaRepository.deleteMedia(id);
      }
    },
    onError: () => toast.error(tAdm('One or more fields have an error. Please check them and try again.')),
    onFail: (state) => toast.error(tAdm(state.message)),
    onFinally: () => setPending(false),
  });

  useEffect(() => {
    if (post?.id) {
      setIsMediaLoading(true);
      const loadFiles = async (postId: string) => {
        const medias = await MediaRepository.getMedias(postId);
        return Promise.all(medias.map(({ url }) => getFileJs(url)));
      };
      loadFiles(post.id)
        .then((files) => setValue('files', files))
        .finally(() => setIsMediaLoading(false));
    }
  }, [post, setValue, setIsMediaLoading]);

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

        <SubmitButton
          className='mt-10'
          label={t('Save post')}
          isPending={pending}
          pendingLabel={tAdm('wait')}
          icon={<Save />}
        />
      </form>
    </Form>
  );
};
