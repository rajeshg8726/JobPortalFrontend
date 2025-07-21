import React, { useState, useEffect } from 'react';
import './InterviewsPages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const InterviewExpDetails = () => {
  const [invData, setInvData] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { id } = useParams();
  const backendURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getAllInterviewsById = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/getAdminAddedInvById/${id}`);
        setInvData(res.data.InvData);
      } catch (error) {
        console.error('Error fetching interview data:', error);
      }
    };
    getAllInterviewsById();
    window.scrollTo(0, 0);
  }, [backendURL, id]);

  const formatContentWithLineBreaks = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => (
      <p key={idx} className="modern-invexpdetails-content-line">{line.trim()}</p>
    ));
  };

  if (!invData) return <div className="modern-invexpdetails-loading">Loading...</div>;

  return (
    <div className="modern-invexpdetails-container">
      <div className="modern-invexpdetails-card">
        <div className="modern-invexpdetails-header">
          <h1 className="modern-invexpdetails-title">{invData.title}</h1>
          <div className="modern-invexpdetails-user">
            <FontAwesomeIcon icon={faCircleUser} className="modern-invexpdetails-usericon" />
            <div className="modern-invexpdetails-userinfo">
              <span>{invData.anonymous === 1 ? "Anonymous User" : invData.name}</span>
              <span className="modern-invexpdetails-date">
                {new Date(invData.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className={`modern-invexpdetails-content ${isExpanded ? 'expanded' : 'clamped'}`}>
          {isExpanded
            ? formatContentWithLineBreaks(invData.details)
            : formatContentWithLineBreaks(invData.details?.split('\n').slice(0, 6).join('\n'))}
        </div>

        {invData.details && invData.details.split('\n').length > 6 && (
          <div className="modern-invexpdetails-toggle-container">
            <button
              className="modern-invexpdetails-toggle-btn"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Show Less ▲" : "Show More ▼"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewExpDetails;
