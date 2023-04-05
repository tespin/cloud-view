import React, { useState } from 'react';
import Container from './UI/Container';

interface PlaceholderProps {
  className: string;
  children?: React.ReactNode;
}

const Placeholder = ({ className, children }: PlaceholderProps) => {
  return (
    <>
      <Container
        className={`xs:justify-center xs:items-center xs:w-96 xs:h-96 xs:rounded-md xs:border-dashed xs:border-black xs:border-[1px] ${className}`}
      >
        {children}
      </Container>
    </>
  );
};

export default Placeholder;
