import { useState } from 'react';
import { HamburgerMenuIcon, Cross2Icon, CaretUpIcon, CaretDownIcon } from '@radix-ui/react-icons';

const Menu = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            { open 
            ? <>
                <button onClick={() => setOpen((prev) => !prev)}>
                <Cross2Icon aria-hidden/>
                </button>
                <ul className='fixed bg-white xs:w-screen xs:h-screen xs:left-0'>
                    <li className='xs:flex xs:flex-row xs:items-center focus:outline-none focus:ring focus:ring-blue-200'>About <CaretDownIcon aria-hidden/></li>
                    <li className='xs:flex xs:flex-row xs:items-center focus:outline-none focus:ring focus:ring-blue-200'>Privacy <CaretDownIcon aria-hidden/></li>
                    <li className='xs:flex xs:flex-row focus:outline-none focus:ring focus:ring-blue-200'>Storage</li>
                </ul>
            </>
            : <button onClick={() => setOpen((prev) => !prev)}>
            <HamburgerMenuIcon aria-hidden/>
            </button>}
        </>
    );
}

export default Menu;