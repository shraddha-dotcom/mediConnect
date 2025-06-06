import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { BiArrowToRight } from 'react-icons/bi';


const DoctorCard = ({ doctor }) => {
    const {
        _id,
        name,
        averageRating,
        totalRating,
        photo,
        specialization,
        experiences = [],
    } = doctor;

    return (
        <div className='p-4 lg:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 max-w-sm mx-auto'>
            <div className='w-full h-48 overflow-hidden rounded-lg'>
                <img
                    src={photo || '/default-doctor.png'} // fallback image if photo missing
                    alt={name || "Doctor Image"}
                    className='w-full h-full object-cover object-center'
                />
            </div>

            <h2 className='mt-4 text-lg lg:text-2xl font-bold text-headingColor truncate'>
                {name || "Unnamed Doctor"}
            </h2>

            <div className='mt-2 flex items-center justify-between'>
                <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-3 rounded text-sm lg:text-base font-semibold whitespace-nowrap'>
                    {specialization || "Not Specified"}
                </span>

                <div className='flex items-center gap-1 text-sm lg:text-base font-semibold text-headingColor'>
                    <FaStar className='text-yellow-500' />
                    <span>{averageRating?.toFixed(1) || 0}</span>
                    <span className='text-textColor font-normal'>({totalRating || 0})</span>
                </div>
            </div>

            <div className='mt-4 flex items-center justify-between text-sm text-textColor'>
                <p className='truncate max-w-[70%]'>
                    {experiences.length > 0 ? `At ${experiences[0].hospital}` : "No experience info"}
                </p>

                <Link
                    to={`/doctors/${_id}`}
                    className='w-10 h-10 flex items-center justify-center rounded-full border border-gray-800 hover:bg-primaryColor hover:border-transparent transition-colors'
                >
                    <BiArrowToRight className='text-lg text-gray-800 hover:text-white' />
                </Link>
            </div>
        </div>
    );
};


export default DoctorCard
