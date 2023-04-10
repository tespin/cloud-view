import React from 'react';
import { useState, useEffect } from 'react';
import Container from '@/components/UI/Container';
import Image, { StaticImageData } from 'next/image';
import img from '@/public/cloud_3542.png';
import nodeCrypto from 'crypto';
import MainNav from '@/components/MainNav';
import ImageGallery from '@/components/ImageGallery';

const StoragePage = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(true);
  const [images, setImages] = useState<{ src: string; id: string }[]>([
    { src: '', id: '' },
  ]);

  const getImages = () => {
    const nextImages = [];

    for (let i = 0; i < 15; i++) {
      const nextImage = {
        src: 'https://picsum.photos/384',
        id:
          typeof window !== 'undefined'
            ? window.crypto.randomUUID()
            : nodeCrypto.randomUUID(),
      };

      nextImages.push(nextImage);
    }

    setImages(nextImages);
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
      <Container className='xs:flex-col xs:justify-center xs:items-center xs:w-full'>
        <Container className='xs:flex-col xs:justify-center xs:items-center xs:xs:w-96 xs:my-4 xs:mx-8'>
          <MainNav />
          <main className='xs:w-full'>
            {/* <h2 className='xs:text-3xl xs:mt-9'>Storage</h2> */}
            {authenticated ? (
              <>
                <Container className='xs:flex-col xs:w-full xs:mt-12'>
                  <Container className='xs:flex-row xs:justify-between xs:items-end'>
                    <h2 className='xs:text-left xs:text-4xl'>Storage</h2>
                    <button className='xs:bg-base xs:text-white xs:px-6 xs:py-2 xs:rounded-md xs:hover:bg-base-darkMd'>
                      Select
                    </button>
                  </Container>
                  <ImageGallery links={images} />
                </Container>
              </>
            ) : (
              <>
                {' '}
                <div className='xs:flex xs:flex-col xs:space-y-4 xs:mt-4 xs:text-base-md'>
                  <p>
                    Log in to view your cloud storage. You can edit or download
                    from your storage once you’ve logged in.
                  </p>
                </div>
                <button className='xs:w-full xs:mt-9 xs:border-2 xs:border-transparent xs:bg-base xs:hover:bg-base-darkMd xs:text-white xs:py-3 xs:rounded-md'>
                  Log in
                </button>
              </>
            )}
          </main>
        </Container>
      </Container>
    </>
  );
};

export default StoragePage;
