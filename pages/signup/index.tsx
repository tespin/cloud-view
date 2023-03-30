import React from 'react';
import Link from 'next/link';
import * as FormPrimitive from '@radix-ui/react-form';
import Container from '@/components/UI/Container';
import MainNav from '@/components/MainNav';
import Form from '@/components/Form';

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
            <Form category='SIGNUP' />
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
