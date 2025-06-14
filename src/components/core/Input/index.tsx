import { classnames } from '@/utils/classnames';
import { Box } from '../Box';
import { Typography } from '../Typography';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  state?: 'default' | 'hover' | 'active' | 'fill' | 'readOnly' | 'disabled' | 'error';
  inputSize?: 'sm' | 'lg';
  error?: string;
  title?: string;
}

function InputComponent(
  { error, state = 'default', inputSize = 'sm', className, title, ...props }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  const baseStyle = `
    w-full rounded-xl border px-4 outline-none transition-all
    placeholder:text-gray-400
    bg-white
    disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
    read-only:bg-gray-100 read-only:text-gray-400
    hover:border-gray-400
    focus:border-teal-500 focus:ring-1 focus:ring-teal-500
  `;

  const sizeStyle = inputSize === 'sm' ? 'h-9 text-sm' : 'h-12 text-base';
  const borderColor = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300';

  return (
    <Box>
      {title && (
        <Typography className='mb-1' variant='text-body-2'>
          {title}
        </Typography>
      )}
      <input
        ref={ref}
        {...props}
        readOnly={state === 'readOnly'}
        disabled={state === 'disabled'}
        className={classnames(baseStyle, sizeStyle, borderColor, className)}
      />
      {error && (
        <Typography variant='text-caption-1-strong' color='text-error-default'>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export const Input = React.forwardRef(InputComponent);
