const Container = (props) => {
    return (
        <>
            <div className="xs:flex xs:flex-col xs:justify-center xs:items-center xs:w-full">
                {props.children}
            </div>
        </>
    )
};

export default Container;