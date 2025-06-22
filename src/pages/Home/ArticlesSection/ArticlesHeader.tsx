import { GridContainer } from '@/components/core/GridContainer';
import { Typography } from '@/components/core/Typography';

export function ArticlesHeader() {
  return (
    <GridContainer className='p-4' justifyContent='justify-start' backgroundColor='bg-neutral-bg-2-default'>
      <Typography className='w-[2%]' variant='text-title-3'>
        #
      </Typography>
      <Typography className='w-[25%]' variant='text-title-3'>
        Title
      </Typography>
      <Typography className='w-[10%]' variant='text-title-3'>
        Author
      </Typography>
      <Typography className='w-[45%]' variant='text-title-3'>
        Excerpt
      </Typography>
      <Typography className='w-[20%]' variant='text-title-3'>
        Created
      </Typography>
    </GridContainer>
  );
}
