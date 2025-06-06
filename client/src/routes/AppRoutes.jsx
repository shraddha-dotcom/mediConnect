import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Contact from '../pages/Contact';
import Doctors from '../pages/Doctors/Doctors';
import DoctorDetails from '../pages/Doctors/DoctorDetails';
import Login from '../pages/Register/Login';
import Signup from '../pages/Register/Signup';
import Services from '../pages/Services';
import MyAccount from '../pages/Profile/user-account/MyAccount';
import DoctorDashboard from '../pages/Profile/doctor-account/DoctorDashboard';
import ProtectedRoutes from './ProtectedRoutes';
import BookAppointmentForm from '../pages/BookAppointmentForm';
import MyAppointments from '../pages/Profile/user-account/MyAppointments';
import About from '../components/About';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path='/doctors/:id' element={<DoctorDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/users/profile/me" element={<ProtectedRoutes allowedRoles={['patient']}><MyAccount /></ProtectedRoutes>} />
        <Route path="/doctors/profile/me" element={<ProtectedRoutes allowedRoles={['doctor']}><DoctorDashboard /></ProtectedRoutes>} />
        <Route path="/book-appointment" element={<BookAppointmentForm />} />
        <Route path="/book-appointment/:doctorId" element={<BookAppointmentForm />} />
        <Route path="/my-appointments" element={<MyAppointments />} />

    </Routes>
);

export default AppRoutes;
