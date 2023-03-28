import React, { forwardRef } from 'react';
import Link from 'next/link';
import * as NavPrimitive from '@radix-ui/react-navigation-menu';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

interface NavProps {
  items: {
    id: string;
    label: string;
  }[];
}

const Navigation = forwardRef<HTMLAnchorElement, NavProps>(({ items }, ref) => {
  return (
    <>
      <NavPrimitive.Root className='xs:flex xs:flex-col'>
        <NavPrimitive.List className='xs:flex xs:flex-col xs:space-y-4'>
          {items.map((item, index) => {
            return (
              <NavPrimitive.Item key={item.id}>
                <Link
                  href={`${item.label.toLowerCase()}`}
                  passHref
                  legacyBehavior
                >
                  <NavPrimitive.Link
                    ref={index === 0 ? ref : null}
                    className='xs:hover:text-base-semiMd xs:focus:outline-none xs:focus:ring'
                  >
                    {item.label}
                  </NavPrimitive.Link>
                </Link>
              </NavPrimitive.Item>
            );
          })}
          <SeparatorPrimitive.Root className='xs:w-full xs:h-[1px] xs:bg-base-light mt-4' />
          <div className='xs:flex xs:flex-col xs:space-y-4 xs:mt-6'>
            <NavPrimitive.Item>
              <Link href='/signup' passHref legacyBehavior>
                <NavPrimitive.Link className='xs:focus:outline-none'>
                  <div className='xs:flex xs:justify-center xs:cursor-pointer xs:focus-within:outline-none xs:focus-within:ring xs:border-2 xs:border-transparent xs:bg-base xs:hover:bg-base-darkMd xs:text-white xs:py-3 xs:rounded-md'>
                    <span>Sign up for free</span>
                  </div>
                </NavPrimitive.Link>
              </Link>
            </NavPrimitive.Item>
            <NavPrimitive.Item>
              <Link href='/login' passHref legacyBehavior>
                <NavPrimitive.Link className='xs:focus:outline-none'>
                  <div className='xs:flex xs:justify-center xs:cursor-pointer xs:focus-within:outline-none xs:focus-within:ring xs:border-2 xs:border-base xs:py-3 xs:rounded-md xs:hover:bg-base-spLight'>
                    <span>Log in</span>
                  </div>
                </NavPrimitive.Link>
              </Link>
            </NavPrimitive.Item>
          </div>
        </NavPrimitive.List>
      </NavPrimitive.Root>
    </>
  );
});
Navigation.displayName = 'Navigation';

export default Navigation;
