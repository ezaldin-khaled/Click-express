import React from 'react'
import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import About from '../components/sections/About'
import ContactForm from '../components/sections/ContactForm'
import Gallery from '../components/sections/Gallery'

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <ContactForm />
      <Gallery />
    </>
  )
}

export default Home
