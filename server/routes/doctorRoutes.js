const express = require("express");
const {getDoctorProfile, updateDoctorProfile, deleteDoctor, getAllDoctor, getSingleDoctor } = require("../controllers/doctorController")
const reviewRouter = require('./reviewsRoutes');
const authenticate = require('../auth/verifyToken')

const router = express.Router()

router.get('/profile/me', authenticate, getDoctorProfile)
router.put('/profile/me' , authenticate,updateDoctorProfile)
router.use('/:doctorId/reviews', reviewRouter)
router.get('/' , getAllDoctor)
router.put('/:id', authenticate, updateDoctorProfile);     
router.delete('/:id' ,authenticate, deleteDoctor)
router.get('/:id' , getSingleDoctor)


module.exports = router;