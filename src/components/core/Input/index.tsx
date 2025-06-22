import { classnames } from '@/utils/classnames';
import { Box } from '../Box';
import { Typography } from '../Typography';
import React, { InputHTMLAttributes, TextareaHTMLAttributes, ChangeEvent, Ref, LegacyRef } from 'react';

interface SharedProps {
  state?: 'default' | 'hover' | 'active' | 'fill' | 'readOnly' | 'disabled' | 'error';
  inputSize?: 'sm' | 'lg' | 'field';
  error?: string;
  title?: string;
  className?: string;
}

type InputProps =
  | ({ inputSize?: 'sm' | 'lg' } & InputHTMLAttributes<HTMLInputElement> & SharedProps)
  | ({ inputSize: 'field' } & TextareaHTMLAttributes<HTMLTextAreaElement> & SharedProps);

function InputComponent(props: InputProps, ref: Ref<HTMLInputElement | HTMLTextAreaElement>) {
  const { error, state = 'default', inputSize = 'sm', className, title, ...rest } = props;

  const baseStyle = `
    w-full rounded-xl border px-4 outline-none transition-all
    placeholder:text-gray-400
    bg-white
    disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
    read-only:bg-gray-100 read-only:text-gray-400
    hover:border-gray-400
    focus:border-teal-500 focus:ring-1 focus:ring-teal-500
  `;

  const sizeStyle =
    inputSize === 'sm' ? 'h-9 text-sm' : inputSize === 'lg' ? 'h-12 text-base' : 'text-base min-h-[96px] py-2';
  const borderColor = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300';

  return (
    <Box>
      {title && (
        <Typography className='mb-1' variant='text-body-2'>
          {title}
        </Typography>
      )}
      {inputSize === 'field' ? (
        <textarea
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          rows={5}
          ref={ref as LegacyRef<HTMLTextAreaElement>}
          readOnly={state === 'readOnly'}
          disabled={state === 'disabled'}
          className={classnames(baseStyle, sizeStyle, borderColor, className)}
        />
      ) : (
        <input
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          ref={ref as LegacyRef<HTMLInputElement>}
          readOnly={state === 'readOnly'}
          disabled={state === 'disabled'}
          className={classnames(baseStyle, sizeStyle, borderColor, className)}
        />
      )}
      {error && (
        <Typography variant='text-caption-1-strong' color='text-error-default'>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export const Input = React.forwardRef(InputComponent);
