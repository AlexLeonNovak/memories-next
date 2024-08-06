'use client';

import { ConfirmDialog, Input, SubmitButton } from '@/components';
import { TDeleteFormState } from '@/types';
import { Trash } from 'lucide-react';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

type TDeleteCategoryForProps = {
  id: string;
  title?: string;
  description?: string;
  deleteAction: (
    state: Awaited<TDeleteFormState> | null,
    formData: FormData,
  ) => TDeleteFormState | Promise<TDeleteFormState>;
  onDeleted?: () => void;
};
export const DeleteForm = ({ id, title, description, onDeleted, deleteAction }: TDeleteCategoryForProps) => {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useFormState(deleteAction, null);
  const tAdm = useTranslations('Admin');

  useEffect(() => {
    if (!state) {
      return;
    }
    if (!state.success) {
      toast.error(tAdm(state.message));
    }
    if (state.success) {
      toast.success(tAdm('Successfully deleted!'));
      onDeleted && onDeleted();
    }
  }, [onDeleted, state, tAdm]);

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <form action={action} ref={formRef}>
      <Input type='hidden' name='id' value={id} />
      <SubmitButton variant='destructive-ghost' title={tAdm('Delete')} icon={<Trash />} onClick={onSubmit} />
      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        title={title || tAdm('Delete item?')}
        description={description || tAdm('Are you sure you want to delete this item?')}
        onConfirm={() => formRef.current?.requestSubmit()}
      />
    </form>
  );
};
