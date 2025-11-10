import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { ToastContainer } from 'react-toastify';

const RootLayout = () => {
      return (
            <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <div className='grow'>

                  < Outlet />
                  </div>
                  <Footer/>
                 <ToastContainer/>
            </div>
      );
};

export default RootLayout;