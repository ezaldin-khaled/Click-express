import React from 'react'
import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import About from '../components/sections/About'
import ContactForm from '../components/sections/ContactForm'
import Gallery from '../components/sections/Gallery'

const Home: React.FC = () => {
  return (
    <>
      <div id="home">
        <Hero />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="contact">
        <ContactForm />
      </div>
      <div id="gallery">
        <Gallery />
      </div>
    </>
  )
}

export default Home
