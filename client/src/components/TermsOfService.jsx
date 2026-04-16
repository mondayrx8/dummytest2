import React, { useEffect } from 'react';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when page loads
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Terms of Service</h1>
      <p style={styles.effectiveDate}>Effective Date: {new Date().toLocaleDateString()}</p>

      <div style={styles.alertBox}>
        <h3 style={styles.alertHeading}>⚠️ ACADEMIC PROJECT NOTICE</h3>
        <p style={{ margin: 0 }}>
          SiswaNiaga is strictly an <strong>Academic Final Year Project (FYP)</strong>. This digital platform is a conceptual directory intended for educational evaluation and portfolio demonstrative purposes only.
        </p>
      </div>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>1. Nature of the Service</h2>
        <p style={styles.paragraph}>
          SiswaNiaga functions strictly as a directory platform and digital repository. We furnish a centralized space for student entrepreneurs to digitally catalog their ventures, business models, and accompanying pitch decks. By accessing this platform, you formally recognize that SiswaNiaga is merely a hosting directory. We do not independently verify, endorse, or audit the financial statements, legal registrations, or operational claims of any listed entities.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>2. Explicit Disclaimer of Liability</h2>
        <p style={styles.paragraph}>
          The platform mechanism facilitates communication by providing immediate communication channels (such as "Direct Deals" via WhatsApp URLs) linking you directly with the respective student entrepreneurs.  
        </p>
        <div style={styles.legalBox}>
          <strong>WARNING OF ZERO LIABILITY:</strong> SiswaNiaga, its principal student developers, academic supervisors, university affiliates, and hosting providers hold absolutely <strong>ZERO LIABILITY</strong> under any local or international jurisdiction for any financial investments, monetary losses, unfulfilled agreements, scams, damages, or disputes that may arise from direct dealings or communications between platform users and external individuals or investors. All physical or digital transactions, correspondence, and contracts negotiated outside the purview of this system occur entirely strictly at your own, unmitigated risk.
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>3. Rights of the Administrators</h2>
        <p style={styles.paragraph}>
          In order to maintain the pedagogical integrity and security of this academic project space, the platform Administrators emphatically reserve the sovereign right, at their absolute and sole discretion, to suspend, disable, temporarily hide, or permanently terminate user accounts and business portfolio listings at any time. This may be executed <strong>without prior warning, notice, or provided explanation</strong>. Causes catalyzing termination include, but are theoretically not limited to, suspected fraudulent uploads, violations of university codes of conduct, or general system misuse.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>4. User Code of Conduct</h2>
        <p style={styles.paragraph}>
          You agree not to upload materials that are copyright-infringing, explicitly illegal, sexually explicit, or structurally malicious (e.g., malware or tracking software). All submitted portfolios must reflect the professional context expected in higher learning environments.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>5. Legally Binding Agreement</h2>
        <p style={styles.paragraph}>
          Your continued presence on SiswaNiaga, whether as a listed student or an observing guest/investor, indicates your unequivocal comprehension and legally binding acceptance of these comprehensive Terms of Service. If you vehemently disagree with these stipulations, you must immediately halt your navigation and cease utilizing this software.
        </p>
      </section>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '60px 40px',
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", sans-serif',
    color: '#1E293B',
    lineHeight: '1.7',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
  },
  heading: {
    fontSize: '2.5rem',
    color: '#0A2540',
    marginBottom: '8px',
    fontWeight: '800',
    letterSpacing: '-0.025em'
  },
  subHeading: {
    fontSize: '1.4rem',
    color: '#0F172A',
    marginTop: '35px',
    marginBottom: '15px',
    fontWeight: '700',
    borderBottom: '2px solid #E2E8F0',
    paddingBottom: '8px'
  },
  effectiveDate: {
    color: '#64748B',
    fontStyle: 'italic',
    marginBottom: '30px',
    fontSize: '0.95rem'
  },
  paragraph: {
    marginBottom: '16px',
    fontSize: '1.05rem',
    color: '#334155'
  },
  section: {
    marginBottom: '30px'
  },
  alertBox: {
    backgroundColor: '#FEF2F2',
    color: '#991B1B',
    border: '1px solid #FCA5A5',
    borderLeft: '5px solid #DC2626',
    padding: '20px',
    borderRadius: '6px',
    marginBottom: '35px',
    fontSize: '1.05rem',
    boxShadow: '0 2px 4px rgba(220, 38, 38, 0.05)'
  },
  alertHeading: {
    marginTop: 0,
    marginBottom: '10px',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  legalBox: {
    backgroundColor: '#F8FAFC',
    color: '#0F172A',
    border: '1px solid #CBD5E1',
    padding: '20px',
    borderRadius: '6px',
    marginTop: '20px',
    fontSize: '1rem',
    fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace', // Gives it a legalistic, strict feel
    lineHeight: '1.6'
  }
};

export default TermsOfService;
