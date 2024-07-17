import {useCallback, useState} from 'react';

export const useConfirmDialog = () => {
  const [isOpen, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  const open = useCallback(() => setOpen(true), []);

  return { isOpen, open, close };
}
