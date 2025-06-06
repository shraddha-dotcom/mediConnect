const Review = require('../models/ReviewSchema');
const Doctor = require('../models/DoctorSchema')


// const getAllReviews = async(req , res) => {

//     try {
//         const reviews = await Review.find({});

//         res.status(200).json({success:true, message:'Successful', data:reviews})
        
//     } catch (error) {
//          res.status(404).json({success:false, message:'UnSuccessful'})
        
//     }
// }

// create reviews

const createReview = async(req,res) =>{
    try {

    if(!req.body.doctor) req.body.doctor = req.params.doctorId
    if(!req.body.user) req.body.user = req.user.id;

    const newReview = new Review(req.body)

    const savedReview = await newReview.save() 

     await Doctor.findByIdAndUpdate(req.body.doctor, {
            $push:{reviews:savedReview._id}
        })
        res.status(201).json({success:true, message:"Review submitted", data:savedReview})
    } catch (err) {
         console.error("Review submission failed:", err);
        res.status(500).json({success:false, message:"failed to submit"})
    }
    
    }

    // get reviews

    const getAllReviews = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    if (!doctorId) {
      return res.status(400).json({ success: false, message: "Doctor ID is required" });
    }
    const reviews = await Review.find({ doctor: doctorId });
    res.status(200).json({ success: true, message: 'Successful', data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unsuccessful', error: error.message });
  }
};




module.exports = {getAllReviews, createReview}