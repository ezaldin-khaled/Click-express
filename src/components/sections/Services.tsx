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
      image: '/assets/5 services.jpg',
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
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </div>
                
                {/* Back side */}
                <div className="card-back">
                  <div className="service-details">
                    <h3>{service.title}</h3>
                    
                    {service.id === '1' && (
                      <div className="service-specific-content">
                        <h4>Available Trailer Types:</h4>
                        <ul className="trailer-types">
                          <li><i className="fas fa-truck"></i> <strong>Box Trailer</strong> – 12.5m</li>
                          <li><i className="fas fa-truck"></i> <strong>Flat Trailer</strong> – 12–21m</li>
                          <li><i className="fas fa-truck"></i> <strong>Lowbed Trailers</strong> – for heavy equipment and projects</li>
                          <li><i className="fas fa-truck"></i> <strong>Refrigerated Trailers</strong> – for perishable goods (food, pharma)</li>
                          <li><i className="fas fa-truck"></i> <strong>Car Carriers</strong> – transport up to 8 vehicles</li>
                        </ul>
                      </div>
                    )}

                    {service.id === '2' && (
                      <div className="service-specific-content">
                        <h4>Air Freight Services:</h4>
                        <ul className="air-freight-services">
                          <li><i className="fas fa-plane"></i> <strong>Refrigerated air freight</strong> (Door-to-Airport) for sensitive goods</li>
                          <li><i className="fas fa-plane"></i> <strong>General Cargo air freight</strong> (Door-to-Door)</li>
                          <li><i className="fas fa-plane"></i> <strong>Daily flights</strong> to major airports</li>
                          <li><i className="fas fa-plane"></i> <strong>Live electronic tracking</strong> for shipments</li>
                        </ul>
                      </div>
                    )}

                    {service.id === '3' && (
                      <div className="service-specific-content">
                        <h4>Sea Freight Services:</h4>
                        <div className="container-options">
                          <h5>Container Options:</h5>
                          <ul className="container-types">
                            <li><i className="fas fa-ship"></i> <strong>20' & 40' Standard</strong></li>
                            <li><i className="fas fa-ship"></i> <strong>40' & 45' High-Cube</strong></li>
                            <li><i className="fas fa-ship"></i> <strong>20' & 40' Refrigerated</strong></li>
                          </ul>
                        </div>
                        <ul className="sea-freight-services">
                          <li><i className="fas fa-ship"></i> <strong>Complete import/export logistics</strong></li>
                          <li><i className="fas fa-ship"></i> <strong>Combined Sea + Land transport</strong> for inland destinations</li>
                        </ul>
                      </div>
                    )}

                    {service.id === '4' && (
                      <div className="service-specific-content">
                        <h4>Secure, Flexible Warehousing in Dubai</h4>
                        <p>Need reliable storage? Our modern Dubai facilities offer secure, scalable solutions for all cargo types on a daily or monthly basis. We're more than just storage—we're your logistics partner, providing direct local and regional distribution to streamline your supply chain.</p>
                        <p><strong>Store, manage, and distribute all from one place. Contact us today!</strong></p>
                        
                        <h4>Key Features:</h4>
                        <ul className="warehousing-features">
                          <li><i className="fas fa-shield-alt"></i> <strong>Modern & Secure Facilities:</strong> Your assets are protected in clean, organized spaces equipped with 24/7 security systems and monitoring.</li>
                          <li><i className="fas fa-calendar-alt"></i> <strong>Flexible Storage Plans:</strong> Choose from daily or monthly contracts to match your inventory needs, ensuring you only pay for the space and time you require.</li>
                          <li><i className="fas fa-boxes"></i> <strong>Versatile Cargo Handling:</strong> Our facilities are equipped to handle all types of cargo, from palletized goods and bulk items to sensitive and high-value products.</li>
                          <li><i className="fas fa-truck"></i> <strong>Integrated Distribution Support:</strong> Go from storage to delivery seamlessly. We provide comprehensive local and regional distribution services directly from our warehouse, reducing handling times and costs.</li>
                        </ul>
                      </div>
                    )}

                    {service.id === '5' && (
                      <div className="service-specific-content">
                        <h4>Key Advantages:</h4>
                        <ul className="air-charter-advantages">
                          <li><i className="fas fa-plane"></i> <strong>Full flexibility</strong> in choosing departure & arrival times</li>
                          <li><i className="fas fa-plane"></i> <strong>Direct, non-stop flights</strong> from origin to destination</li>
                          <li><i className="fas fa-plane"></i> <strong>Ability to move oversized and heavy cargo</strong> beyond standard limits</li>
                          <li><i className="fas fa-plane"></i> <strong>Ideal for sensitive, high-value, or time-critical goods</strong></li>
                          <li><i className="fas fa-plane"></i> <strong>Global coverage</strong> with access to major and secondary airports</li>
                          <li><i className="fas fa-plane"></i> <strong>Tailor-made solutions</strong> ensuring the fastest and safest delivery</li>
                        </ul>
                      </div>
                    )}
                    
                    {service.id !== '1' && service.id !== '2' && service.id !== '3' && service.id !== '4' && service.id !== '5' && (
                      <div className="lorem-content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                      </div>
                    )}
                    
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
