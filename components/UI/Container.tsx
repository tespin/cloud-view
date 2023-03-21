import React from 'react';

const Container = (props) => {
    return (
        <>
            <div className={`xs:flex ${props.className}`}>
                {props.children}
            </div>
        </>
    )
};

export default Container;