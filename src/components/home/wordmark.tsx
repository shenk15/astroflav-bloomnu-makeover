import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <a
      href="/"
      aria-label="AstroFlav home"
      className={cn(
        "font-display text-2xl uppercase italic leading-none tracking-wide text-foreground",
        className,
      )}
    >
      Astro<span className="text-primary">Flav</span>
    </a>
  );
}
