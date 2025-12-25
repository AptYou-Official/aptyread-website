'use client';

export default function Screenshots() {
  const screenshots = [
    {
      id: 1,
      title: "Learning Letters",
      description: "Interactive letter tracing and sound discovery",
      gradient: "from-apty-coral to-orange-400",
    },
    {
      id: 2,
      title: "Reading Words",
      description: "Building words from sounds they know",
      gradient: "from-apty-cyan to-blue-400",
    },
    {
      id: 3,
      title: "Story Reading",
      description: "Reading real stories independently",
      gradient: "from-apty-gold to-yellow-400",
    },
  ];

  return (
    <section className="bg-apty-warm py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-apty-dark mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-apty-gray max-w-2xl mx-auto">
            Watch your child learn, one lesson at a time
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {screenshots.map((screenshot) => (
            <div
              key={screenshot.id}
              className="group relative"
            >
              <div className="bg-white p-6 rounded-2xl border-2 border-apty-coral-accent hover:border-apty-coral shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Placeholder for screenshot */}
                <div className={`relative aspect-[9/16] bg-gradient-to-br ${screenshot.gradient} rounded-xl mb-6 flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                  <span className="text-white/60 text-sm font-medium relative z-10">
                    App Screenshot {screenshot.id}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-apty-dark mb-2">
                  {screenshot.title}
                </h3>
                <p className="text-apty-gray">{screenshot.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
