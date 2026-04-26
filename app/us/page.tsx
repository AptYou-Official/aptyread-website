import type { Metadata } from "next";
import Image from "next/image";
import MinimalHeader from "@/components/public/MinimalHeader";
import MinimalFooter from "@/components/public/MinimalFooter";
import AppStoreBadge from "@/components/public/AppStoreBadge";
import GooglePlayBadge from "@/components/public/GooglePlayBadge";
import PlayStoreLink from "@/components/public/PlayStoreLink";
import AppShowcase, {
  LANDING_APP_SHOWCASE_ORDER,
} from "@/components/public/AppShowcase";

const ogImage = "https://www.aptyread.ai/images/apty.png";

export const metadata: Metadata = {
  title: "AptyRead English Literacy Program | Phonics-Based Reading for Kids | Try Free",
  description:
    "A structured phonics program for children aged 3 to 10. Built on the Science of Reading. 4 levels, 243 lessons. Try 4 free lessons on App Store or Google Play, no registration needed.",
  keywords:
    "AptyRead English Literacy Program, phonics-based reading for kids, Science of Reading app, structured literacy, learn to read, early reading program",
  alternates: {
    canonical: "https://www.aptyread.ai/us",
  },
  openGraph: {
    title: "AptyRead English Literacy Program | Phonics-Based Reading for Kids | Try Free",
    description:
      "A structured phonics program for children aged 3 to 10. Built on the Science of Reading. 4 levels, 243 lessons.",
    url: "https://www.aptyread.ai/us",
    siteName: "AptyRead",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "AptyRead",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AptyRead English Literacy Program | Try Free",
    description:
      "Structured phonics-based reading program for kids ages 3 to 10. Built on the Science of Reading.",
    images: [ogImage],
  },
};

const levels = [
  {
    level: "Level 1",
    name: "I am Learning Letters",
    icon: "🎯",
    body: "Before reading words, a child needs to understand that every letter makes a sound. Level 1 builds this foundation with videos, activities, and guided practice.",
    meta: "46 lessons · 12 guided topics per lesson · Sounds, letters, writing, reviews",
    lessons: "",
    next: "Then your child is ready for Level 2.",
  },
  {
    level: "Level 2",
    name: "I Can Read!",
    icon: "📖",
    body: "This is where letters become words. Children blend sounds, read first words, then short sentences and simple stories.",
    meta: "57 lessons · 10 guided topics per lesson · Words, sentences, short stories",
    lessons: "",
    next: "Then your child is ready for Level 3.",
  },
  {
    level: "Level 3",
    name: "I Am Reading!",
    icon: "🚀",
    body: "Children learn reading patterns and apply them to longer text. Reading becomes smoother, faster, and more confident.",
    meta: "63 lessons · 10 guided topics per lesson · Patterns, paragraphs, comprehension",
    lessons: "",
    next: "Then your child is ready for Level 4.",
  },
  {
    level: "Level 4",
    name: "I Am a Reader!",
    icon: "🌟",
    body: "Children read real published books chapter by chapter, decode longer words, and strengthen understanding.",
    meta: "77 lessons · 8 guided topics per lesson · Real books, strategies, comprehension",
    lessons: "",
    next: "",
  },
];

const faqs = [
  {
    q: "My child's school uses balanced literacy. Is that why they're struggling?",
    a: "Many children who struggle with reading have not received structured phonics instruction. If your child's school uses a meaning-first or whole-language approach, there may be a gap in their decoding foundation. AptyRead fills that gap, systematically, step by step, starting from the very beginning of how sounds connect to letters.",
  },
  {
    q: "How is AptyRead different from other reading apps?",
    a: "Most reading apps are activity-based, games, songs, and exercises that children can jump in and out of in any order. AptyRead is a structured course. Every lesson has a fixed place in a deliberate sequence. You cannot skip Level 2 to jump to Level 3, just like a child cannot read words before knowing what sounds letters make. It is the difference between a playlist and a curriculum.",
  },
  {
    q: "My child's home language isn't English, we speak Spanish or another language at home. Will this work?",
    a: "Yes. AptyRead is built for children who speak another language at home. The program teaches English reading entirely through English sounds and words, no translation, no switching. Children who are bilingual or multilingual often respond very well to this approach.",
  },
  {
    q: "Which level should my child start at?",
    a: "Always Level 1. Every child starts there so no foundational gap is missed. This is not about ability, it is about sequence. The program is designed so that each level builds directly on the one before it.",
  },
  {
    q: "How much time does this take each day?",
    a: "By default, children do one new lesson per day. Parents can increase to up to two when appropriate. Core lessons are around 25 minutes and review lessons are around 10 minutes. Daily consistency matters more than the length of each session.",
  },
  {
    q: "Is an internet connection required?",
    a: "You need internet to download the app and load lessons. A stable connection works best, especially for audio and video features.",
  },
  {
    q: "What happens after the 4 free lessons?",
    a: "You can continue with Level 1 of the AptyRead English Literacy Program at $59, one payment, 6 months of access, unlimited replays. No subscription. No auto-renew.",
  },
  {
    q: "Is this just another educational app with games and badges?",
    a: "No. There are no random games, no point systems, and no distraction loops. AptyRead is a phonics course delivered through an app, structured, sequential, and focused. Every lesson has a clear purpose and a fixed place in the program.",
  },
  {
    q: "My child is 7, 8, or 9 years old. Is it too late?",
    a: "Not at all. Older children who missed a phonics foundation often move through the early levels quickly once the structure is in place. The program works, the pace just depends on the child.",
  },
  {
    q: "How long does the full program take?",
    a: "With one lesson per day, most families complete the full four-level journey in around 12–18 months. Some children move faster. The important thing is consistency, not speed.",
  },
];

export default function UsLandingPage() {
  return (
    <div className="min-h-screen bg-apty-warm">
      <MinimalHeader />
      <main>
        <section className="bg-white py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="inline-block text-sm font-semibold text-apty-coral bg-apty-warm px-4 py-2 rounded-full border border-apty-coral-accent mb-4">
                For children · Ages 3–10 · Built on the Science of Reading
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-apty-dark leading-tight mb-6">
                From &quot;I Am Learning Letters&quot; to &quot;I Am a Reader!&quot;
              </h1>
              <div className="text-lg text-apty-dark mb-6 space-y-2">
                <p>Your child isn&apos;t behind.</p>
                <p>
                  They just haven&apos;t been taught to read{" "}
                  <span className="font-semibold">the right way</span> yet.
                </p>
                <p className="font-semibold text-apty-dark">AptyRead changes that.</p>
              </div>
              <p className="text-sm text-apty-gray mb-6">
                The{" "}
                <span className="font-medium text-apty-dark">AptyRead English Literacy Program</span> is a structured phonics course with four levels and 243 lessons in the{" "}
                <span className="font-medium text-apty-dark">AptyRead</span> app on the Apple App Store and Google Play.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-4">
                <PlayStoreLink
                  platform="auto"
                  className="inline-flex items-center justify-center gap-2 bg-apty-coral text-white px-6 py-4 rounded-xl font-semibold text-center hover:opacity-90"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Try 4 Free Lessons
                </PlayStoreLink>
                <a
                  href="#how-it-works"
                  className="px-6 py-4 rounded-xl font-semibold text-apty-coral border border-apty-coral text-center hover:bg-apty-warm"
                >
                  See how it works
                </a>
              </div>

              <div className="mb-6 flex items-center gap-3">
                <AppStoreBadge />
                <GooglePlayBadge />
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-sm text-apty-gray mb-8">
                <p>✓ 3,500+ downloads</p>
                <p>✓ No registration needed</p>
                <p>✓ No ads. No distractions.</p>
                <p>✓ Try free before you commit</p>
              </div>

              <div className="rounded-xl border border-apty-coral-accent bg-gradient-to-b from-white to-apty-warm/80 p-5 md:p-6 shadow-sm">
                <p className="text-xs font-semibold tracking-wider text-apty-gray uppercase mb-3">Why now matters</p>
                <div className="flex gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-100 text-apty-dark"
                    aria-hidden
                  >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <circle cx="12" cy="12" r="9" />
                      <path strokeLinecap="round" d="M12 7v5l3 2" />
                    </svg>
                  </div>
                  <p className="text-sm md:text-base text-apty-dark leading-relaxed">
                    <span className="font-semibold">The reading window is open right now.</span> Children who miss a
                    structured phonics foundation in early years often carry that gap into Grade 3, 4, and beyond, where
                    it becomes harder to close. In fact, only 1 in 3 fourth graders in the US reads proficiently. The gap
                    almost always starts here, in the early years, before school catches it. One lesson a day is all it
                    takes to build the foundation properly.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-apty-coral-accent/40">
                <Image
                  src="/images/parent-child-reading.png"
                  alt="Child and parent with books, reading together at home"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              <div className="bg-apty-warm p-6 md:p-8 rounded-2xl border border-apty-coral-accent">
                <h2 className="text-2xl font-bold text-apty-dark mb-4">Does this sound familiar?</h2>
                <ul className="space-y-3 text-apty-dark">
                  <li>• My child knows the alphabet but cannot read words yet</li>
                  <li>• They can speak English but struggle to read simple sentences</li>
                  <li>• Their teacher says they&apos;re &quot;on track&quot;, but something feels off</li>
                  <li>• We&apos;ve tried reading apps and nothing has stuck</li>
                  <li>• I&apos;ve heard about phonics and the Science of Reading but don&apos;t know where to start</li>
                </ul>
                <p className="text-apty-gray mt-5">
                  If any of this feels familiar, your child does not need more screen time. They need the right
                  structure. The AptyRead program builds that foundation one step at a time. No randomness, no guessing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <AppShowcase shotOrder={LANDING_APP_SHOWCASE_ORDER} />

        <section id="how-it-works" className="py-16 md:py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-3 text-center">
              One Clear Path. Four Milestones. 243 Lessons.
            </h2>
            <p className="text-lg text-apty-gray text-center mb-10 max-w-3xl mx-auto">
              Every child starts at Level 1 and builds upward. No skipping. No shortcuts. Structured progress, all inside the AptyRead app.
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
                Every child starts at Level 1: I am Learning Letters.
              </p>
              <p className="text-apty-gray">
                Level 2, 3, or 4 cannot be joined directly. This structure is what makes steady progress possible.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-apty-dark mb-6 text-center">Private Tutoring vs AptyRead English Literacy Program</h2>
            <div className="overflow-x-auto bg-apty-warm border border-apty-coral-accent rounded-xl">
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr className="border-b border-apty-coral-accent text-apty-dark">
                    <th className="px-4 py-3 text-left">What Parents Compare</th>
                    <th className="px-4 py-3 text-left min-w-[10rem]">AptyRead English Literacy Program (app)</th>
                    <th className="px-4 py-3 text-left">Private Tutoring</th>
                  </tr>
                </thead>
                <tbody className="text-apty-gray">
                  <tr className="border-b border-apty-coral-accent/60">
                    <td className="px-4 py-3 align-top">Foundation approach</td>
                    <td className="px-4 py-3 align-top">Sound-first, structured phonics sequence</td>
                    <td className="px-4 py-3 align-top">Depends on the tutor</td>
                  </tr>
                  <tr className="border-b border-apty-coral-accent/60">
                    <td className="px-4 py-3 align-top">Learning structure</td>
                    <td className="px-4 py-3 align-top">243 connected lessons</td>
                    <td className="px-4 py-3 align-top">No fixed sequence guaranteed</td>
                  </tr>
                  <tr className="border-b border-apty-coral-accent/60">
                    <td className="px-4 py-3 align-top">Progress tracking</td>
                    <td className="px-4 py-3 align-top">Clear level-by-level milestones</td>
                    <td className="px-4 py-3 align-top">Varies by tutor</td>
                  </tr>
                  <tr className="border-b border-apty-coral-accent/60">
                    <td className="px-4 py-3 align-top">Schedule</td>
                    <td className="px-4 py-3 align-top">Any time, any day</td>
                    <td className="px-4 py-3 align-top">Fixed weekly slots</td>
                  </tr>
                  <tr className="border-b border-apty-coral-accent/60">
                    <td className="px-4 py-3 align-top">Revision</td>
                    <td className="px-4 py-3 align-top">Unlimited inside validity</td>
                    <td className="px-4 py-3 align-top">Usually billed again</td>
                  </tr>
                  <tr className="border-b border-apty-coral-accent/60">
                    <td className="px-4 py-3 align-top">Distractions</td>
                    <td className="px-4 py-3 align-top">No ads, focused learning flow</td>
                    <td className="px-4 py-3 align-top">Varies by session</td>
                  </tr>
                  <tr className="border-b border-apty-coral-accent/60">
                    <td className="px-4 py-3 align-top">Try before you pay</td>
                    <td className="px-4 py-3 align-top">4 free lessons · no registration</td>
                    <td className="px-4 py-3 align-top">Usually a paid session</td>
                  </tr>
                  <tr className="border-b border-apty-coral-accent/60 bg-teal-50/90 text-apty-dark">
                    <td className="px-4 py-3 align-top font-medium">Total learning time</td>
                    <td className="px-4 py-3 align-top">20+ hours of structured lessons</td>
                    <td className="px-4 py-3 align-top">Depends on sessions booked</td>
                  </tr>
                  <tr className="bg-teal-50/90 text-apty-dark">
                    <td className="px-4 py-3 align-top font-medium">Cost for that time</td>
                    <td className="px-4 py-3 align-top">
                      <span className="block sm:inline">$59 for Level 1</span>
                      <span className="hidden sm:inline"> · </span>
                      <span className="block sm:inline">replay anytime · 6 months validity</span>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span className="block sm:inline">$40–75/hour</span>
                      <span className="hidden sm:inline"> · </span>
                      <span className="block sm:inline">$800–1,500+ for equivalent hours</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-apty-gray mt-4">
              Level 1 includes 46 lessons: 20+ hours of guided practice across 33 core lessons, 11 reviews, and 2 final
              assessments.
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-apty-dark mb-3 text-center">Why AptyRead English Literacy Program Is Different</h2>
            <p className="text-apty-gray text-center mb-8 max-w-3xl mx-auto">
              How we teach reading and why it is aligned with what the research actually says.
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Built on the Science of Reading</h3>
                <p className="text-apty-gray">AptyRead follows a structured synthetic phonics sequence, the approach backed by decades of reading research and now adopted in many US states. Every lesson is intentional. Nothing is random.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">English Immersion</h3>
                <p className="text-apty-gray">Reading is taught entirely through English sounds and words, building a clean, interference-free foundation from day one.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">SATPIN Logic</h3>
                <p className="text-apty-gray">Children learn the most useful early reading sounds first, not random alphabet order. This gives the sequence a clear, logical starting point.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Sound to Letter Flow</h3>
                <p className="text-apty-gray">Children learn each sound first, then the letter that represents it. This is how the brain builds reading, not the other way around.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">International English Pronunciation</h3>
                <p className="text-apty-gray">Clear, consistent pronunciation models help children build a neutral, widely understood English accent. That supports school, reading aloud, and confidence.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Correct Letter Formation</h3>
                <p className="text-apty-gray">Children learn proper letter formation from the very first lesson, where to start and how to move. No relearning later.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Total Literacy Path</h3>
                <p className="text-apty-gray">One connected course from first sounds to chapter books. Not a collection of isolated games or random activities.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Digital Wellness</h3>
                <p className="text-apty-gray">One lesson per day. Around 25 minutes. Structured pacing that fits into family life without turning reading into a screen marathon.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent md:col-span-2">
                <h3 className="font-semibold text-apty-dark mb-2">Structured Confidence</h3>
                <p className="text-apty-gray">Every lesson has a clear place in the sequence. Children always know what comes next, and so do parents.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-apty-dark mb-8 text-center">Frequently Asked Questions</h2>
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
              Start with 4 free lessons today. No registration. No credit card. If it feels right for your child, continue
              Level 1 of the English Literacy Program at $59, one payment, 6 months of access, no subscription.
            </p>
            <PlayStoreLink
              platform="auto"
              className="inline-block bg-white text-apty-coral px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:opacity-90"
            >
              Download Free on App Store or Google Play
            </PlayStoreLink>
            <div className="mt-5 flex items-center justify-center gap-3">
              <AppStoreBadge />
              <GooglePlayBadge />
            </div>
            <div className="mt-7 grid sm:grid-cols-2 gap-3 text-left text-white/95 text-sm max-w-3xl mx-auto">
              <p>✓ Try 4 lessons free · No registration · No credit card</p>
              <p>✓ $59 for Level 1 · One payment · No subscription · No auto-renew</p>
              <p>✓ 6 months of access · One lesson per day</p>
              <p>✓ Complete a level · Then decide on the next</p>
            </div>
          </div>
        </section>
      </main>
      <MinimalFooter />
    </div>
  );
}
