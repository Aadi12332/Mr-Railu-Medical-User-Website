import { Phone } from "lucide-react";

export default function DeaSupportSection() {
  return (
    <section className="py-12 bg-gradient-to-r from-[#317873] to-[#63C5B4] rounded-xl text-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Still have questions? We&apos;re here to help.
        </h2>
        <p className="mt-2 text-sm md:text-base">
          Didn’t find what you were looking for? Our support team is ready to
          assist you.
        </p>

        <div className="mt-6 inline-flex items-center bg-white text-[#317873] rounded-lg p-4 shadow-lg">
          <div className="size-12 rounded-xl bg-gradient-primary flex items-center justify-center mr-4">
            <Phone className="size-6 text-white" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-lg">(504) 414-5095</div>
            <div className="text-xs">Press 6 for assistance</div>
          </div>
        </div>
      </div>
    </section>
  );
}
