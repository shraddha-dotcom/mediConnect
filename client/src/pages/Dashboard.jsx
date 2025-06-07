import img1 from "../assets/doc1.png";
import img2 from "../assets/doc4.png";
import icon1 from "../assets/icon01.png";
import icon2 from "../assets/icon02.png";
import icon3 from "../assets/icon03.png";
import featureImg from "../assets/feature.jpg"
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowToRight } from 'react-icons/bi';
import About from "../components/About"
import ServiceList from '../components/Services/ServiceList';
import DoctorList from './Doctors/DoctorList';
import FaqList from "../components/Faq/FaqList";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


const Dashboard = () => {
    const { token } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleRequestClick = () => {
        if (!token) {
            toast.error("Please login first");
            navigate("/login");
        } else {
            navigate("/doctors");
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section className="hero_section pt-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                        {/* Left Content */}
                        <div className="lg:w-1/2 max-w-xl">
                            <h1 className="text-3xl md:text-5xl font-bold text-headingColor leading-tight md:leading-snug">
                                We help patients live a healthy, longer life.
                            </h1>
                            <p className="mt-4 text-textColor text-base md:text-lg max-w-md">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. A error in explicabo iusto veniam libero ratione culpa aliquam at non.
                            </p>

                            <button className="btn mt-6" onClick={handleRequestClick}>Request an Appointment</button>


                            {/* Hero counters */}
                            <div className="mt-10 flex gap-8 md:gap-12">
                                {[
                                    { count: "30+", label: "Years of Experience", color: "bg-yellowColor" },
                                    { count: "15+", label: "Clinic Location", color: "bg-purpleColor" },
                                    { count: "100%", label: "Patient Satisfaction", color: "bg-irisBlueColor" },
                                ].map(({ count, label, color }) => (
                                    <div key={label} className="text-center">
                                        <h2 className="text-lg font-semibold text-headingColor">{count}</h2>
                                        <span className={`${color} w-10 h-2 block rounded-full mx-auto my-1`}></span>
                                        <p className="text-textColor text-sm">{label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Images */}
                        <div className="flex gap-[30px] justify-end flex-wrap md:flex-nowrap mt-[30px]">
                            <img src={img1} alt="hero image 1" className="w-full md:w-1/2 max-h-[400px] object-contain flex-shrink-0" />
                            <img src={img2} alt="hero image 2" className="w-full md:w-1/2 max-h-[400px] object-contain flex-shrink-0" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Medical Services Intro */}
            <section className="mt-12">
                <div className="container px-4 text-center max-w-3xl mx-auto">
                    <h2 className="heading mb-3">Providing the best medical services</h2>
                    <p className="text_para">
                        World-class care for everyone. Our health system offers unmatched, expert health care.
                    </p>
                </div>

                {/* Cards */}
                <div className="container mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[{
                        icon: icon1,
                        title: "Find a Doctor",
                        desc: "World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the clinic.",
                        link: "/doctors",
                    }, {
                        icon: icon2,
                        title: "Find Location",
                        desc: "World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the clinic.",
                        link: "https://www.google.com/maps/place/All+India+Institute+Of+Medical+Sciences+Delhi",
                        external: true,
                    }, {
                        icon: icon3,
                        title: "Book Appointment",
                        desc: "World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the clinic.",
                        link: "/doctors",
                    }].map(({ icon, title, desc, link, external }, i) => (
                        <div key={i} className="py-8 px-6 shadow-md rounded-lg flex flex-col items-center text-center">
                            <img src={icon} alt={`icon${i + 1}`} className="mb-6" />
                            <h3 className="text-xl font-semibold text-headingColor">{title}</h3>
                            <p className="text-textColor mt-3">{desc}</p>
                            {external ? (
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-8 w-11 h-11 rounded-full border border-gray-900 flex items-center justify-center group hover:bg-primaryColor hover:border-transparent transition"
                                >
                                    <BiArrowToRight className="text-gray-900 group-hover:text-white w-6 h-4" />
                                </a>
                            ) : (
                                <Link
                                    to={link}
                                    className="mt-8 w-11 h-11 rounded-full border border-gray-900 flex items-center justify-center group hover:bg-primaryColor hover:border-transparent transition"
                                >
                                    <BiArrowToRight className="text-gray-900 group-hover:text-white w-6 h-4" />
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* About Section */}
            <About />

            {/* Services Section */}
            <section className="mt-12">
                <div className="container px-4 max-w-xl text-center mx-auto">
                    <h2 className="heading">Our Medical Services</h2>
                    <p className="text_para">
                        World-class for everyone. Our health system offers unmatched expert health care.
                    </p>
                </div>

                <ServiceList />

                {/* Feature Section */}
                <div className="container mx-auto px-4 mt-14 flex flex-col lg:flex-row items-center gap-10">
                    <div className="lg:w-1/2">
                        <h2 className="heading mb-6">
                            Get virtual treatment <br /> anytime.
                        </h2>
                        <ul className="list-disc pl-5 space-y-2 text-textColor text-base">
                            <li>Schedule the appointment directly.</li>
                            <li>Search for your physician here, and connect their office.</li>
                            <li>View our physicians who are accepting new patients, use the online scheduling tool to select an appointment time.</li>
                        </ul>
                        <Link to="/">
                            <button className="btn mt-6">Learn more</button>
                        </Link>
                    </div>
                    <div className="lg:w-1/2 flex justify-center">
                        <img src={featureImg} alt="feature" className="w-full max-w-lg rounded-lg shadow-md" />
                    </div>
                </div>
            </section>

            {/* Our Doctors */}
            <section className="mt-12">
                <div className="container  px-4 max-w-xl text-center mx-auto">
                    <h2 className="heading">Our Doctors</h2>
                    <p className="text_para">
                        World-class care for everyone. Our health system offers unmatched, expert health care.
                    </p>
                </div>
                <DoctorList />
            </section>

            {/* FAQ Section */}
            <section className="mt-6">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
                    {/* Image Container */}
                    <div className="hidden md:block md:w-1/2">
                        <img
                            src={img1}
                            alt="FAQ Illustration"
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* FAQ List */}
                    <div className="w-full md:w-1/2">
                        <h2 className="heading mb-6 text-3xl font-semibold text-center md:text-left">
                            Most questions asked by patients
                        </h2>
                        <FaqList />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Dashboard;



