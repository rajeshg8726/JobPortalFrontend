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
function App() {
  const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]);

const backendURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${backendURL}/api/getAllJobs`)
            .then(res => {
                setData(res.data.allJobs);
                setFilteredData(res.data.allJobs); // Initialize filteredData with all jobs
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
          <Route path="job/:id" element={<JobDetail />} />
        </Route>
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="add-new-job" element={<AdminJobAdd />} />
          <Route path="job-list" element={<Tables />} />
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
