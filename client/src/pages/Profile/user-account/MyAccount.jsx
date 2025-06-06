import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import MyAppointments from "./MyAppointments";
import Profile from "./Profile";
import useGetProfile from "../../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import Error from "../../../components/Error";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";

const MyAccount = () => {
    const { dispatch } = useContext(AuthContext);
    const [tab, setTab] = useState('bookings')

    const { data: userData, loading, error } = useGetProfile(`${BASE_URL}/users/profile/me`)
    // console.log(userData, "userdata")

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }
    return (
        <section>
            <div className='max-w-[1170px] px-5 mx-auto'>
                {loading && !error && <Loading />}
                {error && !loading && <Error errorMessage={error} />}

                {!loading && !error && (
                    <div className='grid md:grid-cols-3 gap-10'>
                        <div className='pb-[50px] px-[30px] rounded-md'>
                            <div className='flex items-center justify-center'>
                                <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
                                    {userData && userData.photo && (
                                        <img
                                            src={userData.photo}
                                            alt="user image"
                                            className="w-full h-full rounded-full"
                                        />
                                    )}
                                </figure>
                            </div>

                            <div className="text-center mt-4">
                                <h3 data-testid="user-name"
                                    className="text-[18px] leading-[30px] text-headingColor font-bold">
                                    {userData?.name || "N/A"}
                                </h3>
                                <p className="text-textCOlor text-[15px] leading-6 font-medium">
                                    {userData?.email || "N/A"}
                                </p>
                                <p className="text-textCOlor text-[15px] leading-6 font-medium ">
                                    Blood Type:
                                    <span className="ml-2 text-headingColor text-[16px] leading-8">
                                        {userData?.bloodType || "N/A"}
                                    </span>
                                </p>
                            </div>

                            <div
                                className="mt-[50px] md:mt-[100px]">
                                <button
                                    data-testid="logout-button"
                                    onClick={handleLogout}
                                    className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white">
                                    Logout
                                </button>
                                <button
                                    data-testid="delete-account-button"
                                    className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                                    Delete Account
                                </button>

                            </div>
                        </div>

                        <div className="md:col-span-2 md:px-[30px]">
                            <div>
                                <Link to='/my-appointments'>
                                    <button
                                        data-testid="tab-bookings"
                                        onClick={() => setTab('bookings')}
                                        className={`${tab === 'bookings' && "bg-primaryColor text-white font-normal"}
                                        p-2 mr-5 px-5 rounded-md text-headingColor
                                        font-semibold text-[16px] leading-7 border border-solid border-primaryColor"`}
                                    >
                                        My Appointments
                                    </button>
                                </Link>

                                <button
                                    data-testid="tab-settings"
                                    onClick={() => setTab('settings')}
                                    className={`${tab === 'settings' && "bg-primaryColor text-white font-normal"}
                                 py-2 px-5 rounded-md text-headingColor
                                 font-semibold text-[16px] leading-7 border border-solid border-primaryColor
                        `}
                                >
                                    Profile Settings
                                </button>
                            </div>

                            {
                                tab === 'bookings' && <MyAppointments />
                            }
                            {

                                tab === 'settings' && < Profile user={userData} />
                            }
                        </div>
                    </div>

                )}

            </div>
        </section>
    )
}

export default MyAccount
