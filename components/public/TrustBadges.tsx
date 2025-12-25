const badges = [
  { icon: "🛡️", text: "Safe for Children" },
  { icon: "💰", text: "No Hidden Costs" },
  { icon: "✅", text: "Parent Approved" },
  { icon: "📚", text: "Educational" },
  { icon: "🔒", text: "Privacy Protected" },
];

export default function TrustBadges() {
  return (
    <section className="bg-white py-12 px-4 border-y border-apty-coral-accent">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <p className="text-sm text-apty-dark font-medium">{badge.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

