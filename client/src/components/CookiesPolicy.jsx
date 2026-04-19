import React, { useEffect } from 'react';
import Footer from './Footer';
import './LegalPages.css';

const CookiesPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when page loads
  }, []);

  return (
    <div className="legal-page">
      <div className="legal-container">
        <header className="legal-header">
          <h1 className="legal-title">Cookies &amp; Local Storage Policy</h1>
          <p className="legal-date">Effective Date: {new Date().toLocaleDateString()}</p>
        </header>

        <section className="legal-section">
          <h2 className="legal-section-title">1. Introduction</h2>
          <p className="legal-paragraph">
            This Cookies &amp; Local Storage Policy explains how SiswaNiaga utilizes browser-based storage
            mechanisms to facilitate core platform functionality. We are committed to transparency regarding
            all client-side data persistence employed during your interaction with our services.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">2. Use of Local Storage</h2>
          <p className="legal-paragraph">
            SiswaNiaga primarily leverages your browser's <strong>Local Storage</strong> API — rather than
            traditional HTTP cookies — for the purpose of maintaining secure, authenticated user sessions.
            The following data may be stored locally on your device:
          </p>
          <ul className="legal-list">
            <li className="legal-list-item">
              <strong>Authentication Token (JWT):</strong> Upon successful login, a cryptographically signed
              JSON Web Token (JWT) is generated server-side and persisted in your browser's Local Storage.
              This token is essential for verifying your identity across subsequent requests without requiring
              repeated credential entry, thereby enabling a seamless and secure session experience.
            </li>
            <li className="legal-list-item">
              <strong>Session Continuity:</strong> The stored JWT allows SiswaNiaga to maintain your
              authenticated state across page reloads and browser tabs. No sensitive credentials (such as
              passwords) are ever stored in Local Storage — only the time-limited, signed token.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">3. Implications of Clearing Local Storage</h2>
          <p className="legal-paragraph">
            Should you manually clear your browser's Local Storage — either through browser settings,
            developer tools, or by utilizing any third-party cache-clearing utility — your active
            authentication token will be permanently removed. This action will <strong>immediately
            terminate your current session</strong> and require you to re-authenticate by logging in
            again with your registered credentials.
          </p>
          <div className="legal-box">
            <strong>IMPORTANT:</strong> Clearing your browser's Local Storage is functionally equivalent
            to logging out of SiswaNiaga. Please exercise caution when performing bulk cache or data
            clearance operations in your browser settings.
          </div>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">4. Third-Party Cookies &amp; Operational Storage</h2>
          <p className="legal-paragraph">
            While SiswaNiaga itself does not deploy traditional tracking cookies, please be advised that
            certain third-party integrations embedded within our platform may independently utilize their
            own cookies or local storage mechanisms for operational purposes:
          </p>
          <ul className="legal-list">
            <li className="legal-list-item">
              <strong>Cloudinary:</strong> Our image and media hosting provider, Cloudinary, may set
              operational cookies or utilize browser storage to facilitate secure media uploads, content
              delivery optimization, and widget functionality. These cookies are strictly functional in
              nature and are governed by Cloudinary's own privacy and cookie policies.
            </li>
            <li className="legal-list-item">
              <strong>Google APIs:</strong> Integrations involving Google services (such as Google Gemini AI)
              may set their own session or performance cookies as part of standard API communication protocols.
              These are managed independently by Google under their respective privacy frameworks.
            </li>
          </ul>
          <p className="legal-paragraph">
            SiswaNiaga does not exercise control over cookies or storage mechanisms deployed by these
            third-party providers. We strongly recommend reviewing the privacy and cookie policies of each
            respective service for comprehensive disclosure.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">5. Your Control &amp; Rights</h2>
          <p className="legal-paragraph">
            You retain full control over your browser's storage at all times. Most modern browsers allow
            you to inspect, modify, and delete Local Storage data through built-in developer tools. You
            may also configure your browser to block or restrict Local Storage access entirely; however,
            doing so will prevent SiswaNiaga from maintaining your authenticated session, effectively
            rendering the platform inoperable for logged-in functionality.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">6. Contact Information</h2>
          <p className="legal-paragraph">
            Should you have any specific inquiries or professional concerns regarding this Cookies &amp;
            Local Storage Policy, please directly contact the platform administration operating this
            academic pilot initiative.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CookiesPolicy;
