// src/components/ui/Checkbox.tsx

import { classnames } from '@/utils/classnames';
import { forwardRef, InputHTMLAttributes } from 'react';
import { Typography } from '../Typography';

type CheckboxVariant = 'primary' | 'primary_danger' | 'secondary';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: CheckboxVariant;
  title?: string;
}

const variantBase = {
  primary: 'peer-checked:bg-primary-default peer-checked:text-neutral-default',
  primary_danger: 'peer-checked:bg-error-default peer-checked:text-neutral-default',
  secondary: 'peer-checked:border-neutral-st-2-default peer-checked:text-neutral-fg-1-default'
};

const baseUnchecked = 'border-2 border-neutral-disable';
const shared = 'w-6 h-6 inline-block rounded-md transition-all duration-200 flex items-center justify-center text-sm';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ variant = 'primary', className, title, ...props }, ref) => {
    return (
      <label className='inline-flex items-center cursor-pointer'>
        <input type='checkbox' ref={ref} className='peer sr-only' {...props} />
        <span
          className={classnames(
            shared,
            baseUnchecked,
            variantBase[variant],
            'peer-checked:after:content-["✓"] peer-checked:after:font-bold',
            className
          )}
        />
        {title && (
          <Typography className='pl-1' variant='text-body-2'>
            {title}
          </Typography>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
