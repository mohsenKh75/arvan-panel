import React, { ButtonHTMLAttributes } from 'react';
import { Spinner } from './Spinner';
import { classnames } from '@/utils/classnames';
import { Image } from '../Image';
import { Box } from '../Box';

type ButtonVariant = 'primary' | 'primary_danger' | 'secondary';
type ButtonLayout = 'button' | 'icon';
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  pending?: boolean;
  layout?: ButtonLayout;
  iconSrc?: string;
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
  layout = 'button',
  iconSrc,
  ...props
}: Props) {
  const isDisabled = disabled || pending;
  const styles = COLORS_VARIANTS[variant];
  return (
    <button
      className={classnames(
        'rounded-md font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer',
        styles,
        className,
        { 'px-4 py-2': layout === 'button' }
      )}
      disabled={isDisabled}
      type={type}
      {...props}
    >
      {pending ? (
        <Spinner color={variant === 'secondary' ? 'border-neutral-fg-1-default' : undefined} />
      ) : layout === 'icon' ? (
        <Image src={iconSrc} className='w-5 h-4 m-2' />
      ) : (
        children
      )}
    </button>
  );
}
