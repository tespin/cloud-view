import React from 'react';
import Container from './Container';

const Placeholder = (props) => {
    return (
        <>
            <Container className={`xs:justify-center xs:items-center xs:w-96 xs:h-96 xs:rounded-md xs:border-dashed xs:border-black xs:border-[1px] ${props.className}`}>
                <button className='xs:bg-base xs:hover:bg-base-darkMd xs:text-white xs:py-3 xs:px-6 xs:rounded-md'>
                    Request a cloud
                </button>
            </Container>
        </>
    );
}

export default Placeholder;