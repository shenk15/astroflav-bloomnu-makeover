export interface UgcVideo {
  /** Drop your video files into public/videos/ and update the paths here. */
  src: string;
  poster: string;
  title: string;
  handle: string;
}

export const ugcVideos: UgcVideo[] = [
  {
    src: "/videos/ugc-1.mp4",
    poster: "/images/categories/supplements.jpg",
    title: "Morning stack routine",
    handle: "@customer",
  },
  {
    src: "/videos/ugc-2.mp4",
    poster: "/images/categories/pre-intra.png",
    title: "Pre-workout fuel up",
    handle: "@customer",
  },
  {
    src: "/videos/ugc-3.mp4",
    poster: "/images/categories/stacks.jpg",
    title: "30 days on Elevated",
    handle: "@customer",
  },
  {
    src: "/videos/ugc-4.mp4",
    poster: "/images/categories/bundle.jpg",
    title: "Unboxing the bundle",
    handle: "@customer",
  },
];
