import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

export default function PaymentTermsSection({ data }: any) {
  const sorted =
    data
      ?.slice()
      ?.sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)) || [];

  const title = sorted?.[0]?.heading || "";

const groups: any[] = [];
let current: any = null;

sorted.forEach((item: any, index: number) => {
  const heading = item?.heading?.trim();
  const body = item?.body?.trim();

  const isSection =
    heading &&
    body &&
    /^[A-Z]$/.test(body);

  if (isSection) {
    if (current) {
      groups.push(current);
    }

    current = {
      id: `${heading}-${index}`,
      letter: body,
      title: heading,
      content: [],
    };

    return;
  }

  if (current) {
    if (heading && body) {
      current.content.push(`${heading}: ${body}`);
    } else if (heading) {
      current.content.push(heading);
    } else if (body) {
      current.content.push(body);
    }
  }
});

if (current) {
  groups.push(current);
}

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeader
          title={title?.split(" ").slice(0, 3).join(" ")}
          subtitle={title?.split(" ").slice(3).join(" ")}
          align="center"
        />
      </div>

      <div className="mt-10 max-w-3xl mx-auto px-4 grid grid-cols-1 gap-8">
        {groups.map((item: any) => (
          <Card
            key={item.id}
            className="bg-white p-6 shadow-sm flex-row gap-3"
          >
            <div className="size-8 shrink-0 rounded-full bg-gradient-primary text-white font-semibold flex items-center justify-center">
              {item.letter}
            </div>

            <div>
              <h3 className="text-lg mt-0.5 font-medium text-slate-900">
                {item.title}
              </h3>

              <div className="mt-3 space-y-2">
                {item.content.map((c: string, i: number) => (
                  <p key={i} className="text-sm text-muted-foreground">
                    {c}
                  </p>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}