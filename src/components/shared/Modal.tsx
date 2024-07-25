import {ReactNode, Dispatch, SetStateAction} from 'react';
import {Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader} from '@/components/ui';
import {Ban, Plus, Save} from 'lucide-react';

type TModalProps = {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>,
  title?: string;
  footer?: ReactNode;
  closeButton?: false | {
    icon?: ReactNode;
    label?: string;
  };
};

export const Modal = ({ children, open, setOpen, title, footer, closeButton = {icon: <Ban />, label: 'Close'} }: TModalProps) => {

  return (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
      {title && <DialogHeader>{title}</DialogHeader>}
      {children}
      <DialogFooter>
        {footer}
        {closeButton && <DialogClose asChild>
          <Button type="button" variant="secondary">
            {closeButton.icon}
            {closeButton.label && <span>{closeButton.label}</span>}
          </Button>
        </DialogClose>
        }
      </DialogFooter>
    </DialogContent>
  </Dialog>
  );
}
