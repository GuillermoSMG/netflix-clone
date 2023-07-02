import Input from '@/components/input';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useCallback, useState } from 'react';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant(currentVariant =>
      currentVariant === 'login' ? 'register' : 'login'
    );
  }, []);

  const login = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      try {
        await signIn('credentials', {
          email,
          password,
          callbackUrl: '/profiles',
        });
      } catch (error) {
        console.log(error);
      }
    },
    [email, password]
  );

  const register = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      try {
        await axios.post('/api/register', {
          email,
          name,
          password,
        });
        login(e);
      } catch (error) {
        console.log(error);
      }
    },
    [email, name, password, login]
  );

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.webp')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className='bg-black w-full h-full lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <Image
            src='/images/logo.webp'
            alt='Logo'
            width={128}
            height={48}
          />
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black/80 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
            <h2 className='text-white text-4xl mb-8 font-semibold'>
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <form
              onSubmit={variant === 'login' ? login : register}
              className='flex flex-col gap-4'
            >
              {variant === 'register' && (
                <Input
                  label='Username'
                  onChange={(e: any) => setName(e.target.value)}
                  id='name'
                  type='text'
                  value={name}
                />
              )}
              <Input
                label='Email'
                onChange={(e: any) => setEmail(e.target.value)}
                id='email'
                type='email'
                value={email}
              />
              <Input
                label='Password'
                onChange={(e: any) => setPassword(e.target.value)}
                id='password'
                type='password'
                value={password}
              />
              <button className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'>
                {variant === 'login' ? 'Login' : 'Sign up'}
              </button>
            </form>
            <div className='flex items-center gap-4 mt-8 justify-center'>
              <button
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center hover:opacity-80 transition'
              >
                <FcGoogle size={30} />
              </button>
              <button
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center hover:opacity-80 transition'
              >
                <FaGithub size={30} />
              </button>
            </div>
            <p className='text-neutral-500 mt-12'>
              {variant === 'login'
                ? 'First time using Netflix?'
                : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                className='text-white ml-1 hover:underline cursor-pointer'
              >
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Auth;
