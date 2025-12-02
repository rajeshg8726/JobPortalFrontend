import React, { useEffect } from 'react';
import './SecondStyleSheet.css';

const TermsAndConditions = () => {


  return (
    <div className="modern-terms-container">
      <div className="modern-terms-card">
        <h1 className="modern-terms-title">Terms and Conditions of Use</h1>
        <p className="modern-terms-date">
          <em>Last Revised: June 15, 2025</em>
        </p>

        <h2 className="modern-terms-section-title">1. Introduction and Acceptance of Terms</h2>
        <p>
          Welcome to <span className="modern-terms-highlight">RGJobs</span> (<span className="modern-terms-link">https://www.rgjobs.in</span>). These Terms and Conditions ("Terms")
          govern your access to and use of our website, including any content,
          functionality, and services offered on or through our platform (the "Service").
        </p>
        <p>
          By accessing or using the Service, you signify your agreement to be bound
          by these Terms and our Privacy Policy, incorporated herein by reference.
          If you do not agree to these Terms, you must not access or use the Service.
        </p>

        <h2 className="modern-terms-section-title">2. Use of Logos, Trademarks, and Intellectual Property</h2>
        <p>
          All company names, product names, logos, trademarks, and service marks
          ("Trademarks") displayed on RGJobs are the property of their respective
          owners. We use these Trademarks solely for the purpose of identifying
          the companies and their job openings and do not imply any affiliation
          with, endorsement by, or sponsorship from these companies unless
          explicitly stated. We act merely as an information provider for job
          opportunities.
        </p>
        <p>
          All content on this website, including text, graphics, logos, images,
          and software, is the intellectual property of RGJobs or its content
          suppliers and is protected by copyright, trademark, and other intellectual
          property laws. You may not reproduce, distribute, modify, create derivative
          works of, publicly display, publicly perform, republish, download, store,
          or transmit any of the material on our Service, except as generally
          permitted for personal, non-commercial use.
        </p>
        <p>
          If you believe your trademark or copyrighted material is being used
          improperly on our site, please contact us immediately at
          <a href="mailto:rgjobsupdate@gmail.com" className="modern-terms-link"> rgjobsupdate@gmail.com </a>
          with relevant details.
        </p>

        <h2 className="modern-terms-section-title">3. Job Postings and Information Accuracy Disclaimer</h2>
        <p>
          RGJobs provides job listings and related information ("Job Postings")
          sourced from various companies, recruiters, and publicly available job boards.
          While we strive to ensure that all information is accurate and up-to-date,
          we do not guarantee the accuracy, completeness, reliability, timeliness,
          or availability of any Job Posting.
        </p>
        <p>
          Job seekers are responsible for verifying the legitimacy and accuracy of
          any job listing before taking any action, including applying for a job.
          RGJobs is not responsible for any inaccuracies, errors, or omissions in
          Job Postings, nor for any consequences arising from reliance upon them.
        </p>

        <h2 className="modern-terms-section-title">4. User Accounts and Responsibilities</h2>
        <p>
          If the Service requires or allows you to create an account, you are
          responsible for maintaining the confidentiality of your account
          credentials (username, password, etc.) and for all activities that
          occur under your account. You agree to notify us immediately of any
          unauthorized use of your account or any other breach of security.
        </p>
        <p>You agree not to:</p>
        <ul className="modern-terms-list">
          <li>Submit false, inaccurate, or misleading information.</li>
          <li>Post or transmit any material that is unlawful, harmful, defamatory, obscene, or otherwise objectionable.</li>
          <li>Engage in any activity that interferes with or disrupts the Service or the servers and networks connected to the Service.</li>
          <li>Attempt to gain unauthorized access to any portion or feature of the Service or any other systems or networks connected to the Service.</li>
          <li>Use the Service for any fraudulent or illegal purpose.</li>
        </ul>

        <h2 className="modern-terms-section-title">5. Third-Party Links and Advertisements</h2>
        <p>
          Our Service may contain links to third-party websites, advertisers, or
          services that are not owned or controlled by RGJobs. These links are
          provided for your convenience. We have no control over, and assume no
          responsibility for, the content, privacy policies, or practices of any
          third-party websites or services. We strongly advise you to review the
          terms and privacy policies of any third-party sites or services that
          you visit.
        </p>
        <p>
          RGJobs may display advertisements from third-party advertising networks,
          including Google AdSense. These advertisers may use cookies and similar
          technologies to serve ads based on your visit to our Service and other
          sites on the Internet. We do not endorse or make any representations
          about these third-party ads or the products/services advertised.
        </p>

        <h2 className="modern-terms-section-title">6. Disclaimer of Warranties</h2>
        <p>
          THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT
          ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. RGJOBS DOES NOT
          MAKE ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS,
          SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICE.
          WITHOUT LIMITING THE FOREGOING, RGJOBS DOES NOT REPRESENT OR WARRANT
          THAT THE SERVICE, ITS CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH
          THE SERVICE WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED,
          THAT DEFECTS WILL BE CORRECTED, THAT OUR SITE OR THE SERVER THAT MAKES
          IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR THAT
          THE SERVICE OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICE WILL
          OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.
        </p>

        <h2 className="modern-terms-section-title">7. Limitation of Liability</h2>
        <p>
          TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL RGJOBS, ITS
          AFFILIATES, LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS,
          OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY,
          ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE
          SERVICE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE SERVICE OR SUCH
          OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL
          INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF
          PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF
          GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE),
          BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE.
        </p>

        <h2 className="modern-terms-section-title">8. Indemnification</h2>
        <p>
          You agree to defend, indemnify, and hold harmless RGJobs, its affiliates,
          licensors, and service providers, and its and their respective officers,
          directors, employees, contractors, agents, licensors, suppliers, successors,
          and assigns from and against any claims, liabilities, damages, judgments,
          awards, losses, costs, expenses, or fees (including reasonable attorneys'
          fees) arising out of or relating to your violation of these Terms or your
          use of the Service, including, but not limited to, your User Contributions,
          any use of the Service's content, services, and products other than as
          expressly authorized in these Terms, or your use of any information obtained
          from the Service.
        </p>

        <h2 className="modern-terms-section-title">9. Termination</h2>
        <p>
          We may terminate or suspend your access to all or part of the Service
          immediately, without prior notice or liability, for any reason whatsoever,
          including without limitation if you breach these Terms. Upon termination,
          your right to use the Service will immediately cease.
        </p>

        <h2 className="modern-terms-section-title">10. Governing Law and Jurisdiction</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws
          of India, without regard to its conflict of law provisions. Any legal action
          or proceeding arising under these Terms will be brought exclusively in the
          courts located in India, and you hereby consent to the personal jurisdiction
          and venue therein.
        </p>

        <h2 className="modern-terms-section-title">11. Severability</h2>
        <p>
          If any provision of these Terms is held to be invalid or unenforceable by
          a court, the remaining provisions of these Terms will remain in effect.
          These Terms constitute the entire agreement between us regarding our Service,
          and supersede and replace any prior agreements we might have between us
          regarding the Service.
        </p>

        <h2 className="modern-terms-section-title">12. Changes to These Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these
          Terms at any time. If a revision is material, we will provide at least
          30 days' notice prior to any new terms taking effect. What constitutes
          a material change will be determined at our sole discretion. By continuing
          to access or use our Service after those revisions become effective, you
          agree to be bound by the revised terms.
        </p>

        <h2 className="modern-terms-section-title">Contact Us</h2>
        <p>
          If you have any questions about these Terms and Conditions, please contact us:
        </p>
        <ul className="modern-terms-list">
          <li>
            By email:
            <a href="mailto:rgjobsupdate@gmail.com" className="modern-terms-link"> rgjobsupdate@gmail.com </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TermsAndConditions;
