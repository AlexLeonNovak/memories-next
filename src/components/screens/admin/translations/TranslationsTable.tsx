'use client';

import {
  Input,
  Select,
  SelectContent,
  SelectInput,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TSelectInputItem,
} from '@/components';
import { i18n, TLocale } from '@/i18n';
import { TranslationRepository } from '@/lib/repositories';
import { getArrayObjectValues } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { TQueryFilter, TTranslationEntity } from '@/types';
import * as sea from 'node:sea';
import { useDebounce } from 'use-debounce';
import { log } from 'node:util';

export const TranslationsTable = () => {
  const tTr = useTranslations('AdminTranslations');
  const tAdm = useTranslations('Admin');
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
    fetchTranslations();
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
    // for (const locale in debouncedLocale) {
    //   const localeValue = debouncedLocale[locale as TLocale]?.toLowerCase();
    //   createQueryString(locale, localeValue);
    // }
    // createQueryString('namespace', namespaceSearch);
    // const params = createQueryString('key', keySearch);
    // console.log(params);
    // router.push(`${pathname}?${params}`);
    filterTranslations();
  }, [namespaceSearch, keySearch, debouncedLocale]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>{tTr('namespace')}</TableHead>
          <TableHead>{tTr('key')}</TableHead>
          {i18n.locales.map((locale) => (
            <TableHead key={locale} className='uppercase'>
              {locale}
            </TableHead>
          ))}
          <TableHead>{tAdm('actions')}</TableHead>
        </TableRow>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>
            {namespaces && (
              <SelectInput
                items={namespaces}
                value={namespaceSearch}
                placeholder={tTr('Select namespace')}
                onValueChange={setNamespaceSearch}
              />
            )}
          </TableHead>
          <TableHead>
            {keys && (
              <SelectInput
                items={keys}
                value={keySearch}
                placeholder={tTr('Select key')}
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
        {translations?.map((translation, index) => {
          const { id, namespace, key } = translation;
          return (
            <TableRow key={id}>
              <TableCell>{++index}</TableCell>
              <TableCell>{namespace}</TableCell>
              <TableCell>{key}</TableCell>
              {i18n.locales.map((locale) => (
                <TableCell key={locale}>{translation[locale]}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
