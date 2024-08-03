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
    <footer className="bg-body-tertiary text-center" style={{ marginTop: "10rem" }} >
      {/* <!-- Grid container --> */}
      <div className="container p-4 pb-0">
        {/* <!-- Section: Social media --> */}
        <section className="mb-4">
          {/* <!-- Facebook --> */}
          <Link
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1 facebk"
            target="_blank"
            to="https://www.facebook.com/"
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

          {/* <!-- Google --> */}
          <Link
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1 google"
            target="_blank"
            to="https://www.youtube.com/"
            role="button"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </Link>

          {/* <!-- Instagram --> */}
          <Link
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1 insta"
            target="_blank"
            to="https://www.instagram.com/"
            role="button"

          >
            <FontAwesomeIcon icon={faInstagram} />
            
          </Link>

          {/* <!-- Linkedin --> */}
          <Link
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1 lkd"
            target="_blank"
            to="https://www.linkedin.com/feed/"
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
      <div className="text-center p-3 copyright" >
        © 2024 Copyright:
        <Link className="text-body btn btn-sm" to="https://www.linkedin.com/in/rajesh-gupta-37b8621b2/" target='_blank'>RAJESH GUPTA</Link>
      </div>
      {/* <!-- Copyright --> */}
    </footer>
  )
}

export default Footer