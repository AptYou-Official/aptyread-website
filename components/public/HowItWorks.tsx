'use client';

const levels = [
  {
    number: 1,
    name: "I am Learning Letters",
    parentQuote: "My child knows the alphabet but can't read yet.",
    description:
      "Knowing the alphabet is not the same as reading. Level 1 fixes that. Every letter sound. Every letter shape. Every letter written correctly. 46 lessons. The foundation everything else is built on.",
  },
  {
    number: 2,
    name: "I Can Read!",
    parentQuote: "My child knows the sounds but can't put them together.",
    description:
      "This is where reading begins. Sounds become words. Words become sentences. Sentences become stories. 57 lessons. The moment your child reads their first real word. You will both remember it.",
  },
  {
    number: 3,
    name: "I Am Reading!",
    parentQuote: "My child reads simple words but struggles with longer texts.",
    description:
      "Simple words are not enough. Level 3 builds fluency. Longer words. Paragraphs. Comprehension. 63 lessons. Reading starts to feel effortless.",
  },
  {
    number: 4,
    name: "I Am a Reader!",
    parentQuote: "My child reads but struggles with longer or harder words.",
    description:
      "Real books. Real stories. Real reading. Level 4 puts four published books in your child's hands. 77 lessons. Your child finishes as an independent reader. A reader for life.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-apty-warm to-white py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-apty-dark mb-4">
            Four levels. One path.
          </h2>
          <p className="text-lg md:text-xl text-apty-gray max-w-3xl mx-auto leading-relaxed">
            Every child starts at the beginning and arrives at the same destination. A reader for life.
          </p>
        </div>

        <div className="relative space-y-6">
          <div className="absolute left-[4.5rem] top-6 bottom-6 w-0.5 bg-apty-coral/25 hidden md:block" aria-hidden />
          {levels.map((level, index) => (
            <div
              key={level.number}
              className="relative bg-white p-8 rounded-2xl border-2 border-apty-coral-accent hover:border-apty-coral transition-all shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-apty-coral to-orange-400 rounded-xl flex items-center justify-center text-3xl font-bold text-white flex-shrink-0">
                    {level.number}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-2xl md:text-3xl font-bold text-apty-dark mb-2">
                      {level.name}
                    </h3>
                    <p className="text-base md:text-lg italic text-apty-coral mb-3">
                      &ldquo;{level.parentQuote}&rdquo;
                    </p>
                    <p className="text-apty-gray leading-relaxed mb-4">
                      {level.description}
                    </p>
                    {index < levels.length - 1 && (
                      <p className="text-sm text-apty-coral font-medium mt-2">
                        Then your child is ready for Level {level.number + 1} →
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-12 text-center space-y-3">
          <p className="text-base md:text-lg font-semibold text-apty-dark max-w-2xl mx-auto">
            No child skips ahead. No child is left behind.
          </p>
          <p className="text-base md:text-lg text-apty-gray max-w-2xl mx-auto">
            Every child moves at their own pace. Every child arrives.
          </p>
        </div>
      </div>
    </section>
  );
}
