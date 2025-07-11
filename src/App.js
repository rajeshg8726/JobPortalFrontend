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
import Tables from "./components/Tables";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState, useEffect } from "react";
import axios from "axios";
import EditJobData from "./components/EditJobData";
import FeedbackTable from "./components/FeedbackTable";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase-config";
import Categories from "./components/Categories";
import JobsForFullTime from "./components/JobsForFullTime";
import JobsForBatchOrCity from "./components/JobsForBatchOrCity";
import JobsByRoles from "./components/JobsByRoles";
import InterviewExperience from "./components/InterviewExperience";
import InterviewFormExp from "./components/InterviewFormExp";
import InterviewExpDetails from "./components/InterviewExpDetails";
import AdminAddInvExp from "./components/AdminAddInvExp";
import InvUsersExpList from "./components/InvUsersExpList";
import Sitemap from "./components/Sitemap";
import PageNotFound from "./components/PageNotFound";

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

  async function requestNotification() {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      // generate the token for each user to identify
      const token = await getToken(messaging, {
        vapidKey:
          "BNQPegwqYz-5qIG4rS1EczDK8blMyzeuqcyj-m3jiH-7JtLu77AkV5-OjhQD8yJTniNkeIFTm7K-AEYy7oxJIrs",
      });
      console.log("Token Generated is", token);
    } else if (permission === "denied") {
      alert("You will be missed the latest job updates");
    }
  }

  /// call requestNotify function when page loads

  useEffect(() => {
    requestNotification();
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
          <Route path="jobExpired" element={<PageNotFound />} />
          <Route path="job/:id/:slug" element={<JobDetail />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route
            path="real-life-interview-experiences"
            element={<InterviewExperience />}
          />
          <Route
            path="add-interview-experiences"
            element={<InterviewFormExp />}
          />
          <Route
            path="interview-experience-details/:id"
            element={<InterviewExpDetails />}
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
          <Route path="add-new-job" element={<AdminJobAdd />} />
          <Route path="job-list" element={<Tables />} />
          <Route path="interviews/:listURL" element={<InvUsersExpList />} />
          <Route path="user-feedback-list" element={<FeedbackTable />} />
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
