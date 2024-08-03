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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserLayout />}>
          <Route index element={<><Slider /><Jobcard /></>} />
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
