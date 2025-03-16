import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicy() {
  const h1ClassName = "text-[#141414] text-4xl text-center";
  const h2ClassName = "text-[#141414] text-2xl [text-align:justify]";
  const h3ClassName = "text-[#141414] text-lg [text-align:justify]";
  return (
    <main className="flex-1 h-full w-full">
      <div className="max-w-7xl mx-auto mt-2 mb-5 flex flex-col gap-3 p-5">
        <h1 className={h1ClassName}>Privacy Policy</h1>
        <h3 className={h3ClassName}>
          At Houston Smart Travel, we take your privacy seriously and are
          committed to protecting any personal information that you share with
          us.
        </h3>
        <h2 className={h2ClassName}>1. Information We Collect</h2>
        <h3 className={h3ClassName}>
          We do not collect personal information directly through our website.
          Any personal data (such as passport, national ID, or driver's license
          information) is collected only through our communications via WhatsApp
          when making a booking.
        </h3>
        <h2 className={h2ClassName}>2. How We Use Your Information</h2>
        <h3 className={h3ClassName}>
          The information collected through WhatsApp is used solely for
          processing flight bookings and issuing tickets. We do not store or
          share your data for marketing or any other purposes.
        </h3>
        <h2 className={h2ClassName}>3. Data Protection</h2>
        <h3 className={h3ClassName}>
          We use secure communication channels such as WhatsApp to protect your
          personal information. However, we cannot guarantee complete security
          due to the nature of online communication. We do our best to ensure
          your data is protected.
        </h3>
        <h2 className={h2ClassName}>4. Sharing Your Information</h2>
        <h3 className={h3ClassName}>
          Your personal information is not shared with third parties unless
          necessary for processing your booking (e.g., for issuing tickets). We
          do not sell or trade your personal data.
        </h3>
        <h2 className={h2ClassName}>5. Your Rights</h2>
        <h3 className={h3ClassName}>
          You have the right to request access, correction, or deletion of your
          personal data. For any such requests, please contact us directly via
          WhatsApp.
        </h3>
        <h2 className={h2ClassName}>6. Cookies</h2>
        <h3 className={h3ClassName}>
          Our website does not use cookies to collect personal information.
          However, we may use cookies to enhance your browsing experience and
          analyze website traffic.
        </h3>
        <h2 className={h2ClassName}>7. Changes to this Privacy Policy</h2>
        <h3 className={h3ClassName}>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page and will take effect immediately after being
          published.
        </h3>
      </div>
    </main>
  );
}
