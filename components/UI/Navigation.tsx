import React, { useRef } from 'react';
import Link from 'next/link';
import * as NavPrimitive from '@radix-ui/react-navigation-menu';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

interface NavProps {
  items: {
    id: string;
    label: string;
  }[];
}

const Navigation = ({ items }: NavProps) => {
  const navItemRef = useRef<HTMLAnchorElement>(null);

  return (
    <>
      <NavPrimitive.Root className="xs:flex xs:flex-col">
        <NavPrimitive.List className="xs:flex xs:flex-col xs:space-y-4">
          {items.map((item) => {
            return (
              <NavPrimitive.Item key={item.id}>
                <Link
                  href={`${item.label.toLowerCase()}`}
                  ref={navItemRef}
                  passHref
                  legacyBehavior
                >
                  <NavPrimitive.Link className="xs:hover:text-base-semiMd">
                    {item.label}
                  </NavPrimitive.Link>
                </Link>
              </NavPrimitive.Item>
            );
          })}
        </NavPrimitive.List>
        <SeparatorPrimitive.Root className="xs:w-full xs:h-[1px] xs:bg-base-light mt-4" />
        <div className="xs:flex xs:flex-col xs:space-y-4 xs:mt-6">
          <button className="xs:border-2 xs:border-transparent xs:bg-base xs:hover:bg-base-darkMd xs:text-white xs:py-3 xs:rounded-md">
            Sign up for free
          </button>
          <button className="xs:border-2 xs:border-base xs:py-3 xs:rounded-md xs:hover:bg-base-spLight">
            Log in
          </button>
        </div>
      </NavPrimitive.Root>
    </>
  );
};

export default Navigation;
