import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms Of Services",
};

export default function TermsOfServices() {
  const h1ClassName = "text-[#141414] text-5xl text-center";
  const h2ClassName = "text-[#141414] text-3xl [text-align:justify]";
  const h3ClassName = "text-[#141414] text-lg [text-align:justify]";
  return (
    <main className="flex-1 h-full w-full">
      <div className="max-w-7xl mx-auto mt-2 mb-5 flex flex-col gap-3 p-5">
        <h1 className={h1ClassName}>Terms of Service</h1>

        <h2 className={h2ClassName}>1. Acceptance of Terms</h2>
        <h3 className={h3ClassName}>
          By accessing or using the services of Houston SmarTravel, you agree to
          be bound by these Terms of Service. If you do not agree with any part
          of these terms, you must not use our services.
        </h3>

        <h2 className={h2ClassName}>2. Service Description</h2>
        <h3 className={h3ClassName}>
          Houston SmarTravel specializes in booking airline tickets issued with
          miles. We act solely as an intermediary between customers and the
          airline loyalty programs. All bookings are subject to the fare rules
          of the airline and availability of award seats. Tickets booked through
          Houston SmarTravel are purchased using airline miles. Consequently,
          passengers will not earn additional frequent flyer miles or loyalty
          points for these bookings.
        </h3>

        <h2 className={h2ClassName}>3. Booking and Payment</h2>
        <h3 className={h3ClassName}>
          Once availability is confirmed and the customer has accepted the
          proposed itinerary, Houston SmarTravel will proceed with ticket
          issuance. The customer must verify all details — including passenger
          names, travel dates, destinations, and other itinerary elements — and
          confirm that the information is correct. Payment is due within 24
          hours of issuance. If payment is not received within this timeframe,
          the ticket may be canceled without penalty, and the booking voided.
        </h3>

        <h2 className={h2ClassName}>
          4. Changes, Cancellations, and Availability
        </h2>
        <h3 className={h3ClassName}>
          Award tickets are non-refundable and do not permit changes.
          Cancellations may only be requested within 24 hours of ticket
          issuance. After this period, no changes or cancellations will be
          accepted. It is the customer&apos;s responsibility to understand and accept
          these rules before providing authorization.
        </h3>
        <h3 className={h3ClassName}>
          Once the customer authorizes Houston SmarTravel to proceed with the
          ticket issuance, the booking is considered final. However, due to the
          dynamic nature of award seat availability, Houston SmarTravel cannot
          guarantee that the seat will still be available at the time of
          issuance, even after authorization is received. In such cases, the
          customer will be notified immediately, and no charges will apply
          unless the booking is successfully completed. Award seats cannot be
          held or reserved. Available seat is only guaranteed after the ticket
          has been issued.
        </h3>

        <h2 className={h2ClassName}>
          5. Responsibility for Flights and Airline Changes
        </h2>
        <h3 className={h3ClassName}>
          Houston SmarTravel acts solely as an intermediary for the issuance of
          flight tickets using miles and does not operate any flights. All
          tickets are subject to the terms and conditions of the respective
          airline.
        </h3>
        <h3 className={h3ClassName}>
          In case of flight cancellations, delays, or schedule changes made by
          the airline, it is the passenger&apos;s responsibility to contact the
          airline directly to seek resolution, such as rebooking, according to
          the airline&apos;s policy.{" "}
        </h3>
        <h3 className={h3ClassName}>
          Houston SmarTravel is not responsible for any losses resulting from:
        </h3>
        <li className={h3ClassName}>
          Missed flights, regardless of the reason;
        </li>
        <li className={h3ClassName}>
          Airline-initiated changes or cancellations;
        </li>
        <li className={h3ClassName}>
          Ticket types that are non-refundable or do not allow changes.
        </li>
        <h3 className={h3ClassName}>
          By using our services, you acknowledge and accept these rules
          associated with your ticket, including any restrictions on refunds or
          modifications.
        </h3>

        <h2 className={h2ClassName}>6. Limitation of Liability</h2>
        <h3 className={h3ClassName}>
          We are not liable for any direct, indirect, incidental, consequential,
          or punitive damages arising out of your access to or use of our
          services. Your sole remedy is to discontinue using our services.
        </h3>

        <h2 className={h2ClassName}>7. Privacy Policy</h2>
        <h3 className={h3ClassName}>
          We respect your privacy. Any personal information you provide to us
          will be used only to facilitate bookings and provide customer support.
          We do not sell or share your information with third parties, except as
          required to complete your booking.
        </h3>

        <h2 className={h2ClassName}>8. Governing Law</h2>
        <h3 className={h3ClassName}>
          These Terms shall be governed and construed in accordance with the
          laws of the State of Texas, without regard to its conflict of law
          provisions.
        </h3>

        <h2 className={h2ClassName}>9. Contact Us</h2>
        <h3 className={h3ClassName}>
          If you have any questions about these Terms, please contact us at{" "}
          <span className="font-bold">contact@houstonsmartravel.com </span>.
        </h3>
      </div>
    </main>
  );
}
