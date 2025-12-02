import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import "./Header.css";
import axios from "axios";

// Import Lucide-like SVG components (simplified inline)
const HomeIcon = (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>);
const BriefcaseIcon = (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>);
const TrendingUpIcon = (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>);
const LayersIcon = (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18c.6-.9 1.63-.9 2.23 0L20 7l-7.5 5L5 7l7.17-4.82Z"/><path d="M22 17c0 1.5-3.66 3-8 3s-8-1.5-8-3"/><path d="M5 7v10c0 1.5 3.66 3 8 3s8-1.5 8-3V7"/></svg>);
const CodeIcon = (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>);
const UsersIcon = (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const MailIcon = (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>);


function Header({ setSearchedJobs }) {
  const [batch, setBatch] = useState([]);
  const [domains, setDomains] = useState([]);
  const [roles, setRoles] = useState([]);
  
  // UI States
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const backendURL = process.env.REACT_APP_API_URL;
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch Data
  useEffect(() => {
    const fetchBatchData = async () => {
      try {
        const [res1, res2, res3] = await Promise.all([
          axios.get(`${backendURL}/api/getAllBatches`),
          axios.get(`${backendURL}/api/getAllDomains`),
          axios.get(`${backendURL}/api/getAllRoles`)
        ]);
        setBatch(res1.data.batches);
        setDomains(res2.data.domains);
        setRoles(res3.data.roles);
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };
    fetchBatchData();
  }, [backendURL]);

  // Helper to format URLs
  const formatUrl = (str) => {
    return str
      .toLowerCase()
      .replace(/\//g, "-")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Helper to format Labels
  const formatLabel = (str) => {
    return str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // Toggle Dropdown (Mobile)
  const toggleDropdown = (id) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  // Navigation Data Structure
  const navItems = [
    {
      title: "Batches",
      id: "batchesDropdown",
      icon: BriefcaseIcon,
      items: batch.map((b) => ({
        to: `/jobs/${b.name}-batch`,
        label: `${b.name} Batch`,
      })),
    },
    {
      title: "Experience",
      id: "expDropdown",
      icon: TrendingUpIcon,
      items: [
        { to: "/jobsbytype/Internship-jobs", label: "Internships" },
        { to: "/jobsbytype/Freshers-jobs", label: "Freshers" },
        { to: "/jobsbytype/0-1-year-experience-jobs", label: "0-1 Year" },
        { to: "/jobsbytype/1-3-years-experience-jobs", label: "1-3 Years" },
        { to: "/jobsbytype/3-5-years-experience-jobs", label: "3-5 Years" },
        { to: "/jobsbytype/senior-roles-jobs", label: "Senior Roles" },
        { to: "/jobsbytype/Managerial-roles-jobs", label: "Managerial" },
      ],
    },
    {
      title: "Domains",
      id: "domainDropdown",
      icon: LayersIcon,
      items: domains.map((d) => ({
        to: `/jobs/${formatUrl(d.name)}-domain`,
        label: formatLabel(d.name),
      })),
    },
    {
      title: "Roles",
      id: "roleDropdown",
      icon: LayersIcon,
      items: roles.map((r) => ({
        to: `/jobsbyrole/${formatUrl(r.name)}-role`,
        label: formatLabel(r.name),
      })),
    },
  ];

  // Helper for rendering link content with icon
  const renderLinkContent = (Icon, title) => (
    <>
      <Icon className="nav-icon" width="18" height="18" />
      {title}
    </>
  );

  return (
    <>
      <header className={`premium-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          {/* Logo Section */}
          <Link
            className="brand-logo"
            to="/"
            onClick={() => setSearchedJobs(null)}
          >
            <img src="/logo.webp" alt="RGJobs" className="logo-img" />
            <span className="logo-text">RGJobs</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <NavLink to="/" className="nav-link-custom" onClick={() => setSearchedJobs(null)} end>
              {renderLinkContent(HomeIcon, "Home")}
            </NavLink>

            {navItems.map((group) => (
              <div key={group.id} className="nav-dropdown-wrapper">
                <button className="nav-link-custom dropdown-trigger">
                  {renderLinkContent(group.icon, group.title)}
                  <svg className="chevron-icon ml-1" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                <div className="dropdown-content">
                  <div className="dropdown-scroll">
                    {group.items.map((item, idx) => (
                      <NavLink key={idx} to={item.to} className="dropdown-item-custom">
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <NavLink to="/real-life-interviews-blog-posts" className="nav-link-custom">
              {renderLinkContent(CodeIcon, "Tech Hub")}
            </NavLink>
            <NavLink to="/about" className="nav-link-custom">
              {renderLinkContent(UsersIcon, "About")}
            </NavLink>
            <NavLink to="/contact" className="nav-link-custom">
              {renderLinkContent(MailIcon, "Contact")}
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="header-actions">
            <DarkModeToggle />
            
            {/* Mobile Hamburger */}
            <button 
              className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div className={`mobile-drawer-overlay ${isMobileMenuOpen ? "open" : ""}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      
      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <span className="drawer-title">Menu</span>
          <button className="close-btn" onClick={() => setIsMobileMenuOpen(false)}>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="drawer-content">
          <NavLink to="/" className="drawer-link mycss" onClick={() => setSearchedJobs(null)} end>
            {renderLinkContent(HomeIcon, "Home")}
          </NavLink>

          {navItems.map((group) => (
            <div key={group.id} className="drawer-group">
              <button 
                className={`drawer-link has-submenu ${activeDropdown === group.id ? "active" : ""}`}
                onClick={() => toggleDropdown(group.id)}
              >
                {renderLinkContent(group.icon, group.title)}
                <svg className={`chevron-icon ${activeDropdown === group.id ? "rotate" : ""}`} viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              
              <div className={`drawer-submenu ${activeDropdown === group.id ? "open" : ""}`}>
                {group.items.map((item, idx) => (
                  <NavLink key={idx} to={item.to} className="drawer-sublink">
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}

          <NavLink to="/real-life-interviews-blog-posts" className="drawer-link mycss">
            {renderLinkContent(CodeIcon, "Tech Hub")}
          </NavLink>
          <NavLink to="/about" className="drawer-link mycss">
            {renderLinkContent(UsersIcon, "About")}
          </NavLink>
          <NavLink to="/contact" className="drawer-link mycss">
            {renderLinkContent(MailIcon, "Contact")}
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Header;