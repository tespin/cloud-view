import { useState, useRef } from 'react';
import { HamburgerMenuIcon, Cross2Icon, CaretUpIcon, CaretDownIcon } from '@radix-ui/react-icons';

const Menu = (props) => {
    const [mainMenuOpen, setMainMenuOpen] = useState(false);

    const mainMenuHandler = () => {
        setMainMenuOpen(prevState => 
            !prevState
        );
    }

    return (
        <>
            <button onClick={mainMenuHandler} style={{zIndex: 1}}>
                { mainMenuOpen ? <Cross2Icon aria-hidden /> : <HamburgerMenuIcon aria-hidden/> }
            </button>
            <ul className={`fixed bg-white xs:w-screen xs:h-screen xs:left-0 transition  ${mainMenuOpen ? 'translate-y-4 ' : '-translate-y-4'} duration-300 ease-in-out`}>
                <li className='xs:flex xs:flex-row xs:items-center focus:outline-none focus:ring focus:ring-blue-200'>About <button><CaretDownIcon aria-hidden/></button></li>
                <li className='xs:flex xs:flex-row xs:items-center focus:outline-none focus:ring focus:ring-blue-200 '>Privacy <button><CaretDownIcon aria-hidden/></button></li>
                <li className='xs:flex xs:flex-row focus:outline-none focus:ring focus:ring-blue-200'>Storage</li>
            </ul>
        </>
    )
}

// {
//     <ul className={`fixed bg-white xs:w-screen xs:h-screen xs:left-0 transition  ${mainMenuOpen ? 'translate-x-50 ' : '-translate-x-50'} duration-300 ease-in-out`}>
//                     <li className='xs:flex xs:flex-row xs:items-center focus:outline-none focus:ring focus:ring-blue-200'>About <button><CaretDownIcon aria-hidden/></button></li>
//                     <li className='xs:flex xs:flex-row xs:items-center focus:outline-none focus:ring focus:ring-blue-200'>Privacy <button><CaretDownIcon aria-hidden/></button></li>
//                     <li className='xs:flex xs:flex-row focus:outline-none focus:ring focus:ring-blue-200'>Storage</li>
//                 </ul>
// }

// return (
//     <>
//     <button onClick={mainMenuHandler}>
//         { mainMenuOpen ? <Cross2Icon aria-hidden /> : <HamburgerMenuIcon aria-hidden/> }
//     </button>
//     <ul className={`fixed bg-white xs:w-screen xs:h-screen xs:left-0 transition  ${mainMenuOpen ? 'translate-x-50 ' : '-translate-x-50'} duration-300 ease-in-out`}>
//                     <li className='xs:flex xs:flex-row xs:items-center focus:outline-none focus:ring focus:ring-blue-200'>About <button><CaretDownIcon aria-hidden/></button></li>
//                     <li className='xs:flex xs:flex-row xs:items-center focus:outline-none focus:ring focus:ring-blue-200'>Privacy <button><CaretDownIcon aria-hidden/></button></li>
//                     <li className='xs:flex xs:flex-row focus:outline-none focus:ring focus:ring-blue-200'>Storage</li>
//                 </ul>
//     </>
// )

export default Menu;