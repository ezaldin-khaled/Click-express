import React, { useState } from 'react'

const Terms: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = useState('arabic')

  const toggleLanguage = (lang: string) => {
    setActiveLanguage(lang)
  }

  return (
    <div className="terms-page">
      <div className="container">
        <div className="terms-content">
          <h1>Terms & Conditions | الشروط والأحكام</h1>
          
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

          <div className={`terms-section ${activeLanguage === 'arabic' ? 'show' : ''}`}>
            <div className="terms-item">
              <h3>1. التعريف</h3>
              <p>تنطبق هذه الشروط والأحكام على جميع خدمات الشحن والنقل والخدمات اللوجستية المقدمة من شركة Click Express ("الشركة") إلى عملائها ("العميل"). باستخدام خدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام.</p>
            </div>

            <div className="terms-item">
              <h3>2. نطاق الخدمات</h3>
              <p>تقدم شركة Click Express خدمات الشحن البري، البحري، الجوي، تأجير الطائرات (Air Charter)، وخدمات التخزين، بالإضافة إلى حلول لوجستية متكاملة تشمل التخليص الجمركي، النقل من الباب إلى الباب، وخدمات التتبع والتأمين على الشحنات.</p>
            </div>

            <div className="terms-item">
              <h3>3. مسؤوليات العميل</h3>
              <ul>
                <li>على العميل تزويد الشركة بكافة المعلومات الدقيقة المتعلقة بالشحنة، بما في ذلك نوع البضائع، الوزن، الأبعاد، الوجهة، والمستندات المطلوبة.</li>
                <li>يتحمل العميل مسؤولية الامتثال لجميع القوانين الجمركية والتنظيمية في بلد المنشأ والوجهة.</li>
                <li>يجب التأكد من أن البضائع المرسلة معبأة ومؤمنة بشكل صحيح لتجنب أي تلف أثناء النقل.</li>
                <li>يتحمل العميل جميع الرسوم الجمركية، الضرائب، والغرامات إن وُجدت، ما لم يتم الاتفاق كتابيًا على خلاف ذلك.</li>
              </ul>
            </div>

            <div className="terms-item">
              <h3>4. مسؤوليات الشركة</h3>
              <ul>
                <li>تلتزم شركة Click Express ببذل أقصى جهد لضمان سلامة الشحنة ووصولها في الوقت المحدد.</li>
                <li>لا تتحمل الشركة أي مسؤولية عن تأخير أو ضرر ناتج عن ظروف خارجة عن إرادتها مثل الحروب، الكوارث الطبيعية، الحوادث، أو الإجراءات الحكومية.</li>
                <li>لا تعتبر الشركة مسؤولة عن الخسائر غير المباشرة أو الأضرار الناتجة عن التأخير أو فقدان الأرباح.</li>
                <li>تحتفظ الشركة بحقها في رفض أو إيقاف أي شحنة إذا كانت تحتوي على مواد محظورة أو خطرة دون تصريح مناسب.</li>
              </ul>
            </div>

            <div className="terms-item">
              <h3>5. التأمين</h3>
              <p>توصي الشركة جميع العملاء بالحصول على تأمين شحن شامل لتغطية أي خسارة أو ضرر محتمل أثناء النقل. يتم التأمين فقط بناءً على طلب مسبق من العميل وباتفاق منفصل.</p>
            </div>

            <div className="terms-item">
              <h3>6. الدفع</h3>
              <ul>
                <li>يتم تحديد الأسعار والرسوم بناءً على نوع الخدمة والوجهة وطبيعة البضائع.</li>
                <li>يجب سداد جميع المبالغ المستحقة قبل تسليم الشحنة أو عند استلام بوليصة الشحن ما لم يُتفق على غير ذلك كتابيًا.</li>
                <li>في حال التأخير في الدفع، يحق للشركة احتجاز الشحنة أو فرض رسوم إضافية.</li>
              </ul>
            </div>

            <div className="terms-item">
              <h3>7. المواد المحظورة</h3>
              <p>يحظر شحن المواد التالية: الأسلحة والذخائر دون تصاريح، المواد القابلة للاشتعال أو الانفجار، المواد السامة، النقود، المجوهرات الثمينة، أو أي بضائع مخالفة للقوانين المحلية أو الدولية.</p>
            </div>

            <div className="terms-item">
              <h3>8. القوانين المعمول بها</h3>
              <p>تخضع هذه الشروط والأحكام وتُفسَّر وفقًا لقوانين دولة الإمارات العربية المتحدة، وتكون محاكم دبي هي الجهة المختصة في حال نشوء أي نزاع.</p>
            </div>

            <div className="terms-item">
              <h3>9. التعديلات</h3>
              <p>تحتفظ شركة Click Express بالحق في تعديل هذه الشروط والأحكام في أي وقت، وتصبح سارية فور نشرها على موقع الشركة الإلكتروني.</p>
            </div>
          </div>

          <div className={`terms-section english-content ${activeLanguage === 'english' ? 'show' : ''}`}>
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
