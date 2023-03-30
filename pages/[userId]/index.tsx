import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Container from '@/components/UI/Container';
import MainNav from '@/components/MainNav';
import Placeholder from '@/components/Placeholder';

const HomePage = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(true);

  const router = useRouter();
  const { userId } = router.query;

  return (
    <>
      {authenticated ? (
        <Container className='xs:flex-col xs:justify-center xs:items-center xs:w-full'>
          <Container className='xs:flex-col xs:justify-center xs:w-96 xs:max-w-sm xs:my-4 xs:mx-8'>
            <MainNav url='/storage' />
            <main>
              <h1 className='xs:mt-12 xs:text-left xs:text-4xl'>
                Welcome {userId}
              </h1>
              <p className='xs:text-base-md'>
                Retrieve a cloud to save it to your storage.
              </p>
            </main>
            <Placeholder className='xs:mt-8' />
          </Container>
        </Container>
      ) : (
        <p>Not logged in</p>
      )}
    </>
  );
};

export default HomePage;
