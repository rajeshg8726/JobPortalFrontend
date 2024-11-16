import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Slider from './components/Slider';
import Header from './components/Header';
import Jobcard from './components/Jobcard';
import Footer from './components/Footer';
import About from './components/About';
import Updates from './components/Updates';
import Contact from './components/Contact';
import JobDetail from './components/JobDetail';
import Sidebar from './components/Sidebar';
import AdminLayout from './components/AdminLayout';
import UserLayout from './components/UserLayout';
import AdminJobAdd from './components/AdminJobAdd';
import Tables from './components/Tables';
import Login from './components/Login';
import Register from './components/Register';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EditJobData from './components/EditJobData';
import FeedbackTable from './components/FeedbackTable';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import { getToken } from "firebase/messaging";
import { messaging } from './firebase-config';
import Categories from './components/Categories';
import JobsForFullTime from './components/JobsForFullTime';
import JobsForBatchOrCity from './components/JobsForBatchOrCity';
import JobsByRoles from './components/JobsByRoles';
import InterviewExperience from './components/InterviewExperience';
import InterviewFormExp from './components/InterviewFormExp';
import InterviewExpDetails from './components/InterviewExpDetails';
import AdminAddInvExp from './components/AdminAddInvExp';
import InvUsersExpList from './components/InvUsersExpList';

function App() {
  const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]);

const backendURL = process.env.REACT_APP_API_URL;

async function requestNotification() {
  const permission = await Notification.requestPermission();

  if(permission === 'granted'){
    // generate the token for each user to identify
   const token = await getToken(messaging, {vapidKey: "BNQPegwqYz-5qIG4rS1EczDK8blMyzeuqcyj-m3jiH-7JtLu77AkV5-OjhQD8yJTniNkeIFTm7K-AEYy7oxJIrs"});
   console.log('Token Generated is' , token);
  }
  else if(permission === 'denied'){
    alert('You will be missed the latest job updates');
  }
}

/// call requestNotify function when page loads

useEffect(() => {

  requestNotification();

}, []);

    useEffect(() => {
        axios.get(`${backendURL}/api/getAllJobs`)
            .then(res => {
                setData(res.data.JobsData);
                setFilteredData(res.data.JobsData); // Initialize filteredData with all jobs
            })
            .catch(error => console.log(error));
    }, []);

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setFilteredData(
            data.filter(job => job.title.toLowerCase().includes(searchTerm))
        );
    };

  return (
    <Router>
      <Routes>
        <Route path="/*"  element={<UserLayout handleSearch = {handleSearch} />}  >
          <Route index element={<><Slider /><Jobcard jobfilter = {filteredData} /></>} />
          <Route path="about" element={<About />} />
          <Route path="updates" element={<Updates />} />
          <Route path="contact" element={<Contact />} />
          <Route path="job/:id/:slug" element={<JobDetail />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="real-life-interview-experiences" element={< InterviewExperience />} />
          <Route path="add-interview-experiences" element={< InterviewFormExp />} />
          <Route path="interview-experience-details/:id" element={< InterviewExpDetails  />} />
          <Route path='jobsbytype/:jobType' element={ < JobsForFullTime /> } />
          <Route path="jobs/:jobTypeOrCity" element={<JobsForBatchOrCity />} />
          <Route path="jobsbyrole/:jobRoles" element={< JobsByRoles />} />
        </Route>
        
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="add-new-job" element={<AdminJobAdd />} />
          <Route path="job-list" element={<Tables />} />
          <Route path="interviews/:listURL" element={< InvUsersExpList />} />
          <Route path="user-feedback-list" element={<FeedbackTable />} />
          <Route path="edit-job/:id" element={< EditJobData />} />
          <Route path="category/:categoryType" element={< Categories />} />
          <Route path="add-work-category" element={< Categories />} />
          <Route path="add-role-category" element={< Categories />} />
          <Route path="add-company-category" element={< Categories />} />
          <Route path="edit-user-interviews/:id" element={< AdminAddInvExp />} />
          
        </Route>

        <Route path="/admin/login" element={< Login />} >
        </Route>
        <Route path="/admin/register" element={< Register />} >
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
