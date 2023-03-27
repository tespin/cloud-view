import React from 'react';
import Link from 'next/link';
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
            <div className='xs:flex xs:flex-col xs:w-96 xs:space-y-4 xs:mt-4 xs:text-base-md'>
              <button className='xs:w-full xs:mt-9 xs:border-2 xs:border-transparent xs:bg-base xs:hover:bg-base-darkMd xs:text-white xs:py-3 xs:rounded-md'>
                Continue
              </button>
            </div>
            <p className='xs:text-base-md xs:mt-6'>
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
