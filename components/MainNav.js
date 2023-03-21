import React from 'react';
import nodeCrypto from 'crypto';
import Container from './UI/Container';
import Dialog from './UI/Dialog';
import Navigation from './UI/Navigation';
import { useState, useEffect } from 'react';

const MainNav = (props) => {
    const [items, setItems] = useState([]);

    const generateItems = () => {
        const labels = ['About', 'Privacy', 'Storage'];

        const generated = labels.map((item) => ({
            id: typeof window !== 'undefined'
                ? window.crypto.randomUUID()
                : nodeCrypto.randomUUID(),
            label: item
        }));
        setItems(generated);
    }

    useEffect(() => {
        generateItems();
    }, []);

    return (
        <>
            <Container className='xs:flex-row xs:justify-between xs:w-full'>
                <p>Cloud View</p>
                <Dialog>
                    <Navigation items={items} />
                </Dialog>
            </Container>
        </>
    );
};

export default MainNav;