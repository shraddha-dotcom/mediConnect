const express = require("express");
const authenticate = require('../auth/verifyToken')
const {updateUser, 
    deleteUser, 
    getAllUser,
     getSingleUser,
    getUserProfile,
getMyAppointment } = require("../controllers/userController")

const router = express.Router()

router.get('/profile/me' , authenticate, getUserProfile)
router.put('/profile/me' ,authenticate, updateUser)
router.get('/appointments/my-appointments', authenticate , getMyAppointment)
router.get('/' , getAllUser)
router.get('/:id' ,authenticate, getSingleUser)
router.put('/:id' ,authenticate, updateUser)
router.delete('/:id' , deleteUser)




module.exports = router;