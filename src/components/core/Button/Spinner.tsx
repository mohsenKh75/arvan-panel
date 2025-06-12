import { ColorType } from 'figma/tailwindTypes';
import { Box } from '../Box';
import { classnames } from '@/utils/classnames';

interface Props {
  color?: `border-${ColorType}`;
}
export function Spinner({ color = 'border-neutral-default' }: Props) {
  return <Box className={classnames('w-5 h-5 border-2 border-t-transparent rounded-full animate-spin', color)} />;
}
