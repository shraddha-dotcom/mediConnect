import useFetchData from "../../../hooks/useFetchData"
import { BASE_URL } from "../../../config"
import Error from "../../../components/Error";
import Loading from "../../../components/Loading";
import { useContext, useState } from "react";
import formateDate from "../../Doctors/formateDate";
import { toast } from "react-toastify";
import { generateTimeSlots } from "../../../utils/generateTimeSlots";
import { AuthContext } from "../../../context/AuthContext";


const MyAppointments = () => {
    const { token } = useContext(AuthContext)
    const { data: appointments, loading, error, refetch } = useFetchData(
        `${BASE_URL}/users/appointments/my-appointments`
    );

    const [rescheduleId, setRescheduleId] = useState(null);
    const [newDate, setNewDate] = useState("");
    const [newTime, setNewTime] = useState("");
    const [newDay, setNewDay] = useState("");
    const [warning, setWarning] = useState('');
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

    const handleRescheduleClick = (booking) => {
        if (!booking?.doctor?._id) {
            toast.error("Doctor information not available for this booking.");
            return;
        }

        setRescheduleId(booking._id);
        setNewDate("");
        setNewDay("");
        setNewTime("");
        setAvailableTimeSlots([]);
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const today = new Date().toISOString().split('T')[0]; // get current date in YYYY-MM-DD

        if (selectedDate < today) {
            setWarning('Please select a present or future date.');
        } else {
            setWarning('');
            setNewDate(selectedDate);
        }
    };

    const cancelAppointment = async (id) => {
        if (!window.confirm("Are you sure to cancel?")) return;
        try {
            const res = await fetch(`${BASE_URL}/appointments/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            // const result = await res.json();
            // console.log(result);

            if (!res.ok) throw new Error("Failed to cancel");
            toast.success("Appointment cancelled");
            refetch();
        } catch (err) {
            toast.error(err.message);
        }
    };

    const rescheduleAppointment = async (id) => {
        if (!newDate || !newTime || !newDay) return toast.error("Fill all fields");

        console.log("Rescheduling ID:", id, "to:", newDate, newTime, newDay);
        try {
            const res = await fetch(`${BASE_URL}/appointments/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    appointmentDate: newDate,
                    time: newTime,
                    day: newDay
                }),
            });
            // const result = await res.json();
            // console.log(result);

            if (!res.ok) throw new Error("Failed to reschedule");
            toast.success("Appointment rescheduled");
            setNewDate("");
            setNewTime("");
            setNewDay("");
            setRescheduleId(null);
            refetch();
        } catch (err) {
            toast.error(err.message);
        }
    };


    return (
        <div className="px-4 py-6 max-w-6xl mx-auto">
            {loading && <Loading />}
            {error && <Error errorMessage={error} />}

            {!loading && !error && appointments.length === 0 && (
                <h2 className="mt-10 text-center text-xl font-semibold text-primaryColor">
                    You have not booked any appointments yet!
                </h2>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {appointments.map((booking) => {
                    const doctor = booking?.doctor;
                    if (!doctor || !doctor._id) return null;

                    return (
                        <div key={booking._id} className="bg-white p-6 rounded-xl shadow-md border">
                            <div className="flex items-center gap-4">
                                <img
                                    src={doctor?.photo}
                                    alt={doctor?.name}
                                    className="w-16 h-16 rounded-full object-cover border"
                                />
                                <div>
                                    <h3 data-testid="doctor-name"
                                        className="text-lg font-bold text-gray-800">{doctor?.name}</h3>
                                    <p className="text-sm text-gray-500">{doctor?.specialization}</p>
                                </div>
                            </div>

                            <div className="mt-4 space-y-1 text-sm text-gray-700">
                                <p>
                                    <span className="font-medium">Date:</span> {formateDate(booking.appointmentDate)}
                                </p>
                                <p>
                                    <span className="font-medium">Time:</span> {booking.time}
                                </p>
                                <p>
                                    <span className="font-medium">Day:</span> {booking.day}
                                </p>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-3">
                                <button
                                    data-testid={`cancel-btn-${booking._id}`}
                                    onClick={() => cancelAppointment(booking._id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"

                                >
                                    Cancel
                                </button>

                                {rescheduleId === booking._id ? (
                                    <div className="w-full mt-4 p-4 bg-gray-50 rounded-lg border shadow-sm space-y-3">
                                        <select
                                            data-testid="day-select"
                                            value={newDay}
                                            onChange={(e) => {
                                                const selectedDay = e.target.value;
                                                setNewDay(selectedDay);
                                                const available = booking.doctor.timeSlots?.filter(
                                                    (slot) => slot.day === selectedDay
                                                );
                                                setAvailableTimeSlots(available || []);
                                                setNewTime("");
                                            }}
                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        >
                                            <option value="">Select Day</option>
                                            {[...new Set(doctor.timeSlots?.map((slot) => slot.day))].map((day) => (
                                                <option key={day} value={day}>
                                                    {day}
                                                </option>
                                            ))}
                                        </select>

                                        <input
                                            data-testid="date-input"
                                            type="date"
                                            value={newDate}
                                            onChange={handleDateChange}
                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                        {warning && <p className="text-red-600 mt-1">{warning}</p>}

                                        <select
                                            data-testid="time-select"
                                            value={newTime}
                                            onChange={(e) => setNewTime(e.target.value)}
                                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            required
                                        >
                                            <option value="">Select Time</option>
                                            {availableTimeSlots.length > 0 &&
                                                availableTimeSlots.map((slot, index) => {
                                                    const times = generateTimeSlots(slot.startingTime, slot.endingTime, 4);
                                                    return times.map((time, idx) => (
                                                        <option key={`${index}-${idx}`} value={time}>
                                                            {time}
                                                        </option>
                                                    ));
                                                })}
                                        </select>

                                        <div className="flex justify-end gap-2 pt-2">
                                            <button
                                                onClick={() => rescheduleAppointment(booking._id)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setRescheduleId(null);
                                                    setNewDate("");
                                                    setNewTime("");
                                                    setNewDay("");
                                                    setAvailableTimeSlots([]);
                                                }}
                                                className="px-4 py-2 text-gray-600 hover:underline"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleRescheduleClick(booking)}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200"
                                        data-testid={`reschedule-btn-${booking._id}`}
                                    >
                                        Reschedule
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MyAppointments;














