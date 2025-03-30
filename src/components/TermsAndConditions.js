import React from 'react';
import { useEffect } from 'react';

const TermsAndConditions = () => {

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Runs only once when the component is mounted

  return (
    <div className="container my-5 ">
      <h4 className='text-center mt-4'> <strong> Terms and Conditions </strong></h4>

      <h5><strong>1. Introduction</strong></h5>
      <p>
        Welcome to RGJobs (https://rgjobs.in). By using our website, you agree to the following
        terms and conditions. Please read them carefully before accessing or using our services.
      </p>

      <h5><strong>2. Use of Logos and Trademarks</strong></h5>
      <p>
        All company names, logos, and brands displayed on RGJobs are the property of their
        respective owners. We use these logos for identification purposes only and are not
        affiliated with or endorsed by these companies unless stated otherwise. We are merely an
        information provider for job openings. If you believe your trademark is being used
        improperly, please contact us at <a href="mailto:rgjobsupdate@gmail.com">rgjobsupdate@gmail.com</a>.
      </p>

      <h5><strong>3. Job Postings and Information Accuracy</strong></h5>
      <p>
        RGJobs provides job listings and related information sourced from various companies and job
        boards. We strive to ensure that all information is accurate, but we do not guarantee the
        accuracy, completeness, or timeliness of any job posting.
      </p>

      <h5><strong>4. User Responsibilities</strong></h5>
      <p>
        You are responsible for any activity that occurs under your account and for maintaining the
        confidentiality of your account information. You agree not to post false information or
        apply for jobs fraudulently.
      </p>

      <h5><strong>5. Liability</strong></h5>
      <p>
        RGJobs will not be liable for any damages or losses resulting from your use of the website.
        This includes, but is not limited to, job postings, third-party links, or user content.
      </p>

      <h5><strong>6. Third-Party Links</strong></h5>
      <p>
        Our website may contain links to third-party websites. These links are provided for your
        convenience, and we do not endorse or take responsibility for the content or practices of
        any linked websites.
      </p>

      <h5><strong>7. Termination</strong></h5>
      <p>
        We reserve the right to terminate or suspend your access to our services at any time, with
        or without cause, including for violations of these terms.
      </p>

      <h5><strong>8. Governing Law</strong></h5>
      <p>
        These terms are governed by and construed in accordance with the laws of India, without
        regard to its conflict of law provisions.
      </p>

      <h5><strong>Contact Us</strong></h5>
      <p>
        If you have any questions regarding these terms, please contact us at
        <a href="mailto:rgjobsupdate@gmail.com"> rgjobsupdate@gmail.com </a>.
      </p>
    </div>
  );
};

export default TermsAndConditions;
