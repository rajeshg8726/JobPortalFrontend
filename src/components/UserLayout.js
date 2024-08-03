import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function UserLayout() {
  return (
    <div>
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default UserLayout;
