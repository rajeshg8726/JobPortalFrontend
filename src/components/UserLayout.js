import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function UserLayout({handleSearch}) {
  return (
    <div>
      <Header  handleSearch = {handleSearch} />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default UserLayout;
