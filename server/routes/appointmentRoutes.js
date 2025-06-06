const express = require('express');
const { createAppointment, getAppointments,updateAppointment, deleteAppointment, getDoctorAppointments } = require('../controllers/appointmentControllers');
const auth = require('../auth/verifyToken');

const router = express.Router();

router.post('/', auth, createAppointment);
router.get('/', auth, getAppointments);
router.get('/appointments' , auth, getDoctorAppointments)
router.put('/:id', auth, updateAppointment);    // Update appointment by ID
router.delete('/:id', auth, deleteAppointment); // Delete appointment by ID



module.exports = router;
