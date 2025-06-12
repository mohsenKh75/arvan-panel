import { ReactElement } from 'react';
import { Box, BoxProps, ValidTags } from '../Box';
import { classnames } from '@/utils/classnames';
import { TextColorClassNameType, TextFontSizeType } from 'figma/tailwindTypes';

type Props<T extends ValidTags = 'p'> = {
  variant?: TextFontSizeType;
  color?: TextColorClassNameType;
  align?: 'text-left' | 'text-center' | 'text-right';
} & BoxProps<T> &
  JSX.IntrinsicElements[T];

export function Typography<T extends ValidTags = 'p'>({
  backgroundColor,
  color = 'text-neutral-fg-1-default',
  align,
  className,
  variant = 'text-body-2',
  tag,
  children,
  ...props
}: Props<T>): ReactElement {
  const boxTag = tag || ('p' as T);

  return (
    <Box<T> tag={boxTag} className={classnames(color, backgroundColor, align, className, variant)} {...props}>
      {children}
    </Box>
  );
}
