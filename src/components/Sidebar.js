import React from 'react';
import './adminSide.css';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <aside className="modern-sidebar">
      <div className="modern-sidebar-header">
        <Link to="/admin/add-new-job" className="modern-sidebar-logo">
          <span>R.G</span>
        </Link>
      </div>
      <nav className="modern-sidebar-nav">
        <ul>
          <li>
            <Link to="/admin/add-new-job" className="modern-sidebar-link">
              Add Jobs
            </Link>
          </li>
          <li>
            <Link to="/admin/job-list" className="modern-sidebar-link">
              Jobs List
            </Link>
          </li>
          <li>
            <Link to="/admin/user-feedback-list" className="modern-sidebar-link">
              Users Feedback
            </Link>
          </li>
          <li>
            <Link to="/admin/category/add-category" className="modern-sidebar-link">
              Job Category
            </Link>
          </li>
          <li>
            <Link to="/admin/category/add-company-category" className="modern-sidebar-link">
              Company Category
            </Link>
          </li>
          <li>
            <Link to="/admin/category/add-role-category" className="modern-sidebar-link">
              Role Category
            </Link>
          </li>
          <li>
            <Link to="/admin/category/add-work-category" className="modern-sidebar-link">
              Work Category
            </Link>
          </li>
          <li>
            <Link to="/admin/interviews/users-added-interviews-list" className="modern-sidebar-link">
              Invw Exps List From Users
            </Link>
          </li>
          <li>
            <Link to="/admin/interviews/admin-added-interviews-list" className="modern-sidebar-link">
              Invw Exps List From Admin
            </Link>
          </li>
        </ul>
      </nav>
      <div className="modern-sidebar-profile">
        <img src="https://github.com/mdo.png" alt="Admin" className="modern-sidebar-avatar" />
        <div className="modern-sidebar-profile-info">
          <span className="modern-sidebar-profile-name">RG</span>
          <button className="modern-sidebar-logout" onClick={logout}>
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;