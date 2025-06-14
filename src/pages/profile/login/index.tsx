import { Box } from '@/components/core/Box';
import { Button } from '@/components/core/Button';
import { GridContainer } from '@/components/core/GridContainer';
import { Input } from '@/components/core/Input';
import { Typography } from '@/components/core/Typography';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApi } from '@/hooks/useApi';
import { POST_LOGIN_DATA } from '@/apis/login';

const loginSchema = zod.object({
  email: zod.string().email({ message: 'Invalid email address' }),
  password: zod.string().min(6, { message: 'Password must be at least 6 characters' })
});

type LoginFormData = zod.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });
  const { request, pending } = useApi({ ep: POST_LOGIN_DATA });
  function submitHandler(data: LoginFormData) {
    request({ method: 'POST', payload: { user: { email: data.email, password: data.password } } }).then((res) =>
      console.log(res)
    );
  }

  return (
    <GridContainer
      direction='flex-col'
      ySpacing='space-y-4'
      className='w-1/3 py-4 rounded-lg'
      backgroundColor='bg-neutral-default'
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <GridContainer
          direction='flex-col'
          justifyContent='justify-center'
          className='h-[100px] border-b border-neutral-st-3-default'
        >
          <Typography bold className='px-4' variant='text-title-3'>
            Sign in
          </Typography>
        </GridContainer>
        <Box className='px-4'>
          <Input
            inputSize='lg'
            title='Email'
            type='email'
            {...register('email')}
            error={errors?.email?.message}
            state={errors?.email?.message ? 'error' : undefined}
            placeholder='enter you email address'
          />
          <Input
            inputSize='lg'
            title='Password'
            type='password'
            {...register('password')}
            error={errors?.password?.message}
            state={errors?.password?.message ? 'error' : undefined}
            placeholder='enter your password'
          />
        </Box>
        <Box className='mt-4 w-full px-4'>
          <Button type='submit' className='w-full' pending={pending}>
            Sign in
          </Button>
        </Box>
      </form>
    </GridContainer>
  );
}
