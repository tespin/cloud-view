import React from 'react';
import Link from 'next/link';
import * as FormPrimitive from '@radix-ui/react-form';
import Container from '@/components/UI/Container';
import MainNav from '@/components/MainNav';

const SignupPage = () => {
  return (
    <>
      <Container className='xs:flex-col xs:justify-center xs:items-center xs:w-full'>
        <Container className='xs:flex-col xs:justify-center xs:items-center xs:w-96 xs:max-w-sm xs:my-4 xs:mx-8'>
          <MainNav />
          <main>
            <h2 className='xs:text-3xl xs:text-center xs:mt-9'>
              Sign up for Cloud View
            </h2>
            <FormPrimitive.Root className='xs:flex xs:flex-col xs:w-96 xs:mt-12 xs:text-base-md'>
              <FormPrimitive.Field name='username'>
                <FormPrimitive.Label>Username</FormPrimitive.Label>
                <FormPrimitive.Message match='valueMissing'>
                  Username
                </FormPrimitive.Message>
                <FormPrimitive.Control asChild>
                  <input
                    className='xs:w-full xs:border-2 xs:border-base xs:mt-1 xs:p-3 xs:rounded-md'
                    type='username'
                    required
                  />
                </FormPrimitive.Control>
              </FormPrimitive.Field>
              <FormPrimitive.Field className='xs:mt-4' name='password'>
                <FormPrimitive.Label>Password</FormPrimitive.Label>
                <FormPrimitive.Message match='valueMissing'>
                  Password
                </FormPrimitive.Message>
                <FormPrimitive.Control asChild>
                  <input
                    className='xs:w-full xs:border-2 xs:border-base xs:mt-1 xs:p-3 xs:rounded-md'
                    type='password'
                    required
                  />
                </FormPrimitive.Control>
              </FormPrimitive.Field>
              <FormPrimitive.Submit asChild>
                <button className='xs:w-full xs:border-2 xs:border-transparent xs:bg-base xs:hover:bg-base-darkMd xs:text-white xs:mt-8 xs:py-3 xs:rounded-md'>
                  Create account
                </button>
              </FormPrimitive.Submit>
            </FormPrimitive.Root>
            <p className='xs:text-base-md xs:mt-2'>
              Already have an account?{' '}
              <Link href='/login'>
                <span className='xs:text-base xs:font-bold'>Log in</span>
              </Link>
            </p>
          </main>
        </Container>
      </Container>
    </>
  );
};

export default SignupPage;
