const User = require("../models/UserSchema");
const Booking = require('../models/BookingSchema');
const Doctor = require('../models/DoctorSchema')

const updateUser = async(req, res) => {
    const id = req.params.id ;
    try{
        const updatedUser = await User.findByIdAndUpdate(
            id , 
            { $set: req.body }, 
            {new:true}
        )
        res.status(200).json({success:true, message: "successfully updated" , data:updatedUser})
    }catch(err)
{
     console.error(err);
     res.status(500).json({success:false, message: "Failed to update" })
}}


 const deleteUser = async(req, res) => {
    const id = req.params.id 
    try{
         await User.findByIdAndDelete(id)
        res.status(200).json({success:true, message: "successfully deleted" })
    }catch(err)
{
     console.error(err);
     res.status(500).json({success:false, message: "Failed to delete" })
}}

const getSingleUser = async(req, res) => {
    const id = req.params.id 
    try{
        const user = await User.findById(id).select('-password');
        if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
        res.status(200).json({success:true, message: "user found" , data:user})
    }catch(err)
{
     console.error(err);
     res.status(500).json({success:false, message: "something went wrong" })
}}

 const getAllUser = async(req, res) => {
    
    try{
        const users = await User.find({}).select('-password') //exclude the password
        res.status(200).json({success:true, message: "users found" , data:users})
    }catch(err)
{
     console.error(err);
     res.status(404).json({success:false, message: "failed to fetch users" })
}}

const getUserProfile = async(req,res) => {
    const userId = req.userId

    try {
        const user = await User.findById(userId)
        
        if(!user){
            return res.status(404).json({success:false, message:"User not found"})

        }
        const {password, ...rest} = user._doc 

        res.status(200).json({
            success:true,
             message:"Profile info is getting",
              data: {...rest}
            })
    } catch (error) {
         console.error(err);
        res.status(404).json({success:false, message: "failed to fetch users" })
        
    }
}

const getMyAppointment = async (req, res) => {
  try {
    // get bookings and populate doctor info except password
    const bookings = await Booking.find({ user: req.userId }).populate('doctor', '-password');

    res.status(200).json({ success: true, message: "Appointments fetched", data: bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};


// const getMyAppointment = async(req, res) => {
//     try {

//         // retrive appointments from booking for specific user
//         const bookings = await Booking.find({user:req.userId});

//         // extract doctor ids from appointment bookings
//         const doctorIds = bookings.map(el=>el.doctor.id);

//         // retrieve doctors using doctor ids
//         const doctors = await Doctor.find({_id: {$in:doctorIds}}).select('-password');

//         res.status(200).json({success:true, message:"Appointments are getting", data:doctors})
        
//     } catch (error) {
//          console.error(err);
//          res.status(500).json({success:false, message: "Something went wrong" })
        
//     }

// }


module.exports = {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser,
  getUserProfile,
  getMyAppointment
};