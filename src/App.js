import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Slider from "./components/Slider";
import Jobcard from "./components/Jobcard";
import About from "./components/About";
import Updates from "./components/Updates";
import Contact from "./components/Contact";
import JobDetail from "./components/JobDetail";
import AdminLayout from "./components/AdminLayout";
import UserLayout from "./components/UserLayout";
import AdminJobAdd from "./components/AdminJobAdd";
import JobList from "./components/JobList";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState, useEffect } from "react";
import axios from "axios";
import EditJobData from "./components/EditJobData";
import FeedbackTable from "./components/FeedbackTable";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import Categories from "./components/Categories";
import JobsForFullTime from "./components/JobsForFullTime";
import JobsForBatchOrCity from "./components/JobsForBatchOrCity";
import JobsByRoles from "./components/JobsByRoles";
import BlogPage from "./components/BlogPage";
import CreateBlog from "./components/CreateBlog";
import BlogDetails from "./components/BlogDetails";
import AdminAddInvExp from "./components/AdminAddInvExp";
import AdminBlogList from "./components/AdminBlogList";
import Sitemap from "./components/Sitemap";
import PageNotFound from "./components/PageNotFound";
import Disclaimer from "./components/Disclaimer";
import AdminDashboard from "./components/AdminDashboard";
import { Helmet } from 'react-helmet-async';

function App() {
  const [jobs, setJobs] = useState([]);
  const [searchedJobs, setSearchedJobs] = useState(null); // not []
  // Use null to indicate no search has been performed yet
  const [loading, setLoading] = useState(false);

  const backendURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Fetch all jobs with empty search
    axios
      .get(`${backendURL}/api/getAllJobs`)
      .then((response) => setJobs(response.data.JobsData))
      .catch((error) => console.log("Error In Fetching Jobs Data", error));
  }, []);

 
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={<UserLayout setSearchedJobs={setSearchedJobs} />}
        >
          <Route
            index
            element={
              <>
                <Helmet>
                  <title>RGJobs | Latest Freshers Jobs, Internships & Career Opportunities in India</title>
                  <meta name="description" content="Find latest freshers jobs, internships & career opportunities across India. Browse 1000+ job listings in software development, data science, cloud computing, DevOps, UI/UX and more. Apply now on RGJobs!" />
                  <link rel="canonical" href="https://www.rgjobs.in" />
                  <meta property="og:title" content="RGJobs | Latest Freshers Jobs & Internships in India" />
                  <meta property="og:description" content="India's trusted job portal for freshers. Find jobs by role, location, batch & experience level." />
                  <meta property="og:url" content="https://www.rgjobs.in" />
                  <meta property="og:type" content="website" />
                </Helmet>
                <Slider
                  setSearchedJobs={setSearchedJobs}
                  setLoading={setLoading}
                />
                <Jobcard
                  allJobs={jobs}
                  searchedJobs={searchedJobs}
                  loading={loading}
                />
              </>
            }
          />
          <Route path="about" element={<About />} />
          <Route path="updates" element={<Updates />} />
          <Route path="contact" element={<Contact />} />
          <Route path='disclaimer' element={<Disclaimer />} />
          <Route path="jobExpired" element={<PageNotFound />} />
          <Route path="job/:id/:slug" element={<JobDetail />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route
            path="real-life-interviews-blog-posts"
            element={<BlogPage />}
          />
          <Route
            path="share-blog-posts"
            element={<CreateBlog />}
          />
          <Route
            path="blog-posts-details/:id/:slug"
            element={<BlogDetails />}
          />
          <Route
            path="jobsbytype/:jobType"
            element={<JobsForFullTime loading={loading} />}
          />
          <Route path="jobs/:jobTypeOrCity" element={<JobsForBatchOrCity />} />
          <Route path="jobsbyrole/:jobRoles" element={<JobsByRoles />} />
        </Route>

        {/* for sitemap  */}
        <Route path="/sitemap.xml" element={<Sitemap />} />

        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add-new-job" element={<AdminJobAdd />} />
          <Route path="job-list" element={<JobList />} />
          <Route path="interviews/:listURL" element={<AdminBlogList />} />
          <Route path="aboutusers/:userFeedbackAndEmails" element={<FeedbackTable />} />
          <Route path="edit-job/:id" element={<EditJobData />} />
          <Route path="category/:categoryType" element={<Categories />} />
          <Route path="add-work-category" element={<Categories />} />
          <Route path="add-role-category" element={<Categories />} />
          <Route path="add-company-category" element={<Categories />} />
          <Route path="edit-user-interviews/:id" element={<AdminAddInvExp />} />
        </Route>

        <Route path="/admin/login" element={<Login />}></Route>
        <Route path="/admin/register" element={<Register />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
