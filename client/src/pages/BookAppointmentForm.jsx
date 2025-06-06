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






























// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { BASE_URL, token } from "../config";
// import React from "react";
// import { useLocation } from "react-router-dom";

// const BookAppointmentForm = () => {
//   const { doctorId } = useParams();

//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const isEditMode = searchParams.get("edit") === "true";
//   const appointmentId = searchParams.get("appointmentId");

//   const [doctor, setDoctor] = useState(null);
//   const [selectedDay, setSelectedDay] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [appointmentDate, setAppointmentDate] = useState("");

//   useEffect(() => {
//     const fetchDoctor = async (id) => {
//       try {
//         const res = await fetch(`${BASE_URL}/doctors/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.message || "Failed to fetch doctor");
//         setDoctor(data);
//       } catch (err) {
//         toast.error("Failed to load doctor info");
//       }
//     };
//     if (isEditMode && appointmentId) {
//       const fetchAppointment = async () => {
//         try {
//           const res = await fetch(`${BASE_URL}/appointments/${appointmentId}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           const data = await res.json();
//           setAppointmentDate(data.appointmentDate);
//           setSelectedTime(data.time);
//           setSelectedDay(data.day); // if day is stored
//         } catch (err) {
//           toast.error("Failed to load appointment data");
//         }
//       };
//       fetchAppointment();
//     } else if (doctorId) {
//       fetchDoctor(doctorId);
//     }
//   }, [isEditMode, appointmentId, doctorId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!appointmentDate || !selectedTime || !selectedDay) {
//       toast.error("Please fill all fields");
//       return;
//     }
//     try {
//       const url = isEditMode
//         ? `${BASE_URL}/appointments/${appointmentId}`
//         : `${BASE_URL}/appointments`;

//       const method = isEditMode ? "PUT" : "POST";

//       const res = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           doctor: doctorId || doctor?._id,
//           appointmentDate,
//           time: selectedTime,
//         }),
//       });

//       const result = await res.json();
//       if (!res.ok) throw new Error(result.message);

//       toast.success(
//         isEditMode ? "Appointment rescheduled successfully" : "Appointment booked successfully"
//       );
//       navigate("/my-appointments");
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };


//   if (!doctor) return <p>Loading doctor info...</p>;

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h2 className="text-xl font-bold mb-4">Book Appointment {doctor?.name ? `with Dr. ${doctor.name}` : ""}</h2>

//       <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
//         <div>
//           <label className="block font-medium">Choose Appointment Date:</label>
//           <input
//             type="date"
//             value={appointmentDate}
//             onChange={(e) => setAppointmentDate(e.target.value)}
//             className="border px-3 py-2 w-full rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Choose Day:</label>
//           <select
//             value={selectedDay}
//             onChange={(e) => setSelectedDay(e.target.value)}
//             className="border px-3 py-2 w-full rounded"
//             required
//           >
//             <option value="">Select Day</option>
//             {doctor.timeSlots?.map((slot, idx) => (
//               <option key={idx} value={slot.day}>
//                 {slot.day.charAt(0).toUpperCase() + slot.day.slice(1)}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block font-medium">Choose Time:</label>
//           <input
//             type="time"
//             value={selectedTime}
//             onChange={(e) => setSelectedTime(e.target.value)}
//             className="border px-3 py-2 w-full rounded"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Confirm Booking
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BookAppointmentForm;



































// import { useEffect, useState } from 'react';
// import formateDate from './Doctors/formateDate';
// import { toast } from 'react-toastify';
// import { BASE_URL, token } from '../config';

// const BookAppointments = () => {
//     const [appointments, setAppointments] = useState([]);
//     const [rescheduleId, setRescheduleId] = useState(null);
//     const [newDate, setNewDate] = useState('');

//     useEffect(() => {
//         fetchAppointments();
//     }, []);

//     const fetchAppointments = async () => {
//         try {
//             const res = await fetch(`${BASE_URL}/appointments`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             const data = await res.json();
//             setAppointments(data);
//         } catch (err) {
//             toast.error('Failed to load appointments');
//         }
//     };

//     const cancelAppointment = async (id) => {
//         if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

//         try {
//             const res = await fetch(`${BASE_URL}/appointments/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (!res.ok) throw new Error('Cancellation failed');
//             toast.success('Appointment cancelled');
//             fetchAppointments();
//         } catch (err) {
//             toast.error(err.message || 'Error cancelling');
//         }
//     };

//     const rescheduleAppointment = async (id) => {
//         if (!newDate) return toast.error('Please select a new date');

//         try {
//             const res = await fetch(`${BASE_URL}/appointments/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({ appointmentDate: newDate }),
//             });

//             if (!res.ok) throw new Error('Reschedule failed');
//             toast.success('Appointment rescheduled');
//             setRescheduleId(null);
//             setNewDate('');
//             fetchAppointments();
//         } catch (err) {
//             toast.error(err.message || 'Error rescheduling');
//         }
//     };

//     return (
//         <div className="p-4 max-w-3xl mx-auto">
//             <h2 className="text-xl font-bold mb-4">My Appointments</h2>
//             {appointments.length === 0 ? (
//                 <p>No appointments found.</p>
//             ) : (
//                 appointments.map((appt) => (
//                     <div
//                         key={appt._id}
//                         className="border rounded p-4 mb-4 shadow-sm bg-white"
//                     >
//                         <p><strong>Doctor Type:</strong> {appt.doctorType}</p>
//                         <p><strong>Date:</strong> {formateDate(new Date(appt.appointmentDate), 'PPP')}</p>
//                         <p><strong>Time:</strong> {appt.time}</p>
//                         <p><strong>Status:</strong> {appt.status}</p>
//                         <p><strong>Comments:</strong> {appt.comments || 'N/A'}</p>

//                         <div className="mt-3 flex gap-3">
//                             <button
//                                 onClick={() => cancelAppointment(appt._id)}
//                                 className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                             >
//                                 Cancel
//                             </button>

//                             {rescheduleId === appt._id ? (
//                                 <>
//                                     <input
//                                         type="date"
//                                         value={newDate}
//                                         onChange={(e) => setNewDate(e.target.value)}
//                                         className="border rounded px-2 py-1"
//                                     />
//                                     <button
//                                         onClick={() => rescheduleAppointment(appt._id)}
//                                         className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                                     >
//                                         Confirm
//                                     </button>
//                                     <button
//                                         onClick={() => {
//                                             setRescheduleId(null);
//                                             setNewDate('');
//                                         }}
//                                         className="px-3 py-1 text-gray-600"
//                                     >
//                                         Cancel
//                                     </button>
//                                 </>
//                             ) : (
//                                 <button
//                                     onClick={() => setRescheduleId(appt._id)}
//                                     className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                                 >
//                                     Reschedule
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default BookAppointments;
