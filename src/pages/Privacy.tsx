import React from 'react'

const Privacy: React.FC = () => {
  return (
    <div className="privacy-page">
      <div className="container">
        <div className="privacy-content">
          <h1>Privacy Policy</h1>

          <div className="privacy-section">
            <div className="privacy-item">
              <h3>1. Introduction</h3>
              <p>Click Express is committed to protecting the privacy of its clients and website visitors. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website or logistics services. By accessing our website or using our services, you agree to this policy.</p>
            </div>

            <div className="privacy-item">
              <h3>2. Information We Collect</h3>
              <p>We may collect the following types of information:</p>
              <ul>
                <li><strong>Personal Information:</strong> Name, phone number, email address, physical address, and ID/passport number (if required).</li>
                <li><strong>Shipping Information:</strong> Shipment details, destinations, type of goods, and special delivery instructions.</li>
                <li><strong>Financial Information:</strong> Billing and payment details for provided services.</li>
                <li><strong>Technical Information:</strong> IP address, browser type, and cookies for user experience optimization.</li>
              </ul>
            </div>

            <div className="privacy-item">
              <h3>3. How We Use Your Information</h3>
              <p>We use your data to:</p>
              <ul>
                <li>Process shipments and provide logistics services.</li>
                <li>Communicate with you about orders, billing, or updates.</li>
                <li>Improve our services and website experience.</li>
                <li>Comply with UAE legal and regulatory requirements.</li>
                <li>Protect the rights and property of Click Express and its clients.</li>
              </ul>
            </div>

            <div className="privacy-item">
              <h3>4. Data Protection</h3>
              <p>We implement advanced security measures and encryption technologies to protect your personal information from unauthorized access or misuse. However, no data transmission over the internet is 100% secure, and Click Express cannot guarantee absolute protection against all risks.</p>
            </div>

            <div className="privacy-item">
              <h3>5. Sharing Information</h3>
              <p>We do not sell, rent, or share personal data with third parties for marketing purposes. Information may be shared only with:</p>
              <ul>
                <li>Shipping and customs partners for service execution.</li>
                <li>Government or law enforcement authorities if legally required.</li>
                <li>Insurance providers for cargo protection purposes.</li>
              </ul>
            </div>

            <div className="privacy-item">
              <h3>6. Cookies</h3>
              <p>Our website uses cookies to enhance your browsing experience, personalize content, and analyze website performance. You can disable cookies in your browser settings, but some features may not function properly.</p>
            </div>

            <div className="privacy-item">
              <h3>7. User Rights</h3>
              <p>You have the right to:</p>
              <ul>
                <li>Access, correct, or update your personal data.</li>
                <li>Request deletion of your information when it's no longer needed.</li>
                <li>Withdraw consent to data processing at any time.</li>
              </ul>
              <p>Requests can be submitted via our official company email.</p>
            </div>

            <div className="privacy-item">
              <h3>8. Updates to This Policy</h3>
              <p>Click Express reserves the right to update or modify this Privacy Policy at any time. Changes will be posted on this page with a revised effective date.</p>
            </div>

            <div className="privacy-item">
              <h3>9. Contact Us</h3>
              <p>For any questions regarding this Privacy Policy, please contact us at:</p>
              <p><strong>info@clickexpress.ae</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy
