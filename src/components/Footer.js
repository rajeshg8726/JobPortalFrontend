import React from 'react'
import './Stylesheet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <>
    <footer class="border-top py-5 footer">
    <div class="">
      <div className="container ">
      <span class="textStyle">RGJobs</span> <br />
      <p className='text-xs textStyle'>We provide the latest updates on your <br/> dream job opportunities so you don't <br/> miss any chance to achieve your goals.</p>
       <p className="follow textStyle" > Follow Us: </p>
        {/* <!-- Section: Social media --> */}
        <section className="mb-4 socialIcon">
          {/* <!-- Facebook --> */}
          <Link
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1 facebk btn-sm"
            target="_blank"
            to="https://www.facebook.com/profile.php?id=61566032126186"
            role="button"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </Link>

          {/* <!-- Twitter --> */}
          <Link
            data-mdb-ripple-init
            className="btn btn-sm text-white btn-floating m-1 twit"
            target="_blank"
            to="https://x.com/rgjobs_updates"
            role="button"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </Link>

          {/* <!-- YouTube --> */}
          <Link
            data-mdb-ripple-init
            className="btn btn-sm text-white btn-floating m-1 google"
            target="_blank"
            to="https://www.youtube.com/@RajeshGupta-e5d/videos"
            role="button"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </Link>

          {/* <!-- Instagram --> */}
          <Link
            data-mdb-ripple-init
            className="btn btn-sm text-white btn-floating m-1 insta"
            target="_blank"
            to="https://www.instagram.com/rgjobs_updates/"
            role="button"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </Link>

          {/* <!-- LinkedIn --> */}
          <Link
            data-mdb-ripple-init
            className="btn btn-sm text-white btn-floating m-1 lkd"
            target="_blank"
            to="https://www.linkedin.com/company/rgjobs/?viewAsMember=true"
            role="button"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </Link>

          
        </section>
        {/* <!-- Section: Social media --> */}
      </div>
    </div>

    <div className="">
    <h5 className='fhead textStyle' >Company</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2 textStyle"><Link to="/about" class="nav-link p-0 ">About Us</Link></li>
        <li class="nav-item mb-2 textStyle"><Link to="/contact" class="nav-link p-0 ">Contact Us</Link></li>
        <li class="nav-item mb-2 textStyle"><Link to="/updates" class="nav-link p-0 ">Updates</Link></li>
        <li class="nav-item mb-2 textStyle"><Link to="/privacy-policy" class="nav-link p-0 ">Privacy Policy</Link></li>
        <li class="nav-item mb-2 textStyle"><Link to="/terms-and-conditions" class="nav-link p-0 ">Terms & Conditions</Link></li>
      </ul>
    </div>




    <div class="">
      <h5 className='fhead textStyle'>Location</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2 textStyle"><Link to="/jobs/Remote" class="nav-link p-0 ">Remote</Link></li>
        <li class="nav-item mb-2 textStyle"><Link to="/jobs/Bengaluru" class="nav-link p-0 ">Bengaluru</Link></li>
        <li class="nav-item mb-2 textStyle"><Link to="/jobs/Hyderabad" class="nav-link p-0 ">Hyderabad</Link></li>
        <li class="nav-item mb-2 textStyle"><Link to="/jobs/Gurgoan" class="nav-link p-0 ">Gurgaon</Link></li>
        <li class="nav-item mb-2 textStyle"><Link to="/jobs/Chennai" class="nav-link p-0 ">Chennai</Link></li>
      </ul>
    </div>

    <div class="">
      <h5 className='fhead textStyle'>Roles</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2 textStyle"><Link to="/jobsbyrole/software-developer-jobs" class="nav-link p-0 ">Backend Developer</Link></li>
        <li class="nav-item mb-2 textStyle"><Link to="/jobsbyrole/software-engineer-jobs" class="nav-link p-0 ">Frontend Developer</Link></li>
        <li class="nav-item mb-2 textStyle"><Link to="/jobsbyrole/analytics-and-data-science-jobs" class="nav-link p-0 ">Analytics & Data Science</Link></li>
        <li class="nav-item mb-2 textStyle"><Link to="/jobsbyrole/software-testing-jobs" class="nav-link p-0 ">Testing</Link></li>
        <li class="nav-item mb-2 textStyle"><Link to="/jobsbyrole/technical-support-jobs" class="nav-link p-0 ">Technical Support</Link></li>
      </ul>

    </div>

  </footer>


      <div className=" text-center p-3 copyright" >
        Copyright © 2024 RGJobs | All rights reserved
      </div>
      </>
  )
}

export default Footer;
