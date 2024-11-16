import React, { useState, useEffect } from 'react';
import './SecondStyleSheet.css';
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
        console.log(res.data.InvData);  // For debugging
      } catch (error) {
        console.error('Error fetching interview data:', error);
      }
    };
    getAllInterviewsById();
  }, [backendURL, id]);

  const formatContentWithLineBreaks = (text) => {
    // Split the text into sentences or segments of approximately three lines
    const sentences = text.split('.').map((sentence, index) => (
      <React.Fragment key={index}>
        {sentence.trim() && `${sentence.trim()}.`}
        {(index + 1) % 3 === 0 && <br />  } {/* Insert line break after every three sentences */}
      </React.Fragment>
    ));
    return sentences;
  };

  if (!invData) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="htitle border-bottom my-4 mx-4">
        Interview Title: {invData.title}
      </div>

      <div className="iconexp">
        <FontAwesomeIcon icon={faCircleUser} size="2xl" style={{ color: "#74C0FC" }} />
      </div>
      <div className="userexp">
        {invData.anonymous === 1 ? "Anonymous User" : invData.name}
      </div>

      <div className="postdate float-end">
        {new Date(invData.created_at).toLocaleDateString()}
      </div>

      <div className={`content my-4 mx-4 ${isExpanded ? 'expanded' : 'clamped'}`}>
        {formatContentWithLineBreaks(invData.details)}
      </div>

      <div
        className="toggle-button"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show Less" : "Show More"}
      </div>
    </div>
  );
};

export default InterviewExpDetails;
