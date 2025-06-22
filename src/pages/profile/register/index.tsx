import { Box } from '@/components/core/Box';
import { Button } from '@/components/core/Button';
import { GridContainer } from '@/components/core/GridContainer';
import { Input } from '@/components/core/Input';
import { Typography } from '@/components/core/Typography';
import { URLS } from '@/router/urls';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';
import { registerAction } from '@/store/authSlice';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { useUser } from '@/hooks/useUser';
import { useEffect } from 'react';

const registerSchema = zod.object({
  username: zod
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(20, { message: 'Username must be at most 20 characters' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores'
    }),
  email: zod.string().email({ message: 'Invalid email address' }),
  password: zod.string().min(6, { message: 'Password must be at least 6 characters' })
});

type RegisterFormData = zod.infer<typeof registerSchema>;

export default function Register() {
  const { isLoggedIn } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });
  const navigate = useNavigate();
  const { request, pending } = useAsyncAction({ action: registerAction, successCallback: () => navigate(URLS.HOME) });

  function submitHandler(data: RegisterFormData) {
    request(data);
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate(URLS.HOME);
    }
  }, [isLoggedIn]);

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
            Sign up
          </Typography>
        </GridContainer>
        <Box className='px-4'>
          <Input
            inputSize='lg'
            title='username'
            type='text'
            {...register('username')}
            error={errors?.email?.message}
            state={errors?.email?.message ? 'error' : undefined}
            placeholder='enter your username'
          />
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
      <Typography className='px-4' variant='text-body-2'>
        Have an account?
        <NavLink to={URLS.LOGIN} className='pl-1 font-bold text-info-fg-1-default'>
          Sign in
        </NavLink>
      </Typography>
    </GridContainer>
  );
}
Register.layoutProps = { position: 'centered' };
