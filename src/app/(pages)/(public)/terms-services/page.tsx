import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms Of Services",
};

export default function TermsOfServices() {
  const h1ClassName = "text-[#141414] text-4xl text-center";
  const h2ClassName = "text-[#141414] text-2xl [text-align:justify]";
  const h3ClassName = "text-[#141414] text-lg [text-align:justify]";
  return (
    <main className="flex-1 h-full w-full">
      <div className="max-w-7xl mx-auto mt-2 mb-5 flex flex-col gap-3 p-5">
        <h1 className={h1ClassName}>Terms of Service</h1>

        <h2 className={h2ClassName}>1. Acceptance of Terms</h2>
        <h3 className={h3ClassName}>
          By using our services, you agree to be bound by these Terms of
          Service. If you do not agree with any part of these terms, please
          discontinue use of our services.
        </h3>

        <h2 className={h2ClassName}>2. Use of Our Services</h2>
        <h3 className={h3ClassName}>
          Our services are intended solely for legitimate and lawful purposes.
          You agree not to use our services for any illegal or unauthorized
          activities, including but not limited to violating any intellectual
          property or privacy laws.
        </h3>

        <h2 className={h2ClassName}>3. Payment</h2>
        <h3 className={h3ClassName}>
          If our services require payment, you agree to provide accurate and
          complete payment information. All fees are due at the time of purchase
          unless otherwise stated.
        </h3>

        <h2 className={h2ClassName}>4. Intellectual Property</h2>
        <h3 className={h3ClassName}>
          All content, trademarks, and data on this website, including software,
          databases, text, graphics, icons, and hyperlinks are the property of
          or licensed to us and are protected from infringement by local and
          international legislation.
        </h3>

        <h2 className={h2ClassName}>5. Indemnification</h2>
        <h3 className={h3ClassName}>
          You agree to indemnify and hold us harmless from any claims, damages,
          or expenses, including attorneys’ fees, arising from your use of our
          services or breach of these Terms of Service.
        </h3>

        <h2 className={h2ClassName}>6. Limitation of Liability</h2>
        <h3 className={h3ClassName}>
          We are not liable for any direct, indirect, incidental, consequential,
          or punitive damages arising out of your access to or use of our
          services. Your sole remedy is to discontinue using our services.
        </h3>

        <h2 className={h2ClassName}>7. Governing Law</h2>
        <h3 className={h3ClassName}>
          These Terms of Service are governed by and construed in accordance
          with the laws of the jurisdiction in which we operate, without regard
          to its conflict of law provisions.
        </h3>

        <h2 className={h2ClassName}>8. Changes to These Terms</h2>
        <h3 className={h3ClassName}>
          We reserve the right to modify these Terms of Service at any time. Any
          changes will be posted on this page and will become effective
          immediately upon posting.
        </h3>

        <h2 className={h2ClassName}>9. Contact Us</h2>
        <h3 className={h3ClassName}>
          If you have any questions or concerns regarding these Terms of
          Service, please contact us via the communication methods provided on
          our website.
        </h3>
      </div>
    </main>
  );
}
