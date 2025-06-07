import signUpImg from "../../assets/signup.gif"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners"


const Signup = () => {
    const [previewUrl, setPreviewUrl] = useState("")
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        photo: "",
        gender: "select",
        role: "patient"
    });

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        // console.log(file)
        if (!file) return;
        try {
            setLoading(true); // Start loader

            const imageUrl = await uploadImageToCloudinary(file);

            setPreviewUrl(imageUrl);
            setFormData({ ...formData, photo: imageUrl });
        } catch (error) {
            toast.error("Image upload failed");
            console.error(error);
        } finally {
            setLoading(false); // End loader
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log("Signup data:", formData);


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

            const res = await fetch(`${BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(formData)
            })

            const result = await res.json()

            if (!res.ok) {
                throw new Error(result?.message || "signup failed")

            }


            toast.success(result?.message || "Signup successful")
            setLoading(false)
            navigate("/login")

        } catch (err) {
            toast.error(err.message)
            setLoading(false)

        }
    }

    return (
        <section className='px-5 xl:px-0'>
            <div className='max-w-[1170px] mx-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-2'>

                    {/* left side image */}
                    <div className='hidden lg:block bg-primaryColor rounded-l-lg'>
                        <figure className='rounded-l-lg'>
                            <img src={signUpImg} alt="image"
                                className="w-full rounded-l-lg" />
                        </figure>
                    </div>

                    {/* signup form */}
                    <div className="rounded-l-lg lg:pl-6 py-10">
                        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">Create an
                            <span className="text-primaryColor"> account</span>
                        </h3>

                        <form onSubmit={handleSubmit}>
                            <div className='mb-5'>
                                <input
                                    data-testid="name-input"
                                    type='text'
                                    placeholder='Enter Your Name'
                                    name='name'
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className='w-full pr-4 py-3 px-1 border-b border-solid border-[#0066ff61] focus:outline-none
                                        focus:border-b-primaryColor text-[16px] leading-7 text-textCOlor 
                                        placeholder:text-textCOlor rounded-md cursor-pointer'
                                    required
                                />

                            </div>

                            <div className='mb-5'>
                                <input
                                    data-testid="email-input"
                                    type='email'
                                    placeholder='Enter Your email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className='w-full pr-4 py-3 px-1 border-b border-solid border-[#0066ff61] focus:outline-none
                                        focus:border-b-primaryColor text-[16px] leading-7 text-textCOlor 
                                        placeholder:text-textCOlor rounded-md cursor-pointer'
                                    required
                                />

                            </div>
                            <div className='mb-5'>
                                <input
                                    data-testid="password-input"
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

                            <div className="mb-5 flex items-center justify-between">
                                <label htmlFor="" className="text-headingColor font-bold text-[16px] leading-7">
                                    Are you a:
                                    <select
                                        data-testid="gender-select"
                                        name="role"
                                        className="text-textCOlor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                    >
                                        <option value='patient'>Patient</option>
                                        <option value='doctor'>Doctor</option>

                                    </select>
                                </label>

                                <label className="text-headingColor font-bold text-[16px] leading-7">
                                    Gender:
                                    <select
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
                                {previewUrl && (
                                    <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor
                                     flex items-center justify-center">
                                        <img
                                            src={previewUrl}
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
                                        {loading ? <HashLoader size={25} color="#ffffff" /> : " Upload Photo"}
                                    </label>
                                </div>
                            </div>

                            <div className='mt-7'>
                                <button
                                    data-testid="submit-button"
                                    disabled={loading}
                                    type='submit'
                                    className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg py-3 flex justify-center'
                                >
                                    {loading ? <HashLoader size={25} color="#ffffff" /> : " Sign Up"}
                                </button>
                            </div>
                            <p className='mt-5 text-textCOlor text-center'>
                                Already have an account?
                                <Link to="/login"
                                    className="text-primaryColor font-medium ml-1">
                                    Login
                                </Link>
                            </p>


                        </form>
                    </div>
                </div>
            </div >

        </section >
    )
}

export default Signup






















