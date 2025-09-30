import React, { useState } from 'react'
import { Service } from '../../types'

const Services: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())
  const services: Service[] = [
    {
      id: '1',
      title: 'Land Freight',
      description: "We provide full land freight solutions from the UAE to GCC and Arab countries (Saudi Arabia, Qatar, Kuwait, Bahrain, Iraq, Yemen, Jordan, Palestine, Syria, Lebanon, Egypt, Sudan, Libya) with complete customs clearance.",
      category: 'Transportation',
      image: '/assets/1 services.jpg',
      author: 'Full name',
      date: '11 Jan 2022',
      readTime: '5 min read',
      features: ['Customs Clearance', 'Real-time Tracking', 'Insurance Coverage', 'Door-to-Door Service'],
      pricing: 'Starting from $150',
      benefits: ['Cost-effective for regional shipping', 'Reliable delivery times', 'Complete documentation support']
    },
    {
      id: '2',
      title: 'Air Freight',
      description: 'Fast, reliable air freight to all destinations worldwide (Asia, Africa, Europe, America, Australia, Latin America)',
      category: 'Transportation',
      image: '/assets/2 services.jpg',
      author: 'Full name',
      date: '11 Jan 2022',
      readTime: '5 min read',
      features: ['Express Delivery', 'Global Network', 'Priority Handling', '24/7 Support'],
      pricing: 'Starting from $300',
      benefits: ['Fastest delivery option', 'Global reach', 'Secure handling', 'Priority customs clearance']
    },
    {
      id: '3',
      title: 'Sea Freight',
      description: 'we offer sea freight from the UAE to ports worldwide with flexible options',
      category: 'Transportation',
      image: '/assets/3 services.jpg',
      author: 'Full name',
      date: '11 Jan 2022',
      readTime: '5 min read',
      features: ['FCL & LCL Options', 'Global Port Network', 'Container Tracking', 'Flexible Scheduling'],
      pricing: 'Starting from $80',
      benefits: ['Most economical for large shipments', 'Environmentally friendly', 'Flexible container options']
    },
    {
      id: '4',
      title: 'Warehousing',
      description: 'Modern storage facilities in Dubai (daily or monthly) Secure spaces suitable for all cargo types Local & regional distribution support directly from our warehouses',
      category: 'Logistics',
      image: '/assets/about.jpg',
      author: 'Full name',
      date: '11 Jan 2022',
      readTime: '5 min read',
      features: ['Climate Control', '24/7 Security', 'Inventory Management', 'Pick & Pack Services'],
      pricing: 'Starting from $50/month',
      benefits: ['Strategic Dubai location', 'Advanced security systems', 'Flexible storage terms']
    },
    {
      id: '5',
      title: 'Air Charter Services',
      description: 'Our Air Charter service is the ultimate solution for urgent, oversized, or highly specialized shipments.',
      category: 'Logistics',
      image: '/assets/4 services.jpg',
      author: 'Full name',
      date: '11 Jan 2022',
      readTime: '5 min read',
      features: ['Dedicated Aircraft', 'Flexible Routing', 'Oversized Cargo', 'VIP Handling'],
      pricing: 'Custom Quote',
      benefits: ['Exclusive aircraft use', 'Flexible scheduling', 'Handles oversized cargo', 'Premium service level']
    }

  ]

  const toggleCardFlip = (cardId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(cardId)) {
        newSet.delete(cardId)
      } else {
        newSet.add(cardId)
      }
      return newSet
    })
  }

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header">
          <h2>Services</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        
        <div className="services-grid">
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`service-card ${flippedCards.has(service.id) ? 'flipped' : ''}`}
              onClick={() => toggleCardFlip(service.id)}
            >
              <div className="card-inner">
                {/* Front side */}
                <div className="card-front">
                  <div className="service-image">
                    <img src={service.image} alt={service.title} />
                  </div>
                  <div className="service-content">
                    <span className="category">{service.category}</span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </div>
                
                {/* Back side */}
                <div className="card-back">
                  <div className="service-details">
                    <h3>{service.title}</h3>
                    
                    <div className="lorem-content">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                    </div>
                    
                    <div className="features-section">
                      <h4>Key Features:</h4>
                      <ul className="features-list">
                        {service.features?.map((feature, index) => (
                          <li key={index}><i className="fas fa-check"></i> {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
