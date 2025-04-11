import React from 'react';
import { Outlet } from 'react-router';
import Header from '../../share/Header/Header';
import Footer from '../../share/Footer/Footer';

const Main = () => {
     return (
          <div>
               <Header />
               <Outlet />
               <Footer />
          </div>
     );
};

export default Main;