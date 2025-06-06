const Booking = require('../models/BookingSchema');
const Doctor = require('../models/DoctorSchema')

const createAppointment = async (req, res) => {
  
  try {
    const { doctor:doctorId, appointmentDate, time,day } = req.body;

    if (!doctorId || !appointmentDate || !time || !day) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const newBooking = new Booking({
      doctor: doctorId,
      user: req.userId, // from auth middleware
      appointmentDate,
      time,
      day,
     
    });

    await newBooking.save();
    res.status(200).json({ message: 'Appointment created successfully', booking: newBooking });
  } catch (err) {
    console.error("Create Appointment Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Booking.find({ user: req.user.id })
  .populate("doctor", "name specialization timeSlots")
  .lean();

const validAppointments = appointments.filter(a => a.doctor !== null);

res.json(validAppointments);

  } catch(err) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};



const deleteAppointment = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
console.log("Found booking:", booking);

  try {
    const deleted = await Booking.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    console.log("req.params.id:", req.params.id);
    console.log("req.user.id:", req.user.id);

    if (!deleted) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Appointment cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Deletion failed' });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const updated = await Booking.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { appointmentDate: req.body.appointmentDate, 
         time: req.body.time, 
         day: req.body.day, 
        },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Appointment not updated" });
    res.json({ message: "Appointment rescheduled", appointment:updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const bookings = await Booking.find({ doctor: req.userId })
      .populate('user', 'name email gender photo') //  populate patient info
      .lean();

       const validAppointments = bookings.filter(a => a.user !== null);

    res.status(200).json({ success: true, message: 'Appointments fetched', data: validAppointments });
  } catch (err) {
    console.error("Get Doctor Appointments Error:", err);
    res.status(500).json({ success: false, message: 'Failed to fetch appointments' });
  }
};




module.exports = {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  getDoctorAppointments
};

