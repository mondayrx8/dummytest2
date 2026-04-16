import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when page loads
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Privacy Policy</h1>
      <p style={styles.effectiveDate}>Effective Date: {new Date().toLocaleDateString()}</p>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>1. Introduction</h2>
        <p style={styles.paragraph}>
          Welcome to SiswaNiaga. We respect your privacy and are committed to protecting your personal data. 
          This Privacy Policy explains how we collect, use, and safeguard your information when you access and 
          use our digital pitch deck directory platform.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>2. Data We Collect</h2>
        <p style={styles.paragraph}>
          During your use of SiswaNiaga, we may collect the following categories of information:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}><strong>User Account Data:</strong> Your name, email address, student identification credentials, password, and fundamental profile details necessary for account creation.</li>
          <li style={styles.listItem}><strong>Business Data:</strong> Startup details, pitch deck financial figures, product outlines, business descriptions, and uploaded documents associated with your academic project or enterprise.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>3. Usage of Third-Party Services</h2>
        <p style={styles.paragraph}>
          To provide a robust, enterprise-grade application experience, SiswaNiaga integrates with specific, industry-standard third-party services. Please acknowledge that data shared with these external entities is governed by their independent privacy frameworks:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}><strong>Cloudinary:</strong> We utilize Cloudinary for image and media hosting. Any files you upload containing images or visual media as part of your pitch deck are processed and stored securely through their infrastructure.</li>
          <li style={styles.listItem}><strong>Google Gemini AI:</strong> We incorporate advanced artificial intelligence models (such as Google Gemini) to assist users with automated copywriting, ideation, and content enhancement. Limited text prompts you enter for AI processing may be transmitted to Google APIs to generate optimized descriptions.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>4. No 100% Guarantee of Data Security</h2>
        <p style={styles.paragraph}>
          We have implemented appropriate technical, academic, and administrative security protocols engineered to protect the confidentiality and integrity of any personal information we process. However, despite our rigorous safeguards and best operational efforts, no electronic transmission over the Internet or networked data storage technology can be guaranteed to be absolutely impervious or 100% secure. 
        </p>
        <p style={styles.paragraph}>
          We cannot officially promise, warrant, or guarantee that malicious cybercriminals, unauthorized third parties, or sophisticated network intruders will not possess the capability to defeat our security configurations and improperly collect, access, steal, or modify your stored information. You provide your data at your own calculated risk.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>5. Contact Information</h2>
        <p style={styles.paragraph}>
          Should you harbor any specific inquiries or professional concerns regarding this documentation, please directly contact the platform administration operating this academic pilot initiative.
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
    marginBottom: '40px',
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
  list: {
    marginLeft: '20px',
    color: '#334155',
    marginBottom: '16px',
    listStyleType: 'disc'
  },
  listItem: {
    marginBottom: '10px',
    lineHeight: '1.6'
  }
};

export default PrivacyPolicy;
