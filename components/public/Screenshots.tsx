export default function Screenshots() {
  // Placeholder for screenshots - replace with actual app screenshots
  const screenshots = [
    {
      id: 1,
      title: "Learning Letters",
      description: "Your child traces and learns each letter",
    },
    {
      id: 2,
      title: "Reading Words",
      description: "Building words from sounds",
    },
    {
      id: 3,
      title: "Story Reading",
      description: "Reading real stories independently",
    },
  ];

  return (
    <section className="bg-apty-warm py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-apty-dark text-center mb-12">
          See How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {screenshots.map((screenshot) => (
            <div
              key={screenshot.id}
              className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm"
            >
              <div className="bg-apty-warm aspect-[9/16] rounded-lg mb-4 flex items-center justify-center">
                <span className="text-apty-gray text-sm">
                  App Screenshot {screenshot.id}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-apty-dark mb-2">
                {screenshot.title}
              </h3>
              <p className="text-apty-gray">{screenshot.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

