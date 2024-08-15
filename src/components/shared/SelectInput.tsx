'use client';

import { SelectProps } from '@radix-ui/react-select';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

export type TSelectInputItem = {
  value: string;
  label: string;
};

type TSelectInputProps = SelectProps & {
  items: TSelectInputItem[];
  placeholder: string;
  onValueChange?(value?: string): void;
};
export const SelectInput = ({ items, value: initValue, placeholder, onValueChange, ...props }: TSelectInputProps) => {
  const [key, setKey] = useState(+new Date());
  const [value, setValue] = useState<string | undefined>(initValue || undefined);
  const tAdm = useTranslations('Admin');

  return (
    <Select key={key} {...props} value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <Button
          className="w-full px-2"
          variant="secondary"
          size="sm"
          onClick={e => {
            e.stopPropagation();
            setValue(undefined);
            setKey(+new Date());
            onValueChange && onValueChange(undefined);
          }}
        >
          {tAdm('Clear')}
        </Button>
        <SelectSeparator />
        {items?.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
