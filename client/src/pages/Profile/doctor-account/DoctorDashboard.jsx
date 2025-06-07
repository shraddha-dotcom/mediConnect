import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import useGetProfile from "../../../hooks/useFetchData"
import Tabs from "./Tabs";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import DoctorAbout from "../../Doctors/DoctorAbout";
import DoctorProfile from "./DoctorProfile/DoctorProfile";
import { BASE_URL } from "../../../config";
import Appointments from "./Appointments";



const DoctorDashboard = () => {
    const { data, loading, error } = useGetProfile(`${BASE_URL}/doctors/profile/me`)

    const [tab, setTab] = useState('overview')

    const [appointmentsData, setAppointmentsData] = useState(null);
    const [appointmentsLoading, setAppointmentsLoading] = useState(false);
    const [appointmentsError, setAppointmentsError] = useState(null);

    // Lazy-fetch appointments when the "appointments" tab is clicked
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setAppointmentsLoading(true);
                const res = await fetch(`${BASE_URL}/appointments/appointments`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const result = await res.json();
                if (res.ok) {
                    setAppointmentsData(result.data);
                    setAppointmentsError(null);
                } else {
                    throw new Error(result.message || "Failed to fetch appointments");
                }
            } catch (err) {
                setAppointmentsError(err.message);
            } finally {
                setAppointmentsLoading(false);
            }
        };

        if (tab === 'appointments' && !appointmentsData) {
            fetchAppointments();
        }
    }, [tab, appointmentsData]);

    return (
        <section className="py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {loading && <Loading />}
                {error && <Error message={error} />}

                {!loading && !error && data && (
                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <Tabs tab={tab} setTab={setTab} />
                        </div>

                        <div className="lg:col-span-2">
                            {data?.isApproved === 'pending' && (
                                <div className="flex items-start p-4 mb-6 text-yellow-800 bg-yellow-50 border border-yellow-300 rounded-lg">
                                    <svg
                                        aria-hidden="true"
                                        fill="currentColor"
                                        className="w-5 h-5 mt-1"
                                        viewBox="0 0 490 490"
                                    >
                                        <path d="M245,0C109.684,0,0,109.684,0,245s109.684,245,245,245s245-109.684,245-245S380.316,0,245,0z M245,459.375 c-118.213,0-214.375-96.163-214.375-214.375S126.787,30.625,245,30.625S459.375,126.787,459.375,245S363.212,459.375,245,459.375z"></path>
                                        <polygon points="266.836,286.987 275.196,114.874 214.788,114.874 223.532,286.987 "></polygon>
                                        <path d="M245.184,305.974c-20.136,0-34.178,14.424-34.178,34.576c0,19.738,13.674,34.576,34.178,34.576 c20.503,0,33.825-14.823,33.825-34.576C278.611,320.399,265.304,305.974,245.184,305.974z"></path>
                                    </svg>
                                    <div className="ml-3 text-sm font-medium">
                                        To get approval, please complete your profile. We'll review and approve within 3 days.
                                    </div>
                                </div>
                            )}

                            <div className="mt-6">
                                {tab === 'overview' && (
                                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                                        <figure className="w-40 h-40 overflow-hidden rounded-full shadow-md border">
                                            {data.photo ? (
                                                <img src={data.photo} alt={data.name || "Doctor"} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                                                    No Image
                                                </div>
                                            )}
                                        </figure>

                                        <div className="text-center lg:text-left">
                                            <span className="inline-block bg-[#CCF0F3] text-irisBlueColor py-1 px-4 rounded-md text-sm font-medium">
                                                {data.specialization}
                                            </span>

                                            <h3 className="text-xl font-bold text-headingColor mt-2">{data.name}</h3>

                                            <div className="flex items-center justify-center lg:justify-start gap-2 mt-1 text-headingColor">
                                                <FaStar className="text-yellow-500" />
                                                <span className="font-semibold text-sm">{data.averageRating}</span>
                                                <span className="text-gray-500 text-sm">({data.totalRating})</span>
                                            </div>

                                            <p className="text-sm text-gray-600 mt-3 max-w-md">{data.bio}</p>
                                        </div>
                                    </div>
                                )}

                                {tab === 'overview' && (
                                    <DoctorAbout
                                        name={data.name}
                                        about={data.about}
                                        qualifications={data.qualifications}
                                        experiences={data.experiences}
                                    />
                                )}

                                {tab === 'appointments' && (
                                    <>
                                        {appointmentsLoading && <Loading />}
                                        {appointmentsError && <Error message={appointmentsError} />}
                                        {!appointmentsLoading && !appointmentsError && appointmentsData && (
                                            <Appointments appointments={appointmentsData} />
                                        )}
                                    </>
                                )}

                                {tab === 'settings' && <DoctorProfile doctorData={data} />}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DoctorDashboard;


