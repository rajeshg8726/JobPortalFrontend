import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer'; // Assuming the same footer can be used, otherwise create AdminFooter.js

function AdminLayout() {
  return (
    <>
    <div className='d-flex' >
      <Sidebar />
      
        <Outlet />
      
    </div>
  <Footer />
      </>
  );
}



export default AdminLayout;
