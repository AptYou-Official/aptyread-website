'use client';

export default function DownloadBenefits() {
  const faqs = [
    {
      q: 'What age is this for?',
      a: 'AptyRead is designed for children ages 4 to 10.',
    },
    {
      q: 'How long should my child practice daily?',
      a: 'You set a daily limit of 1 or 2 new lessons. About fifteen minutes.',
    },
    {
      q: 'Is it suitable for beginners?',
      a: 'Yes. The program starts with foundational sounds and builds step by step.',
    },
    {
      q: 'Do children need to start from Level 1?',
      a: 'Yes. The program is sequential, and children build the right foundation first.',
    },
    {
      q: 'Is this only for one country?',
      a: 'No. AptyRead is designed for global English learners.',
    },
  ];

  return (
    <section id="how-it-works" className="bg-apty-warm py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-4">
            Is Reading Still Hard for Your Child?
          </h2>
          <p className="text-base md:text-lg text-apty-gray max-w-2xl mx-auto">
            If reading feels difficult now, the right sequence can change everything.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm mb-8">
          <ul className="space-y-3 text-apty-dark">
            <li>• Knows letters but cannot read words yet</li>
            <li>• Gets confused by sounds and blending</li>
            <li>• Avoids reading practice</li>
          </ul>
          <p className="text-apty-gray mt-4">
            AptyRead solves this with a clear progression children can follow, one step at a time.
          </p>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-3">
            A Proven 4-Level Reading System
          </h2>
          <p className="text-apty-gray">
            Each level builds on the previous one. No skipping. Foundation first.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10">
          <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-apty-coral/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-apty-dark mb-2">
                  Level 1: Learning the Sounds
                </h3>
                <p className="text-apty-gray text-sm md:text-base">
                  Children learn letter sounds and early decoding basics.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-apty-cyan/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-apty-dark mb-2">
                  Level 2: Reading First Words
                </h3>
                <p className="text-apty-gray text-sm md:text-base">
                  Children blend sounds to read first words and simple lines.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-apty-gold/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-apty-dark mb-2">
                  Level 3: Reading Anything
                </h3>
                <p className="text-apty-gray text-sm md:text-base">
                  Children practice key spelling patterns and read with better flow.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-apty-coral/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">4</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-apty-dark mb-2">
                  Level 4: Reading Real Books
                </h3>
                <p className="text-apty-gray text-sm md:text-base">
                  Children build fluency and confidence with longer reading.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm mb-10">
          <h3 className="text-xl font-bold text-apty-dark mb-4">
            From Struggling Reader to Confident Reader
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm md:text-base">
            <div className="bg-apty-warm p-4 rounded-lg">
              <p className="font-semibold text-apty-dark mb-2">Before</p>
              <ul className="text-apty-gray space-y-1">
                <li>Struggles with letters and sounds</li>
                <li>Avoids reading practice</li>
                <li>Low confidence with words</li>
              </ul>
            </div>
            <div className="bg-apty-warm p-4 rounded-lg">
              <p className="font-semibold text-apty-dark mb-2">After</p>
              <ul className="text-apty-gray space-y-1">
                <li>Reads simple words with support</li>
                <li>Participates more in reading</li>
                <li>Builds stronger confidence over time</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm mb-10">
          <h3 className="text-xl font-bold text-apty-dark mb-4">Parents Love AptyRead</h3>
          <p className="text-apty-gray mb-4">3,500+ downloads and growing.</p>
          <div className="grid md:grid-cols-3 gap-4">
            <blockquote className="bg-apty-warm p-4 rounded-lg text-sm text-apty-dark">
              “The step-by-step format finally made reading easier for my child.”
            </blockquote>
            <blockquote className="bg-apty-warm p-4 rounded-lg text-sm text-apty-dark">
              “Short daily lessons fit our routine. No pressure, just progress.”
            </blockquote>
            <blockquote className="bg-apty-warm p-4 rounded-lg text-sm text-apty-dark">
              “Simple for parents to follow, and my child stays engaged.”
            </blockquote>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm">
          <h3 className="text-xl font-bold text-apty-dark mb-4">Questions Parents Ask</h3>
          <div className="space-y-4">
            {faqs.map((item) => (
              <details key={item.q} className="border border-apty-coral-accent rounded-lg p-4">
                <summary className="cursor-pointer font-semibold text-apty-dark">{item.q}</summary>
                <p className="text-apty-gray mt-2 text-sm md:text-base">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


