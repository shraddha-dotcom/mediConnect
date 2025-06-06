
import img1 from "../assets/doc1.png";
import img2 from "../assets/doc4.png";
import icon1 from "../assets/icon01.png";
import icon2 from "../assets/icon02.png";
import icon3 from "../assets/icon03.png";
import featureImg from "../assets/feature.jpg"
import { Link } from 'react-router-dom';
import { BiArrowToRight } from 'react-icons/bi';
import About from "../components/About"
import ServiceList from '../components/Services/ServiceList';
import DoctorList from './Doctors/DoctorList';
import FaqList from "../components/Faq/FaqList";


const Dashboard = () => {
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
                            <Link to="/doctors">
                                <button className="btn mt-6">Request an Appointment</button>
                            </Link>

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





            {/* <section className="mt-20">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
                    <div className="hidden md:block md:w-1/2">
                        <img src={img1} alt="FAQ Illustration" className="rounded-lg shadow-md" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="heading mb-6">Most questions asked by patients</h2>
                        <FaqList />
                    </div>
                </div>
            </section> */}
        </>
    );
};

export default Dashboard;



// const Dashboard = () => {
//     return (
//         <>
//             {/* hero section */}
//             <section className='hero_section pt-[60px]'>
//                 <div className="container">
//                     <div className='flex items-center'>
//                         {/* hero content */}
//                         <div>
//                             <div className='lg:w-[768px]'>
//                                 <h1 className='text-[36px] leading-[46px] text-headingColor font-bold
//                             md:text-[60px] md:leading-[70px] '>
//                                     We help patients
//                                     live a healthy,
//                                     longer life.
//                                 </h1>
//                                 <p className='text_para'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                                     A error in explicabo iusto veniam libero ratione culpa aliquam at non.
//                                 </p>
//                                 <Link to="/doctors">
//                                     <button className='btn'>Request an Appointment</button>
//                                 </Link>


//                             </div>

//                             {/* hero counter */}
//                             <div className='mt-8 flex items-center gap-4'>
//                                 <div>
//                                     <h2 className='text-sm leading-2 font-semibold text-headingColor'>30+</h2>
//                                     <span className='w-8 h-2 bg-yellowColor rounded-full block'></span>
//                                     <p className='text_para'>Years of Experience</p>
//                                 </div>

//                                 <div>
//                                     <h2 className='text-sm leading-2 font-semibold text-headingColor'>15+</h2>
//                                     <span className='w-8 h-2 bg-purpleColor rounded-full block '></span>
//                                     <p className='text_para'>Clinic Location</p>
//                                 </div>

//                                 <div>
//                                     <h2 className='text-sm leading-2 font-semibold text-headingColor'>100%</h2>
//                                     <span className='w-8 h-2 bg-irisBlueColor rounded-full block '></span>
//                                     <p className='text_para'>Patient Satisfaction</p>
//                                 </div>


//                             </div>
//                         </div>

//                         {/* right hero section */}
//                         <div className='flex gap-[30px] justify-end'>
//                             <img src={img1} alt="hero image" className='w-full h-96' />

//                         </div>
//                         <div className='mt-[30px]'>
//                             <img src={img2} alt="hero img2" className='w-full h-96' />
//                         </div>

//                     </div>
//                 </div>
//             </section>

//             {/* hero section end */}
//             <section>
//                 <div className="container">
//                     <div className='mx-auto'>
//                         <h2 className='heading text-center'>Providing the best medical services</h2>
//                         <p className='text_para text-center'>
//                             World-class care for everyone. Our health system offers unmatched, expert health care.
//                         </p>
//                     </div>

//                     <div className='grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>

//                         {/* Card 1 */}
//                         <div className='py-[30px] px-5 shadow-md rounded-lg'>
//                             <div className='flex items-center justify-center'>
//                                 <img src={icon1} alt="icon1" />
//                             </div>
//                             <div className='mt-[30px] text-center'>
//                                 <h2 className='text-[26px] leading-9 text-headingColor font-[700]'>Find a Doctor</h2>
//                                 <p className='text-[16px] leading-7 text-textColor font-[400] mt-4'>
//                                     World-class care for everyone. Our health system offers unmatched, expert health care.
//                                     From the lab to the clinic.
//                                 </p>
//                                 <Link to="/doctors"
//                                     className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E]
//             mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
//                                     <BiArrowToRight className='group-hover:text-white w-6 h-4' />
//                                 </Link>
//                             </div>
//                         </div>

//                         {/* Card 2 */}
//                         <div className='py-[30px] px-5 shadow-md rounded-lg'>
//                             <div className='flex items-center justify-center'>
//                                 <img src={icon2} alt="icon2" />
//                             </div>
//                             <div className='mt-[30px] text-center'>
//                                 <h2 className='text-[26px] leading-9 text-headingColor font-[700]'>Find Location</h2>
//                                 <p className='text-[16px] leading-7 text-textColor font-[400] mt-4'>
//                                     World-class care for everyone. Our health system offers unmatched, expert health care.
//                                     From the lab to the clinic.
//                                 </p>
//                                 <a href="https://www.google.com/maps/place/All+India+Institute+Of+Medical+Sciences+Delhi/@28.5673365,77.2089749,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce26f903969d7:0x8367180c6de2ecc2!8m2!3d28.5673365!4d77.2089749!16s%2Fm%2F0lq5p3v?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D"
//                                     className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E]
//                                          mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
//                                     <BiArrowToRight className='group-hover:text-white w-6 h-4' />
//                                 </a>
//                             </div>
//                         </div>

//                         {/* Card 3 */}
//                         <div className='py-[30px] px-5 shadow-md rounded-lg'>
//                             <div className='flex items-center justify-center'>
//                                 <img src={icon3} alt="icon3" />
//                             </div>
//                             <div className='mt-[30px] text-center'>
//                                 <h2 className='text-[26px] leading-9 text-headingColor font-[700]'>Book Appointment</h2>
//                                 <p className='text-[16px] leading-7 text-textColor font-[400] mt-4'>
//                                     World-class care for everyone. Our health system offers unmatched, expert health care.
//                                     From the lab to the clinic.
//                                 </p>
//                                 <Link to="/doctors"
//                                     className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E]
//                                     mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
//                                     <BiArrowToRight className='group-hover:text-white w-6 h-4' />
//                                 </Link>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </section>

//             {/* About section */}
//             <About />

//             {/* Services section */}

//             <section>
//                 <div className='container'>
//                     <div className='xl:w-[470px] mx-auto'>
//                         <h2 className='heading text-center'>Our Medical Services</h2>
//                         <p className='text_para text-center'>world-class for everyone.
//                             Our health system offers unmatched expert health care.
//                         </p>
//                     </div>

//                     <ServiceList />

//                     {/* Feature section */}
//                     <div className="container mt-[55px]">
//                         <div className='flex items-center justify-between flex-col lg:flex-row'>
//                             {/* feature content */}
//                             <div className='xl:w-[678px]'>
//                                 <h2 className='heading'>
//                                     Get virtual treatment <br /> anytime.
//                                 </h2>

//                                 <ul className='pl-4 leading-9'>
//                                     <li className="text_para">
//                                         1. Schedule the appointment directly.
//                                     </li>
//                                     <li className='text_para'>
//                                         2. Search for your physician here, and connect their office.
//                                     </li>
//                                     <li className='text_para'>
//                                         3. View our physicians who are accepting new patients, use the online scheduling tool to select an appointment time.
//                                     </li>
//                                 </ul>
//                                 <Link to="/">
//                                     <button className="btn">Learn more</button>
//                                 </Link>
//                                 {/* img */}

//                             </div>
//                             <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg-mt-0">
//                                 <img src={featureImg} alt="feture img"
//                                     className="w-3/4" />
//                             </div>

//                         </div>

//                     </div>


//                 </div>
//             </section>

//             {/* our doctors */}
//             <section>
//                 <div className="container">
//                     <div className='xl:w-[470px] mx-auto'>
//                         <h2 className='heading text-center'>
//                             Our Doctors
//                         </h2>
//                         <p className='text_para text-center'>
//                             World-class care for evrryone. Our health system offers unmatched, expert health care.
//                         </p>
//                     </div>
//                     <DoctorList />
//                 </div>
//             </section>

//             {/* faq section */}
//             <section>
//                 <div className="container">
//                     <div className='flex justify-between gap-[50px] lg:gap-0'>
//                         <div className='w-1/2 hidden md:block'>
//                             <img src={img1} alt="image" />
//                         </div>
//                         <div className='w-full md:w-1/2'>
//                             <h2 className='heading'>
//                                 Most questions asked by patients
//                             </h2>

//                             <FaqList />
//                         </div>
//                     </div>
//                 </div>
//             </section>


//         </>
//     )
// }

// export default Dashboard

