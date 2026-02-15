import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Users,
  Briefcase,
  MessageSquare,
  BarChart3,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Mail
} from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    totalUsers: 0,
    totalFeedback: 0,
    emailSubscribers: 0,
    jobsThisMonth: 0,
    applicationsThisMonth: 0,
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentFeedback, setRecentFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/admin/login');
  }, [navigate]);

  useEffect(() => {
    fetchDashboardData();
  }, [backendURL]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all jobs
      const jobsRes = await axios.get(`${backendURL}/api/getAllJobs`);
      const allJobs = jobsRes.data.JobsData || [];

      // Fetch all feedback
      const feedbackRes = await axios.get(`${backendURL}/api/getContacts`);
      const allFeedback = feedbackRes.data.feedbackData || [];

      // Fetch all users
      const usersRes = await axios.get(`${backendURL}/api/getAllJobs`);
      const allUsers = usersRes.data || [];

      // Fetch email subscribers
      const subscribersRes = await axios.get(`${backendURL}/api/getAllUserSubscriberForEmailNotify`);
      const subscribers = subscribersRes.data.subscribers || [];

      // Calculate statistics
      const activeJobs = allJobs.filter(job => job.status !== 'closed').length;
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      const jobsThisMonth = allJobs.filter(job => {
        const jobDate = new Date(job.createdAt);
        return jobDate.getMonth() === currentMonth && jobDate.getFullYear() === currentYear;
      }).length;

      setDashboardData({
        totalJobs: allJobs.length,
        activeJobs: activeJobs,
        totalApplications: allJobs.reduce((sum, job) => sum + (job.applicants?.length || 0), 0),
        totalUsers: allUsers.length,
        totalFeedback: allFeedback.length,
        emailSubscribers: subscribers.length,
        jobsThisMonth: jobsThisMonth,
        applicationsThisMonth: allJobs.reduce((sum, job) => {
          const count = job.applicants?.filter(app => {
            const appDate = new Date(app.appliedAt);
            return appDate.getMonth() === currentMonth && appDate.getFullYear() === currentYear;
          }).length || 0;
          return sum + count;
        }, 0),
      });

      // Set recent items
      setRecentJobs(allJobs.slice(0, 5).reverse());
      setRecentFeedback(allFeedback.slice(0, 5));

      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, change, isPositive, bgColor }) => (
    <div className="stat-card">
      <div className={`stat-icon ${bgColor}`}>
        <Icon size={24} />
      </div>
      <div className="stat-content">
        <p className="stat-title">{title}</p>
        <h3 className="stat-value">{value}</h3>
        <div className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{change}% from last month</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={fetchDashboardData} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back! Here's your portal overview</p>
        </div>
        <div className="dashboard-date">
          <Calendar size={18} />
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          icon={Briefcase}
          title="Total Jobs"
          value={dashboardData.totalJobs}
          change={dashboardData.jobsThisMonth > 0 ? '+12' : '-5'}
          isPositive={true}
          bgColor="bg-blue"
        />
        <StatCard
          icon={TrendingUp}
          title="Active Jobs"
          value={dashboardData.activeJobs}
          change="+8"
          isPositive={true}
          bgColor="bg-green"
        />
        <StatCard
          icon={Users}
          title="Total Users"
          value={dashboardData.totalUsers}
          change="+15"
          isPositive={true}
          bgColor="bg-purple"
        />
        <StatCard
          icon={Mail}
          title="Email Subscribers"
          value={dashboardData.emailSubscribers}
          change="+5"
          isPositive={true}
          bgColor="bg-orange"
        />
        <StatCard
          icon={MessageSquare}
          title="User Feedback"
          value={dashboardData.totalFeedback}
          change="+3"
          isPositive={true}
          bgColor="bg-pink"
        />
        <StatCard
          icon={BarChart3}
          title="Applications"
          value={dashboardData.totalApplications}
          change={`+${dashboardData.applicationsThisMonth}`}
          isPositive={true}
          bgColor="bg-cyan"
        />
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Monthly Overview */}
        <div className="chart-card">
          <div className="chart-header">
            <h2 className="chart-title">Monthly Overview</h2>
            <select className="chart-filter">
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
            </select>
          </div>
          <div className="chart-placeholder">
            <div className="chart-bars">
              <div className="chart-bar-item">
                <div className="baradmin" style={{ height: `${(dashboardData.jobsThisMonth / 50) * 100}%` }}></div>
                <span>Jobs</span>
              </div>
              <div className="chart-bar-item">
                <div className="baradmin" style={{ height: `${(dashboardData.applicationsThisMonth / 100) * 100}%` }}></div>
                <span>Applications</span>
              </div>
              <div className="chart-bar-item">
                <div className="baradmin" style={{ height: '45%' }}></div>
                <span>Users</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats-card">
          <h2 className="chart-title">Quick Stats</h2>
          <div className="quick-stats-list">
            <div className="quick-stat-item">
              <span className="stat-label">Jobs Posted This Month</span>
              <span className="stat-highlight">{dashboardData.jobsThisMonth}</span>
            </div>
            <div className="quick-stat-item">
              <span className="stat-label">Applications This Month</span>
              <span className="stat-highlight">{dashboardData.applicationsThisMonth}</span>
            </div>
            <div className="quick-stat-item">
              <span className="stat-label">Active Job Listings</span>
              <span className="stat-highlight">{dashboardData.activeJobs}</span>
            </div>
            <div className="quick-stat-item">
              <span className="stat-label">Total Registered Users</span>
              <span className="stat-highlight">{dashboardData.totalUsers}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        {/* Recent Jobs */}
        <div className="recent-card">
          <div className="card-header">
            <h2 className="card-title">Recent Job Postings</h2>
            <button 
              className="view-all-btn"
              onClick={() => navigate('/admin/job-list')}
            >
              View All
            </button>
          </div>
          <div className="recent-list">
            {recentJobs.length > 0 ? (
              recentJobs.map((job) => (
                <div key={job.id} className="recent-item">
                  <div className="recent-item-header">
                    <h4 className="recent-title">{job.title}</h4>
                    <span className={`badge ${job.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                      {job.status || 'Active'}
                    </span>
                  </div>
                  <p className="recent-subtitle">{job.role}</p>
                  <div className="recent-meta">
                    <span>{job.pay}</span>
                    <span>•</span>
                    <span>{job.batches}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-message">No recent jobs</p>
            )}
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="recent-card">
          <div className="card-header">
            <h2 className="card-title">Recent Feedback</h2>
            <button 
              className="view-all-btn"
              onClick={() => navigate('/admin/aboutusers/user-feedback-list')}
            >
              View All
            </button>
          </div>
          <div className="recent-list">
            {recentFeedback.length > 0 ? (
              recentFeedback.map((feedback, idx) => (
                <div key={idx} className="recent-item">
                  <div className="recent-item-header">
                    <h4 className="recent-title">{feedback.email}</h4>
                    <span className="badge badge-info">New</span>
                  </div>
                  <p className="recent-subtitle">{feedback.message?.substring(0, 100)}...</p>
                  <div className="recent-meta">
                    <span>Rating: ⭐ {feedback.rating || 'N/A'}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-message">No recent feedback</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;