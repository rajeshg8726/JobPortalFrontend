import React from 'react';
import { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Runs only once when the component is mounted
  
  return (
    <div className="container my-5">
      <h4 className='text-center mt-8'> <strong> Privacy Policy </strong></h4>
      <p>
        At RGJobs (https://rgjobs.in), we value your privacy and are committed to protecting your
        personal information. This Privacy Policy outlines how we collect, use, and safeguard your
        data.
      </p>

      <h5><strong>1. Information We Collect</strong></h5>
      <p>
        We collect personal information such as name, email address, and contact details when you
        contact with through our portal. Additionally, we may collect browsing
        information like IP addresses and cookies for analytics purposes.
      </p>

      <h5><strong>2. How We Use Your Information</strong></h5>
      <p>
        We use the information we collect to provide job recommendations, improve our services, and
        send job alerts via email. Your data is never shared with third parties unless required by
        law.
      </p>

      <h5><strong>3. Cookies and Tracking</strong></h5>
      <p>
        We use cookies to enhance your experience on our website. Cookies are small files stored on
        your device that help us understand user behavior and improve site functionality. You can
        disable cookies via your browser settings.
      </p>

      <h5><strong>4. Data Security</strong></h5>
      <p>
        We take reasonable steps to protect your data against unauthorized access, alteration, or
        destruction. However, no data transmission over the internet is 100% secure.
      </p>

      <h5><strong>5. Your Rights</strong></h5>
      <p>
        You have the right to access, modify, or delete your personal information. Contact us at
        <a href="mailto:rgjobsupdate@gmail.com"> rgjobsupdate@gmail.com </a> for any inquiries or requests.
      </p>

      <h5><strong>6. Changes to the Privacy Policy</strong></h5>
      <p>
        We reserve the right to update this Privacy Policy at any time. Any changes will be posted
        on this page with a revised date.
      </p>

      <h5><strong>Contact Us</strong></h5>
      <p>
        If you have any questions about this Privacy Policy, please contact us at
        <a href="mailto:rgjobsupdate@gmail.com"> rgjobsupdate@gmail.com </a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
