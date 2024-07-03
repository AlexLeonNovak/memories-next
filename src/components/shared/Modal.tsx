import {ReactNode, Dispatch, SetStateAction} from 'react';
import {Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader} from '@/components/ui';
import {Ban, Plus, Save} from 'lucide-react';

type TModalProps = {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>,
  title?: string;
  footer?: ReactNode;
};

export const Modal = ({ children, open, setOpen, title, footer }: TModalProps) => {

  return (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
      {title && <DialogHeader>{title}</DialogHeader>}
      {children}
      <DialogFooter>
        {footer}
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            <Ban />
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  );
}
