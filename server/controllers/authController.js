const User = require('../models/UserSchema');
const Doctor = require('../models/DoctorSchema')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


 const generateToken = user => {
  return jwt.sign({ id: user._id , role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

 }
 

// for login/signup logic

const register = async (req, res) => {
  console.log("User ID from token:", req.user);

  let { name, email, password, photo, gender, role } = req.body;

   // Normalize role to lowercase
  role = role.toLowerCase();

   // Validate required fields 
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let user;
    
      // Check if user already exists
    if(role === 'patient'){
      user = await User.findOne({email});
    }else if(role === 'doctor'){
      user = await  Doctor.findOne({email});
    }else {
      return res.status(400).json({ success: false, message: 'Invalid role specified' });
    }
    
    if(user){
       console.log("User already exists with email:", email);
      return res.status(400).json({message: 'User already exist'})
    }

// if user does not exist we have to hash the password to protect user

 const hashedPassword = await bcrypt.hash(password, 10);

//  now create new user
const newUserData = {
      name,
      email,
      password: hashedPassword,
      photo,
      gender,
      role,
    };
     const newUser = role === 'patient' ? new User(newUserData) : new Doctor(newUserData);

// now save the user in db and send the message
  // await newUser.save();
  try {
  await newUser.save();
  console.log("User saved");
} catch (error) {
  console.error("Failed to save user:", error.message);
}


   res.status(201).json({success:true, message: 'User successfully created' });
  } catch (err) {
    res.status(500).json({success:false, message: 'Error registering user,Please try again' });
  }
};



// login
const login = async (req, res) => {
  const { email} = req.body;
  console.log("Incoming login request body:", req.body);

  try {
    let user;
      // Check if user is a patient or doctor
    const patient = await User.findOne({email});
    const doctor = await Doctor.findOne({email});

    if(patient){
      user = patient;

    } else if(doctor){
       user = doctor;
}

// If no user found
if(!user){
  return res.status(404).json({status: false ,message: "User not found"});

}

 // Compare password
    const matchPassword = await bcrypt.compare(
      req.body.password, 
      user.password);
    if (!matchPassword) {
      return res.status(400).json({ status:false, message: 'Invalid credentials' });
    }

    // get token

    const token = generateToken(user);

     // Remove sensitive fields from response

    const  {password , role, appointments, ...rest} = user._doc; 

      // Return response

    return res.status(200).json({
      status: true,
       message: "Successfully login" , 
       token, 
       data:{...rest},
       role
      });
   
    
  } catch(err) {
    return res.status(500).json({ message: 'Failed to login' });
  }
};

module.exports = {
  register,
  login,
};










