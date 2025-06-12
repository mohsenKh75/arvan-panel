import { ReactNode } from 'react';
import { Box } from '../core/Box';

interface Props {
  children: ReactNode;
}
export function MainLayout({ children }: Props) {
  return <Box backgroundColor='bg-neutral-default'>{children}</Box>;
}
