import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Privacy Policy
      </h1>
      <p className="text-center text-gray-500 mb-6">
        <strong>Effective Date: [Date]</strong>
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          1. Introduction
        </h2>
        <p className="text-gray-600 mt-2">
          Welcome to <strong>ContractorHQ</strong>. Your privacy is important to
          us. This Privacy Policy explains how we collect, use, store, and
          protect your personal data when you use our website and services. By
          accessing or using our website, you agree to the terms outlined in
          this policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          2. Information We Collect
        </h2>
        <ul className="list-inside list-disc text-gray-600 mt-4">
          <li>
            <strong>Personal Information:</strong> When you create an account,
            make a purchase, or interact with our website, we collect personal
            data such as your name, email address, phone number, and shipping
            address.
          </li>
          <li>
            <strong>Payment Information:</strong> We collect payment information
            such as credit card details and billing address to process your
            transactions securely.
          </li>
          <li>
            <strong>Usage Data:</strong> We may collect information about your
            interactions with our website, such as your IP address, browser
            type, device information, and browsing activity through cookies and
            similar tracking technologies.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          3. How We Use Your Information
        </h2>
        <ul className="list-inside list-disc text-gray-600 mt-4">
          <li>To process your transactions and fulfill orders.</li>
          <li>
            To communicate with you about your account, orders, and offers.
          </li>
          <li>
            To improve our website and services, analyze usage patterns, and
            enhance user experience.
          </li>
          <li>
            To protect against fraud, unauthorized access, and security
            breaches.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          4. Data Sharing and Disclosure
        </h2>
        <p className="text-gray-600 mt-2">
          We do not sell or rent your personal information. However, we may
          share your data in the following situations:
        </p>
        <ul className="list-inside list-disc text-gray-600 mt-4">
          <li>
            With third-party service providers who help us operate the website
            and process payments.
          </li>
          <li>
            In response to legal requests or to comply with applicable laws,
            regulations, or legal processes.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          5. Cookies and Tracking Technologies
        </h2>
        <p className="text-gray-600 mt-2">
          We use cookies and similar technologies to improve your experience and
          analyze website traffic. Cookies are small files stored on your device
          to help us remember your preferences and enhance site functionality.
        </p>
        <ul className="list-inside list-disc text-gray-600 mt-4">
          <li>
            You can control cookie preferences through your browser settings.
            However, disabling cookies may affect your experience on our
            website.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          6. Data Security
        </h2>
        <p className="text-gray-600 mt-2">
          We use industry-standard security measures to protect your personal
          information, including encryption and firewalls. However, no method of
          data transmission over the internet is 100% secure, and we cannot
          guarantee the security of your data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">7. User Rights</h2>
        <p className="text-gray-600 mt-2">
          You have the right to access, correct, or delete your personal
          information. You can also request to transfer your data to another
          service provider.
        </p>
        <ul className="list-inside list-disc text-gray-600 mt-4">
          <li>
            If you would like to exercise these rights, please contact us at
            [contact email].
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          8. Third-Party Links
        </h2>
        <p className="text-gray-600 mt-2">
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices or content of those websites.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          9. Data Retention
        </h2>
        <p className="text-gray-600 mt-2">
          We will retain your personal data for as long as necessary to fulfill
          the purposes outlined in this Privacy Policy or as required by law.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          10. Changes to This Privacy Policy
        </h2>
        <p className="text-gray-600 mt-2">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated Effective Date.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">11. Contact Us</h2>
        <p className="text-gray-600 mt-2">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:
        </p>
        <ul className="list-inside list-disc text-gray-600 mt-4">
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:support@contractorhq.com"
              className="text-blue-600 hover:underline"
            >
              support@contractorhq.com
            </a>
          </li>
          <li>
            <strong>Phone:</strong> [Your Business Phone Number]
          </li>
          <li>
            <strong>Address:</strong> [Your Business Address]
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
