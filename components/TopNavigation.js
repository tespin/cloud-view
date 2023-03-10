import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Container from './UI/Container';
import { HamburgerMenuIcon, CaretUpIcon, CaretDownIcon } from '@radix-ui/react-icons';

const TopNavigation = (props) => {
    return (
        <>
            <Container className='xs:flex-row xs:justify-between xs:w-full xs:z-50'>
                <a href='#' aria-label='cloud view homepage'>Cloud View</a>
                <nav>
                    <ul>
                        <li className='xs:flex xs:flex-row xs:items-center'>About <CaretDownIcon aria-hidden/></li>
                        <li className='xs:flex xs:flex-row xs:items-center'>Privacy <CaretDownIcon aria-hidden/></li>
                        <li className='xs:flex xs:flex-row'>Storage</li>
                    </ul>
                </nav>
                {/* <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button aria-label='site navigation'>
                            <HamburgerMenuIcon />
                        </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content className=''>
                            <NavigationMenu.Root>
                                <NavigationMenu.List>
                                    <NavigationMenu.Item>
                                        <NavigationMenu.Trigger className='xs:flex xs:flex-row xs:items-center xs:text-right'>
                                            About <CaretDownIcon aria-hidden/>
                                        </NavigationMenu.Trigger>
                                    </NavigationMenu.Item>
                                    <NavigationMenu.Item>
                                        <NavigationMenu.Trigger className='xs:flex xs:flex-row xs:items-center'>
                                            Learn <CaretDownIcon aria-hidden/>
                                        </NavigationMenu.Trigger>
                                    </NavigationMenu.Item>
                                    <NavigationMenu.Item>
                                        <NavigationMenu.Trigger className='xs:flex xs:flex-row'>
                                            Storage
                                        </NavigationMenu.Trigger>
                                    </NavigationMenu.Item>
                                </NavigationMenu.List>
                                <NavigationMenu.Viewport className='xs:bg-red xs:w-screen' />
                            </NavigationMenu.Root>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root> */}
            </Container>
        </>
    );
};

export default TopNavigation;