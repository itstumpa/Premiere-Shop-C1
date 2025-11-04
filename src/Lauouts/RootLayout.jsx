import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const RootLayout = () => {
      return (
            <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <div className='grow'>

                  < Outlet />
                  </div>
                  <Footer/>
            </div>
      );
};

export default RootLayout;