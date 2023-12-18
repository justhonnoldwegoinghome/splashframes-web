export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-semibold">Privacy Policy</h1>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium">Privacy Policy for Splashframes</h2>
        <p className="text-secondary">
          At Splashframes, we are committed to protecting your privacy. This
          Privacy Policy outlines the types of personal information we receive
          and collect when you use our website and how we safeguard your
          information.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium">Information We Collect</h2>
        <p className="text-secondary">
          Personal information: When you make a purchase, we collect your name,
          email address, shipping address, and payment details.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium">How We Use Your Information</h2>
        <p className="text-secondary">
          To process transactions: Your information, whether public or private,
          will not be sold, exchanged, transferred, or given to any other
          company for any reason without your consent.
        </p>
        <p className="text-secondary">
          To improve customer service: Your information helps us respond more
          effectively to your customer service requests and support needs.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium">Cookies</h2>
        <p className="text-secondary">
          We may use cookies in the future to enhance your user experience on
          our site. You can choose to accept or decline cookies. Most web
          browsers automatically accept cookies, but you can usually modify your
          browser setting to decline cookies if you prefer.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium">Contact Us</h2>
        <p className="text-secondary">
          If you have any questions about our Privacy Policy, please contact us
          at <span className="text-sauce">hello@splashframes.com.</span>
        </p>
      </div>
    </div>
  );
}
