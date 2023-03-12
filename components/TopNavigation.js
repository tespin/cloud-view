import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Container from './UI/Container';
import Menu from './Menu';
import { HamburgerMenuIcon, CaretUpIcon, CaretDownIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

const TopNavigation = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Container className='xs:flex-row xs:justify-between xs:w-full xs:z-50'>
                <p>Cloud View</p>
                <nav>
                    <Menu />
                </nav>
            </Container>
        </>
    );
};

export default TopNavigation;