import { Zap } from "lucide-react";

const items = [
  "USA Made",
  "Third-Party Tested",
  "No Fillers",
  "30-Day Satisfaction Guarantee",
  "Free Shipping Over $99",
  "cGMP Certified Facilities",
];

export function TrustMarquee() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border bg-card py-3.5" aria-hidden>
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {row.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center gap-6 pr-6 text-sm font-bold uppercase tracking-[0.2em] text-foreground"
              >
                {item}
                <Zap className="h-4 w-4 fill-primary text-primary" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
