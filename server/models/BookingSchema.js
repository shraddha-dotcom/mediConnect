const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
     required: false,
    },
    appointmentDate: {  
    type: Date,
    required: true,
  },
    day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  }
},{
  timestamps: true
}
);

module.exports = mongoose.model('Booking', bookingSchema);
