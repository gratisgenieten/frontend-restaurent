import React from "react";

const LegalPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Legal Information
      </h1>

      <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center mb-12">
        This page includes our Cookie Statement, Privacy Policy, and Service Agreement. It ensures transparency and complies with GDPR and other data protection laws.
      </p>

      {/* Cookie Statement */}
      <section id="cookie-statement" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">1. Cookie Statement</h2>
        <p className="mb-4">
          We use cookies to enhance your experience on our website. Cookies are small text files stored on your device that help us remember preferences, analyze site traffic, and improve overall functionality.
        </p>
        <p className="mb-2 font-medium">Types of cookies we use:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Essential Cookies</strong> – Required for basic site functionality.</li>
          <li><strong>Analytics Cookies</strong> – Help us understand how users interact with the site.</li>
          <li><strong>Marketing Cookies</strong> – Used to deliver relevant ads and measure effectiveness.</li>
        </ul>
        <p>
          By using our site, you consent to our use of cookies. You can manage your cookie preferences through your browser settings.
        </p>
      </section>

      {/* Privacy Policy */}
      <section id="privacy-policy" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">2. Privacy Policy</h2>
        <p className="mb-4">
          We are committed to protecting your personal data. This policy explains what data we collect, how we use it, and your rights.
        </p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Data Collected:</strong> Name, email, IP address, browsing activity, and any information you submit via forms.</li>
          <li><strong>Usage:</strong> To provide services, improve user experience, communicate with you, and meet legal obligations.</li>
          <li><strong>Data Sharing:</strong> We do not sell your data. It may be shared with third-party services for functionality (e.g., analytics, hosting) under strict confidentiality.</li>
          <li><strong>Your Rights:</strong> You may access, correct, or request deletion of your data. You may also opt out of certain communications or withdraw consent.</li>
        </ul>
        <p>
          For any concerns or requests regarding your personal data, please contact us at{" "}
          <a href="mailto:privacy@yourdomain.com" className="text-blue-600 dark:text-blue-400 underline">
            privacy@yourdomain.com
          </a>.
        </p>
      </section>

      {/* Service Agreement */}
      <section id="service-agreement">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">3. Service Agreement (Terms of Service)</h2>
        <p className="mb-4">
          By using our website, you agree to the following terms and conditions:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Eligibility:</strong> You must be at least 18 years old to use our services.</li>
          <li><strong>Usage:</strong> Our content and services are provided &lsquo;as is&lsquo; without warranties. Misuse or unlawful use is prohibited.</li>
          <li><strong>Account Responsibility:</strong> You are responsible for maintaining your account credentials and activity under your account.</li>
          <li><strong>Termination:</strong> We may suspend or terminate access for violations of these terms without prior notice.</li>
          <li><strong>Modifications:</strong> We reserve the right to update or change these terms at any time. Continued use of the site means acceptance of any changes.</li>
        </ul>
        <p>
          If you have any questions about this agreement, please contact our support team.
        </p>
      </section>
    </div>
  );
};

export default LegalPage;
