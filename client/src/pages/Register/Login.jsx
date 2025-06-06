import { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import { AuthContext } from "../../context/AuthContext";
import { HashLoader } from 'react-spinners';

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const { dispatch } = useContext(AuthContext)

    const handleInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        // console.log("login data:", formData)
        try {

            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(formData)
            })

            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.message)

            }

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                    user: result.data,
                    token: result.token,
                    role: result.role,
                }
            })
            console.log("login data:", result)

            setLoading(false)
            toast.success(result.message)
            navigate("/dashboard")

        } catch (err) {
            toast.error(err.message)
            setLoading(false)

        }
    }


    return (
        <section className='px-5 lg:px-0'>
            <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10'>
                <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10 '>Hello!
                    <span className='text-primaryColor'> Welcom</span> Back
                </h3>

                <form className='py-4 md:py-0' onSubmit={handleSubmit}>
                    <div className='mb-5'>
                        <input
                            data-testid="email-input"
                            type='email'
                            placeholder='Enter Your Email'
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            className='w-full py-3 px-1 border-b border-solid border-[#0066ff61] focus:outline-none
                            focus:border-b-primaryColor text-[16px] leading-7 text-textCOlor 
                            placeholder:text-textCOlor rounded-md cursor-pointer'
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

                    <div className='mt-7'>
                        <button
                            data-testid="login-button"
                            type='submit'
                            className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg py-3'
                        >
                            {loading ? <HashLoader size={25} color='#ffffff' /> : 'Login'}
                        </button>
                    </div>
                    <p className='mt-5 text-textCOlor text-center'>Don&apos;t have an account?
                        <Link to="/signup"
                            className="text-primaryColor font-medium ml-1">
                            Register
                        </Link>
                    </p>

                </form>
            </div >

        </section >
    )
}

export default Login
































