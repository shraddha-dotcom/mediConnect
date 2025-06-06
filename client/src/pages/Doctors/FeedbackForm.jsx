import { useContext, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';
import { AuthContext } from '../../context/AuthContext';

const FeedbackForm = () => {
    const { token } = useContext(AuthContext)

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [loading, setLoading] = useState(false);

    const { id } = useParams()

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true)

        try {
            if (!rating || !reviewText) {
                setLoading(false)
                return toast.error('Rating & Review field are required')

            }

            const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
                method: "Post",
                headers: {
                    'Content-type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ rating, reviewText })
            })

            const result = await res.json()
            if (!res.ok) {
                throw new Error(result.message)
            }
            setLoading(false)
            toast.success(result.message)
        } catch (err) {
            setLoading(false)
            toast.error(err.message)

        }
    }
    return (
        <form>
            <div className=''>
                <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4'>
                    How would you rate the overall experience?*
                </h3>

                <div>
                    {[...Array(5).keys()].map((_, index) => {
                        index += 1;

                        return (
                            <button
                                key={index}
                                type="button"
                                className={`${index <= ((rating && hover) || hover)
                                    ? "text-yellow-500"
                                    : "text-gray-400"
                                    } bg-transparent border-none text-[22px] cursor-pointer`}
                                onClick={() => setRating(index)}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(rating)}
                                onDoubleClick={() => {
                                    setHover(0);
                                    setRating(0);
                                }}
                            >
                                <span>
                                    <FaStar />
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className='mt-[30px]'>
                <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4'>
                    Share your feedback or suggestions
                </h3>
                <textarea
                    name="reviewText"
                    className='border border-solid border-[#0066ff34]
                        focus:outline outline-primaryColor w-full px-4 py-3 rounded-md'
                    cols="30" rows="10"
                    placeholder='Write your message'
                    onChange={e => setReviewText(e.target.value)}>

                </textarea>
            </div>
            <button type="submit"
                className="btn"
                onClick={handleSubmit}
            >{loading ? <HashLoader size={25} color='#ffffff' /> : "Submit Feedback"}
            </button>

        </form >
    )
}

export default FeedbackForm
