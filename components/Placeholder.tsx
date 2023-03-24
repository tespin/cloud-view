import React from 'react';
import Container from './UI/Container';

interface PlaceholderProps {
  className: string;
}

const Placeholder = ({ className }: PlaceholderProps) => {
  return (
    <>
      <Container
        className={`xs:justify-center xs:items-center xs:w-96 xs:h-96 xs:rounded-md xs:border-dashed xs:border-black xs:border-[1px] ${className}`}
      >
        <button className='xs:bg-base xs:hover:bg-base-darkMd xs:focus:outline-none xs:focus:ring xs:text-white xs:py-3 xs:px-6 xs:rounded-md'>
          Request a cloud
        </button>
      </Container>
    </>
  );
};

export default Placeholder;
