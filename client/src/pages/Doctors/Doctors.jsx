
import DoctorCard from "./DoctorCard"
import useFetchData from "../../hooks/useFetchData";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { BASE_URL } from "../../config";
import { useEffect, useState } from "react";

const Doctors = () => {
    const [query, setQuery] = useState('')
    const [debounce, setDebounce] = useState("")

    const handleSearch = () => {
        setQuery(query.trim())

        console.log('handle search')
    }

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setDebounce(query)
        }, 700)

        return () => clearTimeout(timeOut)
    }, [query])

    const { loading, data: doctors, error } = useFetchData(`${BASE_URL}/doctors?query=${debounce}`)



    return (
        <>
            <section className='bg-[#fff9ea]'>
                <div className="container text-center">
                    <h2 className='heading'> Find a Doctor
                    </h2>
                    <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between'>

                        <input
                            type='search'
                            value={query}
                            className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer '
                            placeholder='Search Doctor by name or specification'
                            onChange={e => setQuery(e.target.value)}
                        />
                        <button
                            onClick={handleSearch}
                            className='btn mt-0 rounded-[0px] rounded-r-md'>Search</button>
                    </div>

                </div>
            </section>

            <section>
                <div className="container">
                    {loading && <Loading />}
                    {error && <Error />}
                    {!loading && !error && (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                            {doctors.map(doctor => (
                                <DoctorCard key={doctor.id} doctor={doctor} />

                            ))}
                        </div>
                    )}
                </div>
            </section>



        </>
    )
}

export default Doctors
