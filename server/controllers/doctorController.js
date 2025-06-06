const Doctor = require("../models/DoctorSchema")
const Booking = require('../models/BookingSchema')

const updateDoctorProfile = async(req, res) => {
    const id =  req.userId;
    console.log("Doctor ID from token:", id);

    try{
        const updatedDoctor = await Doctor.findByIdAndUpdate(id , {$set:req.body}, {new:true})
        
    if (!updatedDoctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
        res.status(200).json({success:true, message: "successfully updated" , data:updatedDoctor})
    }catch(err)
{
    console.error("Update Doctor error:", err);
     res.status(500).json({success:false, message: "Failed to update" })
}}


 const deleteDoctor = async(req, res) => {
    const id = req.params.id 
    try{
         await Doctor.findByIdAndDelete(id)
        res.status(200).json({success:true, message: "successfully deleted" })
    }catch(err)
{
     res.status(500).json({success:false, message: "Failed to delete" })
}}

const getSingleDoctor = async(req, res) => {
    const id = req.params.id 
    try{
        const doctor = await Doctor.findById(id)
        .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'name photo'
        }
      }).select('-password');
        if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
        res.status(200).json({success:true, message: "Doctor found" , data:doctor})
    }catch(err)
{
     res.status(500).json({success:false, message: "something went wrong" })
}}

 const getAllDoctor = async(req, res) => {
    
    try{
        // add query parameter for search operation
        const {query} = req.query;

        let doctors;
        if(query) {
            doctors = await Doctor.find({isApproved: 'approved',
                 $or:[{name:{$regex:query, $options:'i'}},
                    {specialization:{$regex:query, $options:'i'}}
                 ]}).select('-password')
        }else{
              doctors = await Doctor.find({isApproved: 'approved'}).select('-password') //exclude the password
        }

       
        res.status(200).json({success:true, message: "Doctors found" , data:doctors})
    }catch(err)
{
     res.status(404).json({success:false, message: "failed to fetch Doctors" })
}}

const getDoctorProfile = async(req,res) => {
    console.log("🔍 Reached getDoctorProfile, user:", req.user);
  const doctorId = req.user.id;
  
      try {
          const doctor = await Doctor.findById(doctorId).select('-password')
          
          if(!doctor){
              return res.status(404).json({success:false, message:"Doctor not found"})
  
          }
          const {password, ...rest} = doctor._doc ;
          const appointments = await Booking.find({doctor:doctorId})
  
          res.status(200).json({
            success:true,
             message:"Profile info is getting",
            data:{...rest, appointments},
          })
      } catch (error) {
          res.status(404).json({success:false, message: "failed to fetch users" })
          
      }
}


module.exports = {
  updateDoctorProfile,
  deleteDoctor,
  getSingleDoctor,
  getAllDoctor, 
  getDoctorProfile,
};