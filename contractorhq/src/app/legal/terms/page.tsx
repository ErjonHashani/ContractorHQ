import React from "react";

const TermsPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Terms and Conditions
      </h1>
      <p className="text-center text-gray-500 mb-6">
        <strong>Effective Date: [Date]</strong>
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          1. Introduction
        </h2>
        <p className="text-gray-600 mt-2">
          Welcome to <strong>ContractorHQ</strong> (www.contractorhq.com). By
          accessing or using our website and services, you agree to comply with
          and be bound by these Terms and Conditions (the Terms). If you do
          not agree with any part of these Terms, please do not use our website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          2. User Accounts & Registration
        </h2>
        <p className="text-gray-600 mt-2">
          To use certain features on <strong>ContractorHQ</strong>, such as
          placing orders or accessing blogs and news posts, you must create an
          account.
        </p>
        <ul className="list-inside list-disc text-gray-600 mt-4">
          <li>
            <strong>Account Creation:</strong> You must provide accurate,
            current, and complete information during the registration process.
          </li>
          <li>
            <strong>Account Security:</strong> You are responsible for
            maintaining the confidentiality of your account credentials and for
            all activities that occur under your account.
          </li>
          <li>
            <strong>Account Suspension/Termination:</strong> We reserve the
            right to suspend or terminate your account at any time for
            violations of these Terms or if fraudulent activity is suspected.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          3. Data Collection and Privacy
        </h2>
        <p className="text-gray-600 mt-2">
          We value your privacy and are committed to protecting your personal
          information.
        </p>
        <ul className="list-inside list-disc text-gray-600 mt-4">
          <li>
            <strong>Personal Data:</strong> When you create an account or place
            an order, we collect personal information such as your name, email
            address, shipping address, and payment details.
          </li>
          <li>
            <strong>Use of Data:</strong> We use this information to process
            your orders, improve our services, and communicate with you about
            your transactions.
          </li>
          <li>
            <strong>Data Storage:</strong> All personal data is stored securely
            in our MongoDB database, and we take reasonable measures to protect
            it.
          </li>
          <li>
            <strong>Privacy Policy:</strong> Please refer to our{" "}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>{" "}
            for detailed information about how we collect, use, and protect your
            data.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          4. Products and Content
        </h2>
        <ul className="list-inside list-disc text-gray-600 mt-4">
          <li>
            <strong>Product Descriptions:</strong> We strive to ensure that
            product descriptions, prices, and availability are accurate, but we
            cannot guarantee that all information is error-free or up-to-date.
            In the event of any discrepancies, we reserve the right to correct
            them and inform you.
          </li>
          <li>
            <strong>Content Ownership:</strong> All content on{" "}
            <strong>ContractorHQ</strong>, including product descriptions,
            blogs, and news posts, is either owned by us or licensed to us. You
            may not copy, reproduce, distribute, or modify any of our content
            without permission.
          </li>
          <li>
            <strong>Product Availability:</strong> Product availability is
            subject to change. We make no guarantees that items will always be
            in stock.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          5. Orders and Payments
        </h2>
        <ul className="list-inside list-disc text-gray-600 mt-4">
          <li>
            <strong>Placing Orders:</strong> By placing an order through our
            website, you are making an offer to purchase the products in your
            cart. We will send you an email confirmation once we have received
            your order.
          </li>
          <li>
            <strong>Payment Methods:</strong> We accept various payment methods,
            including major credit cards, PayPal, and other methods available at
            checkout.
          </li>
          <li>
            <strong>Order Processing:</strong> Orders will be processed once
            payment is received. If there is any issue with your payment or
            order, we will contact you promptly.
          </li>
          <li>
            <strong>Pricing:</strong> All prices are listed in [Your Currency],
            exclusive of taxes, shipping, and handling fees. Prices are subject
            to change without notice.
          </li>
          <li>
            <strong>Refunds & Returns:</strong> We offer a{" "}
            <strong>30-day</strong> return policy on most products. To be
            eligible for a return, the product must be unused and in its
            original packaging. Some items, such as power tools or opened
            consumables, may not be eligible for return. For more information,
            refer to our{" "}
            <a href="/refund-policy" className="text-blue-600 hover:underline">
              Refund Policy
            </a>
            .
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          6. Blogs, News, and User-Generated Content
        </h2>
        <ul className="list-inside list-disc text-gray-600 mt-4">
          <li>
            <strong>User Contributions:</strong> Our website allows you to
            interact with and contribute to our blogs and news sections. By
            submitting content (including blog posts and comments), you grant us
            a non-exclusive, royalty-free, worldwide license to use, modify, and
            distribute your content on our website and through our marketing
            channels.
          </li>
          <li>
            <strong>Content Guidelines:</strong> You agree not to post any
            content that is offensive, defamatory, or unlawful. We reserve the
            right to remove any content that violates these guidelines.
          </li>
          <li>
            <strong>Moderation:</strong> We do not guarantee the accuracy or
            legality of user-generated content and are not responsible for any
            issues that arise from such content.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          7. Shipping and Delivery
        </h2>
        <ul className="list-inside list-disc text-gray-600 mt-4">
          <li>
            <strong>Shipping Costs:</strong> Shipping fees are calculated at
            checkout based on your delivery address and the size/weight of your
            order.
          </li>
          <li>
            <strong>Delivery Times:</strong> Delivery times vary depending on
            your location, shipping method, and availability of products. You
            will receive an email notification with tracking information once
            your order has been shipped.
          </li>
          <li>
            <strong>Shipping Delays:</strong> While we strive to ensure timely
            delivery, we are not responsible for delays caused by third-party
            carriers or other external factors.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          8. Limitation of Liability
        </h2>
        <ul className="list-inside list-disc text-gray-600 mt-4">
          <li>
            <strong>Limitation of Liability:</strong> To the fullest extent
            permitted by law, <strong>ContractorHQ</strong> is not liable for
            any direct, indirect, incidental, or consequential damages arising
            from your use of the website, including any damages related to the
            purchase and use of products.
          </li>
          <li>
            <strong>Product Use:</strong> We are not responsible for any
            injuries, property damage, or other issues that result from the use
            of products purchased from our website. You are responsible for
            following all safety instructions provided by the product
            manufacturers.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          9. Prohibited Uses
        </h2>
        <p className="text-gray-600 mt-2">
          You agree not to use the website for any illegal or harmful
          activities, including but not limited to:
        </p>
        <ul className="list-inside list-disc text-gray-600 mt-4">
          <li>
            Attempting to hack, disrupt, or damage our website or servers.
          </li>
          <li>
            Using the site to transmit harmful or unlawful content, including
            viruses or malware.
          </li>
          <li>
            Engaging in fraudulent activities, such as placing fake orders.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          10. Termination
        </h2>
        <p className="text-gray-600 mt-2">
          We reserve the right to suspend or terminate your account and/or
          access to our website if we believe you have violated these Terms and
          Conditions, engaged in fraudulent activities, or caused harm to{" "}
          <strong>ContractorHQ</strong> or its users.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          11. Governing Law
        </h2>
        <p className="text-gray-600 mt-2">
          These Terms and Conditions are governed by and construed in accordance
          with the laws of [Your Country/State]. Any disputes arising from these
          Terms shall be resolved through binding arbitration, unless otherwise
          required by law.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          12. Changes to Terms
        </h2>
        <p className="text-gray-600 mt-2">
          We reserve the right to update or modify these Terms and Conditions at
          any time. Any changes will be posted on this page, and the new terms
          will be effective immediately upon posting. Please review these Terms
          periodically to stay informed about any updates.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          13. Contact Information
        </h2>
        <p className="text-gray-600 mt-2">
          If you have any questions about these Terms and Conditions or any
          other inquiries, please contact us at:
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

export default TermsPage;
