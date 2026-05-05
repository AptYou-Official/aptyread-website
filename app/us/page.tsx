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
import LandingVideo from "@/components/public/LandingVideo";

const ogImage = "https://www.aptyread.ai/images/apty.png";

export const metadata: Metadata = {
  title: "AptyRead English Literacy Program | Phonics-Based Reading for Kids | Try Free",
  description:
    "Structured phonics for ages 3 to 10 based on the Science of Reading. Four levels and 243 lessons in AptyRead on the App Store and Google Play. Try four lessons free with no signup. Tap your store.",
  keywords:
    "AptyRead English Literacy Program, phonics-based reading for kids, Science of Reading app, structured literacy, learn to read, early reading program",
  alternates: {
    canonical: "https://www.aptyread.ai/us",
  },
  openGraph: {
    title: "AptyRead English Literacy Program | Phonics-Based Reading for Kids | Try Free",
    description:
      "Science-of-Reading-aligned phonics in one app for ages 3 to 10. Try four lessons free. Level 1 is $59 for six months, no subscription.",
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
      "Structured phonics for kids 3 to 10. Built on the Science of Reading. Try four lessons free.",
    images: [ogImage],
  },
};

const levels = [
  {
    level: "Level 1",
    name: "I am Learning Letters",
    icon: "🎯",
    body: "Every letter has a sound. Level 1 builds that skill with videos, activities, and simple practice steps you do together.",
    meta: "46 lessons, about 12 short topics each. Sounds, letters, writing, and reviews.",
    lessons: "",
    next: "Next up is Level 2.",
  },
  {
    level: "Level 2",
    name: "I Can Read!",
    icon: "📖",
    body: "Letters turn into words. Your child blends sounds, reads short words, then sentences and little stories.",
    meta: "57 lessons, words and sentences plus short stories.",
    lessons: "",
    next: "Next up is Level 3.",
  },
  {
    level: "Level 3",
    name: "I Am Reading!",
    icon: "🚀",
    body: "We add reading patterns so longer text feels doable. Pace and confidence usually pick up together.",
    meta: "63 lessons focused on patterns, paragraphs, and simple comprehension.",
    lessons: "",
    next: "Next up is Level 4.",
  },
  {
    level: "Level 4",
    name: "I Am a Reader!",
    icon: "🌟",
    body: "Real books, read chapter by chapter. Your child tackles longer words with clear strategies.",
    meta: "77 lessons, real books plus strategies.",
    lessons: "",
    next: "",
  },
];

const faqs = [
  {
    q: "My child's school uses balanced literacy. Is that why they're struggling?",
    a: "Often, yes in part. If school leans meaning-first without steady decoding drills, cracks show when texts get dense. AptyRead walks sounds to letters again, lesson by lesson, from the beginning. That fills the phonics lane many classrooms never finish.",
  },
  {
    q: "How is AptyRead different from other reading apps?",
    a: "Most apps behave like playlists of games or songs kids can shuffle. This is sequenced coursework. Lesson 40 never starts until lesson 39 makes sense. That is the difference between busy screen time and a curriculum.",
  },
  {
    q: "My child's home language isn't English, we speak Spanish or another language at home. Will this work?",
    a: "Yes. Lessons stay entirely in English audio and letters, which helps bilingual kids attach English sounds to spelling without juggling translation menus.",
  },
  {
    q: "Which level should my child start at?",
    a: "Level 1 every time. The sequence protects you from hidden gaps pretending to be speed.",
  },
  {
    q: "How much time does this take each day?",
    a: "Default is one fresh lesson daily. Bump to two when it feels sensible. Roughly 25 minutes on core nights, lighter on review nights. Consistency beats marathon nights.",
  },
  {
    q: "Is an internet connection required?",
    a: "You need wifi or data to install and stream lessons while your child listens and watches clips.",
  },
  {
    q: "What happens after the 4 free lessons?",
    a: "You can unlock Level 1 for $59, six months included, replay all you want, one upfront payment with no autopay creep.",
  },
  {
    q: "Is this just another educational app with games and badges?",
    a: "No streak games, no token economy. Plain structured literacy that respects your child's attention.",
  },
  {
    q: "My child is 7, 8, or 9 years old. Is it too late?",
    a: "Not even close. Big kids routinely sprint once decoding finally snaps into order.",
  },
  {
    q: "How long does the full program take?",
    a: "With one lesson on most weekdays, assume about twelve to eighteen months gate to gate. Faster is fine, slower is fine too.",
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
                Ages 3 to 10 · Science of Reading
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-apty-dark leading-tight mb-6">
                From &quot;I Am Learning Letters&quot; to &quot;I Am a Reader!&quot;
              </h1>
              <div className="text-lg text-apty-dark mb-4 space-y-2">
                <p>Your child isn&apos;t behind.</p>
                <p>They just need the right reading sequence.</p>
              </div>
              <p className="text-sm text-apty-gray mb-6">
                Science of Reading structure in one app. Sound first. Four levels, 243 connected lessons.
              </p>

              <div className="flex flex-col gap-2 mb-4">
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
                  className="text-sm font-semibold text-apty-coral text-center sm:text-left hover:underline"
                >
                  See how the path works
                </a>
                <p className="text-xs text-apty-gray text-center sm:text-left">No registration needed for 4 free lessons.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-2 text-sm text-apty-gray mb-5">
                <p>✓ 3,500+ downloads worldwide</p>
                <p>✓ Four free lessons, no signup</p>
                <p>✓ Built on Science of Reading structure</p>
                <p>✓ No ads. No subscription pressure.</p>
              </div>

              <div className="mb-6 flex items-center gap-3">
                <AppStoreBadge />
                <GooglePlayBadge />
              </div>

              <div className="rounded-xl border border-apty-coral-accent bg-gradient-to-b from-white to-apty-warm/80 p-5 md:p-6 shadow-sm">
                <p className="text-xs font-semibold tracking-wider text-apty-gray uppercase mb-3">Why start tonight</p>
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
                    <span className="font-semibold">Nationwide NAEP snapshots still show two out of three fourth graders missing proficient reading benchmarks.</span>{" "}
                    Most gaps traced back to kindergarten through second grade pacing. Fixing decoding now hurts less than
                    waiting for middle school. Give us four low-stress previews and judge with your eyes.
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
                  <li>• My child knows letters but cannot sound out words yet</li>
                  <li>• School says on track but homework still hurts every night</li>
                  <li>• We memorized sight words instead of building decoding</li>
                  <li>• Other apps felt random and fizzled</li>
                  <li>• I want Science of Reading alignment with a clear path</li>
                </ul>
                <p className="text-apty-gray mt-5">
                  If that list stings, download the preview. Four lessons show whether the tone fits your family before a
                  dollar moves.
                </p>
              </div>
            </div>
          </div>
        </section>

        <LandingVideo />

        <AppShowcase shotOrder={LANDING_APP_SHOWCASE_ORDER} />

        <section id="how-it-works" className="py-16 md:py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-3 text-center">
              Four ordered levels inside one app.
            </h2>
            <p className="text-lg text-apty-gray text-center mb-10 max-w-3xl mx-auto">
              Nobody leapfrogs. Two hundred forty-three lessons connect like domino tiles so pacing stays humane and predictable.
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
                      {item.next ? <p className="text-sm text-apty-coral font-semibold">{item.next}</p> : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-5">
              <p className="font-semibold text-apty-dark">
                Everyone begins at Level 1: &quot;I am Learning Letters&quot;.
              </p>
              <p className="text-apty-gray">
                You cannot skip ahead to Levels 2, 3, or 4 midstream. Locked order protects every skill block underneath.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-apty-dark mb-6 text-center">Private tutoring or this app?</h2>
            <div className="overflow-x-auto bg-apty-warm border border-apty-coral-accent rounded-xl">
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr className="border-b border-apty-coral-accent text-apty-dark">
                    <th className="px-4 py-3 text-left">What parents compare</th>
                    <th className="px-4 py-3 text-left min-w-[10rem]">AptyRead app</th>
                    <th className="px-4 py-3 text-left">Private tutoring</th>
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
                    <td className="px-4 py-3 align-top">Clear level milestones</td>
                    <td className="px-4 py-3 align-top">Varies by tutor</td>
                  </tr>
                  <tr className="border-b border-apty-coral-accent/60">
                    <td className="px-4 py-3 align-top">Schedule</td>
                    <td className="px-4 py-3 align-top">Open calendar, pajamas okay</td>
                    <td className="px-4 py-3 align-top">Weekly fixed slots</td>
                  </tr>
                  <tr className="border-b border-apty-coral-accent/60">
                    <td className="px-4 py-3 align-top">Revision</td>
                    <td className="px-4 py-3 align-top">Unlimited replays inside the window</td>
                    <td className="px-4 py-3 align-top">Often rebilled hourly</td>
                  </tr>
                  <tr className="border-b border-apty-coral-accent/60">
                    <td className="px-4 py-3 align-top">Distractions</td>
                    <td className="px-4 py-3 align-top">Pure lesson flow without ads</td>
                    <td className="px-4 py-3 align-top">Depends on tutor environment</td>
                  </tr>
                  <tr className="border-b border-apty-coral-accent/60">
                    <td className="px-4 py-3 align-top">Try before you pay</td>
                    <td className="px-4 py-3 align-top">Four free lessons, zero signup friction</td>
                    <td className="px-4 py-3 align-top">Almost always billed from day one</td>
                  </tr>
                  <tr className="border-b border-apty-coral-accent/60 bg-teal-50/90 text-apty-dark">
                    <td className="px-4 py-3 align-top font-medium">Structured learning hours</td>
                    <td className="px-4 py-3 align-top">20+ hours curated for Level 1 alone</td>
                    <td className="px-4 py-3 align-top">Depends how many hours you purchase</td>
                  </tr>
                  <tr className="bg-teal-50/90 text-apty-dark">
                    <td className="px-4 py-3 align-top font-medium">Cost for similar time</td>
                    <td className="px-4 py-3 align-top">
                      <span className="block sm:inline">$59 for Level 1.</span>{" "}
                      <span className="block sm:inline">Replay anytime inside six rolling months.</span>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span className="block sm:inline">Roughly $40 to $75 per hour,</span>{" "}
                      <span className="block sm:inline">meaning $800 to $1,500+ for stacks of tutoring blocks.</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-apty-gray mt-4">
              Level 1 covers 46 lessons and about twenty deliberate hours inside the coursework.
            </p>

            <div className="mt-8 rounded-xl border-2 border-apty-coral/30 bg-gradient-to-b from-apty-warm/90 to-white p-6 shadow-sm">
              <p className="text-base font-semibold text-apty-dark mb-3">Transparent US pricing</p>
              <p className="text-base text-apty-dark leading-relaxed">
                Four lessons stay fully free without creating an account. When you are convinced, unlock Level 1 for six
                months at $59, one upfront charge, cancel nothing later because subscriptions do not exist here.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-apty-dark mb-3 text-center">Why parents pick AptyRead</h2>
            <p className="text-apty-gray text-center mb-8 max-w-3xl mx-auto">
              Structured literacy that matches reading science. The same ideas repeat across every level.
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Built on the Science of Reading</h3>
                <p className="text-apty-gray">
                  Structured synthetic phonics in a fixed order, the approach literacy research keeps pointing to across US
                  classrooms.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">English immersion inside each lesson</h3>
                <p className="text-apty-gray">Children stay in English while they practice reading, instead of juggling translation habits.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Useful sounds first</h3>
                <p className="text-apty-gray">
                  Kids learn early sounds that unlock real words before marching through the whole alphabet in order.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Sound, then letter</h3>
                <p className="text-apty-gray">Each step begins with what you hear, then maps to the letter. That is how decoding settles in.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Clear English models</h3>
                <p className="text-apty-gray">
                  Audio stays steady and understandable so classroom reading aloud and nightly practice feel aligned.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Letter formation that sticks</h3>
                <p className="text-apty-gray">Kids see where each stroke begins so handwriting does not need to be rebuilt later.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">One course, not random games</h3>
                <p className="text-apty-gray">
                  One path from first sounds to chapter books, not unrelated mini-games with no storyline.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Screen time with guardrails</h3>
                <p className="text-apty-gray">
                  Expect one paced lesson nightly, with permission to gently raise to two when your household is ready.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent md:col-span-2">
                <h3 className="font-semibold text-apty-dark mb-2">Confidence from knowing what comes next</h3>
                <p className="text-apty-gray">Families stop guessing nightly homework rituals because lesson order stays visible.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-apty-dark mb-8 text-center">Questions parents ask before they download</h2>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tonight can be the first free lesson.</h2>
            <p className="text-white/95 text-lg mb-4">
              Install on iPhone, iPad, or Android. Complete four starter lessons without an account or a card on file.
            </p>
            <p className="text-white/95 text-base mb-8">
              Want more? Unlock Level 1 for six months at $59, one payment, no subscription or auto-renew.
            </p>
            <PlayStoreLink
              platform="auto"
              className="inline-block bg-white text-apty-coral px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:opacity-90"
            >
              Get AptyRead for free
            </PlayStoreLink>
            <div className="mt-5 flex items-center justify-center gap-3">
              <AppStoreBadge />
              <GooglePlayBadge />
            </div>
            <div className="mt-7 grid sm:grid-cols-2 gap-3 text-left text-white/95 text-sm max-w-3xl mx-auto">
              <p>✓ Four free lessons, zero forms</p>
              <p>✓ $59 Level 1, no autopay tricks</p>
              <p>✓ Six months of access included</p>
              <p>✓ Decide on Level 2 after Level 1 is done</p>
            </div>
          </div>
        </section>
      </main>
      <MinimalFooter />
    </div>
  );
}
