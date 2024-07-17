'use client';

import {Button, ButtonProps} from '@/components';
import {LoaderCircle} from 'lucide-react';
import {useFormStatus} from 'react-dom';

type TSubmitButtonProps = ButtonProps & {
  label?: string;
  pendingLabel?: string;
  icon?: React.ReactNode;
  isPending?: boolean;
}

export const SubmitButton = ({ label, pendingLabel, icon, isPending, ...props }: TSubmitButtonProps) => {
  const { pending } = useFormStatus();
  const formPending = pending || isPending;

  return (
    <Button type="submit" disabled={formPending} {...props}>
      {formPending
        ? (<><LoaderCircle className="animate-spin" />{pendingLabel && <span>{pendingLabel}</span>}</>)
        : (<>{icon}{label && <span>{label}</span>}</>)
      }
    </Button>
  )
};
