import React from 'react'

const Terms: React.FC = () => {
  return (
    <div className="terms-page">
      <div className="container">
        <div className="terms-content">
          <h1>Terms & Conditions</h1>

          <div className="terms-section">
            <div className="terms-item">
              <h3>1. Definition</h3>
              <p>These Terms & Conditions apply to all logistics and shipping services provided by Click Express ("the Company") to its customers ("the Client"). By using our services, you agree to comply with these terms.</p>
            </div>

            <div className="terms-item">
              <h3>2. Scope of Services</h3>
              <p>Click Express provides land, sea, air, air charter, and warehousing services, along with complete logistics solutions including customs clearance, door-to-door delivery, tracking, and cargo insurance.</p>
            </div>

            <div className="terms-item">
              <h3>3. Client Responsibilities</h3>
              <ul>
                <li>The client must provide accurate shipment details, including type of goods, weight, dimensions, destination, and required documents.</li>
                <li>The client is responsible for complying with all customs and regulatory laws in the origin and destination countries.</li>
                <li>All goods must be properly packed and secured to avoid damage during transport.</li>
                <li>The client is responsible for customs duties, taxes, and penalties, unless otherwise agreed in writing.</li>
              </ul>
            </div>

            <div className="terms-item">
              <h3>4. Company Responsibilities</h3>
              <ul>
                <li>Click Express will make every reasonable effort to ensure safe and timely delivery of all shipments.</li>
                <li>The company shall not be held liable for delays or damages caused by factors beyond its control, including war, natural disasters, accidents, or government actions.</li>
                <li>The company is not responsible for indirect or consequential losses, including loss of profit.</li>
                <li>Click Express reserves the right to refuse or suspend any shipment containing prohibited or hazardous materials without proper authorization.</li>
              </ul>
            </div>

            <div className="terms-item">
              <h3>5. Insurance</h3>
              <p>Customers are strongly encouraged to purchase comprehensive cargo insurance to cover potential loss or damage. Insurance coverage applies only upon prior request and separate agreement.</p>
            </div>

            <div className="terms-item">
              <h3>6. Payment</h3>
              <ul>
                <li>Rates and charges are determined based on service type, destination, and cargo nature.</li>
                <li>All payments must be made before shipment release or upon issuance of the airway bill, unless otherwise agreed in writing.</li>
                <li>In case of delayed payment, the company reserves the right to withhold cargo or apply additional fees.</li>
              </ul>
            </div>

            <div className="terms-item">
              <h3>7. Prohibited Items</h3>
              <p>Prohibited items include: weapons, ammunition (without permits), explosives, flammable or toxic materials, cash, jewelry, and any goods restricted by local or international law.</p>
            </div>

            <div className="terms-item">
              <h3>8. Governing Law</h3>
              <p>These Terms & Conditions shall be governed by and interpreted in accordance with the laws of the United Arab Emirates, and any disputes shall be subject to the jurisdiction of the courts of Dubai.</p>
            </div>

            <div className="terms-item">
              <h3>9. Modifications</h3>
              <p>Click Express reserves the right to amend these Terms & Conditions at any time. Updates will become effective once published on the company's official website.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terms
