'use client';

import {ConfirmDialog, Input, SubmitButton} from '@/components';
import {useFormState} from 'react-dom';
import {Trash} from 'lucide-react';
import {toast} from 'sonner';
import { MouseEvent, useEffect, useRef, useState} from 'react';
import {TDeleteFormState} from '@/types';


type TDeleteCategoryForProps = {
  id: string;
  title?: string;
  description?: string;
  deleteAction: (state: Awaited<TDeleteFormState> | null, formData: FormData) => TDeleteFormState | Promise<TDeleteFormState>;
}
export const DeleteForm = ({ id, title, description, deleteAction }: TDeleteCategoryForProps) => {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useFormState(deleteAction, null);

  useEffect(() => {
    if (!state) {
      return;
    }
    if (!state.success) {
      toast.error(state.message);
    }
    if (state.success) {
      toast.success('Successfully deleted!');
    }
  }, [state]);

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(true);
  }

  return (
    <form action={action} ref={formRef}>
      <Input type='hidden' name='id' value={id}/>
      <SubmitButton variant='destructive-ghost'
                    title='Delete'
                    icon={<Trash />}
                    onClick={onSubmit}
      />
      <ConfirmDialog open={open}
                     setOpen={setOpen}
                     title={title || 'Delete item?'}
                     description={description || 'Are you sure you want to delete this item?'}
                     onConfirm={() => formRef.current?.requestSubmit()}

      />
    </form>
  )
}
