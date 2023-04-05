import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import cloudImg from '@/public/cloud_3542.png';
import Container from '@/components/UI/Container';
import MainNav from '@/components/MainNav';
import Placeholder from '@/components/Placeholder';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [cloudImage, setCloudImage] = useState<string | null>(null);

  const imageHandler = () => {
    setImageLoaded(true);
  };

  return (
    <>
      <Head>
        <title>Cloud View</title>
        <meta name='description' content='Cloud View app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container className='xs:flex-col xs:justify-center xs:items-center xs:w-full'>
        <Container className='xs:flex-col xs:justify-center xs:items-center xs:w-96 xs:max-w-sm xs:my-4 xs:mx-8'>
          <MainNav />
          <main>
            <h1 className='xs:mt-12 xs:text-center xs:text-4xl'>
              Your personal cloud storage solution.
            </h1>
          </main>
          {imageLoaded ? (
            <div className={`xs:mt-8`}>
              <Image src={cloudImg} alt='cloud photo' />
              <button
                className=' xs:w-full xs:mt-4 xs:bg-base xs:hover:bg-base-darkMd xs:focus:outline-none xs:focus:ring xs:text-white xs:py-3 xs:px-6 xs:rounded-md'
                onClick={imageHandler}
              >
                Request a new cloud
              </button>
            </div>
          ) : (
            <Placeholder className='xs:mt-8'>
              <button
                className='xs:bg-base xs:hover:bg-base-darkMd xs:focus:outline-none xs:focus:ring xs:text-white xs:py-3 xs:px-6 xs:rounded-md'
                onClick={imageHandler}
              >
                Request a cloud
              </button>
            </Placeholder>
          )}
        </Container>
      </Container>
    </>
  );
}
