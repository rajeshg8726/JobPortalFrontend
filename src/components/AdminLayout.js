import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, X, Bell, Search } from 'lucide-react';
import './adminSide.css';

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  // Handle scroll effect on header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get page title from path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'Dashboard';
    if (path.includes('add-new-job')) return 'Add New Job';
    if (path.includes('job-list')) return 'Jobs List';
    if (path.includes('category')) return 'Categories';
    if (path.includes('user-feedback')) return 'User Feedback';
    if (path.includes('user-emailsubscriber')) return 'Email Subscribers';
    if (path.includes('interviews')) return 'Interview Experiences';
    return 'Dashboard';
  };

  return (
    <div className="admin-layout-wrapper">
      {/* Sidebar */}
      <div className={`sidebar-wrapper ${sidebarOpen ? 'mobile-open' : ''}`}>
        <Sidebar />
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
            role="button"
            tabIndex={-1}
            aria-label="Close sidebar"
          />
        )}
      </div>

      {/* Main Content Area */}
      <div className="admin-main-wrapper">

        {/* Page Content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;