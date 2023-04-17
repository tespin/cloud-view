import React from 'react';
import Link from 'next/link';
import * as FormPrimitive from '@radix-ui/react-form';
import Container from '@/components/UI/Container';
import MainNav from '@/components/MainNav';
import Form from '@/components/Form';

const LoginPage = () => {
  return (
    <>
      <Container className='xs:flex-col xs:justify-center xs:items-center xs:w-full'>
        <Container className='xs:flex-col xs:justify-center xs:items-center xs:w-full xs:max-w-sm xs:my-4 xs:mx-8'>
          <MainNav />
          <main>
            <h2 className='xs:text-3xl xs:text-center xs:mt-9'>
              Log in to Cloud View
            </h2>
            <Form category='LOGIN' />
            <p className='xs:text-base-md xs:mt-2'>
              No account?{' '}
              <Link href='/signup'>
                <span className='xs:text-base xs:font-bold'>Sign up</span>
              </Link>
            </p>
          </main>
        </Container>
      </Container>
    </>
  );
};

export default LoginPage;
