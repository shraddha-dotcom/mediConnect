import { NavLink, Link } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { BiMenu } from "react-icons/bi"
import logo from "../assets/medilogo.jpg";
import { AuthContext } from '../context/AuthContext';

const navLinks = [
    {
        path: "/dashboard",
        display: "Home"
    },
    {
        path: "/doctors",
        display: "Doctors"
    },
    {
        path: "/services",
        display: "Services"
    },
    {
        path: "/contact",
        display: "Contact"
    },
]

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const headerRef = useRef(null)
    const { user, role, token } = useContext(AuthContext)

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };


    return (
        <header
            ref={headerRef}
            className="fixed top-0 left-0 z-[9999] w-full bg-white shadow-md transition-all duration-300 ease-in-out"
        >
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/dashboard">
                        <img
                            src={logo}
                            alt="logo"
                            className="w-[120px] h-auto object-contain"
                            data-testid="logo"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center gap-6" data-testid="desktop-menu">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-primaryColor font-semibold"
                                            : "text-gray-600 font-medium hover:text-primaryColor transition"
                                    }
                                >
                                    {link.display}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Right: User or Login */}
                    <div className="flex items-center gap-4">
                        {token && user ? (
                            <Link to={role === "doctor" ? "/doctors/profile/me" : "/users/profile/me"}>
                                <div className="flex items-center gap-2">
                                    <figure className="w-9 h-9 rounded-full overflow-hidden border border-gray-300">
                                        <img
                                            src={user?.photo}
                                            alt="profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </figure>
                                    <span className="text-sm font-medium text-gray-800">{user?.name}</span>
                                </div>
                            </Link>
                        ) : (
                            <Link to="/login">
                                <button
                                    data-testid="login-button"
                                    className="bg-primaryColor text-white font-semibold px-5 py-2 rounded-full hover:opacity-90 transition"
                                >
                                    Login
                                </button>
                            </Link>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button onClick={toggleMenu} className="md:hidden" data-testid="menu-toggle">
                            <BiMenu className="w-6 h-6 text-gray-800" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-[9998] bg-black bg-opacity-50 md:hidden"
                    onClick={toggleMenu}
                >
                    <ul
                        data-testid="mobile-menu"
                        className={`absolute top-0 right-0 w-64 h-full bg-white flex flex-col items-center justify-center gap-6 shadow-lg transition-transform transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-primaryColor font-semibold"
                                            : "text-gray-700 font-medium hover:text-primaryColor"
                                    }
                                    onClick={toggleMenu}
                                >
                                    {link.display}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;

//     return (
//         <header className="header flex items-center w-full fixed top-0 left-0 z-[9999] shadow-md transition-all duration-300 ease-in-out" ref={headerRef}>
//             <div className='container'>
//                 <div className='flex items-center justify-between'>
//                     {/* logo */}
//                     <Link to="/dashboard">
//                         <img src={logo} alt="logo"
//                             className='w-[250px] h-[250px] object-contain bg-transparent mix-blend-multiply mt-4 mb-0 p-0'
//                             data-testid="logo" />
//                     </Link>


//                     {/* Desktop menu */}
//                     <ul className="hidden md:flex items-center gap-6" data-testid="desktop-menu">
//                         {navLinks.map((link, index) => (
//                             <li key={index}>
//                                 <NavLink
//                                     to={link.path}
//                                     className={({ isActive }) =>
//                                         isActive
//                                             ? 'text-primaryColor text-[16px] leading-7 font-[600]'
//                                             : 'text-textColor text-[16px] leading-7 font-[600] hover:text-primaryColor'
//                                     }
//                                 >
//                                     {link.display}
//                                 </NavLink>
//                             </li>
//                         ))}
//                     </ul>

//                     {/* Overlay */}
//                     {isMenuOpen && (
//                         <div
//                             className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 md:hidden"
//                             onClick={toggleMenu}
//                         >
//                             {/* Sidebar */}
//                             <ul data-testid="mobile-menu"
//                                 className={`absolute top-0 right-0 w-[15rem] h-full bg-white z-50 flex flex-col justify-center items-center gap-6
//                                      transition-transform duration-300 ease-in-out transform
//                               ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
//                                 onClick={(e) => e.stopPropagation()}
//                             >
//                                 {navLinks.map((link, index) => (
//                                     <li key={index}>
//                                         <NavLink
//                                             to={link.path}
//                                             className={({ isActive }) =>
//                                                 isActive
//                                                     ? 'text-primaryColor text-[16px] leading-7 font-[600]'
//                                                     : 'text-textColor text-[16px] leading-7 font-[600] hover:text-primaryColor'}
//                                         >
//                                             {link.display}
//                                         </NavLink>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}


//                     {/* nav right */}

//                     <div className='flex items-center gap-4'>

//                         {
//                             token && user ?
//                                 (
//                                     <div className="flex items-center gap-2">
//                                         <Link to={`${role === 'doctor' ? '/doctors/profile/me' : '/users/profile/me'}`}>
//                                             <div className="flex items-center gap-2">
//                                                 <figure className="w-[35px] h-[35px] rounded-full overflow-hidden cursor-pointer border border-gray-300">
//                                                     <img
//                                                         src={user?.photo}
//                                                         alt="profile"
//                                                         className="w-full h-full object-cover"
//                                                     />
//                                                 </figure>
//                                                 <h2 className="text-[14px] font-semibold text-gray-700">{user?.name}</h2>
//                                             </div>
//                                         </Link>
//                                     </div>) : (
//                                     <Link to='/login'>
//                                         <button data-testid="login-button"
//                                             className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex
//                                               items-center justify-center rounded-[50px]'>
//                                             Login
//                                         </button>
//                                     </Link>
//                                 )}


//                         <span className='md:hidden' onClick={toggleMenu} data-testid="menu-toggle">
//                             <BiMenu className='w-6 h-6 cursor-pointer text-black' />
//                         </span>

//                     </div>
//                 </div>

//             </div>

//         </header>
//     );
// };

// export default Header;