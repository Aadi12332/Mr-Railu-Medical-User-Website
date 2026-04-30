import bgImage from "@/assets/bgimg.svg";
import Image from "next/image";
import logo from "@/assets/medical-health-tele-logo.png";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[linear-gradient(180deg,#F0F9F7_0%,#E8F4F8_100%)] min-h-screen w-full">
      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center lg:px-6 px-3 w-full"
        style={{ backgroundImage: `url(${bgImage.src})` }}
      >
        <Link href="/" className="flex items-center gap-3 mb-5">
          <Image src={logo} alt="Logo" className="h-12" />
        </Link>
        {children}
      </div>
    </div>
  );
}
