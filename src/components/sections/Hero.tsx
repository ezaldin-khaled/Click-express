import React from 'react'

const Hero: React.FC = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h2><span>Let's Move Your Business Forward</span></h2>
          </div>
          <div className="hero-description">
            <p>At CLICK EXPRESS, we specialize in delivering reliable shipping solutions tailored to your needs. Our global reach ensures your business can thrive, no matter where you are.</p>
          </div>
        </div>
      </div>
      <div className="hero-background">
        <img src="/assets/hero.jpg" alt="Shipping containers" className="hero-image" />
      </div>
    </section>
  )
}

export default Hero
