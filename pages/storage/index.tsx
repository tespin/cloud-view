import React from 'react';
import { useState } from 'react';
import Container from '@/components/UI/Container';
import MainNav from '@/components/MainNav';

const StoragePage = () => {
    const [authenticated, setAuthenticated] = useState(false);

    return (
        <>
            <Container className='xs:flex-col xs:justify-center xs:items-center xs:w-full'>
                <Container className='xs:flex-col xs:justify-center xs:items-center xs:max-w-sm xs:my-4 xs:mx-8'>
                    <MainNav/>
                    <main>
                        <h2 className='xs:text-3xl xs:mt-9'>Storage</h2>
                        { authenticated 
                            ? <>
                                <p>Logged in</p>
                            </>
                            : <> <div className='xs:flex xs:flex-col xs:space-y-4 xs:mt-4 xs:text-base-md'>
                                    <p>Log in to view your cloud storage. You can edit or download from your storage once you’ve logged in.</p>
                                </div>
                                <button className='xs:w-full xs:mt-9 xs:border-2 xs:border-transparent xs:bg-base xs:hover:bg-base-darkMd xs:text-white xs:py-3 xs:rounded-md'>Log in</button>
                            </> 
                        }
                        
                    </main>
                </Container>
            </Container>
        </>
    )
}

export default StoragePage;