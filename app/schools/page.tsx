import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import BrandWordmark from "@/components/public/BrandWordmark";
import PathJourneyCue from "@/components/public/PathJourneyCue";
import FaqAccordion from "@/components/public/FaqAccordion";
import { PATH_LEVELS } from "@/lib/reading-path";

const CLASSROOM_URL = "https://classroom.aptyread.ai";
const CLASSROOM_LOGIN_URL = "https://classroom.aptyread.ai/#/login";
const PAGE_TITLE = "English Reading & Phonics for Schools | AptyRead Classroom";
const PAGE_DESCRIPTION =
  "Teach English reading and phonics to ages 4 to 10 with guided videos, classroom activities and one shared screen. Try S, A, T and their review free.";
const CLASSROOM_IMAGE = "/images/aptyread-classroom-illustration.png";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "https://www.aptyread.ai/schools",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "https://www.aptyread.ai/schools",
    siteName: "AptyRead",
    type: "website",
    images: [{
      url: `https://www.aptyread.ai${CLASSROOM_IMAGE}`,
      width: 1536,
      height: 1024,
      alt: "AI-generated illustration of an AptyRead lesson on a shared classroom screen, with children writing and a teacher guiding them.",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: `https://www.aptyread.ai${CLASSROOM_IMAGE}`, alt: "Illustration of AptyRead Classroom with a teacher and children practising letter formation." }],
  },
};

const lessonSteps = [
  {
    title: "Watch",
    body: "A video shows how to make the sound, with clear mouth movements.",
  },
  {
    title: "Say",
    body: "Children practise the sound. The teacher listens and guides.",
  },
  {
    title: "Try",
    body: "An activity follows each video. The teacher guides participation.",
  },
  {
    title: "Write",
    body: "Children follow the letter demonstration on paper. The teacher checks their writing.",
  },
];

const schoolNeeds = [
  "A digital board, or a computer with a screen or projector",
  "An internet connection for streaming lessons",
  "Sound that the whole class can hear",
  "Paper and pencils for writing practice",
];

const schoolFaqs = [
  {
    question: "Who is AptyRead Classroom for?",
    answer: "Schools teaching foundational English literacy to children aged 4 to 10. The program takes children from letter sounds towards independent reading and can support classrooms where English is an additional language.",
  },
  {
    question: "Does the teacher need specialist phonics training?",
    answer: "Videos model sounds, mouth movements, and letter formation step by step. The teacher guides participation, listens to pronunciation, and checks writing, with a clear instructional model to follow.",
  },
  {
    question: "Does Classroom check each child's pronunciation automatically?",
    answer: "The teacher checks pronunciation by listening to children as they practise. Classroom does not use automated speech checking. For writing, children follow the on-screen demonstration on paper, and the teacher checks their work.",
  },
  {
    question: "What can we try for free?",
    answer: "The S, A, and T lessons and their group review are free. Try the teaching videos and accompanying activities with your class before deciding whether to purchase Level 1.",
  },
  {
    question: "Do children need devices or individual accounts?",
    answer: "No. The teacher uses a classroom login and leads the activities on a shared screen. Children participate together and use paper and pencils for writing. An internet connection is needed to stream the lessons.",
  },
  {
    question: "How does access work for multiple classrooms?",
    answer: "A licence covers one level for one classroom for one year from activation. Parallel sections use their own classroom logins. You can purchase online in Classroom after trying the free lessons. The price is shown before you pay.",
  },
];

const schoolLevelBodies: Record<number, string> = {
  1: "Letter recognition, sounds, mouth movements, and letter formation. Group reviews and final challenges bring the practice together.",
  2: "First words, common words, short stories. The class reads them aloud.",
  3: "Longer words: letter teams, blends, silent e. Bigger words on the board.",
  4: "Paragraphs. New words. Reading with understanding, not just sounding out.",
  5: "Three books. The class reads them together on the board.",
};

export default function SchoolsPage() {
  return (
    <div className="min-h-screen bg-apty-cream">
      <Header schoolsPage />

      <main>
        {/* 1. Hero */}
        <section className="px-4 py-14 md:py-20 lg:py-24">
          <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="mb-4">
                <BrandWordmark size="sm" className="tracking-wide font-semibold" />
                <span className="text-sm font-semibold text-apty-gray"> Classroom</span>
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-apty-dark leading-[1.12] tracking-tight mb-5">
                Children who can read English.
                <br />
                And say the words clearly.
              </h1>
              <p className="text-lg md:text-xl text-apty-dark font-semibold leading-relaxed mb-4 max-w-xl">
                Build foundational English reading skills across the whole
                class. One teacher and one screen.
              </p>
              <p className="text-base md:text-lg text-apty-gray leading-relaxed mb-8 max-w-xl">
                For ages 4 to 10. Videos teach step by step. Children practise
                with their teacher&apos;s guidance.
              </p>
              <a
                href={CLASSROOM_URL}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl apty-primary-button px-6 py-3.5 text-base font-semibold text-white transition-colors"
              >
                Start a free classroom
              </a>
              <p className="mt-4 text-sm font-semibold text-apty-dark">
                Try S, A, T and their review activities free.
              </p>
              <p className="mt-4">
                <a
                  href={CLASSROOM_LOGIN_URL}
                  className="text-sm font-semibold text-apty-dark hover:text-apty-cyan transition-colors"
                >
                  School login →
                </a>
              </p>
            </div>

            <figure className="min-w-0">
              <Image
                src={CLASSROOM_IMAGE}
                alt="Illustration of children practising letter A on paper while a teacher checks their writing and an AptyRead lesson plays on a shared classroom screen."
                width={1536}
                height={1024}
                sizes="(min-width: 1280px) 544px, (min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full rounded-3xl shadow-sm"
                priority
              />
              <figcaption className="mt-4 text-center">
                <p className="font-semibold text-apty-dark">
                  Watch together. Write on paper. Teacher checks.
                </p>
                <p className="mt-1 text-xs text-apty-gray">
                  AI-generated classroom illustration.
                </p>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 3. How one lesson works — visual sequence */}
        <section className="relative overflow-hidden bg-apty-cream px-4 py-16 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-apty-cream via-apty-sky/70 to-apty-cream"
            aria-hidden="true"
          />
          <div className="container relative mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-apty-dark mb-3 tracking-tight">
              How one lesson works
            </h2>
            <p className="text-lg text-apty-gray max-w-2xl mb-12 leading-relaxed">
              Videos demonstrate sounds and letter formation step by step.
              Activities turn each demonstration into practice, with the
              teacher checking pronunciation and writing.
            </p>

            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
              {lessonSteps.map((step) => (
                <li key={step.title} className="relative flex lg:block">
                  <div className="relative z-10 w-full text-center sm:text-left lg:text-center">
                    <p className="text-sm font-bold tracking-widest text-apty-dark mb-3 uppercase">
                      {step.title}
                    </p>
                    <p className="text-base md:text-lg text-apty-dark leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5. Five levels — shared journey cue */}
        <section className="relative overflow-hidden bg-apty-cream px-4 py-16 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-apty-cream via-apty-sky/75 to-apty-cream"
            aria-hidden="true"
          />
          <div className="container relative mx-auto max-w-5xl">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-apty-dark mb-3 tracking-tight">
                Five levels. One path.
              </h2>
              <p className="text-base md:text-lg text-apty-gray max-w-2xl mx-auto leading-relaxed">
                Every class starts at Level 1. Each level builds on the skills
                introduced before it.
              </p>
            </div>

            <PathJourneyCue className="mb-10 md:mb-14" />

            <ol className="max-w-3xl mx-auto space-y-6 md:space-y-7">
              {PATH_LEVELS.map((level) => (
                <li key={level.number} className="flex gap-4 md:gap-5">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-apty-cyan text-xs font-bold text-white shadow-[0_0_0_5px_rgba(230,246,251,0.9)] md:h-10 md:w-10 md:text-sm">
                    {String(level.number).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-lg md:text-xl font-bold text-apty-dark mb-1 tracking-tight">
                      {level.name}
                    </h3>
                    <p className="text-apty-dark/80 leading-relaxed">
                      {schoolLevelBodies[level.number]}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6. What a school needs */}
        <section className="px-4 py-14 md:py-16">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-apty-dark mb-3 tracking-tight">
              What a school needs
            </h2>
            <p className="text-lg text-apty-gray max-w-2xl mb-8 leading-relaxed">
              The teacher signs in with a classroom login. No student devices,
              individual student accounts, or computer lab are needed.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
              {schoolNeeds.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base md:text-lg text-apty-dark"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-apty-cyan"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7. Simple licensing */}
        <section className="relative overflow-hidden bg-apty-cream px-4 py-16 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-apty-cream via-apty-sky/70 to-apty-cream"
            aria-hidden="true"
          />
          <div className="container relative mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-apty-dark mb-3 tracking-tight">
              Simple classroom licensing
            </h2>
            <p className="text-xl md:text-2xl font-semibold text-apty-dark mb-4">
              One classroom. One level. One year.
            </p>
            <p className="text-base md:text-lg text-apty-gray max-w-2xl leading-relaxed">
              Start with the free S, A, T lessons and their review. When
              you&apos;re ready, purchase a level online in Classroom. Access lasts
              one year from activation, and the price is shown before you pay.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 md:py-20" aria-labelledby="schools-faq-heading">
          <div className="container mx-auto max-w-3xl">
            <h2 id="schools-faq-heading" className="text-3xl md:text-4xl font-extrabold text-apty-dark mb-3 tracking-tight">
              Questions from schools
            </h2>
            <p className="text-lg text-apty-gray mb-8 leading-relaxed">
              What to know before you start with your class.
            </p>
            <FaqAccordion items={schoolFaqs} defaultOpen={null} />
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-apty-dark px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Ready to see AptyRead in your classroom?
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Try S, A, T and their review activities free. Purchase a level
              online in Classroom when you&apos;re ready.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
              <a
                href={CLASSROOM_URL}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl apty-primary-button px-8 py-4 text-lg font-semibold text-white transition-colors"
              >
                Start a free classroom
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer schoolsPage />
    </div>
  );
}
