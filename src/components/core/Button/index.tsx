import React, { ButtonHTMLAttributes } from 'react';
import { Spinner } from './Spinner';
import { Box } from '../Box';

type ButtonVariant = 'primary' | 'primary_danger' | 'secondary';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;

  pending?: boolean;
}

const COLORS_VARIANTS = {
  primary:
    'bg-primary-default text-neutral-default active:bg-primary-press disabled:bg-primary-disable hover:bg-primary-hover',
  secondary:
    'border border-neutral-st-2-default text-body-2-strong active:border-neutral-press disabled:border-neutral-disable hover:border-neutral-hover',
  primary_danger:
    'bg-error-default text-neutral-default active:bg-error-press disabled:bg-error-disable hover:bg-error-hover '
};

export function Button({
  children,
  variant = 'primary',
  pending = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}: Props) {
  const isDisabled = disabled || pending;
  const styles = COLORS_VARIANTS[variant];
  <Box className='bg-error-default disabled:bg-primary-press'></Box>;
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium text-sm flex items-center justify-center gap-2 transition-all ${styles} ${className}`}
      disabled={isDisabled}
      type={type}
      {...props}
    >
      {pending ? <Spinner color={variant === 'secondary' ? 'border-neutral-fg-1-default' : undefined} /> : children}
    </button>
  );
}
