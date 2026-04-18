import React, { useEffect } from 'react';
import Footer from './Footer';
import './LegalPages.css';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when page loads
  }, []);

  return (
    <div className="legal-page">
      <div className="legal-container">
        <header className="legal-header">
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-date">Effective Date: {new Date().toLocaleDateString()}</p>
        </header>

        <section className="legal-section">
          <h2 className="legal-section-title">1. Introduction</h2>
          <p className="legal-paragraph">
            Welcome to SiswaNiaga. We respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, and safeguard your information when you access and 
            use our digital pitch deck directory platform.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">2. Data We Collect</h2>
          <p className="legal-paragraph">
            During your use of SiswaNiaga, we may collect the following categories of information:
          </p>
          <ul className="legal-list">
            <li className="legal-list-item"><strong>User Account Data:</strong> Your name, email address, student identification credentials, password, and fundamental profile details necessary for account creation.</li>
            <li className="legal-list-item"><strong>Business Data:</strong> Startup details, pitch deck financial figures, product outlines, business descriptions, and uploaded documents associated with your academic project or enterprise.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">3. Usage of Third-Party Services</h2>
          <p className="legal-paragraph">
            To provide a robust, enterprise-grade application experience, SiswaNiaga integrates with specific, industry-standard third-party services. Please acknowledge that data shared with these external entities is governed by their independent privacy frameworks:
          </p>
          <ul className="legal-list">
            <li className="legal-list-item"><strong>Cloudinary:</strong> We utilize Cloudinary for image and media hosting. Any files you upload containing images or visual media as part of your pitch deck are processed and stored securely through their infrastructure.</li>
            <li className="legal-list-item"><strong>Google Gemini AI:</strong> We incorporate advanced artificial intelligence models (such as Google Gemini) to assist users with automated copywriting, ideation, and content enhancement. Limited text prompts you enter for AI processing may be transmitted to Google APIs to generate optimized descriptions.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">4. No 100% Guarantee of Data Security</h2>
          <p className="legal-paragraph">
            We have implemented appropriate technical, academic, and administrative security protocols engineered to protect the confidentiality and integrity of any personal information we process. However, despite our rigorous safeguards and best operational efforts, no electronic transmission over the Internet or networked data storage technology can be guaranteed to be absolutely impervious or 100% secure. 
          </p>
          <p className="legal-paragraph">
            We cannot officially promise, warrant, or guarantee that malicious cybercriminals, unauthorized third parties, or sophisticated network intruders will not possess the capability to defeat our security configurations and improperly collect, access, steal, or modify your stored information. You provide your data at your own calculated risk.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">5. Contact Information</h2>
          <p className="legal-paragraph">
            Should you harbor any specific inquiries or professional concerns regarding this documentation, please directly contact the platform administration operating this academic pilot initiative.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
