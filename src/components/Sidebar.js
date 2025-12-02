import React, { useState, useEffect } from "react";
import "./sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  Layers, 
  User, 
  Clipboard, 
  LogOut, 
  Menu,
  ChevronDown,
  Briefcase,
  MessageSquare,
  Bell,
  Settings
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  useEffect(() => {
    // auto-collapse on small screens
    const handleResize = () => {
      setCollapsed(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-open relevant dropdown based on current path
  useEffect(() => {
    if (location.pathname.includes("/admin/job")) {
      setOpenDropdown("jobs");
    } else if (location.pathname.includes("/admin/aboutusers")) {
      setOpenDropdown("users");
    } else if (location.pathname.includes("/admin/interviews")) {
      setOpenDropdown("interviews");
    }
  }, [location.pathname]);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const logout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      localStorage.removeItem("token");
      navigate("/admin/login");
    }
  };

  const isActive = (path) => location.pathname.startsWith(path);
  const isSubmenuActive = (path) => location.pathname.includes(path);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      path: "/admin/dashboard",
      badge: null
    },
    {
      id: "jobs",
      label: "Jobs",
      icon: Briefcase,
      dropdown: true,
      submenu: [
        { label: "Add Job", path: "/admin/add-new-job" },
        { label: "Job List", path: "/admin/job-list" }
      ]
    },
    {
      id: "categories",
      label: "Categories",
      icon: Layers,
      path: "/admin/category/add-category"
    },
    {
      id: "users",
      label: "About Users",
      icon: User,
      dropdown: true,
      submenu: [
        { label: "User Feedback", path: "/admin/aboutusers/user-feedback-list" },
        { label: "Email Subscribers", path: "/admin/aboutusers/user-emailsubscriber-list" }
      ]
    },
    {
      id: "interviews",
      label: "Interview Experiences",
      icon: MessageSquare,
      dropdown: true,
      submenu: [
        { label: "All Blog Posts", path: "/admin/interviews/users-added-blog-posts-list" }
      ]
    }
  ];

  return (
    <aside 
      className={`modern-admin-sidebar ${collapsed ? "collapsed" : ""}`} 
      aria-hidden={false}
    >
      {/* Sidebar Header */}
      <div className="sidebar-top">
        <button
          className="sidebar-collapse-btn"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand" : "Collapse"}
        >
          <Menu size={18} />
        </button>

        <Link 
          to="/admin/dashboard" 
          className="sidebar-brand" 
          aria-label="RG Jobs Admin"
        >
          <div className="brand-mark">
            <Briefcase size={20} />
          </div>
          {!collapsed && <div className="brand-text">RG Jobs</div>}
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-nav" role="navigation" aria-label="Main navigation">
        <ul className="nav-menu">
          {menuItems.map((item) => (
            <li 
              key={item.id}
              className={`nav-item ${
                item.dropdown 
                  ? (item.submenu?.some(sub => isSubmenuActive(sub.path)) ? "active has-sub" : "has-sub")
                  : (isActive(item.path) ? "active" : "")
              }`}
            >
              {item.dropdown ? (
                <button
                  className={`sidebar-link sidebar-toggle ${
                    openDropdown === item.id ? "open" : ""
                  }`}
                  onClick={() => toggleDropdown(item.id)}
                  aria-expanded={openDropdown === item.id}
                >
                  <item.icon size={16} className="nav-icon" />
                  {!collapsed && (
                    <>
                      <span className="nav-label">{item.label}</span>
                      <ChevronDown 
                        size={14} 
                        className={`chevron ${openDropdown === item.id ? "open" : ""}`}
                      />
                    </>
                  )}
                </button>
              ) : (
                <Link to={item.path} className="sidebar-link">
                  <item.icon size={16} className="nav-icon" />
                  {!collapsed && <span className="nav-label">{item.label}</span>}
                  {item.badge && !collapsed && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                </Link>
              )}

              {/* Submenu */}
              {item.dropdown && openDropdown === item.id && !collapsed && (
                <ul className="sidebar-sub">
                  {item.submenu?.map((subitem, idx) => (
                    <li key={idx}>
                      <Link 
                        to={subitem.path}
                        className={`submenu-link ${
                          isSubmenuActive(subitem.path) ? "active" : ""
                        }`}
                      >
                        <span className="submenu-dot"></span>
                        {subitem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="footer-divider"></div>
        
        <div className="profile-section">
          <div className="profile-avatar">
            <User size={20} />
          </div>
          {!collapsed && (
            <div className="profile-meta">
              <div className="profile-name">RG Admin</div>
              <div className="profile-role">Administrator</div>
            </div>
          )}
        </div>

        <div className="sidebar-actions">
          <button 
            className="action-btn settings-btn" 
            title="Settings"
            aria-label="Settings"
          >
            <Settings size={16} />
            {!collapsed && <span>Settings</span>}
          </button>
          
          <button 
            className="action-btn logout-btn" 
            onClick={logout}
            title="Sign out"
            aria-label="Sign out"
          >
            <LogOut size={16} />
            {!collapsed && <span>Sign out</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;