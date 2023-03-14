import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import Container from './UI/Container';
import Menu from './Menu';
import { HamburgerMenuIcon, CaretUpIcon, CaretDownIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useState } from 'react';

const TopNavigation = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Container className='xs:flex-row xs:justify-between xs:w-full'>
                <p>Cloud View</p>
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <button><HamburgerMenuIcon aria-hidden/></button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className='xs:fixed xs:inset-0 backdrop-blur-sm xs:bg-black/20 animate-overlayShow'/>
                        <Dialog.Content className='xs:fixed xs:bg-white xs:rounded-lg top-4 right-4 p-4 w-full max-w-xs animate-contentShow'>
                            <NavigationMenu.Root>
                                <NavigationMenu.List className='xs:flex xs:flex-col xs:space-y-4'>
                                    <NavigationMenu.Item>
                                        {/* <NavigationMenu.Trigger className='xs:flex xs:flex-row xs:items-center data-[state=open]:rotate-180 transition ease-in-out duration-200'>
                                            About <CaretDownIcon className='ml-1' aria-hidden />
                                        </NavigationMenu.Trigger> */}
                                        <NavigationMenu.Trigger className='group xs:flex xs:flex-row xs:items-center'>
                                            About <CaretDownIcon className='ml-1 group-data-[state=open]:-rotate-180 transition ease-in-out duration-200' aria-hidden />
                                        </NavigationMenu.Trigger>
                                        <NavigationMenu.Content>
                                        Cloud View is a project that plays on the idea of “cloud storage”. It allows visitors to obtain an image of the sky above them that they can save to their profile. All saved images can be downloaded at any time. The project was made in 2022 and rebuilt in 2023. It was made by Tristan Espinoza.
                                        </NavigationMenu.Content>
                                    </NavigationMenu.Item>

                                    <NavigationMenu.Item>
                                        <NavigationMenu.Trigger className='group xs:flex xs:flex-row xs:items-center'>
                                            Privacy <CaretDownIcon className='ml-1 group-data-[state=open]:-rotate-180 transition ease-in-out duration-200' aria-hidden />
                                        </NavigationMenu.Trigger>
                                        <NavigationMenu.Content className=''>
                                        Location data is used when initially requesting images but is not kept or stored afterwards. This project will not add you to any list or sell / share your information.
                                        </NavigationMenu.Content>
                                    </NavigationMenu.Item>

                                    <NavigationMenu.Item className='xs:flex xs:flex-row xs:items-center'>
                                            Storage
                                    </NavigationMenu.Item>

                                </NavigationMenu.List>
                            </NavigationMenu.Root>
                            <Dialog.Close asChild>
                                <button className='flex justify-center items-center absolute w-6 h-6 top-4 right-4'>
                                    <Cross2Icon />
                                </button>
                            </Dialog.Close>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
                {/* <NavigationMenu.Root>
                    <NavigationMenu.List>
                        <NavigationMenu.Item>
                            <NavigationMenu.Trigger>
                                About <CaretDownIcon aria-hidden />
                            </NavigationMenu.Trigger>
                        </NavigationMenu.Item>

                        <NavigationMenu.Item>
                            <NavigationMenu.Trigger>
                                Privacy <CaretDownIcon aria-hidden />
                            </NavigationMenu.Trigger>
                        </NavigationMenu.Item>

                        <NavigationMenu.Item>
                                Storage
                        </NavigationMenu.Item>

                    </NavigationMenu.List>
                </NavigationMenu.Root> */}
                {/* <nav>
                    <Menu />
                </nav> */}
            </Container>
        </>
    );
};

export default TopNavigation;