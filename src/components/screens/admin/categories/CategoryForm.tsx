'use client';

import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { useFormCheck } from '@/hooks';
import { createCategorySchema } from '@/lib/validations';
import { createCategory, updateCategory } from '@/server/actions/categories.actions';
import { TCategory, TCategoryEntity } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { cn, defineLocaleValues } from '@/lib/utils';
import { i18n } from '@/config';
import { useTranslations } from 'next-intl';
import { mutate } from 'swr';
import { COLLECTION_PATH } from '@/lib/constants';
import { useRouter } from '@/navigation';
import { SubmitButton } from '@/components/shared';

type TCategoryFormProps = {
  category?: TCategoryEntity;
  swrKey?: string;
  onFormSubmit?: (data: TCategory) => void;
  submitRequested?: boolean;
  isShowSubmitButton?: boolean;
};

export const CategoryForm = ({
  category,
  swrKey,
  onFormSubmit,
  submitRequested,
  isShowSubmitButton = true,
}: TCategoryFormProps) => {
  const tAdm = useTranslations('Admin');
  const t = useTranslations('AdminCategories');
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  if (category && typeof category?.name !== 'object') {
    category.name = defineLocaleValues(category.name);
  }

  const form = useForm<TCategory>({
    mode: 'all',
    resolver: zodResolver(createCategorySchema),
    defaultValues: category || {
      name: defineLocaleValues(''),
      isActive: true,
      order: 0,
    },
  });

  const serverAction = category?.id ? updateCategory : createCategory;

  const { control, setError } = form;
  const [state, action] = useFormState(serverAction, null);

  useFormCheck<TCategory>({
    state,
    setError,
    onError: (state) => toast.error(tAdm('One or more fields have an error. Please check them and try again.')),
    onSuccess: (state) => {
      toast.success(t(`Category successfully ${category?.id ? 'updated' : 'created'}!`));
      swrKey ? mutate(swrKey) : mutate(COLLECTION_PATH.CATEGORIES);
      onFormSubmit && onFormSubmit(state.data as TCategory);
    },
    onFail: (state) => toast.error(state.message),
  });

  useEffect(() => {
    if (submitRequested) {
      action(new FormData(formRef.current!));
    }
  }, [action, submitRequested]);

  return (
    <Form {...form}>
      <form action={action} ref={formRef}>
        {category?.id && <Input type='hidden' name='id' value={category.id} />}

        {i18n.locales.map((locale, index) => (
          <FormField
            key={locale}
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
                  <Input placeholder={t('Category name')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <FormField
          name='order'
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Sort order')}</FormLabel>
              <FormControl>
                <Input type='number' placeholder={t('Sort order')} {...field} />
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

        {isShowSubmitButton && (
          <div className='mt-10 flex gap-2'>
            <SubmitButton label={t('Save category')} pendingLabel={tAdm('wait')} icon={<Save />} />
            <Button variant='secondary' type='button' onClick={() => router.back()}>
              {tAdm('Cancel')}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};
