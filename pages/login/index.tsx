import React from 'react';
import Container from '@/components/UI/Container';

const LoginPage = () => {
  return (
    <>
      <Container className='xs:flex-col xs:justify-center xs:items-center xs:w-full'>
        <Container className='xs:flex-col xs:justify-center xs:items-center xs:max-w-sm xs:my-4 xs:mx-8'>
          <main>
            <h2>Log in to Cloud View</h2>
            <div>
              <div>
                <a href='/'>
                  <span>Log in</span>
                </a>
              </div>
            </div>
          </main>
        </Container>
      </Container>
    </>
  );
};

export default LoginPage;
