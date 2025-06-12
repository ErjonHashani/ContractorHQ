// app/components/ui/ReturnsPolicy.tsx
export default function ReturnsPolicy() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-dark mb-3">
          Returns & Refunds Policy
        </h2>
        <p className="text-gray-600">
          We want you to be completely satisfied with your purchase. If you&apos;re
          not, here&apos;s our straightforward return process.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-5 bg-primary-lighter/10 rounded-lg border border-primary-lighter">
          <h3 className="font-semibold text-primary-dark mb-3">
            Our Return Policy
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Items can be returned within 30 days of delivery for a full
              refund.
            </li>
            <li>Products must be in original condition and packaging.</li>
            <li>
              To initiate a return, contact us with your order number and
              reason.
            </li>
            <li>
              Refunds are processed within 5–7 business days after receiving the
              return.
            </li>
          </ul>
        </div>

        <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-dark mb-3">
            How to Return an Item
          </h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Contact our support team to request a return authorization.</li>
            <li>Package the item securely in its original packaging.</li>
            <li>Include the return authorization form in your package.</li>
            <li>
              Ship the package to the address provided in your return
              instructions.
            </li>
          </ol>
        </div>

        <p className="text-gray-600">
          Still have questions?{" "}
          <a
            href="#contact"
            className="text-primary font-medium hover:underline"
          >
            Contact our support team
          </a>{" "}
          for assistance.
        </p>
      </div>
    </div>
  );
}
