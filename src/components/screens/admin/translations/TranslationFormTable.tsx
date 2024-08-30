import { useTranslations } from 'next-intl';
import { Fragment, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { Ban, Save } from 'lucide-react';
import { locales } from '@/config';
import { TTranslation, TTranslationEntity } from '@/types';
import { updateTranslation } from '@/server/actions/translations.actions';
import { useFormCheck } from '@/hooks';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  Input,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui';
import { SubmitButton, Wysiwyg } from '@/components/shared';

type TTranslationFormCellsProps = {
  translation: TTranslationEntity;
  onFormSubmit?: (data: TTranslationEntity) => void;
  onFinally?: () => void;
  onCancel?: () => void;
  submitRequested?: boolean;
};

export const TranslationFormTable = ({
  translation,
  onFormSubmit,
  onFinally,
  submitRequested,
  onCancel,
}: TTranslationFormCellsProps) => {
  const { id, key, namespace } = translation;
  const isHTML = key.startsWith('[html]');
  const tAdm = useTranslations('Admin');
  const t = useTranslations('AdminTranslations');

  for (const locale of locales) {
    if (!(locale in translation) || !translation[locale]) {
      translation[locale] = '';
    }
  }

  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<TTranslation>({
    mode: 'all',
    defaultValues: translation,
  });

  const { control, setError } = form;
  const [state, action] = useFormState(updateTranslation, null);

  useFormCheck<TTranslationEntity>({
    state,
    setError,
    onError: () => toast.error(tAdm('One or more fields have an error. Please check them and try again.')),
    onSuccess: (state) => {
      toast.success(t('Translation successfully updated!'));
      onFormSubmit && onFormSubmit(state.data);
    },
    onFail: (state) => toast.error(tAdm(state.message)),
    onFinally,
  });

  useEffect(() => {
    if (submitRequested) {
      action(new FormData(formRef.current!));
    }
  }, [action, submitRequested]);

  return (
    <Form {...form}>
      <form action={action} ref={formRef}>
        <Table>
          <TableBody>
            {isHTML ? (
              <Fragment>
                {locales.map((locale, index) => (
                  <TableRow key={locale} className='hover:bg-white'>
                    <TableCell>
                      <FormField
                        name={locale}
                        control={control}
                        render={({ field }) => (
                          <div>
                            <FormLabel className='uppercase'>{locale}</FormLabel>
                            <FormControl>
                              <div>
                                <Input type='hidden' name={field.name} value={field.value} />
                                <Wysiwyg onBlur={field.onChange} value={field.value} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </div>
                        )}
                      />
                    </TableCell>
                    {index === 0 && (
                      <TableCell rowSpan={locales.length}>
                        <div className='flex gap-2'>
                          <Input type='hidden' name='id' value={id} />
                          <SubmitButton icon={<Save />} />
                          <Button variant='secondary' type='button' onClick={() => onCancel && onCancel()}>
                            <Ban />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </Fragment>
            ) : (
              <TableRow className='hover:bg-white'>
                {locales.map((locale) => (
                  <TableCell key={locale} className='w-1/2'>
                    <FormField
                      name={locale}
                      control={control}
                      render={({ field }) => (
                        <div>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      )}
                    />
                  </TableCell>
                ))}
                <TableCell className='w-32'>
                  <div className='flex gap-2'>
                    <Input type='hidden' name='id' value={id} />
                    <SubmitButton icon={<Save />} />
                    <Button variant='secondary' type='button' onClick={() => onCancel && onCancel()}>
                      <Ban />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </form>
    </Form>
  );
};
