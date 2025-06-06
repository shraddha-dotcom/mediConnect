
import { HashLoader } from 'react-spinners'

const Loading = () => {
    return (
        <div data-testid="loading-spinner"
            className='flex items-center justify-center w-full h-full'>
            <HashLoader color='#0067FF' />
        </div>
    )
}

export default Loading
