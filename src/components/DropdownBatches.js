import React from 'react';
import './Stylesheet.css';  // External CSS file for styling

const DropdownBatches = () => {
    // You can replace these with actual job batches/categories
    const jobBatches = [
        { batch: '2024', jobs: ['Software Engineer', 'Data Analyst', 'Product Manager'] },
        { batch: '2023', jobs: ['Backend Developer', 'Frontend Developer', 'DevOps Engineer'] },
        { batch: '2022', jobs: ['Full Stack Developer', 'Cloud Architect', 'QA Engineer'] }
    ];
    return (
        <div className="dropdown">
            <button className="dropbtn">Job By Batches</button>
            <div className="dropdown-content">
                {jobBatches.map((batch, index) => (
                    <div key={index} className="dropdown-item">
                        <span className="batch-name">{`Batch ${batch.batch}`}</span>
                        <div className="job-list">
                            {batch.jobs.map((job, jobIndex) => (
                                <p key={jobIndex}>{job}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DropdownBatches;
