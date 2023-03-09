import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretUpIcon, CaretDownIcon } from '@radix-ui/react-icons';

const TopNavigation = (props) => {
    return (
        <>
            <div className='xs:flex xs:flex-row'>
                <a href='#' aria-label='cloud view homepage'>Cloud View</a>
                <NavigationMenu.Root>
                    <NavigationMenu.List>
                        <NavigationMenu.Item>
                            <NavigationMenu.Trigger>
                                About <CaretDownIcon aria-hidden/>
                            </NavigationMenu.Trigger>
                        </NavigationMenu.Item>
                        <NavigationMenu.Item>
                            <NavigationMenu.Trigger>
                                Learn <CaretDownIcon aria-hidden/>
                            </NavigationMenu.Trigger>
                        </NavigationMenu.Item>
                        <NavigationMenu.Item>
                            <NavigationMenu.Trigger>
                                Storage
                            </NavigationMenu.Trigger>
                        </NavigationMenu.Item>
                    </NavigationMenu.List>
                </NavigationMenu.Root>
                {/* <nav aria-label='main navigation'>
                    <ul>
                        <li>About</li>
                        <li>Privacy</li>
                        <li>Storage</li>
                    </ul>
                </nav> */}
            </div>
        </>
    );
};

export default TopNavigation;