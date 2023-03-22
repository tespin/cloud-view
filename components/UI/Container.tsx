import React from 'react';

interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
}

const Container = ({ className, children }: ContainerProps) => {
  return (
    <>
      <div className={`xs:flex ${className}`}>{children}</div>
    </>
  );
};

export default Container;
