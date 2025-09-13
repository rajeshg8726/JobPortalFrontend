import React, { useState, useEffect } from "react";
import "./adminSide.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Layers, User, Clipboard, LogOut, Menu } from "lucide-react";

/*
  Modern premium Sidebar
  - Responsive: collapses to icons-only on narrow widths
  - Collapsible via toggle
  - Active link highlighting using location.pathname
  - Accessible buttons/aria labels
*/

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // auto-collapse on small screens
    const handleResize = () => {
      setCollapsed(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className={`modern-admin-sidebar ${collapsed ? "collapsed" : ""}`} aria-hidden={false}>
      <div className="sidebar-top">
        <button
          className="sidebar-collapse-btn"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu size={18} />
        </button>

        <Link to="/admin/dashboard" className="sidebar-brand" aria-label="RG Jobs Admin">
          <div className="brand-mark">RG</div>
          {!collapsed && <div className="brand-text">RG Jobs Admin</div>}
        </Link>
      </div>

      <nav className="sidebar-nav" role="navigation" aria-label="Main navigation">
        <ul>
          <li className={isActive("/admin/dashboard") ? "active" : ""}>
            <Link to="/admin/dashboard" className="sidebar-link">
              <Home size={16} />
              {!collapsed && <span>Dashboard</span>}
            </Link>
          </li>

          <li className={isActive("/admin/add-new-job") || isActive("/admin/job-list") ? "active has-sub" : "has-sub"}>
            <button
              className="sidebar-link sidebar-toggle"
              onClick={() => toggleDropdown("jobs")}
              aria-expanded={openDropdown === "jobs"}
            >
              <Layers size={16} />
              {!collapsed && <span>Jobs</span>}
              {!collapsed && <svg className={`chev ${openDropdown === "jobs" ? "open" : ""}`} width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>}
            </button>

            {openDropdown === "jobs" && !collapsed && (
              <ul className="sidebar-sub">
                <li><Link to="/admin/add-new-job">Add Job</Link></li>
                <li><Link to="/admin/job-list">Job List</Link></li>
              </ul>
            )}
          </li>

          <li className={isActive("/admin/category") ? "active" : ""}>
            <Link to="/admin/category/add-category" className="sidebar-link">
              <Clipboard size={16} />
              {!collapsed && <span>Categories</span>}
            </Link>
          </li>

          <li className={isActive("/admin/user-feedback-list") ? "active" : ""}>
            <Link to="/admin/user-feedback-list" className="sidebar-link">
              <User size={16} />
              {!collapsed && <span>User Feedback</span>}
            </Link>
          </li>

          <li className={isActive("/admin/interviews") ? "active has-sub" : "has-sub"}>
            <button
              className="sidebar-link sidebar-toggle"
              onClick={() => toggleDropdown("interviews")}
              aria-expanded={openDropdown === "interviews"}
            >
              <Clipboard size={16} />
              {!collapsed && <span>Interview Experiences</span>}
              {!collapsed && <svg className={`chev ${openDropdown === "interviews" ? "open" : ""}`} width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>}
            </button>

            {openDropdown === "interviews" && !collapsed && (
              <ul className="sidebar-sub">
                <li><Link to="/admin/interviews/users-added-blog-posts-list">All Blog Posts</Link></li>
                {/* add more links as needed */}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="profile">
          <img className="profile-avatar" src="https://github.com/mdo.png" alt="Admin avatar" />
          {!collapsed && (
            <div className="profile-meta">
              <div className="profile-name">RG Admin</div>
              <div className="profile-role">Administrator</div>
            </div>
          )}
        </div>

        <div className="sidebar-actions">
          <button className="logout-btn" onClick={logout} aria-label="Sign out">
            <LogOut size={16} />
            {!collapsed && <span>Sign out</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;