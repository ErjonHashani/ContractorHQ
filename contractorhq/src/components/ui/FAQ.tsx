// app/components/ui/FAQ.tsx
"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Shipping typically takes 3–5 business days depending on your location.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and Apple Pay.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you'll receive an email with a tracking number.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "No, we ship to Albania, Kosovo, North Macedonia and Montenegro. Additional fees may apply for other regions.",
  },
  {
    question: "What is your warranty policy?",
    answer:
      "Most products come with a 1-year manufacturer warranty. Check product details for specifics.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-dark mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600">
          Find quick answers to common questions about our products and
          services.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border border-gray-200 rounded-lg overflow-hidden transition-all ${
              openIndex === index ? "bg-primary-lighter/10" : ""
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition"
            >
              <h3 className="font-medium text-dark">{faq.question}</h3>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5 text-gray-600">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
