import React from 'react';
import Container from '@/components/UI/Container';
import MainNav from '@/components/MainNav';

const PrivacyPage = () => {
    return (
        <>
            <Container className='xs:flex-col xs:justify-center xs:items-center xs:w-full'>
                <Container className='xs:flex-col xs:justify-center xs:items-center xs:max-w-sm xs:my-4 xs:mx-8'>
                    <MainNav/>
                    <main>
                        <h2 className='xs:text-3xl xs:mt-9'>Privacy</h2>
                        <div className='xs:flex xs:flex-col xs:space-y-4 xs:mt-4 xs:text-base-md'>
                            <p>Location data is used when initially requesting images but is not kept or stored afterwards.</p>
                            <p>This project will not add you to any list or sell / share your information.</p>
                        </div>
                    </main>
                </Container>
            </Container>
        </>
    )
}

export default PrivacyPage;