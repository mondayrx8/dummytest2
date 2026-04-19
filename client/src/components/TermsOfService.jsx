import React, { useEffect } from 'react';
import Footer from './Footer';
import './LegalPages.css';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when page loads
  }, []);

  return (
    <div className="legal-page">
      <div className="legal-container">
        <header className="legal-header">
          <h1 className="legal-title">Terms of Service</h1>
          <p className="legal-date">Effective Date: {new Date().toLocaleDateString()}</p>
        </header>

        <div className="legal-alert">
          <h3 className="legal-alert-title">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            ACADEMIC PROJECT NOTICE
          </h3>
          <p>
            SiswaNiaga is strictly an <strong>Academic Final Year Project (FYP)</strong>. This digital platform is a conceptual directory intended for educational evaluation and portfolio demonstrative purposes only.
          </p>
        </div>

        <section className="legal-section">
          <h2 className="legal-section-title">1. Nature of the Service</h2>
          <p className="legal-paragraph">
            SiswaNiaga functions strictly as a directory platform and digital repository. We furnish a centralized space for student entrepreneurs to digitally catalog their ventures, business models, and accompanying pitch decks. By accessing this platform, you formally recognize that SiswaNiaga is merely a hosting directory. We do not independently verify, endorse, or audit the financial statements, legal registrations, or operational claims of any listed entities.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">2. Explicit Disclaimer of Liability</h2>
          <p className="legal-paragraph">
            The platform mechanism facilitates communication by providing immediate communication channels (such as "Direct Deals" via WhatsApp URLs) linking you directly with the respective student entrepreneurs.  
          </p>
          <div className="legal-box">
            <strong>WARNING OF ZERO LIABILITY:</strong> SiswaNiaga, its principal student developers, academic supervisors, university affiliates, and hosting providers hold absolutely <strong>ZERO LIABILITY</strong> under any local or international jurisdiction for any financial investments, monetary losses, unfulfilled agreements, scams, damages, or disputes that may arise from direct dealings or communications between platform users and external individuals or investors. All physical or digital transactions, correspondence, and contracts negotiated outside the purview of this system occur entirely strictly at your own, unmitigated risk.
          </div>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">3. Rights of the Administrators</h2>
          <p className="legal-paragraph">
            In order to maintain the pedagogical integrity and security of this academic project space, the platform Administrators emphatically reserve the sovereign right, at their absolute and sole discretion, to suspend, disable, temporarily hide, or permanently terminate user accounts and business portfolio listings at any time. This may be executed <strong>without prior warning, notice, or provided explanation</strong>. Causes catalyzing termination include, but are theoretically not limited to, suspected fraudulent uploads, violations of university codes of conduct, or general system misuse.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">4. User Code of Conduct</h2>
          <p className="legal-paragraph">
            You agree not to upload materials that are copyright-infringing, explicitly illegal, sexually explicit, or structurally malicious (e.g., malware or tracking software). All submitted portfolios must reflect the professional context expected in higher learning environments.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">5. Investment &amp; Financial Disclaimer</h2>
          <p className="legal-paragraph">
            SiswaNiaga is an <strong>academic showcase and portfolio directory platform</strong> developed
            exclusively for educational and demonstrative purposes. SiswaNiaga is <strong>not</strong> a
            registered financial advisor, licensed investment broker, securities dealer, or accredited
            fiduciary institution under any local or international regulatory authority. The platform does
            not solicit, recommend, endorse, or facilitate any form of financial investment, securities
            transaction, or monetary commitment.
          </p>
          <p className="legal-paragraph">
            Any financial figures, revenue projections, valuation estimates, or business metrics displayed
            within student portfolios are <strong>self-reported by individual users</strong> and have not
            been independently audited, verified, or validated by SiswaNiaga, its developers, or its
            academic affiliates.
          </p>
          <div className="legal-box">
            <strong>WARNING — ZERO LIABILITY FOR FINANCIAL ACTIVITY:</strong> SiswaNiaga, its principal
            student developers, academic supervisors, university affiliates, and hosting infrastructure
            providers hold absolutely <strong>ZERO LIABILITY</strong> for any financial investments,
            monetary losses, capital expenditures, unfulfilled returns, fraudulent schemes, scams, or
            any other financial damages incurred as a result of — or in connection with — information
            viewed on this platform. All investment decisions, financial transactions, and capital
            commitments made outside the purview of this system are undertaken entirely and exclusively
            at your own unmitigated risk.
          </div>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">6. Acceptable Use Policy (AUP)</h2>
          <p className="legal-paragraph">
            To preserve the academic integrity, operational security, and professional credibility of the
            SiswaNiaga platform, the following activities are <strong>strictly prohibited</strong>. Violation
            of any provision outlined herein may result in immediate account suspension, permanent
            termination, and referral to the relevant university disciplinary or legal authorities:
          </p>
          <ul className="legal-list">
            <li className="legal-list-item">
              <strong>Multi-Level Marketing &amp; Pyramid Schemes:</strong> Promoting, advertising, or
              recruiting for any multi-level marketing (MLM) operation, pyramid scheme, Ponzi structure,
              or any analogous scheme that derives revenue primarily from participant recruitment rather
              than legitimate product or service sales.
            </li>
            <li className="legal-list-item">
              <strong>Illegal Goods, Services &amp; Gambling:</strong> Listing, promoting, or facilitating
              the sale or distribution of controlled substances, counterfeit goods, unlicensed firearms,
              unauthorized pharmaceutical products, gambling services, or any commodity or activity that
              contravenes applicable Malaysian law or international trade regulations.
            </li>
            <li className="legal-list-item">
              <strong>Falsification of Academic Credentials:</strong> Fabricating, misrepresenting, or
              inflating academic qualifications, university affiliations, research partnerships, or
              institutional endorsements within any portfolio listing or user profile on the platform.
            </li>
            <li className="legal-list-item">
              <strong>Malicious Code Injection &amp; Security Exploitation:</strong> Uploading, embedding,
              or transmitting any form of malicious software, including but not limited to viruses, trojans,
              ransomware, keyloggers, tracking scripts, cross-site scripting (XSS) payloads, SQL injection
              attempts, or any code designed to compromise, disrupt, or exploit the platform's
              infrastructure, user data, or connected systems.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">7. DMCA &amp; Copyright Takedown Notice</h2>
          <p className="legal-paragraph">
            SiswaNiaga respects the intellectual property rights of all parties. The uploading, publishing,
            or display of <strong>copyrighted logos, proprietary brand assets, trademarked imagery,
            patented designs, or confidential business information</strong> without the express written
            authorization of the rightful owner is <strong>strictly prohibited</strong> on this platform.
          </p>
          <p className="legal-paragraph">
            If you are a brand owner, intellectual property holder, or authorized legal representative and
            believe that content hosted on SiswaNiaga infringes upon your protected rights, you may submit
            a formal takedown request by contacting the platform administration with the following
            information:
          </p>
          <ul className="legal-list">
            <li className="legal-list-item">
              A detailed identification of the copyrighted work or intellectual property claimed to have
              been infringed, including registration numbers where applicable.
            </li>
            <li className="legal-list-item">
              The specific URL or location of the infringing material on SiswaNiaga.
            </li>
            <li className="legal-list-item">
              A sworn statement of good faith that the use of the material is not authorized by the
              copyright owner, its agent, or the law.
            </li>
            <li className="legal-list-item">
              Your full legal name, contact information, and a physical or electronic signature of the
              authorized complainant.
            </li>
          </ul>
          <p className="legal-paragraph">
            Upon receipt of a valid and complete takedown request, SiswaNiaga will review the claim
            expeditiously and, where appropriate, remove or disable access to the allegedly infringing
            content in accordance with applicable intellectual property frameworks.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="legal-section-title">8. Legally Binding Agreement</h2>
          <p className="legal-paragraph">
            Your continued presence on SiswaNiaga, whether as a listed student or an observing guest/investor, indicates your unequivocal comprehension and legally binding acceptance of these comprehensive Terms of Service. If you vehemently disagree with these stipulations, you must immediately halt your navigation and cease utilizing this software.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
