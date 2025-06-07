import { useContext, useEffect, useState } from 'react';
import uploadImageToCloudinary from '../../../../utils/uploadCloudinary';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../../config';
import { HashLoader } from "react-spinners";
import { AiOutlineDelete } from "react-icons/ai";
import { AuthContext } from '../../../../context/AuthContext';


const DoctorProfile = ({ doctorData }) => {
    const { token } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        about: '',
        bio: '',
        gender: '',
        specialization: '',
        ticketPrice: '',
        qualifications: [],
        experiences: [],
        timeSlots: [],
        photo: null,
    });
    // console.log("Submitting formData:", formData);


    useEffect(() => {
        if (doctorData) {
            setFormData({
                name: doctorData.name || '',
                email: doctorData.email || '',
                phone: doctorData.phone || '',
                bio: doctorData.about || '',
                gender: doctorData.gender || '',
                specialization: doctorData.specialization || '',
                ticketPrice: doctorData.ticketPrice || '',
                qualifications: doctorData.qualifications || [],
                experiences: doctorData.experiences || [],
                timeSlots: doctorData.timeSlots || [],
                about: doctorData.about || '',
                photo: doctorData.photo || ''
            });
        }


        // console.log("doctor updated", doctorData)
    }, [doctorData]);

    const [isLoading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }
    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            console.error("No file selected.");
            return;
        }
        try {
            const data = await uploadImageToCloudinary(file)
            if (data?.url) {
                setFormData({ ...formData, photo: data.url });
            } else {
                console.error("No URL returned from Cloudinary", data);
            }
        } catch (err) {
            console.error("Upload failed:", err);
        }
    }

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
                method: "PUT",
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })


            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.message)
            }
            toast.success(result.message)
        } catch (err) {
            toast.error(err.message)

        } finally {
            setLoading(false);
        }

    }



    // reusable function for adding item
    const addItem = (key, item) => {
        setFormData(prevFormData => ({ ...prevFormData, [key]: [...prevFormData[key], item] }))
    }
    //reusuable function for deleting item
    const deleteItem = (key, index) => {
        // setFormData(prevFormData => ({ ...prevFormData, [key]: prevFormData[key].filter((_, i) => i !== index) }))
        setFormData(prevFormData => {
            const current = Array.isArray(prevFormData[key]) ? prevFormData[key] : [];
            return {
                ...prevFormData,
                [key]: current.filter((_, i) => i !== index),
            };
        });
    }

    //reusable input change function
    const handleReusableInputChange = (key, index, event) => {
        const { name, value } = event.target

        setFormData(prevFormData => {
            const updateItems = [...prevFormData[key]]

            updateItems[index][name] = value

            return {
                ...prevFormData,
                [key]: updateItems,
            }
        })
    }

    const addQualification = (e) => {
        e.preventDefault()

        addItem('qualifications', {
            startingDate: "", endingDate: "", degree: "PHD", university: "BHU"
        })
    }

    const handleQualificationChange = (event, index) => {
        handleReusableInputChange("qualifications", index, event)
    }

    const deleteQualificationChange = (e, index) => {
        e.preventDefault();
        deleteItem('qualifications', index)
    }

    const addExperience = (e) => {
        e.preventDefault()

        addItem('experiences', {
            startingDate: "", endingDate: "", position: "Senior Surgeon", hospital: "AIIMs"
        })
    }

    const handleExperienceChange = (event, index) => {
        handleReusableInputChange("experiences", index, event)
    }

    const deleteExperienceChange = (e, index) => {
        e.preventDefault();
        deleteItem('experiences', index)
    }

    const addTimeSlot = (e) => {
        e.preventDefault()

        addItem('timeSlots', {
            day: "Sunday", startingTime: "10:00", endingTime: "04:30"
        })
    }

    const handleTimeSlotChange = (event, index) => {
        handleReusableInputChange("timeSlots", index, event)
    }

    const deleteTimeSlotChange = (e, index) => {
        e.preventDefault();
        deleteItem('timeSlots', index)
    }

    return (
        <div>
            <h2 className='text-headingColor font-bold text-[24px] leading-9 mb-10'
            >Profile Information
            </h2>

            <form>
                <div className='mb-5'>
                    <p className='from_label'>Name*</p>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder='Full Name'
                        className='form_input'
                    />

                </div>

                <div className='mb-5'>
                    <p className='from_label'>Email*</p>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder='Email'
                        className='form_input'
                        readOnly
                        aria-readonly
                        disabled={true}
                    />

                </div>

                <div className='mb-5'>
                    <p className='from_label'>Phone*</p>

                    <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder='Phone Number'
                        className='form_input'
                    />
                </div>

                <div className='mb-5'>
                    <p className='from_label'>Bio*</p>

                    <input
                        type="text"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder='Bio'
                        className='form_input'
                        maxLength={100}
                    />
                </div>

                <div className='mb-5'>
                    <div className='grid grid-cols-3 mb-[30px] gap-4'>
                        <div>
                            <p className='form_label'>Gender</p>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className='form_input py-3.5'
                            >
                                <option value="select">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>

                            </select>
                        </div>

                        <div>
                            <p className='form_label'>Specialization</p>
                            <select
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleInputChange}
                                className='form_input py-3.5'
                            >
                                <option value="select">Select</option>
                                <option value="surgeon">Surgeon</option>
                                <option value="neurologist">Neurologist</option>
                                <option value="dermatologist">Dermatologist</option>

                            </select>
                        </div>

                        <div>
                            <p className='form_label'>
                                Ticket Price
                            </p>
                            <input
                                type="number"
                                placeholder="100"
                                name="ticketPrice"
                                onChange={handleInputChange}
                                value={formData.ticketPrice}
                                className='form_input'
                            />
                        </div>
                    </div>
                </div>

                <div className='mb-5 border-b pb-6'>
                    <p className='form_label'>Qualifications*</p>
                    {formData.qualifications?.map((item, index) =>
                        <div key={index}>
                            <div>
                                <div className='grid grid-cols-2 gap-5'>
                                    <div>
                                        <p className='form_label'>Starting Date</p>
                                        <input
                                            type='date'
                                            name='startingDate'
                                            value={item.startingDate}
                                            className='form_input'
                                            onChange={e => handleQualificationChange(e, index)}

                                        />
                                    </div>

                                    <div>
                                        <p className='form_label'>Ending Date</p>
                                        <input
                                            type='date'
                                            name='endingDate'
                                            value={item.endingDate}
                                            className='form_input'
                                            onChange={e => handleQualificationChange(e, index)}
                                        />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-5 mt-5'>
                                    <div>
                                        <p className='form_label'>Degree*</p>
                                        <input
                                            type='text'
                                            name='degree'
                                            value={item.degree}
                                            className='form_input'
                                            onChange={e => handleQualificationChange(e, index)}
                                        />
                                    </div>
                                    <div>
                                        <p className='form_label'>University*</p>
                                        <input
                                            type='text'
                                            name='university'
                                            value={item.university}
                                            className='form_input'
                                            onChange={e => handleQualificationChange(e, index)}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={e => deleteQualificationChange(e, index)}
                                    className='bg-red-600 p-2 rounded-full
                                text-white text-[16px] mt-2 mb-[30px] cursor-pointer'>
                                    <AiOutlineDelete />
                                </button>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={addQualification}
                        className='bg-blue-600 hover:bg-blue-700 transition-all duration-200 py-2 px-5 text-white rounded h-fit cursor-pointer'>
                        Add Qualification
                    </button>
                </div>

                <div className='mb-5'>
                    <p className='form_label'>Experience*</p>
                    {formData.experiences?.map((item, index) =>
                        <div key={index}>
                            <div>
                                <div className='grid grid-cols-2 gap-5'>
                                    <div>
                                        <p className='form_label'>Starting Date</p>
                                        <input
                                            type='date'
                                            name='startingDate'
                                            value={item.startingDate}
                                            className='form_input'
                                            onChange={e => handleExperienceChange(e, index)}
                                        />
                                    </div>

                                    <div>
                                        <p className='form_label'>Ending Date</p>
                                        <input
                                            type='date'
                                            name='endingDate'
                                            value={item.endingDate}
                                            className='form_input'
                                            onChange={e => handleExperienceChange(e, index)}
                                        />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-5 mt-5'>
                                    <div>
                                        <p className='form_label'>Position</p>
                                        <input
                                            type='text'
                                            name='position'
                                            value={item.position}
                                            className='form_input'
                                            onChange={e => handleExperienceChange(e, index)}
                                        />
                                    </div>
                                    <div>
                                        <p className='form_label'>Hospital</p>
                                        <input
                                            type='text'
                                            name='hospital'
                                            value={item.hospital}
                                            className='form_input'
                                            onChange={e => handleExperienceChange(e, index)}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={e => deleteExperienceChange(e, index)}
                                    className='bg-red-600 p-2 rounded-full
                                text-white text-[16px] mt-2 mb-[30px] cursor-pointer'>
                                    <AiOutlineDelete />
                                </button>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={addExperience}
                        className='bg-blue-600 hover:bg-blue-700 transition-all duration-200 py-2 px-5 text-white rounded h-fit cursor-pointer'>
                        Add Experience
                    </button>
                </div>

                <div className='mb-5'>
                    <p className='form_label'>Time Slots*</p>
                    {formData.timeSlots?.map((item, index) => (
                        <div key={index}>
                            <div>
                                <div className='grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5'>
                                    <div>
                                        <p className='form_label'>Day</p>
                                        <select name="day" value={item.day} className='form_input py-3.5' onChange={e => handleTimeSlotChange(e, index)}>
                                            <option value="">Select a day</option>
                                            <option value="saturday">Saturday</option>
                                            <option value="sunday">Sunday</option>
                                            <option value="monday">Monday</option>
                                            <option value="tuesday">Tuesday</option>
                                            <option value="wednesday">Wednesday</option>
                                            <option value="thursday">Thursday</option>
                                            <option value="friday">Friday</option>
                                        </select>
                                    </div>

                                    <div>
                                        <p className='form_label'>Starting Time</p>
                                        <input
                                            type='time'
                                            name='startingTime'
                                            value={item.startingTime}
                                            className='form_input'
                                            onChange={e => handleTimeSlotChange(e, index)}
                                        />
                                    </div>
                                    <div>
                                        <p className='form_label'>Ending Time</p>
                                        <input
                                            type='time'
                                            name='endingTime'
                                            value={item.endingTime}
                                            className='form_input'
                                            onChange={e => handleTimeSlotChange(e, index)}
                                        />
                                    </div>

                                    <div
                                        onClick={e => deleteTimeSlotChange(e, index)}
                                        className='flex items-center'>
                                        <button
                                            className='bg-red-600 p-2 rounded-full
                                        text-white text-[16px] mt-6 mb-[30px] cursor-pointer'>
                                            <AiOutlineDelete />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}


                    <button
                        onClick={addTimeSlot}
                        className='bg-blue-600 hover:bg-blue-700 transition-all duration-200 py-2 px-5 text-white rounded h-fit cursor-pointer'>
                        Add Time slot
                    </button>

                </div>

                <div className="mb-5">
                    <p className='form_label'>About</p>
                    <textarea name='about'
                        rows={5}
                        value={formData.about}
                        placeholder='Write About You'
                        className='form_input'
                        onChange={handleInputChange}>
                    </textarea>
                </div>

                <div className='mb-5 flex items-center gap-3'>
                    {formData.photo && (
                        <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor
                                      flex items-center justify-center">
                            <img
                                src={formData?.photo}
                                alt={formData.name || "profile preview"}
                                className="w-full h-full object-cover rounded-full"

                            />
                        </figure>
                    )}

                    <div className="relative w-[130px] h-[50px]">
                        <input
                            type='file'
                            name='photo'
                            id='customFile'
                            accept=".jpg,.jpeg, .png"
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleFileInputChange}
                        />

                        <label
                            htmlFor="customFile"
                            className="absolute top-0 left-0 w-full h-full
                                    flex items-center px-[0.75rem] py-[0.37rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46]
                                     text-headingColor font-semibold rounded-lg truncate cursor-pointer">
                            Upload Photo
                        </label>
                    </div>
                </div>

                <div className="mt-7">
                    <button
                        type='submit'
                        onClick={handleProfileUpdate}
                        className="bg-primaryColor text-center text-white
                                    text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg flex justify-center items-center gap-2"
                        disabled={isLoading}
                    >
                        {isLoading ? <HashLoader size={20} color="#ffffff" /> : "Update Profile"}
                    </button>
                </div>
            </form >
        </div >
    )
}

export default DoctorProfile

















