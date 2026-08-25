import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Does AstroFlav have a guarantee?",
    answer:
      "Absolutely! All AstroFlav products have a 100% satisfaction guarantee. If you try anything and find it's not for you, just let us know and you'll get a full refund minus shipping. Even if it's been opened!",
  },
  {
    question: "When will my product be shipped?",
    answer:
      "Your package will be fulfilled within 24 hours of your order. Excluding Friday after 5pm, & Saturday orders. These will be shipped out Monday.",
  },
  {
    question: "Can I combine AstroFlav products?",
    answer:
      "Yes, absolutely! Combining our products along with a good diet and exercise plan, will help you become the best version of yourself!",
  },
  {
    question: "Do any of your products contain added sugar or fillers?",
    answer:
      "No... We only use the highest quality ingredients and we never add any sugar or fillers to our products.",
  },
  {
    question: "Are you manufactured in the USA?",
    answer:
      "Yes. Our products are made in cGMP compliant facilities in the United States, using only the best ingredients from domestic & international origins. For us, it's all about quality control — so you can have confidence in your dietary supplements.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
          FAQ
        </span>
        <h2 className="mt-4 font-display text-4xl uppercase leading-none tracking-tight text-foreground sm:text-5xl">
          Frequently asked questions
        </h2>
        <p className="mt-4 text-sm text-muted-foreground">
          Here are some of our most frequently asked questions. Have another one?{" "}
          <a href="#faq" className="font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-4">
            Contact us
          </a>
          .
        </p>
      </div>

      <div className="mt-10 space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.question}
              className={cn(
                "overflow-hidden rounded-2xl border transition-colors",
                isOpen ? "border-primary/60 bg-card" : "border-border bg-card",
              )}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-sm font-bold uppercase tracking-wide text-foreground">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-primary transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-300",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
