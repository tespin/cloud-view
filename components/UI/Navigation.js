import React from 'react';
import * as NavPrimitive from '@radix-ui/react-navigation-menu';
import Container from './Container';
import { HamburgerMenuIcon, CaretUpIcon, CaretDownIcon, Cross2Icon } from '@radix-ui/react-icons';

const Navigation = () => {
    return (
        <>
            <NavPrimitive.Root className='xs:flex xs:flex-col'>
                <NavPrimitive.List className='xs:flex xs:flex-col xs:space-y-4'>
                    <NavPrimitive.Item>
                        <NavPrimitive.Trigger className='group' asChild>
                            <button className='xs:flex xs:flex-row xs:items-center max-w-sm'>
                                About <CaretDownIcon className='ml-1 group-data-[state=open]:-rotate-180 transition ease-in-out duration-200' aria-hidden />
                            </button>
                        </NavPrimitive.Trigger>
                        <NavPrimitive.Content className='xs:mt-2 xs:text-base-md xs:flex xs:flex-col xs:space-y-4'>
                            <p>Cloud View is a project that plays on the idea of “cloud storage”. It allows visitors to obtain an image of the sky above them that they can save to their profile.</p> 
                            <p>All saved images can be downloaded at any time. The project was made in 2022 and rebuilt in 2023.</p> 
                            <p>It was made by Tristan Espinoza.</p>
                        </NavPrimitive.Content>
                    </NavPrimitive.Item>

                    <NavPrimitive.Item>
                        <NavPrimitive.Trigger className='group' asChild>
                            <button className='xs:flex xs:flex-row xs:items-center'>
                                Privacy <CaretDownIcon className='ml-1 group-data-[state=open]:-rotate-180 transition ease-in-out duration-200' aria-hidden />
                            </button>
                        </NavPrimitive.Trigger>
                        <NavPrimitive.Content className='xs:mt-2 xs:text-base-md data-[state=open]:max-h-64 data-[state=closed]:max-h-0 transition ease-in-out duration-300'>
                            <p>Location data is used when initially requesting images but is not kept or stored afterwards. This project will not add you to any list or sell / share your information.</p>
                        </NavPrimitive.Content>
                    </NavPrimitive.Item>
                    <NavPrimitive.Item className='xs:flex xs:flex-row xs:items-center'>
                            Storage
                    </NavPrimitive.Item>

                </NavPrimitive.List>
                <div className='xs:border-t mt-6'></div>
                <div className='xs:flex xs:flex-col xs:space-y-4 xs:mt-6'>
                    <button className='xs:border-2 xs:border-transparent xs:bg-base xs:hover:bg-base-darkMd xs:text-white xs:py-3 xs:rounded-md'>Sign up for free</button>
                    <button className='xs:border-2 xs:border-base xs:py-3 xs:rounded-md xs:hover:bg-base-spLight'>Log in</button>
                </div>
            </NavPrimitive.Root></>
    );
}

export default Navigation;