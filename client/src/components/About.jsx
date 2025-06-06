
import about from "../assets/about.png"
import aboutCard from "../assets/aboutCard.png";
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <section>
            <div id="About" className='container'>
                <div className='flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col
            lg:flex-row'>

                    {/* aboutimg */}
                    <div className='relative w-3/4 lg:w-1/2 xl:w-[770px]
                    z-10 order-2 lg:order-1'
                    >
                        <img src={about} alt="about" />
                        <div className='absolute z-20 bottom-4 w-[200px] md:w-[300px]
                        right-[-30%] md:right-[-7%] lg:right-[22%]'>
                            <img src={aboutCard} alt="" />
                        </div>

                    </div>

                    {/* about content */}
                    <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2'>
                        <h2 className='heading'>
                            Proud to be one of the nations best
                        </h2>
                        <p className='text_para'>
                            For 30 years in a row, Global report has recognized us one of the best public hospitals in the Nations.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, tenetur!
                        </p>
                        <p className='text_para mt-[30px]'>
                            Our best is something we strive for each day, caring for or patient not looking back at what
                            we accomplished but towards what we can do tommorow. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, distinctio.
                        </p>

                        <Link to="/">
                            <button className="btn">Learn More</button>
                        </Link>

                    </div>

                </div>
            </div>

        </section>
    )
}

export default About
