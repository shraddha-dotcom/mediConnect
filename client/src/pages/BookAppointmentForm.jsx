import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import { generateTimeSlots } from "../utils/generateTimeSlots";
import { AuthContext } from "../context/AuthContext";


const BookAppointmentForm = () => {
  const { token } = useContext(AuthContext)
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [warning, setWarning] = useState('');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`${BASE_URL}/doctors/${doctorId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setDoctor(data.data);
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split('T')[0]; // get current date in YYYY-MM-DD

    if (selectedDate < today) {
      setWarning('Please select a present or future date.');
    } else {
      setWarning('');
      setAppointmentDate(selectedDate);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!appointmentDate || !selectedTime || !selectedDay) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctor: doctorId,
          appointmentDate,
          time: selectedTime,
          day: selectedDay,
          doctorType: doctor.specialization,
          comments: `Appointment on ${selectedDay}`,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      toast.success("Appointment booked successfully");
      navigate("/my-appointments");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!doctor) return <p>Loading doctor info...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Book Appointment with Dr. {doctor.name}</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <label className="block font-medium">Choose Day:</label>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="border px-3 py-2 w-full rounded"
            required
          >
            <option value="">Select Day</option>
            {doctor.timeSlots?.map((slot, idx) => (
              <option key={idx} value={slot.day}>
                {slot.day.charAt(0).toUpperCase() + slot.day.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Choose Appointment Date:</label>
          <input
            type="date"
            value={appointmentDate}
            onChange={handleDateChange}
            className="border px-3 py-2 w-full rounded"
            required
          />
          {warning && <p className="text-red-600 mt-1">{warning}</p>}
        </div>


        <div>
          <label className="block font-medium">Choose Time :</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="border px-3 py-2 w-full rounded"
            required
          >
            <option value="">Select Time</option>
            {(() => {
              const selectedSlot = doctor.timeSlots?.find((slot) => slot.day.toLowerCase() === selectedDay.toLowerCase());
              if (selectedSlot) {
                const times = generateTimeSlots(selectedSlot.startingTime, selectedSlot.endingTime, 4);
                return times.map((time, idx) => (
                  <option key={idx} value={time}>
                    {time}
                  </option>
                ));
              }
              return null;
            })()}
          </select>

        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookAppointmentForm;






























