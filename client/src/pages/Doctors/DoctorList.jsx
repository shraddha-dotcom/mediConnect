import { BASE_URL } from "../../config";
import DoctorCard from './DoctorCard';
import useFetchData from "../../hooks/useFetchData";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { useEffect } from "react";

const DoctorList = () => {

    const { loading, data: doctors, error } = useFetchData(`${BASE_URL}/doctors`)
    useEffect(() => {
        console.log("Doctor fetched", doctors)
    })
    return (
        <>
            {loading && <Loading />}
            {error && <Error />}
            {!loading && !error &&

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap:[30px] mt-[30px]
         lg:mt-[55px]'
                >
                    {doctors.map((doctor) => (
                        <DoctorCard key={doctor._id} doctor={doctor} />

                    ))}

                </div>}
        </>
    )
}

export default DoctorList
