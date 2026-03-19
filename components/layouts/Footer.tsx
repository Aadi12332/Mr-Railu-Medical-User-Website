import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/medical-health-tele-logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#346079] text-slate-100">
      <div className="container mx-auto px-4 md:px-6 pt-16 pb-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          {/* Left: logo + links */}
          <div className="md:col-span-2">
            <div className="flex items-center">
              <Image
                src={logo}
                alt="Mental Health Tele logo"
                className="h-10 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>

            <ul className="mt-8 space-y-4 text-slate-200 text-sm">
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:underline">
                  FAQ’s
                </Link>
              </li>
              <li>
                <Link href="/company/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/consent" className="hover:underline">
                  Consent to Telehealth
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Industries</h4>
            <ul className="space-y-4 text-slate-200 text-sm">
              <li>
                <Link href="/dea" className="hover:underline">
                  DEA Rules Update
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="hover:underline">
                  Editorial Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white font-semibold mb-4">More info</h4>
            <ul className="space-y-4 text-slate-200 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="hover:underline">
                  Terms Of Use
                </Link>
              </li>
              <li>
                <Link href="/payment-terms" className="hover:underline">
                  Payment terms
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="hover:underline">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/ai-consent" className="hover:underline">
                  AI Usage Consent
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-4 text-slate-200 text-sm">
              <li>
                <Link href="/refund-policy" className="hover:underline">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/hipaa-notice" className="hover:underline">
                  HIPAA Notice
                </Link>
              </li>
              <li>
                <Link href="/hipaa-privacy-policy" className="hover:underline">
                  HIPAA Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:underline">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-10 border-t border-white/20">
          <p className="text-center text-xs sm:text-sm text-slate-100/85 leading-relaxed max-w-5xl mx-auto">
            The content presented on mental health tele is intended solely for
            informational and educational purposes. It is not a substitute for
            professional medical advice, diagnosis, or treatment. Always seek
            the advice of your healthcare provider with any questions you may
            have regarding a medical condition or treatment options. Our content
            does not replace the need for professional medical consultation and
            should not be used as medical advice under any circumstances.
          </p>
        </div>
      </div>
    </footer>
  );
}
