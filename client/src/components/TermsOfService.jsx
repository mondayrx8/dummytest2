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
          <h2 className="legal-section-title">5. Legally Binding Agreement</h2>
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
