import React, { useState } from 'react'

const Privacy: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = useState('arabic')

  const toggleLanguage = (lang: string) => {
    setActiveLanguage(lang)
  }

  return (
    <div className="privacy-page">
      <div className="container">
        <div className="privacy-content">
          <h1>Privacy Policy | سياسة الخصوصية</h1>
          
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

          <div className={`privacy-section ${activeLanguage === 'arabic' ? 'show' : ''}`}>
            <div className="privacy-item">
              <h3>1. مقدمة</h3>
              <p>تلتزم شركة Click Express بحماية خصوصية عملائها وزوار موقعها الإلكتروني. توضح هذه السياسة كيفية جمع المعلومات الشخصية واستخدامها وحمايتها عند استخدام خدماتنا أو موقعنا الإلكتروني. باستخدامك لموقعنا أو خدماتنا، فإنك توافق على أحكام سياسة الخصوصية هذه.</p>
            </div>

            <div className="privacy-item">
              <h3>2. المعلومات التي نقوم بجمعها</h3>
              <p>قد نقوم بجمع أنواع مختلفة من المعلومات من العملاء، بما في ذلك:</p>
              <ul>
                <li><strong>المعلومات الشخصية:</strong> مثل الاسم، رقم الهاتف، عنوان البريد الإلكتروني، العنوان الفعلي، ورقم الهوية أو جواز السفر (إن لزم الأمر).</li>
                <li><strong>معلومات الشحن:</strong> تفاصيل الشحنات، الوجهات، نوع البضائع، وأي تعليمات خاصة بالشحن.</li>
                <li><strong>المعلومات المالية:</strong> بيانات الدفع والفواتير الخاصة بالخدمات المقدمة.</li>
                <li><strong>المعلومات التقنية:</strong> مثل عنوان الـ IP، نوع المتصفح، وملفات تعريف الارتباط (Cookies) لتحسين تجربة المستخدم على الموقع.</li>
              </ul>
            </div>

            <div className="privacy-item">
              <h3>3. كيفية استخدام المعلومات</h3>
              <p>تُستخدم المعلومات التي نجمعها للأغراض التالية:</p>
              <ul>
                <li>معالجة طلبات الشحن وتقديم الخدمات اللوجستية المطلوبة.</li>
                <li>التواصل مع العميل لتأكيد الطلبات أو إرسال التحديثات أو الفواتير.</li>
                <li>تحسين جودة الخدمات وتجربة المستخدم على الموقع.</li>
                <li>الالتزام بالمتطلبات القانونية والتنظيمية في دولة الإمارات العربية المتحدة.</li>
                <li>حماية الحقوق والممتلكات الخاصة بـ Click Express وعملائها.</li>
              </ul>
            </div>

            <div className="privacy-item">
              <h3>4. حماية المعلومات</h3>
              <p>نستخدم إجراءات أمنية متقدمة وأنظمة حماية رقمية (مثل التشفير وجدران الحماية) لضمان حماية بياناتك الشخصية من الوصول غير المصرح به أو الاستخدام أو الإفصاح غير المشروع. ومع ذلك، فإننا لا نتحمل المسؤولية عن أي خرق أمني خارج عن إرادتنا.</p>
            </div>

            <div className="privacy-item">
              <h3>5. مشاركة المعلومات مع أطراف ثالثة</h3>
              <p>لا نقوم ببيع أو تأجير أو مشاركة معلوماتك الشخصية مع أي طرف ثالث لأغراض تسويقية. قد نشارك بعض المعلومات فقط مع:</p>
              <ul>
                <li>شركاء الشحن والتخليص الجمركي لتسهيل تنفيذ الخدمات.</li>
                <li>الجهات الحكومية أو الأمنية إذا كان ذلك مطلوبًا بموجب القانون.</li>
                <li>شركات التأمين أو الوكلاء المعتمدين في حال وجود بوليصة تأمين على الشحن.</li>
              </ul>
            </div>

            <div className="privacy-item">
              <h3>6. ملفات تعريف الارتباط (Cookies)</h3>
              <p>يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة المستخدم، وتخصيص المحتوى، وتحليل أداء الموقع. يمكنك اختيار تعطيل ملفات تعريف الارتباط من إعدادات المتصفح، لكن قد يؤثر ذلك على بعض ميزات الموقع.</p>
            </div>

            <div className="privacy-item">
              <h3>7. حقوق المستخدم</h3>
              <p>يحق للعميل طلب:</p>
              <ul>
                <li>الوصول إلى بياناته الشخصية وتصحيحها أو تحديثها.</li>
                <li>حذف بياناته عند عدم الحاجة إليها، ما لم يكن الاحتفاظ بها مطلوبًا قانونيًا.</li>
                <li>سحب الموافقة على استخدام البيانات في أي وقت.</li>
              </ul>
              <p>يمكن تقديم الطلبات عبر البريد الإلكتروني الرسمي للشركة.</p>
            </div>

            <div className="privacy-item">
              <h3>8. التغييرات على سياسة الخصوصية</h3>
              <p>تحتفظ Click Express بحقها في تعديل سياسة الخصوصية من وقت لآخر. سيتم نشر أي تحديثات على هذه الصفحة مع تاريخ سريان جديد.</p>
            </div>

            <div className="privacy-item">
              <h3>9. التواصل معنا</h3>
              <p>لأي استفسارات حول سياسة الخصوصية، يمكنكم التواصل معنا عبر البريد الإلكتروني:</p>
              <p><strong>info@clickexpress.ae</strong></p>
            </div>
          </div>

          <div className={`privacy-section english-content ${activeLanguage === 'english' ? 'show' : ''}`}>
            <div className="privacy-item">
              <h3>1. Introduction</h3>
              <p>Click Express is committed to protecting the privacy of its clients and website visitors. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website or logistics services. By accessing our website or using our services, you agree to this policy.</p>
            </div>

            <div className="privacy-item">
              <h3>2. Information We Collect</h3>
              <p>We may collect the following types of information:</p>
              <ul>
                <li><strong>Personal Information:</strong> Name, phone number, email address, physical address, and ID/passport number (if required).</li>
                <li><strong>Shipping Information:</strong> Shipment details, destinations, type of goods, and special delivery instructions.</li>
                <li><strong>Financial Information:</strong> Billing and payment details for provided services.</li>
                <li><strong>Technical Information:</strong> IP address, browser type, and cookies for user experience optimization.</li>
              </ul>
            </div>

            <div className="privacy-item">
              <h3>3. How We Use Your Information</h3>
              <p>We use your data to:</p>
              <ul>
                <li>Process shipments and provide logistics services.</li>
                <li>Communicate with you about orders, billing, or updates.</li>
                <li>Improve our services and website experience.</li>
                <li>Comply with UAE legal and regulatory requirements.</li>
                <li>Protect the rights and property of Click Express and its clients.</li>
              </ul>
            </div>

            <div className="privacy-item">
              <h3>4. Data Protection</h3>
              <p>We implement advanced security measures and encryption technologies to protect your personal information from unauthorized access or misuse. However, no data transmission over the internet is 100% secure, and Click Express cannot guarantee absolute protection against all risks.</p>
            </div>

            <div className="privacy-item">
              <h3>5. Sharing Information</h3>
              <p>We do not sell, rent, or share personal data with third parties for marketing purposes. Information may be shared only with:</p>
              <ul>
                <li>Shipping and customs partners for service execution.</li>
                <li>Government or law enforcement authorities if legally required.</li>
                <li>Insurance providers for cargo protection purposes.</li>
              </ul>
            </div>

            <div className="privacy-item">
              <h3>6. Cookies</h3>
              <p>Our website uses cookies to enhance your browsing experience, personalize content, and analyze website performance. You can disable cookies in your browser settings, but some features may not function properly.</p>
            </div>

            <div className="privacy-item">
              <h3>7. User Rights</h3>
              <p>You have the right to:</p>
              <ul>
                <li>Access, correct, or update your personal data.</li>
                <li>Request deletion of your information when it's no longer needed.</li>
                <li>Withdraw consent to data processing at any time.</li>
              </ul>
              <p>Requests can be submitted via our official company email.</p>
            </div>

            <div className="privacy-item">
              <h3>8. Updates to This Policy</h3>
              <p>Click Express reserves the right to update or modify this Privacy Policy at any time. Changes will be posted on this page with a revised effective date.</p>
            </div>

            <div className="privacy-item">
              <h3>9. Contact Us</h3>
              <p>For any questions regarding this Privacy Policy, please contact us at:</p>
              <p><strong>info@clickexpress.ae</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy
