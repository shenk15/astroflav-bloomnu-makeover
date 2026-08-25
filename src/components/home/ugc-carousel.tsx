import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { ugcVideos, type UgcVideo } from "@/lib/ugc-videos";

function VideoCard({ video }: { video: UgcVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);

  const toggle = () => {
    const el = videoRef.current;
    if (!el || missing) return;
    if (el.paused) {
      void el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="group relative w-[240px] shrink-0 snap-start overflow-hidden rounded-3xl border border-border bg-card sm:w-[280px]">
      <div className="relative aspect-[9/16]">
        {missing ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-border bg-accent/40 p-6 text-center">
            <Play className="h-8 w-8 text-muted-foreground" aria-hidden />
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Video coming soon
            </p>
            <p className="text-[10px] font-medium text-muted-foreground/70">
              Drop a file at public{video.src}
            </p>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              src={video.src}
              poster={video.poster}
              muted
              loop
              playsInline
              preload="metadata"
              onError={() => setMissing(true)}
              onEnded={() => setPlaying(false)}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? `Pause ${video.title}` : `Play ${video.title}`}
              className={`absolute inset-0 flex items-center justify-center bg-background/30 transition-opacity ${
                playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
              }`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-110">
                <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden />
              </span>
            </button>
          </>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4 pt-10">
        <p className="text-sm font-bold text-foreground">{video.title}</p>
        <p className="text-xs font-medium text-muted-foreground">{video.handle}</p>
      </div>
    </div>
  );
}

export function UgcCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * 300, behavior: "smooth" });
  };

  return (
    <section id="community" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Community
          </span>
          <h2 className="mt-4 font-display text-4xl uppercase leading-none tracking-tight text-foreground sm:text-5xl">
            Real people. <span className="text-primary">Real results.</span>
          </h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll videos left"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary/60"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll videos right"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary/60"
          >
            <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-6"
      >
        {ugcVideos.map((video) => (
          <VideoCard key={video.src} video={video} />
        ))}
      </div>
    </section>
  );
}
