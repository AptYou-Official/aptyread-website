const facts = [
  {
    title: "Tonight",
    body: "Download. Open. Start Lesson 1. You sit with them.",
  },
  {
    title: "Fifteen minutes",
    body: "You set a daily limit: 1 or 2 new lessons. Then they are done.",
  },
  {
    title: "No noise",
    body: "No ads. No subscription. Buy a level once, when you are ready.",
  },
];

export default function DownloadBenefits() {
  return (
    <section className="bg-apty-warm py-14 md:py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="space-y-10">
          {facts.map((fact) => (
            <div key={fact.title} className="text-center">
              <h2 className="text-xl md:text-2xl font-bold text-apty-coral mb-2">
                {fact.title}
              </h2>
              <p className="text-base md:text-lg text-apty-dark leading-relaxed">
                {fact.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
