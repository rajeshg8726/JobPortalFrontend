import React from 'react';
import './Stylesheet.css';


const PrivacyPolicy = () => {
  return (
    <div className="container my-5" style={{fontSize:"15px"}}>
      <h4 className='text-center'>Privacy Policy</h4>
      <p><strong>Effective Date:</strong> SEP 21,2024 </p>

      <p>Welcome to <strong>RGJobs</strong>. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, <strong>https://rgjobs.in</strong>, which is dedicated to providing users with the latest job updates.</p>

      <h4 className='text-sm' >1. Information We Collect</h4>
      <p>We collect various types of information to provide and improve our services. This includes:</p>

      <h4>(a) Personal Data</h4>
      <p>When you visit our Website, you may voluntarily provide us with personally identifiable information ("Personal Data"). This may include:</p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Contact information</li>
        {/* <li>Resume details (if applying for jobs via our platform)</li> */}
      </ul>
      <p>You provide this information when subscribing to job alerts, filling out contact forms, or applying for job postings through our platform.</p>

      <h4>(b) Non-Personal Data</h4>
      <p>We may also collect non-personal data, such as:</p>
      <ul>
        <li>Browser type</li>
        <li>Operating system</li>
        <li>Referring website</li>
        <li>Pages visited</li>
        <li>Time spent on the Website</li>
        <li>Clickstream data</li>
      </ul>
      <p>This information helps us understand user preferences and improve the user experience on our Website.</p>

      <h4>(c) Cookies and Tracking Technologies</h4>
      <p>We use cookies, web beacons, and similar tracking technologies to collect non-personal information automatically as you interact with our Website. These technologies help us:</p>
      <ul>
        <li>Improve the functionality of the Website</li>
        <li>Customize user experience</li>
        <li>Track user behavior for analytical purposes</li>
      </ul>
      <p>You can choose to disable cookies in your browser settings, but this may affect the functionality of the Website.</p>

      <h4>2. How We Use Your Information</h4>
      <p>We use the collected data for various purposes, including:</p>
      <ul>
        <li>Providing job updates and relevant content to you</li>
        <li>Sending you email notifications and newsletters related to job openings</li>
        <li>Responding to your inquiries and comments</li>
        <li>Analyzing website traffic and user behavior for improving our services</li>
        <li>Monitoring and preventing fraudulent activities</li>
        <li>Complying with legal obligations</li>
      </ul>

      <h4>3. How We Share Your Information</h4>
      <p>We do not sell, trade, or rent your personal information to third parties. However, we may share your data in the following cases:</p>
      <ul>
        <li><strong>Service Providers:</strong> We may share your data with third-party service providers who assist us with website functionality, analytics, and marketing.</li>
        <li><strong>Legal Requirements:</strong> If required by law or in response to legal proceedings, we may disclose your personal information to law enforcement agencies, regulators, or other authorities.</li>
        <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of our business, your personal information may be transferred as part of the transaction.</li>
      </ul>

      <h4>4. Third-Party Links</h4>
      <p>Our Website may contain links to third-party websites (e.g., job listings from external sources, social media platforms like Instagram, Facebook, LinkedIn). Please note that these websites are not under our control, and we are not responsible for the privacy practices or content of these websites.</p>

      <h4>5. Data Security</h4>
      <p>We implement reasonable technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction. However, please note that no method of data transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>

      <h4>6. Your Rights</h4>
      <p>Depending on your location, you may have certain rights under applicable data protection laws. These rights may include:</p>
      <ul>
        <li><strong>Access:</strong> Request access to the personal data we hold about you.</li>
        <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
        <li><strong>Deletion:</strong> Request the deletion of your personal data, subject to certain legal exceptions.</li>
        <li><strong>Objection:</strong> Object to the processing of your personal data in some circumstances.</li>
        <li><strong>Withdrawal of Consent:</strong> Where consent is the basis for processing, you may withdraw your consent at any time.</li>
      </ul>
      <p>To exercise your rights, please contact us at [Insert Contact Information].</p>

      <h4>7. Children's Privacy</h4>
      <p>Our Website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will delete such data from our records.</p>

      <h4>8. Changes to This Privacy Policy</h4>
      <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Effective Date." We encourage you to review this page periodically to stay informed about our privacy practices.</p>

      <h4>9. Contact Us</h4>
      <p>If you have any questions or concerns about this Privacy Policy or your personal data, please contact us at:</p>
      <p><strong>Email:</strong> rgjobsupdate@gmail.com  </p>
      {/* <p><strong>Phone:</strong> [Insert Phone Number]</p>
      <p><strong>Address:</strong> [Insert Physical Address]</p> */}

      <p>Thank you for visiting RGJobs!</p>
    </div>
  );
};

export default PrivacyPolicy;
