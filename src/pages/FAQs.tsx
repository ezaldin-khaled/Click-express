import React, { useState } from 'react'

const FAQs: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = useState('arabic')

  const toggleLanguage = (lang: string) => {
    setActiveLanguage(lang)
  }

  return (
    <div className="faqs-page">
      <div className="container">
        <div className="faqs-content">
          <h1>Frequently Asked Questions (FAQs) | الأسئلة الشائعة</h1>
          
          <div className="language-toggle">
            <button 
              className={`lang-btn ${activeLanguage === 'arabic' ? 'active' : ''}`}
              onClick={() => toggleLanguage('arabic')}
            >
              العربية (Arabic)
            </button>
            <button 
              className={`lang-btn ${activeLanguage === 'english' ? 'active' : ''}`}
              onClick={() => toggleLanguage('english')}
            >
              English
            </button>
          </div>

          <div className={`faqs-section ${activeLanguage === 'arabic' ? 'show' : ''}`}>
            <h2>الأسئلة العامة</h2>
            
            <div className="faq-item">
              <h3>1. ما هي أنواع خدمات الشحن التي تقدمها شركة Click Express؟</h3>
              <p>نقدم خدمات الشحن البري، البحري، الجوي، الشحن الجوي المستأجر (Air Charter)، والتخزين (Warehousing)، مع حلول لوجستية متكاملة من الباب إلى الباب.</p>
            </div>

            <div className="faq-item">
              <h3>2. كيف يمكنني طلب عرض سعر للشحن؟</h3>
              <p>يمكنك تعبئة نموذج طلب عرض السعر على موقعنا أو التواصل مباشرة مع فريق المبيعات عبر الهاتف أو البريد الإلكتروني، وسنقوم بإرسال عرض السعر خلال وقت قصير.</p>
            </div>

            <div className="faq-item">
              <h3>3. ما الدول التي تشحنون إليها؟</h3>
              <p>نقوم بالشحن من الإمارات إلى جميع دول العالم، بما في ذلك دول الخليج، الشرق الأوسط، آسيا، إفريقيا، أوروبا، أمريكا، وأستراليا.</p>
            </div>

            <div className="faq-item">
              <h3>4. هل تقدمون خدمة الشحن من الباب إلى الباب؟</h3>
              <p>نعم، نوفر خدمة Door-to-Door لجميع أنواع الشحنات، سواء كانت برية، بحرية أو جوية.</p>
            </div>

            <div className="faq-item">
              <h3>5. كيف يمكنني تتبع شحنتي؟</h3>
              <p>نوفر نظام تتبع دقيق يتيح لك معرفة موقع شحنتك في أي وقت من خلال رقم بوليصة الشحن (Tracking Number).</p>
            </div>

            <h2>الأسئلة الخاصة بالتكاليف والتأمين</h2>

            <div className="faq-item">
              <h3>6. كيف يتم تحديد تكلفة الشحن؟</h3>
              <p>تعتمد تكلفة الشحن على نوع الخدمة، الوزن، الأبعاد، الوجهة، وطبيعة البضائع (عادية، مبردة، أو خطرة).</p>
            </div>

            <div className="faq-item">
              <h3>7. هل تقدمون خدمات التأمين على الشحنات؟</h3>
              <p>نعم، نوفر تأمين شامل على جميع أنواع الشحنات لضمان حمايتها من أي أضرار أو خسائر محتملة أثناء النقل.</p>
            </div>

            <h2>الأسئلة الخاصة بالخدمات</h2>

            <div className="faq-item">
              <h3>8. هل يمكن شحن البضائع المبردة أو الحساسة للحرارة؟</h3>
              <p>نعم، لدينا شاحنات مبردة وحاويات تبريد حديثة لنقل الأطعمة الطازجة، الأدوية، والمنتجات الحساسة.</p>
            </div>

            <div className="faq-item">
              <h3>9. ما الفرق بين الشحن الجوي العادي وAir Charter؟</h3>
              <p>الشحن الجوي العادي يعتمد على الرحلات المجدولة، أما Air Charter فهو مخصص للشحنات العاجلة أو الخاصة، حيث يتم تأجير طائرة كاملة لنقل البضائع مباشرة إلى الوجهة المطلوبة.</p>
            </div>

            <div className="faq-item">
              <h3>10. هل تقدمون خدمات التخزين المؤقت؟</h3>
              <p>نعم، لدينا مستودعات مجهزة في دبي لتخزين البضائع بشكل يومي أو شهري حسب الحاجة.</p>
            </div>

            <div className="faq-item">
              <h3>11. هل يمكنكم ترتيب عمليات التخليص الجمركي؟</h3>
              <p>بالتأكيد، نقدم خدمات التخليص الجمركي الكاملة في بلد الشحن وبلد الوصول لتسهيل وتسريع عملية التوصيل.</p>
            </div>

            <h2>أسئلة إضافية</h2>

            <div className="faq-item">
              <h3>12. هل يمكنكم شحن السيارات والمعدات الثقيلة؟</h3>
              <p>نعم، نقدم خدمات شحن السيارات عبر ناقلات خاصة، بالإضافة إلى شحن المعدات والمشاريع الضخمة باستخدام شاحنات Lowbed وFlatbed وRoRo Shipping.</p>
            </div>

            <div className="faq-item">
              <h3>13. كم تستغرق مدة الشحن عادة؟</h3>
              <p>تعتمد المدة على نوع الخدمة والوجهة، لكننا نحرص دائمًا على تقديم أسرع وقت ممكن مع ضمان السلامة والدقة.</p>
            </div>
          </div>

          <div className={`faqs-section english-content ${activeLanguage === 'english' ? 'show' : ''}`}>
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
