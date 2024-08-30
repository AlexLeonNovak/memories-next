'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Pencil } from 'lucide-react';
import { DeleteForm } from '@/components/screens';
import { SelectInput, TableSkeleton, TSelectInputItem } from '@/components/shared';
import { Button, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { locales, TLocale } from '@/config';
import { useGetTranslations } from '@/hooks/swr/translations';
import { getArrayObjectValues } from '@/lib/utils';
import { usePathname, useRouter } from '@/navigation';
import { deleteTranslation } from '@/server/actions/translations.actions';
import { TTranslationEntity } from '@/types';
import { TranslationFormTable } from './TranslationFormTable';

export const TranslationsTable = () => {
  const tAdm = useTranslations('Admin');
  const t = useTranslations('AdminTranslations');
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { data: translations, mutate, isLoading, revalidate } = useGetTranslations();
  const [filteredTranslations, setFilteredTranslations] = useState<TTranslationEntity[]>();
  const [namespaces, setNamespaces] = useState<TSelectInputItem[]>();
  const [keys, setKeys] = useState<TSelectInputItem[]>();
  const [localeSearch, setLocaleSearch] = useState<{ [key in TLocale]?: string }>();
  const [debouncedLocale] = useDebounce(localeSearch, 1500);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    if (!translations) {
      return;
    }
    const _namespaces = getArrayObjectValues(translations, 'namespace');
    setNamespaces(_namespaces.map((n) => ({ label: n, value: n })));
    const _keys = getArrayObjectValues(translations, 'key');
    setKeys(_keys.map((k) => ({ label: k, value: k })));
  }, [translations]);

  const createQueryString = useCallback(
    (name: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      value ? params.set(name, value) : params.delete(name);
      return params.toString();
    },
    [searchParams],
  );

  const handleSearch = useCallback(
    (name: string, value?: string) => router.replace(`${pathname}?${createQueryString(name, value)}`),
    [createQueryString, pathname, router],
  );

  useEffect(() => {
    const _localeSearch: { [key in TLocale]?: string } = {};
    for (const locale of locales) {
      const value = searchParams.get(locale) as string;
      if (value) {
        _localeSearch[locale] = value;
      }
    }
    setLocaleSearch(_localeSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!translations) {
      return;
    }
    let filtered = translations;
    const searchKeys = ['namespace', 'key', ...locales];
    for (const searchKey of searchKeys) {
      const value = (searchParams.get(searchKey) as string)?.toLowerCase();
      if (value) {
        filtered = filtered.filter((t) => (t as any)[searchKey]?.toLowerCase() === value);
      }
    }
    setFilteredTranslations(filtered);
  }, [searchParams, translations, debouncedLocale]);

  useEffect(() => {
    for (const locale in debouncedLocale) {
      const localeValue = debouncedLocale[locale as TLocale]?.toLowerCase();
      handleSearch(locale, localeValue);
    }
  }, [debouncedLocale, handleSearch]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{tAdm('#')}</TableHead>
          <TableHead>{tAdm('Namespace')}</TableHead>
          <TableHead>{tAdm('Key')}</TableHead>
          {locales.map((locale) => (
            <TableHead key={locale} className='uppercase'>
              {tAdm(locale)}
            </TableHead>
          ))}
          <TableHead>{tAdm('Actions')}</TableHead>
        </TableRow>
        {!isLoading && translations?.length && (
          <TableRow>
            <TableHead></TableHead>
            <TableHead>
              {namespaces && (
                <SelectInput
                  items={namespaces}
                  value={searchParams.get('namespace') as string}
                  placeholder={tAdm('Select namespace')}
                  onValueChange={(value) => handleSearch('namespace', value)}
                />
              )}
            </TableHead>
            <TableHead>
              {keys && (
                <SelectInput
                  items={keys}
                  value={searchParams.get('key') as string}
                  placeholder={tAdm('Select key')}
                  onValueChange={(value) => handleSearch('key', value)}
                />
              )}
            </TableHead>
            {locales.map((locale) => (
              <TableHead key={locale} className='uppercase w-1/3'>
                <Input
                  name={locale}
                  value={localeSearch && localeSearch[locale as TLocale]}
                  onChange={(e) => setLocaleSearch((state) => ({ ...state, [locale]: e.target.value }))}
                />
              </TableHead>
            ))}
            <TableHead className='w-32'></TableHead>
          </TableRow>
        )}
      </TableHeader>
      <TableBody>
        {isLoading && <TableSkeleton columns={4 + locales.length} />}
        {!isLoading &&
          filteredTranslations?.map((translation, index) => {
            const { id, namespace, key } = translation;
            return (
              <TableRow key={id}>
                <TableCell>{++index}</TableCell>
                <TableCell>{namespace}</TableCell>
                <TableCell>{key}</TableCell>
                {editId === id ? (
                  <Fragment>
                    <TableCell colSpan={locales.length + 1}>
                      <TranslationFormTable
                        translation={translation}
                        onFormSubmit={() => {
                          setEditId(null);
                          revalidate();
                          mutate();
                        }}
                        onCancel={() => setEditId(null)}
                      />
                    </TableCell>
                  </Fragment>
                ) : (
                  <Fragment>
                    {locales.map((locale) => {
                      let content;
                      if (typeof translation[locale] === 'undefined') {
                        content = <span className='text-destructive'>{tAdm('No translation')}</span>;
                      } else if (key.startsWith('[html]')) {
                        content = <span dangerouslySetInnerHTML={{ __html: translation[locale]! }} />;
                      } else {
                        content = translation[locale]!;
                      }

                      return <TableCell key={locale}>{content}</TableCell>;
                    })}
                    <TableCell>
                      <div className='flex gap-2'>
                        <Button variant='ghost' onClick={() => setEditId(id)}>
                          <Pencil />
                        </Button>
                        {/*<TranslationEditDialog*/}
                        {/*  translation={translation}*/}
                        {/*  onUpdate={() => {*/}
                        {/*    revalidate();*/}
                        {/*    mutate();*/}
                        {/*  }}*/}
                        {/*/>*/}
                        <DeleteForm
                          id={id}
                          deleteAction={deleteTranslation}
                          title={t('Delete translation?')}
                          description={t('Are you sure you want to delete this translation?')}
                          onDeleted={() => {
                            revalidate();
                            mutate();
                          }}
                        />
                      </div>
                    </TableCell>
                  </Fragment>
                )}
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};
