'use client';

import {
  DeleteForm,
  Input,
  SelectInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeleton,
  TranslationEditDialog,
  TSelectInputItem,
} from '@/components';
import { i18n, TLocale } from '@/i18n';
import { TranslationRepository } from '@/lib/repositories';
import { getArrayObjectValues } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { useCallback, useEffect, useState } from 'react';
import { TQueryFilter, TTranslationEntity } from '@/types';
import { useDebounce } from 'use-debounce';
import { deleteTranslation } from '@/server/actions/translations.actions';
import { useSearchParams } from 'next/navigation';

export const TranslationsTable = () => {
  const tAdm = useTranslations('Admin');
  const t = useTranslations('AdminTranslations');
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [translations, setTranslations] = useState<TTranslationEntity[]>();
  const [namespaces, setNamespaces] = useState<TSelectInputItem[]>();
  const [keys, setKeys] = useState<TSelectInputItem[]>();
  const [namespaceSearch, setNamespaceSearch] = useState<string>();
  const [keySearch, setKeySearch] = useState<string>();
  const [localeSearch, setLocaleSearch] = useState<{ [key in TLocale]?: string }>();
  const [debouncedLocale] = useDebounce(localeSearch, 1500);
  const [loading, setLoading] = useState(false);

  const fetchTranslations = useCallback(async () => {
    const _translations = await TranslationRepository.getAll();
    setTranslations(_translations);
    const _namespaces = getArrayObjectValues(_translations, 'namespace');
    setNamespaces(_namespaces.map((n) => ({ label: n, value: n })));
    const _keys = getArrayObjectValues(_translations, 'key');
    setKeys(_keys.map((k) => ({ label: k, value: k })));
  }, []);

  const filterTranslations = useCallback(async () => {
    const where: TQueryFilter<TTranslationEntity>[] = [];
    namespaceSearch && where.push({ fieldPath: 'namespace', opStr: '==', value: namespaceSearch });
    keySearch && where.push({ fieldPath: 'key', opStr: '==', value: keySearch });
    let _translations = await TranslationRepository.getAll({ where });
    if (debouncedLocale) {
      for (const locale in debouncedLocale) {
        const localeValue = debouncedLocale[locale as TLocale]?.toLowerCase();
        if (localeValue) {
          _translations = _translations.filter((_translation) =>
            _translation[locale as TLocale]?.toLowerCase().includes(localeValue),
          );
        }
      }
    }
    setTranslations(_translations);
  }, [namespaceSearch, keySearch, debouncedLocale]);

  const createQueryString = useCallback(
    (name: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      value ? params.set(name, value) : params.delete(name);
      return params.toString();
    },
    [searchParams],
  );

  const handleSearch = (name: string, value?: string) =>
    router.replace(`${pathname}?${createQueryString(name, value)}`);

  // const debounceLocale = useDebouncedCallback((locale: TLocale, value) => handleSearch(locale, value), 1500);

  useEffect(() => {
    setLoading(true);
    fetchTranslations().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setNamespaceSearch(searchParams.get('namespace') as string);
    setKeySearch(searchParams.get('namespace') as string);
    for (const locale of i18n.locales) {
      const localeValue = searchParams.get(locale)?.toLowerCase();
      if (localeValue) {
        setLocaleSearch((state) => ({ ...state, [locale]: localeValue }));
      }
    }
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    // for (const locale in debouncedLocale) {
    //   const localeValue = debouncedLocale[locale as TLocale]?.toLowerCase();
    //   createQueryString(locale, localeValue);
    // }
    // createQueryString('namespace', namespaceSearch);
    // const params = createQueryString('key', keySearch);
    // console.log(params);
    // router.push(`${pathname}?${params}`);
    filterTranslations().finally(() => setLoading(false));
  }, [namespaceSearch, keySearch, debouncedLocale]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{tAdm('#')}</TableHead>
          <TableHead>{tAdm('Namespace')}</TableHead>
          <TableHead>{tAdm('Key')}</TableHead>
          {i18n.locales.map((locale) => (
            <TableHead key={locale} className='uppercase'>
              {tAdm(locale)}
            </TableHead>
          ))}
          <TableHead>{tAdm('Actions')}</TableHead>
        </TableRow>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>
            {namespaces && (
              <SelectInput
                items={namespaces}
                value={namespaceSearch}
                placeholder={tAdm('Select namespace')}
                onValueChange={setNamespaceSearch}
              />
            )}
          </TableHead>
          <TableHead>
            {keys && (
              <SelectInput
                items={keys}
                value={keySearch}
                placeholder={tAdm('Select key')}
                onValueChange={setKeySearch}
              />
            )}
          </TableHead>
          {i18n.locales.map((locale) => (
            <TableHead key={locale} className='uppercase'>
              <Input
                name={locale}
                value={localeSearch && localeSearch[locale as TLocale]}
                onChange={(e) => setLocaleSearch((state) => ({ ...state, [locale]: e.target.value }))}
              />
            </TableHead>
          ))}
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading && <TableSkeleton columns={4 + i18n.locales.length} />}
        {!loading &&
          translations?.map((translation, index) => {
            const { id, namespace, key } = translation;
            return (
              <TableRow key={id}>
                <TableCell>{++index}</TableCell>
                <TableCell>{namespace}</TableCell>
                <TableCell>{key}</TableCell>
                {i18n.locales.map((locale) => (
                  <TableCell key={locale}>{translation[locale]}</TableCell>
                ))}
                <TableCell>
                  <div className='flex gap-2'>
                    <TranslationEditDialog
                      translation={translation}
                      onUpdate={(data) => {
                        const tIdx = translations?.findIndex((t) => t.id === data.id);
                        translations[tIdx] = data;
                        setTranslations(translations);
                      }}
                    />
                    <DeleteForm
                      id={id}
                      deleteAction={deleteTranslation}
                      title={t('Delete translation?')}
                      description={t('Are you sure you want to delete this translation?')}
                      onDeleted={() => setTranslations(translations?.filter((t) => t.id !== id))}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};
