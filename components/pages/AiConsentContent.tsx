import {
  Eye,
  Mic,
  User,
  ShieldCheck,
  Mail,
  CheckCircle,
  Bot,
  FileText,
  Users,
  Shield,
  Database,
  Lock,
  UserCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AiConsentContent() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <Card className="">
        <CardHeader className="border-b flex gap-5 items-center">
          <div className="size-10 flex justify-center items-center rounded-xl bg-gradient-primary">
            <Mic className="size-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-semibold flex items-center">
            Consent to Use Ambient Intelligence Tools
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* render each section using the same layout pattern */}
          {[
            {
              icon: Eye,
              title: "Overview",
              body: (
                <p className="text-sm text-muted-foreground">
                  Our platform uses AI-powered ambient intelligence tools to
                  support healthcare providers while delivering care to you.
                </p>
              ),
            },
            {
              icon: Mic,
              title: "What are ambient intelligence tools?",
              body: (
                <p className="text-sm text-muted-foreground">
                  These tools listen securely to clinical conversations and
                  create draft visit notes or summaries in real time. This
                  allows your provider to focus more on you instead of typing
                  during the visit.
                </p>
              ),
            },
            {
              icon: User,
              title: "How does this affect you?",
              body: (
                <ul className="pl-5 text-sm text-muted-foreground space-y-1">
                  <li>You will not interact directly with the AI tool</li>
                  <li>The tool works in the background</li>
                  <li>
                    Your provider reviews and approves all notes created by the
                    system
                  </li>
                </ul>
              ),
            },
            {
              icon: ShieldCheck,
              title: "Privacy and security of your information",
              body: (
                <p className="text-sm text-muted-foreground">
                  We protect your health data using strict security measures and
                  comply with all applicable privacy laws, including HIPAA.
                </p>
              ),
            },
            {
              icon: Mail,
              title: "Questions or concerns",
              body: (
                <p className="text-sm text-muted-foreground">
                  If you have questions about these tools, you may contact
                  customer support or speak with your healthcare provider.
                </p>
              ),
            },
          ].map((section, idx) => (
            <div key={idx} className="flex gap-2">
              <section.icon className="size-6 text-primary shrink-0" />

              <div>
                <h3 className="flex items-center text-lg font-medium mb-2">
                  {section.title}
                </h3>
                {section.body}
              </div>
            </div>
          ))}

          <div className="mt-4 bg-[#5FB5A51A] border border-[#4A7C7E4D] p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <CheckCircle className="size-5 text-primary mr-2" />
              <span className="font-medium">Agreement and acknowledgement</span>
            </div>
            <p className="text-sm text-muted-foreground">
              By continuing your visit, you confirm that you understand and
              agree to the use of ambient intelligence technology during your
              care.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* new chatbot disclosure card */}
      <Card className="mt-8">
        <CardHeader className="border-b flex gap-5 items-center">
          <div className="size-10 flex justify-center items-center rounded-xl bg-gradient-primary">
            <Bot className="size-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-semibold flex items-center">
            AI Chatbot Disclosure & Notice
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {[
            {
              icon: Bot,
              title: "Introduction",
              body: (
                <p className="text-sm text-muted-foreground">
                  Our AI chatbot helps answer questions, schedule appointments,
                  and provide basic support. It is designed to improve response
                  time and service quality.
                </p>
              ),
            },
            {
              icon: FileText,
              title: "Nature of the service",
              body: (
                <p className="text-sm text-muted-foreground">
                  The chatbot is an automated system powered by AI. Users should
                  understand that they are communicating with technology and not
                  a human representative.
                </p>
              ),
            },
            {
              icon: Database,
              title: "Information Collection and Use",
              body: (
                <div className="text-sm ">
                  <p className="font-medium">
                    Categories of information collected may include:
                  </p>
                  <ul className="pl-5 space-y-1 text-muted-foreground">
                    <li>Contact details (name, email, address)</li>
                    <li>Messages and inquiries</li>
                    <li>Website usage and interaction data</li>
                    <li>Health-related information provided by the user</li>
                  </ul>
                  <p className="mt-2 font-medium">Purpose of collection:</p>
                  <ul className="pl-5 mt-1 text-muted-foreground space-y-1">
                    <li>To provide requested services and support</li>
                    <li>To improve system performance and reliability</li>
                    <li>To ensure security and prevent misuse</li>
                    <li>To meet legal and regulatory obligations</li>
                  </ul>
                </div>
              ),
            },
            {
              icon: Users,
              title: "Disclosure of Information",
              body: (
                <p className="text-sm text-muted-foreground">
                  Information may be shared only with:
                  <ul className="pl-5">
                    <li>Service providers assisting with chatbot operations</li>
                    <li>Legal or regulatory authorities when required</li>
                    <li>Affiliated companies under privacy regulations</li>
                  </ul>
                </p>
              ),
            },
            {
              icon: Lock,
              title: "Sensitive Personal Information and PHI",
              body: (
                <p className="text-sm text-muted-foreground">
                  We limit the use of sensitive personal data and Protected
                  Health Information (PHI) strictly to what is necessary for
                  providing chatbot services, unless additional consent is
                  given.
                </p>
              ),
            },
            {
              icon: Shield,
              title: "Data Security",
              body: (
                <p className="text-sm text-muted-foreground">
                  We apply technical and organizational safeguards to protect
                  personal information from unauthorized access, loss, or
                  misuse.
                </p>
              ),
            },
            {
              icon: UserCheck,
              title: "User Rights and Choices",
              body: (
                <p className="text-sm text-muted-foreground">
                  You have the right to:
                  <ul className="pl-5">
                    <li>Access your personal data</li>
                    <li>Request corrections</li>
                    <li>Limit or object to certain uses</li>
                    <li>Request deletion where legally allowed</li>
                  </ul>
                  <br />
                  Instructions for exercising these rights are provided through
                  customer support.
                </p>
              ),
            },
            {
              icon: FileText,
              title: "Changes to this notice",
              body: (
                <p className="text-sm text-muted-foreground">
                  We may update this disclosure from time to time. Continued use
                  of the chatbot after changes are posted indicates acceptance
                  of the updated terms.
                </p>
              ),
            },
          ].map((section, idx) => (
            <div key={idx} className="flex gap-3">
              <section.icon className="size-5 text-primary shrink-0" />
              <div>
                <h3 className="flex items-center text-lg font-medium mb-2">
                  {section.title}
                </h3>
                {section.body}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
