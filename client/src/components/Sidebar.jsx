import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
    return (
        <aside className={`bg-white shadow-lg p-4 w-64 fixed top-0 left-0 h-full z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
            <div className="mb-6">
                <img src="/profile.jpg" alt="Profile" className="w-24 h-24 rounded-full mx-auto" />
                <h2 className="text-center mt-2 text-lg font-semibold">Patient Name</h2>
            </div>
            <ul className="space-y-2">
                <li><Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 rounded">Profile</Link></li>
                <li><Link to="/" className="block px-4 py-2 hover:bg-gray-100 rounded">Dashboard</Link></li>
                <li><Link to="/book" className="block px-4 py-2 hover:bg-gray-100 rounded">Book Appointment</Link></li>
                <li><Link to="/appointments" className="block px-4 py-2 hover:bg-gray-100 rounded">My Appointments</Link></li>
                <li><Link to="/services" className="block px-4 py-2 hover:bg-gray-100 rounded">Services</Link></li>
                <li><button className="block px-4 py-2 w-full text-left hover:bg-gray-100 rounded">Logout</button></li>
            </ul>
        </aside>
    );
};

export default Sidebar;
