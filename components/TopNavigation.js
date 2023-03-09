const TopNavigation = (props) => {
    return (
        <>
            <div className='xs:flex xs:flex-row'>
                <a href='#' aria-label='cloud view homepage'>Cloud View</a>
                <nav aria-label='main navigation'>
                    <ul>
                        <li>About</li>
                        <li>Privacy</li>
                        <li>Storage</li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default TopNavigation;