import convertTime from "../../utils/convertTime";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"



const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
    const { role } = useContext(AuthContext);
    const isUser = role === 'patient';

    return (
        <div className="shadow-panelShadow p-4 sm:p-5 lg:p-6 rounded-xl bg-white">
            {/* Ticket Price */}
            <div className="flex items-center justify-between">
                <p className="text-base lg:text-lg font-semibold text-textColor">Ticket Price</p>
                <span className="text-lg lg:text-2xl text-headingColor font-bold">₹{ticketPrice}</span>
            </div>

            {/* Time Slots */}
            <div className="mt-6">
                <p className="text-base lg:text-lg font-semibold text-headingColor">
                    Available Time Slots
                </p>
                <ul className="mt-4 space-y-3">
                    {Array.isArray(timeSlots) && timeSlots.map((slot, index) => (
                        <li key={index} className="flex justify-between items-center">
                            <span className="text-sm lg:text-base text-textColor font-medium">
                                {slot.day.charAt(0).toUpperCase() + slot.day.slice(1)}
                            </span>
                            <span className="text-sm lg:text-base text-textColor font-medium">
                                {convertTime(slot.startingTime)} -   {convertTime(slot.endingTime)}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Book Button */}
            {isUser && (
                <Link to={`/book-appointment/${doctorId}`}>
                    <button className="btn w-full rounded-lg text-base lg:text-lg px-4 py-3 mt-6">
                        Book Appointment
                    </button>
                </Link>
            )}

        </div>
    );
};

export default SidePanel;














