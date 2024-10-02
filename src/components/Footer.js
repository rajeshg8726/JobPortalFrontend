import React from 'react'
import './Stylesheet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faGithub,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className=" text-center" style={{ marginTop: "10rem" }} >
      {/* <!-- Grid container --> */}
      <div className="container p-4 pb-0">
       <p className="follow" > Follow Us: </p>
        {/* <!-- Section: Social media --> */}
        <section className="mb-4">
          {/* <!-- Facebook --> */}
          <Link
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1 facebk"
            target="_blank"
            to="https://www.facebook.com/profile.php?id=61566032126186"
            role="button"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </Link>

          {/* <!-- Twitter --> */}
          <Link
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1 twit"
            target="_blank"
            to="https://www.twitter.com/"
            role="button"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </Link>

          {/* <!-- YouTube --> */}
          <Link
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1 google"
            target="_blank"
            to="https://www.youtube.com/@RajeshGupta-e5d/videos"
            role="button"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </Link>

          {/* <!-- Instagram --> */}
          <Link
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1 insta"
            target="_blank"
            to="https://www.instagram.com/rgjobs_updates/"
            role="button"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </Link>

          {/* <!-- LinkedIn --> */}
          <Link
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1 lkd"
            target="_blank"
            to="https://www.linkedin.com/company/rgjobs/?viewAsMember=true"
            role="button"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </Link>

          {/* <!-- Github --> */}
          <Link
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1 github"
            target="_blank"
            to="https://www.github.com/"
            role="button"
          >
            <FontAwesomeIcon icon={faGithub} />
          </Link>
        </section>
        {/* <!-- Section: Social media --> */}
      </div>
      {/* <!-- Grid container -->
    <!-- Copyright --> */}
  {/*  Privay Policy and T&C */}
  <div className="policy">
    <Link className="ptc"  role='button' to="/privacy-policy"> Privacy Policy</Link> | 
    <Link className="ptc" role='button' to="/terms-and-conditions"> Terms & Conditions</Link>
  </div>
      <div className="text-center p-3 copyright" >
        Copyright © 2024 RGJobs | All rights reserved
      </div>
      {/* <!-- Copyright --> */}
    </footer>
  )
}

export default Footer;
