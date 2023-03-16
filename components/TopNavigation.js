import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import * as Form from '@radix-ui/react-form';
import Container from './UI/Container';
import { HamburgerMenuIcon, CaretUpIcon, CaretDownIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useState } from 'react';

const TopNavigation = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Container className='xs:flex-row xs:justify-between xs:w-full'>
                <p>Cloud View</p>
                <Dialog.Root open={open} onOpenChange={setOpen}>
                    <Dialog.Trigger asChild>
                        <button className='xs:hover:text-base-semiMd'>
                            <HamburgerMenuIcon aria-hidden/>
                        </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className={`xs:fixed xs:inset-0 backdrop-blur-sm xs:bg-base/20 ${open ? 'animate-overlayShow' : 'animate-overlayHide'}`}/>
                        <Dialog.Content className={`xs:fixed xs:bg-white xs:rounded-lg top-4 right-4 p-4 w-full max-w-xs ${open ? 'animate-contentShow' : 'animate-contentHide'}`}>
                            <NavigationMenu.Root className='xs:flex xs:flex-col'>
                                <NavigationMenu.List className='xs:flex xs:flex-col xs:space-y-4'>
                                    <NavigationMenu.Item>
                                        <NavigationMenu.Trigger className='group' asChild>
                                            <button className='xs:flex xs:flex-row xs:items-center max-w-sm'>
                                                About <CaretDownIcon className='ml-1 group-data-[state=open]:-rotate-180 transition ease-in-out duration-200' aria-hidden />
                                            </button>
                                        </NavigationMenu.Trigger>
                                        <NavigationMenu.Content className='xs:mt-2 xs:text-base-md xs:flex xs:flex-col xs:space-y-4'>
                                            <p>Cloud View is a project that plays on the idea of “cloud storage”. It allows visitors to obtain an image of the sky above them that they can save to their profile.</p> 
                                            <p>All saved images can be downloaded at any time. The project was made in 2022 and rebuilt in 2023.</p> 
                                            <p>It was made by Tristan Espinoza.</p>
                                        </NavigationMenu.Content>
                                    </NavigationMenu.Item>

                                    <NavigationMenu.Item>
                                        <NavigationMenu.Trigger className='group' asChild>
                                            <button className='xs:flex xs:flex-row xs:items-center'>
                                                Privacy <CaretDownIcon className='ml-1 group-data-[state=open]:-rotate-180 transition ease-in-out duration-200' aria-hidden />
                                            </button>
                                        </NavigationMenu.Trigger>
                                        <NavigationMenu.Content className='xs:mt-2 xs:text-base-md data-[state=open]:max-h-64 data-[state=closed]:max-h-0 transition ease-in-out duration-300'>
                                            <p>Location data is used when initially requesting images but is not kept or stored afterwards. This project will not add you to any list or sell / share your information.</p>
                                        </NavigationMenu.Content>
                                    </NavigationMenu.Item>
                                    <NavigationMenu.Item className='xs:flex xs:flex-row xs:items-center'>
                                            Storage
                                    </NavigationMenu.Item>

                                </NavigationMenu.List>
                                <div className='xs:border-t mt-6'></div>
                                <div className='xs:flex xs:flex-col xs:space-y-4 xs:mt-6'>
                                    <button className='xs:border-2 xs:border-transparent xs:bg-base xs:hover:bg-base-darkMd xs:text-white xs:py-3 xs:rounded-md'>Sign up for free</button>
                                    <button className='xs:border-2 xs:border-base xs:py-3 xs:rounded-md xs:hover:bg-base-spLight'>Log in</button>
                                </div>

                            </NavigationMenu.Root>
                            <Dialog.Close asChild>
                                <button onClick={(event) => {
                                    setOpen(false);
                                    event.preventDefault();
                                }} className='flex justify-center items-center xs:hover:text-base-semiMd absolute w-6 h-6 top-4 right-4'>
                                    <Cross2Icon />
                                </button>
                            </Dialog.Close>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </Container>
        </>
    );
};

export default TopNavigation;