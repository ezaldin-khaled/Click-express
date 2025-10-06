import React from 'react'

const About: React.FC = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About CLICK EXPRESS</h2>
            <p>Click Express Transport and Storage L.L.C was established in 2021 in Dubai, United Arab Emirates, by an ambitious Arab team with deep expertise in international logistics and transport.</p>
            <p>We are a leading logistics company providing comprehensive freight solutions, including Land Freight, Sea Freight, Air Freight, Air Charter, and Warehousing, with global coverage across Asia, Africa, Europe, America, and Australia.</p>
            <p>Our mission is to deliver fast, flexible, and secure logistics solutions tailored to meet the needs of individuals and businesses alike. We handle full and partial shipments, offering door-to-door services, including customs clearance, insurance, and supply chain management.</p>
            <p>With our experienced team and extensive global network, Click Express ensures reliable, precise, and on-time delivery every time.</p>
            <p>At Click Express, we believe logistics is not just about moving cargo, it's about driving your success forward.</p>
          </div>
          <div className="about-image">
            <img src="/assets/about.jpg" alt="Logistics operations" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
