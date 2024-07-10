'use client';

import {Button} from '@/components';
import {LoaderCircle, Save} from 'lucide-react';
import {useFormStatus} from 'react-dom';

type TSubmitButtonProps = {
  label?: string;
}

export const SubmitButton = ({ label }: TSubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending
        ? (<><LoaderCircle className="animate-spin" /><span>Please wait...</span></>)
        : (<><Save /><span>{ label || 'Save' }</span></>)
      }
    </Button>
  )
};
