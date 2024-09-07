import React, { useState, useEffect } from 'react';
import './Stylesheet.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const JobDetail = () => {
  const [jobData, setJobData] = useState([]); // Initialize jobData as an empty array
  const [error, setError] = useState(null);
  const {id} = useParams();
  const backendURL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        
        const responce = await axios.get(`${backendURL}/api/job/${id}`);
        const rt = responce.data.job; // Accessing allJobs array from the API response
        console.log(rt); // Check the structure of result here
        setJobData(rt);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      }
    };

    getDataFromApi(); // Call the function here

  }, []);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (jobData.length === 0) { // Check if jobData is empty (initial state)
    return <div>Loading...</div>;
  }

  return (
    <div className='jobcontain'>
     
        <div key={jobData.id} className="jobDetail"> {/* Use job._id or another unique key */}
          <div className="imgcard">
            <img src={`${process.env.REACT_APP_API_URL}/${jobData.image}`} className="card-img-top" alt="..." />
          </div>
          <div className="container">
            <h3><strong>{jobData.title}</strong></h3>
            <h4>Job Role:</h4>
            <p>{jobData.role}</p>
            <h4>For Batch:</h4>
            <p>{jobData.batches}</p>
            <h4>Standard Pay:</h4>
            <p>{jobData.pay}</p>
            <h4>Location:</h4>
            <p>{jobData.location}</p>
            <h4>Job Requirements:</h4>
            <p>{jobData.description}</p> {/* Display description instead of requirements */}
            <Link className='jobLink' to={jobData.joblink} target="_blank" rel="noopener noreferrer"><button className='btn active btn-outline-success btn-sm'>APPLY FOR THIS JOB</button></Link>
          </div>
        </div>
     
    </div>
  );
}

export default JobDetail;
