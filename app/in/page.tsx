import type { Metadata } from "next";
import Image from "next/image";
import MinimalHeader from "@/components/public/MinimalHeader";
import MinimalFooter from "@/components/public/MinimalFooter";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=ai.aptyread.app";

export const metadata: Metadata = {
  title: "AptyRead - English Reading App for Indian Children | Try Free",
  description:
    "Help your child become a confident English reader. A structured phonics program for Indian children aged 3-10. Try 4 free lessons. No registration needed.",
  alternates: {
    canonical: "https://www.aptyread.ai/in",
  },
  openGraph: {
    title: "AptyRead - English Reading App for Indian Children | Try Free",
    description:
      "Structured, step-by-step English reading program for Indian children ages 3-10. Try 4 free lessons.",
    url: "https://www.aptyread.ai/in",
    siteName: "AptyRead",
    type: "website",
  },
};

const levels = [
  {
    level: "Level 1",
    name: "I am Learning Letters",
    icon: "🎯",
    body: "Before reading words, a child needs to understand that every letter makes a sound. Level 1 builds this foundation with videos, activities, and guided practice.",
    meta: "46 lessons · 33 core lessons (about 25 min) · 11 review activities (about 10 min) · 2 final assessments",
    lessons: "Each core lesson has 12 guided topics. Reviews and final assessments use focused activity topics.",
    next: "Then your child is ready for Level 2.",
  },
  {
    level: "Level 2",
    name: "I Can Read!",
    icon: "📖",
    body: "This is where letters become words. Children blend sounds, read first words, then short sentences and simple stories.",
    meta: "57 lessons · Real words, sentences, and short stories",
    lessons: "",
    next: "Then your child is ready for Level 3.",
  },
  {
    level: "Level 3",
    name: "I Am Reading!",
    icon: "🚀",
    body: "Children learn reading patterns and apply them to longer text. Reading becomes smoother, faster, and more confident.",
    meta: "63 lessons · Paragraphs, passages, and comprehension",
    lessons: "",
    next: "Then your child is ready for Level 4.",
  },
  {
    level: "Level 4",
    name: "I Am a Reader!",
    icon: "🌟",
    body: "Children read real published books chapter by chapter, decode longer words, and strengthen understanding.",
    meta: "77 lessons · 4 real books read cover to cover",
    lessons: "",
    next: "",
  },
];

const faqs = [
  {
    q: "My child studies in Malayalam or Hindi medium. Will this work?",
    a: "Yes. AptyRead is designed for children who speak another language at home. It teaches English reading from sounds to words to connected text, step by step.",
  },
  {
    q: "My child already goes to tuition. Why are they still struggling?",
    a: "Many classes focus on homework and exam support, not core reading foundations. AptyRead focuses on foundational phonics sequence and reading progression.",
  },
  {
    q: "Which level should my child start at?",
    a: "Always Level 1. Every child starts there so no foundational gap is missed.",
  },
  {
    q: "How much time should we spend daily?",
    a: "One lesson per day is enough. Core lessons are around 25 minutes. Review activities are around 10 minutes.",
  },
  {
    q: "What happens after the 4 free lessons?",
    a: "You can continue with Level 1 at ₹2,399 total (incl. GST) for 6 months validity. One payment per level. No subscriptions.",
  },
  {
    q: "Is this just another app with games and distractions?",
    a: "No. AptyRead is a structured literacy program. No ads. No random lessons. Every lesson has a clear purpose.",
  },
  {
    q: "My child is 8 or 9 years old. Is it too late?",
    a: "Not at all. Older children can still build strong reading foundations. Many move quickly once the right sequence is in place.",
  },
  {
    q: "How long does the full program take?",
    a: "With regular one-lesson-per-day practice, many families complete the full journey in about 12-18 months. Pace varies by child.",
  },
];

export default function IndiaLandingPage() {
  return (
    <div className="min-h-screen bg-apty-warm">
      <MinimalHeader />
      <main>
        <section className="bg-white py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="inline-block text-sm font-semibold text-apty-coral bg-apty-warm px-4 py-2 rounded-full border border-apty-coral-accent mb-4">
                For Indian Children · Ages 3-10
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-apty-dark leading-tight mb-4">
                From &quot;I am Learning Letters&quot; to &quot;I Am a Reader!&quot;
              </h1>
              <p className="text-lg text-apty-gray mb-3">
                Most children hear English at home or school. But speaking and reading are different skills.
              </p>
              <p className="text-lg text-apty-gray mb-6">
                Reading has to be taught step by step, sound by sound. AptyRead is a complete structured phonics program: 4 levels, 243 lessons.
              </p>
              <p className="text-sm text-apty-gray mb-4">India pricing is shown on this page.</p>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-apty-coral text-white px-6 py-4 rounded-xl font-semibold text-center hover:opacity-90"
                >
                  Try 4 Free Lessons
                </a>
                <a href="#how-it-works" className="px-6 py-4 rounded-xl font-semibold text-apty-coral border border-apty-coral text-center hover:bg-apty-warm">
                  See How It Works
                </a>
              </div>

              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-block mb-6">
                <Image
                  src="/images/google-play-badge-large.png"
                  alt="Get it on Google Play"
                  width={172}
                  height={60}
                  className="h-12 w-auto"
                />
              </a>

              <div className="grid sm:grid-cols-2 gap-3 text-sm text-apty-gray">
                <p>✓ 2,500+ downloads</p>
                <p>✓ No registration needed</p>
                <p>✓ No ads. No distractions.</p>
                <p>✓ Try free before you commit</p>
              </div>
            </div>

            <div className="bg-apty-warm p-6 md:p-8 rounded-2xl border border-apty-coral-accent">
              <h2 className="text-2xl font-bold text-apty-dark mb-4">Does this sound familiar?</h2>
              <ul className="space-y-3 text-apty-dark">
                <li>• My child knows the alphabet but cannot read words yet</li>
                <li>• They can speak English but struggle to read simple sentences</li>
                <li>• They are falling behind classmates in school</li>
                <li>• Tuition classes have not fixed the foundation</li>
                <li>• I do not know where to start</li>
              </ul>
              <p className="text-apty-gray mt-5">
                If this feels familiar, your child does not need pressure. They need the right foundation. AptyRead builds it one step at a time.
              </p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 md:py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-3 text-center">
              One Clear Path. Four Milestones. 243 Lessons.
            </h2>
            <p className="text-lg text-apty-gray text-center mb-10 max-w-3xl mx-auto">
              Every child starts at Level 1 and builds upward. No skipping. No shortcuts. Just structured progress.
            </p>

            <div className="space-y-6 relative">
              <div className="absolute left-[2.25rem] top-4 bottom-4 w-0.5 bg-apty-coral/25 hidden md:block" aria-hidden />
              {levels.map((item, idx) => (
                <article key={item.level} className="bg-white rounded-2xl border border-apty-coral-accent p-6 md:p-8 shadow-sm">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-xl bg-apty-coral text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-apty-gray mb-1">{item.level}</p>
                      <h3 className="text-2xl font-bold text-apty-dark mb-1">{item.icon} {item.name}</h3>
                      <p className="text-apty-gray mb-3">{item.body}</p>
                      <p className="text-sm text-apty-dark font-semibold mb-2">{item.meta}</p>
                      {item.lessons ? <p className="text-sm text-apty-gray mb-3">{item.lessons}</p> : null}
                      {item.next ? <p className="text-sm text-apty-coral font-semibold">{item.next} →</p> : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-5">
              <p className="font-semibold text-apty-dark">
                Every child starts at Level 1 — I am Learning Letters.
              </p>
              <p className="text-apty-gray">
                Level 2, 3, or 4 cannot be joined directly. This structure is what makes steady progress possible.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-apty-dark mb-6 text-center">Online Class vs AptyRead</h2>
            <div className="overflow-x-auto bg-apty-warm border border-apty-coral-accent rounded-xl">
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr className="border-b border-apty-coral-accent text-apty-dark">
                    <th className="px-4 py-3 text-left">What Parents Compare</th>
                    <th className="px-4 py-3 text-left">AptyRead</th>
                    <th className="px-4 py-3 text-left">Typical Online Class</th>
                  </tr>
                </thead>
                <tbody className="text-apty-gray">
                  <tr className="border-b border-apty-coral-accent/60"><td className="px-4 py-3">Learning structure</td><td className="px-4 py-3">243 connected lessons</td><td className="px-4 py-3">Depends on teacher plan</td></tr>
                  <tr className="border-b border-apty-coral-accent/60"><td className="px-4 py-3">Schedule</td><td className="px-4 py-3">Any time, any day</td><td className="px-4 py-3">Fixed class slots</td></tr>
                  <tr className="border-b border-apty-coral-accent/60"><td className="px-4 py-3">Revision</td><td className="px-4 py-3">Unlimited inside validity</td><td className="px-4 py-3">Usually paid again</td></tr>
                  <tr className="border-b border-apty-coral-accent/60"><td className="px-4 py-3">Distractions</td><td className="px-4 py-3">No ads, focused flow</td><td className="px-4 py-3">Varies by platform</td></tr>
                  <tr><td className="px-4 py-3">Cost context</td><td className="px-4 py-3">₹2,399 total (incl. GST) for Level 1, 6 months validity (about ₹400/month equivalent)</td><td className="px-4 py-3">Often ₹300-₹600 per class hour</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-apty-gray mt-4">
              Level 1 includes 46 lessons: 33 core letter lessons, 11 review lessons, and 2 final assessments.
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-apty-dark mb-3 text-center">Why Level 1 Is Different</h2>
            <p className="text-apty-gray text-center mb-8 max-w-3xl mx-auto">
              These are core teaching principles of AptyRead, not testimonials.
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">English Immersion</h3>
                <p className="text-apty-gray">Reading is taught through English sounds, helping reduce mother-tongue reading interference.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">SATPIN Logic</h3>
                <p className="text-apty-gray">Children learn useful early reading sounds first instead of random alphabet order.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Sound to Letter Flow</h3>
                <p className="text-apty-gray">Children learn sound first, then letter mapping for clearer early decoding.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Global Pronunciation Model</h3>
                <p className="text-apty-gray">Instruction uses a clear, consistent pronunciation model for global English learning.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Correct Letter Formation</h3>
                <p className="text-apty-gray">Children learn where to start and how to form each letter correctly from the beginning.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Total Literacy Path</h3>
                <p className="text-apty-gray">This is a complete literacy journey with connected lessons, not isolated activities.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Digital Wellness</h3>
                <p className="text-apty-gray">One-lesson-per-day pacing supports healthy screen habits while keeping learning consistent.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Structured Confidence</h3>
                <p className="text-apty-gray">Clear progression helps children learn without confusion and grow reading confidence.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-apty-dark mb-8 text-center">Questions Indian Parents Ask</h2>
            <div className="space-y-3">
              {faqs.map((item) => (
                <details key={item.q} className="bg-apty-warm border border-apty-coral-accent rounded-xl p-5">
                  <summary className="cursor-pointer font-semibold text-apty-dark">{item.q}</summary>
                  <p className="text-apty-gray mt-3">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gradient-to-br from-apty-coral to-orange-500">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Every Child Deserves to Say “I Am a Reader!”</h2>
            <p className="text-white/95 text-lg mb-8">
              Start with 4 free lessons today. No registration. If it feels right for your child, continue with Level 1 at ₹2,399 total (incl. GST) for 6 months validity.
            </p>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-apty-coral px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:opacity-90"
            >
              Download Free on Google Play
            </a>
            <div className="mt-5">
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-block">
                <Image
                  src="/images/google-play-badge-large.png"
                  alt="Get it on Google Play"
                  width={172}
                  height={60}
                  className="h-12 w-auto"
                />
              </a>
            </div>
            <div className="mt-7 grid sm:grid-cols-2 gap-3 text-left text-white/95 text-sm max-w-3xl mx-auto">
              <p>✓ Try 4 lessons free · No registration needed</p>
              <p>✓ ₹2,399 total (incl. GST) for Level 1 · No subscription</p>
              <p>✓ 6 months validity · One lesson per day</p>
              <p>✓ Complete a level · Then decide on the next</p>
            </div>
          </div>
        </section>
      </main>
      <MinimalFooter />
    </div>
  );
}

