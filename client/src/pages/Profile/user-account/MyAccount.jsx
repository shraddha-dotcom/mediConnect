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
        <section className="py-8 px-4 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {loading && !error && <Loading />}
                {error && !loading && <Error errorMessage={error} />}

                {!loading && !error && (
                    <div className="grid gap-10 md:grid-cols-3">
                        {/* Left Sidebar - User Info */}
                        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                            <figure className="w-28 h-28 rounded-full border-4 border-primaryColor overflow-hidden">
                                {userData?.photo ? (
                                    <img
                                        src={userData.photo}
                                        alt="User avatar"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                                        No Image
                                    </div>
                                )}
                            </figure>

                            <div className="text-center mt-4">
                                <h3
                                    data-testid="user-name"
                                    className="text-xl font-semibold text-headingColor"
                                >
                                    {userData?.name || "N/A"}
                                </h3>
                                <p className="text-gray-600 mt-1">{userData?.email || "N/A"}</p>
                                <p className="text-gray-600 mt-2">
                                    Blood Type:
                                    <span className="ml-2 font-medium text-primaryColor">
                                        {userData?.bloodType || "N/A"}
                                    </span>
                                </p>
                            </div>

                            <div className="mt-12 w-full space-y-3">
                                <button
                                    data-testid="logout-button"
                                    onClick={handleLogout}
                                    className="w-full py-3 rounded-md bg-primaryColor text-white font-semibold hover:bg-primaryColor-dark transition"
                                >
                                    Logout
                                </button>
                                <button
                                    data-testid="delete-account-button"
                                    className="w-full py-3 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>

                        {/* Right Content - Tabs & Content */}
                        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
                            {/* Tabs */}
                            <div className="flex flex-wrap gap-4 mb-6 border-b border-gray-200 pb-4">
                                <Link to="/my-appointments">
                                    <button
                                        data-testid="tab-bookings"
                                        onClick={() => setTab("bookings")}
                                        className={`px-6 py-2 rounded-md font-semibold transition ${tab === "bookings"
                                                ? "bg-primaryColor text-white"
                                                : "text-primaryColor border border-primaryColor hover:bg-primaryColor hover:text-white"
                                            }`}
                                    >
                                        My Appointments
                                    </button>
                                </Link>
                                <button
                                    data-testid="tab-settings"
                                    onClick={() => setTab("settings")}
                                    className={`px-6 py-2 rounded-md font-semibold transition ${tab === "settings"
                                            ? "bg-primaryColor text-white"
                                            : "text-primaryColor border border-primaryColor hover:bg-primaryColor hover:text-white"
                                        }`}
                                >
                                    Profile Settings
                                </button>
                            </div>

                            {/* Tab Content */}
                            <div>
                                {tab === "bookings" && <MyAppointments />}
                                {tab === "settings" && <Profile user={userData} />}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>

    )
}

export default MyAccount
