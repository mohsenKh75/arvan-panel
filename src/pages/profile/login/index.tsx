import { Box } from '@/components/core/Box';
import { Button } from '@/components/core/Button';
import { GridContainer } from '@/components/core/GridContainer';
import { Input } from '@/components/core/Input';

export default function Login() {
  return (
    <GridContainer
      direction='flex-col'
      ySpacing='space-y-4'
      className='w-1/2 p-4 rounded-md'
      backgroundColor='bg-neutral-default'
    >
      <Input inputSize='lg' title='Email' type='email' />
      <Input inputSize='lg' title='password' type='password' />
      <Button>Sign in</Button>
    </GridContainer>
  );
}
