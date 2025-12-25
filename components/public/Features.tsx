'use client';

const features = [
  {
    icon: "📅",
    title: "One Lesson a Day",
    description: "30 minutes. Then it stops. No screen time battles.",
    color: "from-apty-coral to-orange-400",
  },
  {
    icon: "🔊",
    title: "Sounds They Know",
    description: "Steam makes 'S'. Tapping makes 'T'. Learning feels natural.",
    color: "from-apty-cyan to-blue-400",
  },
  {
    icon: "📚",
    title: "No Rushing",
    description: "One sound. One letter. One word. Master it, then move on.",
    color: "from-apty-gold to-yellow-400",
  },
  {
    icon: "🌍",
    title: "ESL-Friendly",
    description: "Proper pronunciation from day one. No bad habits to fix later.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: "🚫",
    title: "No Distractions",
    description: "No ads. No games. Just learning, one day at a time.",
    color: "from-purple-400 to-pink-400",
  },
  {
    icon: "✅",
    title: "Try Free First",
    description: "4 free lessons. See if your child connects with our method.",
    color: "from-apty-coral to-pink-400",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-apty-dark mb-4">
            Why It Works
          </h2>
          <p className="text-xl text-apty-gray max-w-2xl mx-auto">
            We built AptyRead differently. Here&apos;s what makes it special.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-2xl border-2 border-apty-coral-accent hover:border-apty-coral transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              
              <div className="relative">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-apty-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-apty-gray leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
