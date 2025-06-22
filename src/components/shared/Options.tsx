import { classnames } from '@/utils/classnames';
import { GridContainer } from '../core/GridContainer';
import { Typography } from '../core/Typography';
import { useEffect, useRef } from 'react';

interface Props {
  isOpen: boolean;
  openOptions: (id?: string) => void;
  onEdit: (id?: string) => void;
  id?: string;
}
export default function Options({ isOpen, openOptions, id, onEdit }: Props) {
  const optionsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        openOptions(undefined);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, openOptions]);

  return (
    <GridContainer
      customRef={optionsRef}
      direction='flex-col'
      justifyContent='justify-between'
      backgroundColor='bg-neutral-bg-1-default'
      className={classnames(
        'transition duration-75 absolute my-2 w-[144px] h-[90px] p-2 shadow-md rounded-md z-10 right-0',
        { 'invisible scale-0': !isOpen },
        { 'scale-100': isOpen }
      )}
    >
      <Typography onClick={() => onEdit(id)} variant='text-body-2'>
        edit
      </Typography>
      <Typography variant='text-body-2'>delete</Typography>
    </GridContainer>
  );
}
