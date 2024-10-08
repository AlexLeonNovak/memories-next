'use client';

import { Ban } from 'lucide-react';
import { Dispatch, HTMLAttributes, ReactNode, SetStateAction } from 'react';
import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from '@/components/ui';

type TModalProps = HTMLAttributes<HTMLDivElement> & {
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
  ...props
}: TModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={className} {...props} aria-describedby={undefined}>
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
