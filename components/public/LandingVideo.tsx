type LandingVideoProps = {
  title?: string;
  subtitle?: string;
};

const VIDEO_URL = "https://www.youtube-nocookie.com/embed/kHQhATYvmSQ?rel=0&modestbranding=1&playsinline=1";

export default function LandingVideo({
  title = "Watch How AptyRead Builds Reading Confidence",
  subtitle = "A 60-second walkthrough for parents: problem, method, levels, and how to start free.",
}: LandingVideoProps) {
  return (
    <section className="py-10 md:py-14 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-2">{title}</h2>
          <p className="text-apty-gray">{subtitle}</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-apty-coral-accent shadow-sm bg-black">
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={VIDEO_URL}
              title="AptyRead school readiness and literacy walkthrough"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
