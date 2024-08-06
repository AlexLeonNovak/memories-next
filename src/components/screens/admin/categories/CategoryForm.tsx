'use client';

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
import { i18n } from '@/i18n';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

type TCategoryFormProps = {
  category?: TCategoryEntity;
  onFormSubmit?: (data: TCategory) => void;
  submitRequested?: boolean;
  isShowSubmitButton?: boolean;
};

export const CategoryForm = ({
  category,
  onFormSubmit,
  submitRequested,
  isShowSubmitButton = true,
}: TCategoryFormProps) => {
  const tAdm = useTranslations('Admin');
  const t = useTranslations('AdminCategories');

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
        {/*<FormField*/}
        {/*  name='name'*/}
        {/*  control={control}*/}
        {/*  render={({ field }) => (*/}
        {/*    <FormItem>*/}
        {/*      <FormLabel>*/}
        {/*        Name <span className='text-red-600'>*</span>*/}
        {/*      </FormLabel>*/}
        {/*      <FormControl>*/}
        {/*        <Input placeholder='Name' {...field} />*/}
        {/*      </FormControl>*/}
        {/*      <FormDescription>Enter category name</FormDescription>*/}
        {/*      <FormMessage />*/}
        {/*    </FormItem>*/}
        {/*  )}*/}
        {/*/>*/}

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
          <div className='mt-10'>
            <SubmitButton label={t('Save category')} pendingLabel={tAdm('wait')} icon={<Save />} />
          </div>
        )}
      </form>
    </Form>
  );
};
