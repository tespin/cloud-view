import React from 'react';
import { useState, useEffect } from 'react';
import Container from '@/components/UI/Container';
import Image, { StaticImageData } from 'next/image';
import img from '@/public/cloud_3542.png';
import DownloadIcon from '@/components/UI/DownloadIcon';
import TrashIcon from '@/components/UI/TrashIcon';
import nodeCrypto from 'crypto';
import MainNav from '@/components/MainNav';
import ImageGallery from '@/components/ImageGallery';

const StoragePage = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(true);
  const [selecting, setSelecting] = useState<boolean>(false);
  const [images, setImages] = useState<
    { src: string; id: string; date: string }[]
  >([{ src: '', id: '', date: '' }]);

  const getImages = () => {
    const nextImages = [];

    for (let i = 0; i < 15; i++) {
      const nextImage = {
        src: 'https://picsum.photos/384',
        id:
          typeof window !== 'undefined'
            ? window.crypto.randomUUID()
            : nodeCrypto.randomUUID(),
        date: 'February 23, 2023',
      };

      nextImages.push(nextImage);
    }

    setImages(nextImages);
  };

  const selectingHandler = () => {
    setSelecting((selecting) => !selecting);
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
      <Container className='xs:flex-col xs:justify-center xs:items-center xs:w-full'>
        <Container className='xs:flex-col xs:justify-center xs:items-center xs:xs:w-full xs:my-4 xs:mx-8'>
          <MainNav />
          <main className='xs:w-full'>
            {/* <h2 className='xs:text-3xl xs:mt-9'>Storage</h2> */}
            {authenticated ? (
              <>
                <Container className='xs:flex-col xs:w-full xs:mt-12'>
                  <Container className='xs:flex-row xs:justify-between xs:items-end'>
                    <h2 className='xs:text-left xs:text-4xl'>Storage</h2>
                    <button
                      onClick={selectingHandler}
                      className='xs:bg-base xs:text-white xs:px-6 xs:py-2 xs:focus:outline-none xs:focus:ring xs:rounded-md xs:hover:bg-base-darkMd'
                    >
                      {selecting ? 'Cancel' : 'Select'}
                    </button>
                  </Container>
                  <ImageGallery links={images} />
                </Container>
                {selecting && (
                  <div className='xs:fixed xs:m-6 xs:bottom-4 xs:right-4'>
                    <button>
                      <DownloadIcon className='xs:w-10 xs:h-10' />
                    </button>
                    <button>
                      <TrashIcon className='xs:w-10 xs:h-10 xs:ml-10' />
                    </button>
                  </div>
                )}
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
