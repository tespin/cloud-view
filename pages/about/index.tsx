import React from 'react';
import Container from '@/components/UI/Container';
import MainNav from '@/components/MainNav';

const AboutPage = () => {
  return (
    <>
      <Container className='xs:flex-col xs:justify-center xs:items-center xs:w-full'>
        <Container className='xs:flex-col xs:justify-center xs:items-center xs:w-full xs:max-w-sm xs:my-4 xs:mx-8'>
          <MainNav />
          <main>
            <h2 className='xs:text-3xl xs:mt-9'>About</h2>
            <div className='xs:flex xs:flex-col xs:space-y-4 xs:mt-4 xs:text-base-md'>
              <p>
                Cloud View is a project that plays on the idea of “cloud
                storage”.
              </p>
              <p>
                It allows visitors to obtain an image of the sky above them that
                they can save to their profile. All saved images can be
                downloaded at any time.
              </p>
              <p>
                The project was made in 2022 and rebuilt in 2023. It was made by
                Tristan Espinoza.
              </p>
            </div>
          </main>
        </Container>
      </Container>
    </>
  );
};

export default AboutPage;
