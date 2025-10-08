import React from 'react'

const FAQs: React.FC = () => {
  return (
    <div className="faqs-page">
      <div className="container">
        <div className="faqs-content">
          <h1>Frequently Asked Questions (FAQs)</h1>

          <div className="faqs-section">
            <h2>General Questions</h2>
            
            <div className="faq-item">
              <h3>1. What types of shipping services does Click Express provide?</h3>
              <p>We offer land, sea, air, air charter, and warehousing services — with full logistics solutions from door to door.</p>
            </div>

            <div className="faq-item">
              <h3>2. How can I request a shipping quotation?</h3>
              <p>You can fill out our online quote form or contact our sales team directly via phone or email. We'll respond with a detailed quotation promptly.</p>
            </div>

            <div className="faq-item">
              <h3>3. Which countries do you ship to?</h3>
              <p>We ship from the UAE to all global destinations — including the GCC, Middle East, Asia, Africa, Europe, America, and Australia.</p>
            </div>

            <div className="faq-item">
              <h3>4. Do you offer door-to-door delivery?</h3>
              <p>Yes, we provide Door-to-Door shipping services for all cargo types — land, sea, and air.</p>
            </div>

            <div className="faq-item">
              <h3>5. How can I track my shipment?</h3>
              <p>We provide a real-time tracking system using your shipment tracking number (AWB or B/L number).</p>
            </div>

            <h2>Cost & Insurance</h2>

            <div className="faq-item">
              <h3>6. How is the shipping cost calculated?</h3>
              <p>Shipping cost depends on the service type, cargo weight and dimensions, destination, and cargo nature (dry, refrigerated, or hazardous).</p>
            </div>

            <div className="faq-item">
              <h3>7. Do you provide cargo insurance?</h3>
              <p>Yes, we offer comprehensive insurance coverage to protect your shipment against damage or loss during transit.</p>
            </div>

            <h2>Service-Specific Questions</h2>

            <div className="faq-item">
              <h3>8. Do you handle temperature-controlled shipments?</h3>
              <p>Yes, we provide modern refrigerated trucks and containers for temperature-sensitive cargo such as food, pharmaceuticals, and perishables.</p>
            </div>

            <div className="faq-item">
              <h3>9. What is the difference between regular air freight and Air Charter?</h3>
              <p>Regular air freight follows scheduled commercial flights, while Air Charter involves renting an entire aircraft for urgent, oversized, or special cargo — ensuring direct and fast delivery.</p>
            </div>

            <div className="faq-item">
              <h3>10. Do you provide temporary storage services?</h3>
              <p>Yes, our Dubai warehouses are available for daily or monthly storage for all types of cargo.</p>
            </div>

            <div className="faq-item">
              <h3>11. Can you handle customs clearance?</h3>
              <p>Absolutely — we offer full customs clearance at both origin and destination to ensure smooth delivery.</p>
            </div>

            <h2>Additional Questions</h2>

            <div className="faq-item">
              <h3>12. Can you ship cars and heavy equipment?</h3>
              <p>Yes, we handle vehicle transport through specialized car carriers and also ship heavy machinery via Lowbed, Flatbed, or RoRo vessels.</p>
            </div>

            <div className="faq-item">
              <h3>13. How long does shipping usually take?</h3>
              <p>Transit time depends on the shipping method and destination, but we always aim to deliver as quickly and safely as possible.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQs
