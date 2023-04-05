import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image, { StaticImageData } from 'next/image';
import img from '@/public/cloud_3542.png';
import Container from '@/components/UI/Container';
import MainNav from '@/components/MainNav';
import Placeholder from '@/components/Placeholder';

const HomePage = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(true);
  const [cloudImg, setCloudImg] = useState<StaticImageData>();

  const router = useRouter();
  const { userId } = router.query as { userId: string | undefined };

  const imageHandler = () => {
    setCloudImg(img);
  };

  return (
    <>
      <Container className='xs:flex-col xs:justify-center xs:items-center xs:w-full'>
        <Container className='xs:flex-col xs:justify-center xs:w-96 xs:max-w-sm xs:my-4 xs:mx-8'>
          <MainNav url={userId} />
          <main>
            <h2 className='xs:mt-12 xs:text-left xs:text-4xl'>
              Welcome {userId}
            </h2>
            <p className='xs:text-base-md'>
              Retrieve a cloud to save it to your storage.
            </p>
            {authenticated && !cloudImg ? (
              <>
                <Placeholder className='xs:mt-8'>
                  <button
                    className='xs:bg-base xs:hover:bg-base-darkMd xs:focus:outline-none xs:focus:ring xs:text-white xs:py-3 xs:px-6 xs:rounded-md'
                    onClick={imageHandler}
                  >
                    Request a cloud
                  </button>
                </Placeholder>
              </>
            ) : authenticated && cloudImg ? (
              <div className={'xs:mt-8'}>
                <Image src={cloudImg} alt='cloud photo' />
                <button
                  className=' xs:w-full xs:mt-4 xs:bg-base xs:hover:bg-base-darkMd xs:focus:outline-none xs:focus:ring xs:text-white xs:py-3 xs:px-6 xs:rounded-md'
                  onClick={imageHandler}
                >
                  Save to cloud storage
                </button>
                <button
                  className=' xs:w-full xs:mt-4 xs:hover:bg-base-spLight xs:focus:outline-none xs:focus:ring xs:border-base xs:border-2 xs:py-3 xs:px-6 xs:rounded-md'
                  onClick={imageHandler}
                >
                  Request a new cloud
                </button>
              </div>
            ) : (
              <>Not logged in</>
            )}
          </main>
        </Container>
      </Container>
    </>
  );
};

export default HomePage;
