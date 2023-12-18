export default function Page() {
  return (
    <div className="flex flex-col gap-8 pb-24">
      <h1 className="text-3xl font-semibold">Refund Policy</h1>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium">Refund Policy for Splashframes</h2>
        <p className="text-gray-500">Thank you for shopping at Splashframes.</p>
        <p className="text-gray-500">
          We sell wall canvases featuring AI-generated art pieces. As each
          canvas is made to order, we do not accept returns, refunds, or
          exchanges unless the item you purchased is defective or damaged.
        </p>
        <p className="text-gray-500">
          If you receive a defective or damaged item, please contact us at
          hello@splashframes.com with details of the product and the defect.
          Upon receipt of the returned product, we will fully examine it and
          notify you via email within a reasonable period, whether you are
          entitled to a replacement or a refund as a result of the defect.
        </p>
        <p className="text-gray-500">
          If you are eligible for a refund, we will initiate a refund to your
          original method of payment. You will receive the credit within a
          certain amount of days, depending on your card issuer's policies.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium">Contact Us</h2>
        <p className="text-gray-500">
          If you have any questions about our Refund Policy, please contact us
          at <span className="text-blue-500">hello@splashframes.com.</span>
        </p>
      </div>
    </div>
  );
}
