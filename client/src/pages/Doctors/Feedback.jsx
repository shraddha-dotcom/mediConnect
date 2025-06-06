import { useState } from 'react'
import { FaStar } from "react-icons/fa"
import FeedbackForm from "./FeedbackForm";
import formateDate from './formateDate';

const Feedback = ({ reviews, totalRating }) => {

    const [showFeedbackForm, SetShowFeedbackForm] = useState(false);

    return (
        <div>
            <div className='mb-[50px]'>
                <h4 className='text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]'>
                    All Reviews ({totalRating})
                </h4>
                {reviews?.map((review, index) => (
                    <div key={index} className='flex justify-between gap-10 mb-[30px]'>
                        <div className='flex gap-3'>
                            <img src={review?.user?.photo} alt="image" className="w-10 h-10 rounded-full" />
                            <div >
                                <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                                    {review?.user?.name}
                                </h5>
                                <p className="text-[14px] leading-6 text-textCOlor">{formateDate(review?.createdAt)}</p>
                                <p className="text_para mt-3 font-medium text-[15px]">{review.reviewText} </p>
                            </div>
                        </div>

                        <div className="flex gap-1">
                            {[...Array(review?.rating).keys()].map((_, index) => (
                                <FaStar key={index} className="text-yellow-500" />
                            ))}
                        </div>
                    </div>
                ))
                }
            </div>
            {!showFeedbackForm && (<div className="text-center">
                <button className="btn" onClick={() => SetShowFeedbackForm(true)}>Give Feedback</button>
            </div>
            )}

            {showFeedbackForm && <FeedbackForm />}


        </div>
    )
}

export default Feedback
