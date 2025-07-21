import React from "react";
import { Link } from "react-router-dom";
import "./Disclaimer.css";

const Disclaimer = () => (
  <div className="disclaimer-container">
    <div className="disclaimer-card">
      <h1 className="disclaimer-title">Disclaimer</h1>
      <p>
        <strong>RGJobs</strong> is an independent job portal. We aggregate job postings from various company websites and other public sources for informational purposes only.
      </p>
      <ul>
        <li>
          We are <strong>not affiliated</strong> with any company listed on this website.
        </li>
        <li>
          All trademarks, logos, and company names are the property of their respective owners.
        </li>
        <li>
          Job details (such as eligibility, requirements, and descriptions) are provided as-is and may be subject to change by the respective companies.
        </li>
        <li>
          We recommend you always verify job information and apply directly through the official company website.
        </li>
        <li>
          If you are a company representative and wish to update or remove a job listing, please <Link to="/contact">contact us</Link>.
        </li>
      </ul>
      <p className="disclaimer-note">
        <strong>Note:</strong> RGJobs does not guarantee the accuracy, completeness, or timeliness of any job listing. Use this site at your own discretion.
      </p>
      <div className="disclaimer-links">
        <Link to="/privacy-policy">Privacy Policy</Link> |{" "}
        <Link to="/terms-and-conditions">Terms & Conditions</Link> |{" "}
        <Link to="/about">About</Link>
      </div>
    </div>
  </div>
);

export default Disclaimer;