import React from 'react'
import './Stylesheet.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = (e) => {
    localStorage.removeItem('token');
    navigate('/admin/login');

  }
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar" >
      <Link to="/admin/add-new-job" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        {/* <svg className="bi me-2" width="40" height="32"><use xlink:to="#bootstrap"></use></svg> */}
        <span className="fs-4">R.G</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/admin/add-new-job" className="nav-link " aria-current="page" style={{ color: "white" }}>
            {/* <svg className="bi me-2" width="16" height="16"><use xlink:to="#home"></use></svg> */}
            Add Jobs
          </Link>
        </li>
        <li>
          <Link to="/admin/job-list" className="nav-link text-white">
            {/* <svg className="bi me-2" width="16" height="16"><use xlink:to="#speedometer2"></use></svg> */}
            Jobs List
          </Link>
        </li>
        <li>
          <Link to="/admin/user-feedback-list" className="nav-link text-white">
            {/* <svg className="bi me-2" width="16" height="16"><use xlink:to="#table"></use></svg> */}
            Users Feedback
          </Link>
        </li>
        <li><Link to="/admin/category/add-category" className="nav-link text-white">
          Job Category
        </Link></li>
        <li><Link to="/admin/category/add-company-category" className="nav-link text-white">
          Company Category
        </Link></li>

        <li><Link to="/admin/category/add-role-category" className="nav-link text-white">
          Role Category
        </Link></li>
        <li><Link to="/admin/category/add-work-category" className="nav-link text-white">
          Work Category
        </Link></li>
      
        
        <li><Link to="/admin/interviews/users-added-interviews-list" className="nav-link text-white">
          Invw Exps List From Users
        </Link></li>
        
        <li><Link to="/admin/interviews/admin-added-interviews-list" className="nav-link text-white">
          Invw Exps List From Admin
        </Link></li>
         
      </ul>
      <hr />
      <div className="dropdown">
        <Link to="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
          <strong>RG</strong>
        </Link>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
          <li><Link className="dropdown-item" to="#">New Job</Link></li>
          <li><Link className="dropdown-item" to="#">Settings</Link></li>
          <li><Link className="dropdown-item" to="#">Profile</Link></li>
          <li><hr className="dropdown-divider" /></li>
          <li><button className="dropdown-item btnout" onClick={logout} >Sign out</button></li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar