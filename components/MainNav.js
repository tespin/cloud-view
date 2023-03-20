import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Form from '@radix-ui/react-form';
import Container from './UI/Container';
import Dialog from './UI/Dialog';
import Navigation from './UI/Navigation';
import { HamburgerMenuIcon, CaretUpIcon, CaretDownIcon, Cross2Icon } from '@radix-ui/react-icons';

const MainNav = (props) => {
    return (
        <>
            <Container className='xs:flex-row xs:justify-between xs:w-full'>
                <p>Cloud View</p>
                <Dialog>
                    <Navigation />
                </Dialog>
            </Container>
        </>
    );
};

export default MainNav;