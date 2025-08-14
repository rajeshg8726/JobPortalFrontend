import React, { useState } from 'react';
import './adminSide.css';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <Link to="/admin/add-new-job" className="admin-logo">R.G</Link>
      </div>

      <nav className="admin-sidebar-nav">
        <ul>
          <li>
            <button className="admin-sidebar-toggle" onClick={() => toggleDropdown('jobs')}>
              Jobs
              <span>{openDropdown === 'jobs' ? '▲' : '▼'}</span>
            </button>
            {openDropdown === 'jobs' && (
              <ul className="admin-dropdown">
                <li><Link to="/admin/add-new-job">Add Job</Link></li>
                <li><Link to="/admin/job-list">Job List</Link></li>
              </ul>
            )}
          </li>

          <li>
            <button className="admin-sidebar-toggle" onClick={() => toggleDropdown('categories')}>
              Categories
              <span>{openDropdown === 'categories' ? '▲' : '▼'}</span>
            </button>
            {openDropdown === 'categories' && (
              <ul className="admin-dropdown">
                <li><Link to="/admin/category/add-category">Add Category</Link></li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/admin/user-feedback-list" className="admin-sidebar-link">Users Feedback</Link>
          </li>

          <li>
            <button className="admin-sidebar-toggle" onClick={() => toggleDropdown('interviews')}>
              Interview Experiences
              <span>{openDropdown === 'interviews' ? '▲' : '▼'}</span>
            </button>
            {openDropdown === 'interviews' && (
              <ul className="admin-dropdown">
                <li><Link to="/admin/interviews/users-added-interviews-list">From Users</Link></li>
                <li><Link to="/admin/interviews/admin-added-interviews-list">From Admin</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      <div className="admin-sidebar-profile">
        <img src="https://github.com/mdo.png" alt="Admin" className="admin-avatar" />
        <div>
          <span className="admin-name">RG</span>
          <button onClick={logout} className="admin-logout">Sign out</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
