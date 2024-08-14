'use client';

import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui';
import { Ban, Plus, Save } from 'lucide-react';
import { Dispatch, ReactNode, SetStateAction } from 'react';

type TModalProps = {
  children: ReactNode;
  className?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  footer?: ReactNode;
  closeButton?:
    | false
    | {
        icon?: ReactNode;
        label?: string;
      };
};

export const Modal = ({
  children,
  className,
  open,
  setOpen,
  title,
  footer,
  closeButton = { icon: <Ban />, label: 'Close' },
}: TModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={className}>
        {title && <DialogTitle>{title}</DialogTitle>}
        {children}
        <DialogFooter>
          {footer}
          {closeButton && (
            <DialogClose asChild>
              <Button type='button' variant='secondary'>
                {closeButton.icon}
                {closeButton.label && <span>{closeButton.label}</span>}
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
