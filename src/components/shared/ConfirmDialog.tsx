import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components';
import {Dispatch, SetStateAction, useCallback, useState} from 'react';

type TConfirmDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>,
  title: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export const ConfirmDialog = ({ open, setOpen, title, description, cancelLabel, confirmLabel, onConfirm, onCancel}: TConfirmDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelLabel || 'Cancel' }</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{confirmLabel || 'Continue'}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
