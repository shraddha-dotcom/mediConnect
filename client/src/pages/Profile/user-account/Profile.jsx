import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import uploadImageToCloudinary from "../../../utils/uploadCloudinary";
import { BASE_URL } from "../../../config";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners"
import { AuthContext } from "../../../context/AuthContext";

const Profile = ({ user }) => {
    const { token } = useContext(AuthContext)

    const [selectedFile, setSelectedFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        photo: null,
        gender: "",
        bloodType: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                photo: user.photo,
                gender: user.gender || "select",
                bloodType: user.bloodType
            })
        }
    }, [user])

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        // console.log(file)

        const data = await uploadImageToCloudinary(file);
        // console.log(data)
        // setSelectedFile(data.url);

        setFormData({ ...formData, photo: data.url });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log("profile data:", formData);

        if (!user || !user._id) {
            toast.error("User not loaded. Please refresh and try again.");
            setLoading(false);
            return;
        }


        if (!formData.email) {
            toast.error("Email is missing. Please refresh the page.");
            setLoading(false);
            return;
        }

        if (formData.gender === "select") {
            toast.error("Please select your gender.");
            setLoading(false);
            return;
        }

        if (!formData.photo) {
            toast.error("Please upload a profile photo.");
            setLoading(false);
            return;
        }


        try {

            const res = await fetch(`${BASE_URL}/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            })

            const result = await res.json()

            if (!res.ok) {
                throw new Error(result?.message || "update failed")

            }


            toast.success(result?.message || "Profile updated")

            navigate("/users/profile/me")

        } catch (err) {
            toast.error(err.message)
            setLoading(false)

        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="mt-10">
            <form onSubmit={handleSubmit}>
                <div className='mb-5'>
                    <input
                        data-testid="input-name"
                        type='text'
                        placeholder='Enter Your Name'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        className='w-full pr-4 py-3 px-1 border-b border-solid border-[#0066ff61] focus:outline-none
                         focus:border-b-primaryColor text-[16px] leading-7 text-textCOlor 
                         placeholder:text-textCOlor rounded-md cursor-pointer'

                    />

                </div>

                <div className='mb-5'>
                    <input
                        data-testid="input-email"
                        type='email'
                        placeholder='Enter Your email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        className='w-full pr-4 py-3 px-1 border-b border-solid border-[#0066ff61] focus:outline-none
                                        focus:border-b-primaryColor text-[16px] leading-7 text-textCOlor 
                                        placeholder:text-textCOlor rounded-md cursor-pointer'
                        aria-readonly
                        readOnly
                    />

                </div>
                <div className='mb-5'>
                    <input
                        data-testid="input-password"
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                        className='w-full py-3 px-1 border-b border-solid border-[#0066ff61] focus:outline-none
                                    focus:border-b-primaryColor text-[16px] leading-7 text-textCOlor 
                                    placeholder:text-textCOlor rounded-md cursor-pointer'
                    />
                </div>

                <div className='mb-5'>
                    <input
                        data-testid="input-bloodType"
                        type='text'
                        placeholder='Blood Type'
                        name='bloodType'
                        value={formData.bloodType}
                        onChange={handleInputChange}
                        className='w-full pr-4 py-3 px-1 border-b border-solid border-[#0066ff61] focus:outline-none
                                        focus:border-b-primaryColor text-[16px] leading-7 text-textCOlor 
                                        placeholder:text-textCOlor rounded-md cursor-pointer'

                    />

                </div>

                <div className="mb-5 flex items-center justify-between">

                    <label className="text-headingColor font-bold text-[16px] leading-7">
                        Gender:
                        <select
                            data-testid="select-gender"
                            name="gender"
                            className="text-headingColor font-semibold text-[15px] left-7 px-4 py-3 focus:outline-none"
                            value={formData.gender}
                            onChange={handleInputChange}
                        >
                            <option value='select'>Select</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                            <option value='other'>Other</option>
                        </select>
                    </label>
                </div>

                <div className="mb-5 flex items-center gap-3">
                    {formData.photo && (
                        <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor
                                     flex items-center justify-center">
                            <img

                                src={formData.photo}
                                alt=""
                                className="w-full h-full object-cover rounded-full"
                            />
                        </figure>
                    )}

                    <div className="relative w-[130px] h-[50px]">
                        <input
                            data-testid="input-photo"
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
                            {selectedFile ? selectedFile.name : "Upload Photo"}
                        </label>
                    </div>
                </div>

                <div className='mt-7'>
                    <button
                        data-testid="update-button"
                        disabled={loading}
                        type='submit'
                        className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg py-3 flex justify-center'
                    >
                        {loading ? <HashLoader size={25} color="#ffffff" /> : " Update"}
                    </button>
                </div>


            </form>
        </div>



    )
}

export default Profile
