import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SecondStyleSheet.css';

const PrivacyPolicy = () => {

  return (
    <div className="modern-privacy-container">
      <div className="modern-privacy-card">
        <h1 className="modern-privacy-title">Privacy Policy</h1>
        <p className="modern-privacy-date">
          <em>Last Revised: June 15, 2025</em>
        </p>

        <p>
          At <span className="modern-privacy-highlight">RGJobs</span> (<span className="modern-privacy-link">https://www.rgjobs.in</span>), we are deeply committed to protecting your privacy and personal information. This Privacy Policy outlines our practices regarding the collection, use, disclosure, and safeguarding of your data when you visit and interact with our website. By using our services, you consent to the data practices described in this policy.
        </p>

        <h2 className="modern-privacy-section-title">1. Information We Collect</h2>
        <ul className="modern-privacy-list">
          <li>
            <strong>Personal Information:</strong> We collect personal details you voluntarily provide when you interact with our portal, such as your name, email address, and contact information when you sign up for job alerts, submit inquiries, or use any interactive features.
          </li>
          <li>
            <strong>Usage Data:</strong> We automatically collect information on how the Service is accessed and used ("Usage Data"). This may include your computer's Internet Protocol address (IP), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.
          </li>
          <li>
            <strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. More details on this are provided in the "Cookies and Tracking" section below.
          </li>
        </ul>

        <h2 className="modern-privacy-section-title">2. How We Use Your Information</h2>
        <ul className="modern-privacy-list">
          <li>To provide and maintain our Service, including displaying job listings.</li>
          <li>To notify you about changes to our Service.</li>
          <li>To allow you to participate in interactive features of our Service when you choose to do so.</li>
          <li>To provide customer support.</li>
          <li>To send you job recommendations, relevant job alerts, and other communications via email, based on your preferences.</li>
          <li>To monitor the usage of our Service.</li>
          <li>To detect, prevent, and address technical issues.</li>
          <li>To personalize your experience on our website.</li>
          <li>For analytics and research to improve our website's functionality and content.</li>
        </ul>
        <p>
          We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except as described in this Privacy Policy or when required by law.
        </p>

        <h2 className="modern-privacy-section-title">3. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies (like web beacons and pixels) to track activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
        </p>
        <p>
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
        </p>

        <h3 className="modern-privacy-subsection-title">Google AdSense & DoubleClick DART Cookie</h3>
        <p>
          We use Google AdSense to serve advertisements on our website. Google, as a third-party vendor, uses cookies to serve ads on RGJobs. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our site and other sites on the Internet.
        </p>
        <p>
          Users may opt out of the use of the DART cookie by visiting the Google Ad and Content Network Privacy Policy at:
          <br />
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="modern-privacy-link">
            https://policies.google.com/technologies/ads
          </a>
        </p>
        <p>
          For more information on how Google uses data when you use our partners' sites or apps, please visit:
          <br />
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="modern-privacy-link">
            https://policies.google.com/technologies/partner-sites
          </a>
        </p>
        <p>
          Some of the ads may be interest-based, meaning they are tailored to your likely interests based on your browsing activity. To learn more about interest-based advertising or to opt-out, you can visit the Network Advertising Initiative website at:
          <br />
          <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="modern-privacy-link">
            https://optout.networkadvertising.org/
          </a>
        </p>
        <p>
          Other third-party advertisers or ad networks may also use cookies and web beacons on our site to measure the effectiveness of their advertisements and/or to personalize the advertising content that you see. RGJobs has no access to or control over these cookies that are used by third-party advertisers.
        </p>

        <h2 className="modern-privacy-section-title">4. Data Security</h2>
        <p>
          We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information. These measures include secure server environments, encryption, and restricted access to data. However, please be aware that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
        </p>

        <h2 className="modern-privacy-section-title">5. Data Retention</h2>
        <p>
          We retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
        </p>

        <h2 className="modern-privacy-section-title">6. Your Rights</h2>
        <ul className="modern-privacy-list">
          <li>
            <strong>Access & Correction:</strong> You have the right to request access to the personal data we hold about you and to request that we correct any inaccuracies.
          </li>
          <li>
            <strong>Deletion:</strong> You have the right to request the deletion of your personal data, subject to certain legal exceptions.
          </li>
          <li>
            <strong>Opt-Out:</strong> You can opt-out of receiving promotional communications from us by following the unsubscribe link in those emails.
          </li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at
          <a href="mailto:rgjobsupdate@gmail.com" className="modern-privacy-link"> rgjobsupdate@gmail.com </a>.
        </p>

        <h2 className="modern-privacy-section-title">7. Children's Privacy</h2>
        <p>
          Our Service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your Children have provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
        </p>

        <h2 className="modern-privacy-section-title">8. Links to Other Sites</h2>
        <p>
          Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
        </p>

        <h2 className="modern-privacy-section-title">9. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Revised" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </p>

        <h2 className="modern-privacy-section-title">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us:
        </p>
        <ul className="modern-privacy-list">
          <li>
            By email:
            <a href="mailto:rgjobsupdate@gmail.com" className="modern-privacy-link"> rgjobsupdate@gmail.com </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
