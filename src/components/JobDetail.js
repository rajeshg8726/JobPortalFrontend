import React, { useState, useEffect } from 'react';
import './Stylesheet.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const JobDetail = () => {
  const [jobData, setJobData] = useState(null); // Initialize jobData as null
  const [error, setError] = useState(null);
  const { id , slug} = useParams();
  const backendURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/job/${id}`);
        const rt = response.data.job;
        setJobData(rt);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      }
    };

    getDataFromApi();
  }, [id, backendURL]);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!jobData) { // If jobData is null (loading state)
    return <div>Loading...</div>;
  }

  // Structured Data for JobPosting
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": jobData.title,
    "description": jobData.description,
    "identifier": {
      "@type": "PropertyValue",
      "name": "RGJobs",
      "value": jobData.id
    },
    "datePosted": new Date().toISOString(),
    "employmentType": "Full-time",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "RGJobs",
      "sameAs": "https://rgjobs.in",
      "logo": `${backendURL}/rglogo.png`
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": jobData.location,
        "addressCountry": "IN"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": jobData.pay
    },
    "jobBenefits": "Career growth opportunities",
    "url": `https://rgjobs.in/job/${id}`
  };

  return (
    <>
      <Helmet>
        <title>{jobData.title} - RGJobs</title>
        <meta name="description" content={`Apply for ${jobData.title} in ${jobData.location}. Check eligibility, salary, and more details at RGJobs.`} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="jobcontain">
        <div key={jobData.id} className="jobDetail">
          <div className="imgcard">
            {/* Adding alt text for SEO */}
            <img 
              src={`${process.env.REACT_APP_API_URL}/${jobData.image}`} 
              className="card-img-top" 
              alt={`${jobData.title} job at ${jobData.location}`} 
            />
          </div>
          <div className="container">
            <h3 className='text-center'><strong>{jobData.title}</strong></h3>
            <h5>  <strong> Job Role: </strong></h5>
            <p>{jobData.role}</p>
            <h5> <strong>For Batch:</strong></h5>
            <p>{jobData.batches}</p>
            <h5> <strong>Expected Pay:</strong></h5>
            <p>{jobData.pay}</p>
            <h5> <strong>Location:</strong></h5>
            <p>{jobData.location}</p>
            <h5> <strong>Job Requirements:</strong></h5>
             {/* Displaying the description as bullet points */}
      <ul>
        {jobData.description.split('.').map((sentence, index) => (
          sentence.trim() && <li key={index}>{sentence.trim()}.</li>
        ))}
      </ul>
            <Link className='jobLink' to={jobData.joblink} target="_blank" rel="noopener noreferrer">
              <button className='btn active btn-outline-success btn-sm'>APPLY FOR THIS JOB</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetail;
