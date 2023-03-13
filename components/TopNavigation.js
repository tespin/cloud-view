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
                        <Dialog.Overlay className='xs:fixed xs:inset-0 backdrop-blur-sm xs:bg-black/20'/>
                        <Dialog.Content className='xs:fixed xs:bg-white top-4 right-4 p-4 w-full max-w-xs'>
                            <NavigationMenu.Root>
                                <NavigationMenu.List className='flex flex-col'>
                                    <NavigationMenu.Item>
                                        <NavigationMenu.Trigger className='flex flex-row items-center'>
                                            About <CaretDownIcon aria-hidden />
                                        </NavigationMenu.Trigger>
                                    </NavigationMenu.Item>

                                    <NavigationMenu.Item>
                                        <NavigationMenu.Trigger className='flex flex-row items-center'>
                                            Privacy <CaretDownIcon aria-hidden />
                                        </NavigationMenu.Trigger>
                                    </NavigationMenu.Item>

                                    <NavigationMenu.Item className='flex flex-row items-center'>
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