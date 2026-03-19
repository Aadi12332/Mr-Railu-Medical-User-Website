import Image from "next/image";
import logo from "@/assets/medical-health-tele-logo.png";
import bgPattern from "@/assets/landing/hero/bg-pattern.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F4F9F8] flex items-center justify-center p-4 relative overflow-hidden">
      {/* decorative background patterns (both sides) */}
      <div className="absolute -scale-x-100 left-0 z-0 opacity-40 max-w-xs pointer-events-none">
        <Image
          src={bgPattern}
          alt="Background pattern left"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute  right-0 z-0 opacity-40 max-w-xs pointer-events-none">
        <Image
          src={bgPattern}
          alt="Background pattern right"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full  relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src={logo}
            alt="Mental Health Tele"
            priority
            className="object-contain"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
