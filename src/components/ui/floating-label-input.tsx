import * as React from 'react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return <Input placeholder=' ' className={cn('peer', className)} ref={ref} {...props} />;
});
FloatingInput.displayName = 'FloatingInput';

const FloatingLabel = React.forwardRef<React.ElementRef<typeof Label>, React.ComponentPropsWithoutRef<typeof Label>>(
  ({ className, ...props }, ref) => {
    return (
      <Label
        className={cn(
          'bg-transparent peer-focus:secondary peer-focus:dark:secondary absolute start-6 top-2 z-10 origin-[0]' +
            ' -translate-y-8 peer-focus:start-0' +
            ' scale-75 transform bg-background px-0 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2' +
            ' peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2' +
            ' peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:px-0 dark:bg-background' +
            ' rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
FloatingLabel.displayName = 'FloatingLabel';

type FloatingLabelInputProps = InputProps & { label?: string; labelClassName?: string };

const FloatingLabelInput = React.forwardRef<
  React.ElementRef<typeof FloatingInput>,
  React.PropsWithoutRef<FloatingLabelInputProps>
>(({ id, label, labelClassName, ...props }, ref) => {
  return (
    <div className='relative'>
      <FloatingInput ref={ref} id={id} {...props} />
      <FloatingLabel htmlFor={id} className={labelClassName}>
        {label}
      </FloatingLabel>
    </div>
  );
});
FloatingLabelInput.displayName = 'FloatingLabelInput';

export { FloatingInput, FloatingLabel, FloatingLabelInput };