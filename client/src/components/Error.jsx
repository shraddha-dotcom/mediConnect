const Error = ({ errorMessage }) => {
    return (
        <div data-testid="error-message"
            className='flex items-center justify-center w-full h-full'>
            <h3 className='text-headingColor text-[20px] leading-[30px] font-semibold'>
                {errorMessage}</h3>
        </div>
    )
}

export default Error
