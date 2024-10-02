import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DarkModeToggle from './DarkModeToggle';
import './Stylesheet.css';
function Header({handleSearch}) {
   
    return (
        <>
        <div>
            <nav className="navbar navbar-expand-lg ">
           
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"> 
                        <img src="/rglogo.png" alt="RGLOGO" style={{ width: "2rem" }} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/updates">Updates</Link>
                            </li>
                        </ul>
                         <DarkModeToggle />
                        <div className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                </div>
            </nav>
            {/* Display the filtered results */}
            {/* <div>
                {filteredData.map((job, index) => (
                    <div key={index}>
                        <h4>{job.title}</h4>
                        <p>{job.description}</p>
                    </div>
                ))}
            </div> */}
        </div>
        </>
    );
}

export default Header;
