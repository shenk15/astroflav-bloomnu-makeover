import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <a href="/" aria-label="AstroFlav home" className="inline-flex items-center">
      <img
        src="/images/astroflav-logo.png"
        alt="AstroFlav"
        className={cn("h-6 w-auto", className)}
      />
    </a>
  );
}
