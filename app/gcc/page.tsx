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
  title: "AptyRead | School-Ready English Reading | GCC | Try Free",
  description:
    "Is your child school ready? English reading from Day 1 — structured phonics for ages 3 to 10 in the AptyRead app. Science of Reading. Sound first. Try four lessons free, no registration.",
  keywords:
    "AptyRead English Literacy Program, GCC reading app, phonics course, learn to read, children literacy, UAE, Saudi, Qatar, Kuwait, Bahrain, Oman",
  alternates: {
    canonical: "https://www.aptyread.ai/gcc",
  },
  openGraph: {
    title: "AptyRead | School-Ready English Reading | GCC | Try Free",
    description:
      "School-ready English reading for ages 3 to 10. Science of Reading, sound first. Try four lessons free on iPhone, iPad, and Android. Level 1 pricing in AED, SAR, or QAR at checkout.",
    url: "https://www.aptyread.ai/gcc",
    siteName: "AptyRead",
    type: "website",
    locale: "en_AE",
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
    title: "AptyRead | School-Ready Reading | GCC | Try Free",
    description:
      "English reading the #1 skill from Day 1. Four levels, 243 lessons. Try four free lessons. GCC-friendly pricing at checkout.",
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
    q: "My child's home language isn't English. Will this work?",
    a: "Yes. AptyRead is made for multilingual homes. Lessons move from sounds to words to connected reading, all in English, right inside the app. No flipping between languages.",
  },
  {
    q: "My child already has a tutor. Why are they still struggling?",
    a: "Many tutors chase homework and tests. Reading needs a steady base first. Here you follow one phonics path you can practise any day, at home.",
  },
  {
    q: "Which level should my child start at?",
    a: "Level 1, always. The path is sequenced so nothing important gets skipped.",
  },
  {
    q: "How much time should we spend daily?",
    a: "One new lesson per day is the default. You may move up to two when it feels right. Main lessons land near 25 minutes, reviews near 10. Small daily reps beat marathon sessions.",
  },
  {
    q: "Can parents and children use this without much tech knowledge?",
    a: "Yes. Download from the App Store or Google Play, open a lesson, and tap through. Listen, tap, repeat. No tricky setup.",
  },
  {
    q: "Is an internet connection required?",
    a: "You need internet to install the app and load lessons. Wifi or mobile data that stays steady while you learn works best.",
  },
  {
    q: "What happens after the 4 free lessons?",
    a: "If you want to continue, unlock Level 1 for six months, one flat payment per level, no subscription. In the UAE, Saudi Arabia, and Qatar you usually see about AED 299, SAR 299, or QAR 299 listed. Checkout always shows the exact price for your currency in the App Store or on Google Play.",
  },
  {
    q: "Is this just another app with games and distractions?",
    a: "No. It is a literacy course inside an app: one ordered path, clear steps, zero ads.",
  },
  {
    q: "My child is 8 or 9 years old. Is it too late?",
    a: "Not at all. Many older kids move fast once decoding finally clicks.",
  },
  {
    q: "How long does the full program take?",
    a: "With one lesson most days, many families finish in about twelve to eighteen months. Your child's pace matters more than anyone else's timetable.",
  },
];

export default function GccLandingPage() {
  return (
    <div className="min-h-screen bg-apty-warm">
      <MinimalHeader />
      <main>
        <section className="bg-white py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="inline-block text-sm font-semibold text-apty-coral bg-apty-warm px-4 py-2 rounded-full border border-apty-coral-accent mb-4">
                For children ages 3 to 10
              </p>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
                <span className="text-apty-dark">Is Your Child </span>
                <span className="text-apty-coral">School Ready?</span>
              </h1>
              <div className="text-lg md:text-xl font-semibold text-apty-dark mb-4 space-y-2 leading-snug">
                <p>English reading is the #1 skill schools expect from Day 1.</p>
                <p className="text-base md:text-lg font-semibold text-apty-dark">
                  Build the right foundation — before school starts or right now.
                </p>
              </div>
              <div className="text-lg text-apty-dark mb-5 space-y-3 leading-relaxed">
                <p>
                  Your child isn&apos;t behind. They just haven&apos;t been taught{" "}
                  <span className="font-semibold">the right way</span> yet.
                </p>
                <p>
                  <span className="font-semibold text-apty-dark">AptyRead Literacy Program</span> teaches ages 3 to 10 with{" "}
                  <span className="font-semibold">Science of Reading</span> structure.{" "}
                  <span className="text-apty-coral font-semibold">Sound first. Not A for Apple.</span>
                </p>
              </div>

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
                  See how the path works ↓
                </a>
              </div>

              <div className="grid sm:grid-cols-2 gap-2 text-sm text-apty-gray mb-5">
                <p>✓ 3,500+ downloads worldwide</p>
                <p>✓ Used by expat families across UAE, Saudi &amp; Qatar</p>
                <p>✓ Works alongside CBSE, British, and IB schools</p>
                <p>✓ No ads, no subscription pressure</p>
              </div>

              <div className="mb-6 flex items-center gap-3">
                <AppStoreBadge />
                <GooglePlayBadge />
              </div>

              <div className="rounded-xl border border-apty-coral-accent bg-gradient-to-b from-white to-apty-warm/80 p-5 md:p-6 shadow-sm">
                <p className="text-xs font-semibold tracking-wider text-apty-gray uppercase mb-3">Why start now</p>
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
                    <span className="font-semibold">Roots form early.</span> Missing strong phonics now often shows up
                    later when school reading loads jump. Twenty minutes once a day, most days, is enough to steer things
                    the right direction. Start with four free lessons tonight.
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
                  <li>• Their school is English-medium but reading at home is still a struggle</li>
                  <li>• Tutoring has not fixed the foundation</li>
                  <li>• I do not know where to start</li>
                </ul>
                <p className="text-apty-gray mt-5">
                  If anything here sounds familiar, pause the guilt. Tap download, finish the preview week, see if faces
                  light up during practice.
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
              Four levels you do in order.
            </h2>
            <p className="text-lg text-apty-gray text-center mb-10 max-w-3xl mx-auto">
              Same path for every child so foundations stay intact. Two hundred forty-three lessons feels big until you see
              that each lesson builds quietly on the one before it. Nobody skips ahead.
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
                You cannot skip to Level 2, 3, or 4. The sequence keeps skills honest instead of flashy shortcuts.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-apty-dark mb-6 text-center">Tutor or the AptyRead app?</h2>
            <div className="overflow-x-auto bg-apty-warm border border-apty-coral-accent rounded-xl">
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr className="border-b border-apty-coral-accent text-apty-dark">
                    <th className="px-4 py-3 text-left">What Parents Compare</th>
                    <th className="px-4 py-3 text-left min-w-[10rem]">AptyRead app</th>
                    <th className="px-4 py-3 text-left">Private English Tutor</th>
                  </tr>
                </thead>
                <tbody className="text-apty-gray">
                  <tr className="border-b border-apty-coral-accent/60">
                    <td className="px-4 py-3 align-top">Foundation approach</td>
                    <td className="px-4 py-3 align-top">Sound-first, structured sequence</td>
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
                    <td className="px-4 py-3 align-top">Fixed session slots</td>
                  </tr>
                  <tr className="border-b border-apty-coral-accent/60">
                    <td className="px-4 py-3 align-top">Revision</td>
                    <td className="px-4 py-3 align-top">Unlimited inside validity</td>
                    <td className="px-4 py-3 align-top">Usually paid again</td>
                  </tr>
                  <tr className="border-b border-apty-coral-accent/60">
                    <td className="px-4 py-3 align-top">Distractions</td>
                    <td className="px-4 py-3 align-top">No ads, focused flow</td>
                    <td className="px-4 py-3 align-top">Often interrupted by notifications</td>
                  </tr>
                  <tr className="border-b border-apty-coral-accent/60">
                    <td className="px-4 py-3 align-top">Try before you pay</td>
                    <td className="px-4 py-3 align-top">Four free lessons, no signup</td>
                    <td className="px-4 py-3 align-top">Usually a paid trial session</td>
                  </tr>
                  <tr className="border-b border-apty-coral-accent/60 bg-teal-50/90 text-apty-dark">
                    <td className="px-4 py-3 align-top font-medium">Total learning time</td>
                    <td className="px-4 py-3 align-top">20+ hours of structured lessons</td>
                    <td className="px-4 py-3 align-top">Depends on sessions booked</td>
                  </tr>
                  <tr className="bg-teal-50/90 text-apty-dark">
                    <td className="px-4 py-3 align-top font-medium">Cost for that time</td>
                    <td className="px-4 py-3 align-top">
                      <span className="block sm:inline">AED, SAR, or QAR 299 for Level 1 (UAE, Saudi, Qatar).</span>{" "}
                      <span className="block sm:inline">Replay anytime, six months access.</span>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span className="block sm:inline">Often AED 50 to 80 per hour,</span>{" "}
                      <span className="block sm:inline">roughly AED 1,000 to 1,600+ for similar hours.</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-apty-gray mt-4">
              Level 1 contains 46 lessons (about twenty hours of guided work). Your App Store or Google Play receipt
              shows the exact amount in your currency at checkout.
            </p>

            <div className="mt-8 rounded-xl border-2 border-apty-coral/30 bg-gradient-to-b from-apty-warm/90 to-white p-6 shadow-sm">
              <p className="text-base font-semibold text-apty-dark mb-3">Simple GCC pricing</p>
              <p className="text-base text-apty-dark leading-relaxed">
                Four lessons are completely free, no registration. If you love it, Level 1 is AED 299 in the UAE, SAR 299
                in Saudi Arabia, QAR 299 in Qatar. No subscription.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-apty-dark mb-3 text-center">Why parents pick AptyRead</h2>
            <p className="text-apty-gray text-center mb-8 max-w-3xl mx-auto">
              Calm structure over loud gamification. Every point below shows up in all four levels.
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">English immersion inside each lesson</h3>
                <p className="text-apty-gray">Children stay in English while they practise reading, instead of juggling translation habits.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Useful sounds first</h3>
                <p className="text-apty-gray">We teach the early sounds that unlock real words before marching through the whole alphabet in order.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Sound, then letter</h3>
                <p className="text-apty-gray">Each step begins with what you hear, then maps to the symbol. That is how brains learn to decode.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Clear international English models</h3>
                <p className="text-apty-gray">Audio stays calm and consistent so school reading, exams, and read-aloud time feel less scary.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Letter formation that sticks</h3>
                <p className="text-apty-gray">Every stroke has a starting point. No mystery loops that need fixing later.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">One course, not random games</h3>
                <p className="text-apty-gray">You follow a single thread from first sounds to published chapter books. No sticker charts that hide missing skills.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Screen time with guardrails</h3>
                <p className="text-apty-gray">Default plan is one fresh lesson per day. You may move to two when it feels healthy. That keeps eyes and memory happier.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-apty-coral-accent">
                <h3 className="font-semibold text-apty-dark mb-2">Confidence from knowing what comes next</h3>
                <p className="text-apty-gray">Because the path is fixed, children stop guessing what parents expect each evening.</p>
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
              Tap below, install AptyRead, let your child try four lessons without creating an account. Phones and tablets
              from the App Store and Google Play both work across the Gulf.
            </p>
            <p className="text-white/95 text-base mb-8">
              Loving it? Unlock Level 1 for six months (about <span className="whitespace-nowrap">AED 299</span> in the
              UAE, <span className="whitespace-nowrap">SAR 299</span> in Saudi Arabia, or{" "}
              <span className="whitespace-nowrap">QAR 299</span> in Qatar). Checkout shows the real price in your wallet
              currency.
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
              <p>✓ About AED 299 UAE, SAR 299 Saudi, QAR 299 Qatar, no renewal trap</p>
              <p>✓ Six calm months on each level</p>
              <p>✓ Finish Level 1 before you think about Level 2</p>
              <p>✓ Apple and Google charge you in the currency your account already uses</p>
            </div>
          </div>
        </section>
      </main>
      <MinimalFooter />
    </div>
  );
}
