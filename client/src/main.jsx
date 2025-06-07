import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from './context/AuthContext.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>

      <ToastContainer
        theme='dark'
        position='top-right'
        hideProgressBar={false}
        newestOnTop={false}
        autoClose={3000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false} />
      <App />

    </AuthContextProvider>



  </StrictMode>,
)
