import { GridContainer } from '@/components/core/GridContainer';

export function Header() {
  return (
    <GridContainer
      justifyContent='justify-between'
      className='max-h-[40] px-2'
      backgroundColor='bg-neutral-pure-black'
    ></GridContainer>
  );
}
