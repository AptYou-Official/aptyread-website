const features = [
  {
    icon: "📅",
    title: "One Lesson a Day",
    description: "Your child learns one lesson each day. 30 minutes. Then the app stops. No screen time worries.",
  },
  {
    icon: "🔊",
    title: "Environmental Sounds",
    description: "We teach phonics through sounds your child already knows. Steam makes the 'S' sound.",
  },
  {
    icon: "📚",
    title: "Sequential Learning",
    description: "One sound at a time. One letter at a time. Nothing is skipped. Nothing is rushed.",
  },
  {
    icon: "🌍",
    title: "Built for ESL Families",
    description: "Made for families where English is the second language. Proper pronunciation from day one.",
  },
  {
    icon: "🚫",
    title: "No Ads, No Games",
    description: "No ads. No games that waste time. Just steady progress, one day at a time.",
  },
  {
    icon: "✅",
    title: "Try It Free",
    description: "The first 4 lessons are free. See if your child connects with how we teach.",
  },
];

export default function Features() {
  return (
    <section className="bg-apty-warm py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-apty-dark text-center mb-12">
          Why Parents Choose AptyRead
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-apty-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-apty-gray leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

