import { AiFillGithub, AiFillInstagram, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import logo from "../assets/medilogo.jpg";
import { Link } from "react-router-dom";


const socialLinks = [
    {
        path: "https://www.youtube.com",
        icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" />
    },
    {
        path: "https://www.github.com",
        icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />
    },
    {
        path: "https://www.instagram.com",
        icon: <AiFillInstagram className="group-hover:text-white w-4 h-5" />
    },
    {
        path: "https://www.linkedin.com",
        icon: <AiFillLinkedin className="group-hover:text-white w-4 h-5" />
    },

]

const quickLinks01 = [
    {
        path: "/dashboard",
        display: "Home"
    },
    {
        path: "/about",
        display: "About Us"
    },
    {
        path: "/doctors",
        display: "Find a doctor"
    },
    {
        path: "/doctors",
        display: "Request an appointment"
    },
]

const quickLinks02 = [
    {
        path: "/",
        display: "Donate"
    },
    {
        path: "/Contact",
        display: "Contact US"
    },

]
const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer py-12 text-textColor">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between flex-wrap gap-10">
                    {/* Logo & About */}
                    <div className="max-w-sm">
                        <Link to="/dashboard" data-testid="footer-logo">
                            <img src={logo} alt="Logo" className="w-[250px] h-[250px] object-contain bg-transparent mix-blend-multiply pb-32 " />
                        </Link>

                        <p data-testid="footer-copy"
                            className="text-base leading-7 font-[400] mt-4 ">
                            © {year} Developed by Shraddha. All rights reserved.
                        </p>

                        {/* Social Icons */}
                        <div data-testid="social-links"
                            className="flex items-center gap-3 mt-6">
                            {socialLinks.map((link, index) => (
                                <Link
                                    to={link.path}
                                    key={index}
                                    className="w-10 h-10 border border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-transparent transition-colors"
                                    data-testid={`social-link-${index}`}
                                >
                                    {link.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h2 className="text-xl font-bold text-headingColor mb-4">Quick Links</h2>
                        <ul data-testid="quick-links">
                            {quickLinks01.map((item, index) => (
                                <li key={index} className="mb-3">
                                    <Link
                                        to={item.path}
                                        className="text-base hover:text-primaryColor transition-colors"
                                        data-testid={`quick-link-${index}`}
                                    >
                                        {item.display}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h2 className="text-xl font-bold text-headingColor mb-4">Support</h2>
                        <ul data-testid="support-links">
                            {quickLinks02.map((item, index) => (
                                <li key={index} className="mb-3">
                                    <Link
                                        to={item.path}
                                        className="text-base hover:text-primaryColor transition-colors"
                                        data-testid={`support-link-${index}`}
                                    >
                                        {item.display}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;