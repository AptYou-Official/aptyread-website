import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

const CLASSROOM_URL = "https://classroom.aptyread.ai";
const CLASSROOM_LOGIN_URL = "https://classroom.aptyread.ai/#/login";

export const metadata: Metadata = {
  title: "AptyRead Classroom for Schools",
  description:
    "English reading, taught together. One teacher. One classroom screen. Five levels. No student accounts. No special hardware. First sound group free.",
  alternates: {
    canonical: "https://www.aptyread.ai/schools",
  },
  openGraph: {
    title: "AptyRead Classroom for Schools",
    description:
      "Teacher-led English reading on a digital board, laptop, or projector. Five levels. First sound group free.",
    url: "https://www.aptyread.ai/schools",
    siteName: "AptyRead",
    type: "website",
  },
};

const levels = [
  {
    number: "1",
    name: "I Am Learning Letters",
    body: "Sound, letter, and letter name. How to say them. How to write them.",
  },
  {
    number: "2",
    name: "I Can Read!",
    body: "First words. Common words. Short stories.",
  },
  {
    number: "3",
    name: "I Can Read Big Words!",
    body: "Silent e, letter pairs, and vowel teams. Longer words.",
  },
  {
    number: "4",
    name: "I Am Reading!",
    body: "Paragraphs. New words. Reading with understanding.",
  },
  {
    number: "5",
    name: "I Am a Reader!",
    body: "Three books, cover to cover. The class reads them together on the board.",
  },
];

const lessonSteps = [
  {
    title: "Watch",
    body: "Video shows the sound. A real mouth. The whole class watches together.",
  },
  {
    title: "Say it",
    body: "The teacher models. The class repeats out loud.",
  },
  {
    title: "Try it",
    body: "A child can come to the board. The rest of the class stays with the lesson.",
  },
  {
    title: "Write",
    body: "Letter formation on screen. Children write on paper. The teacher checks.",
  },
];

export default function SchoolsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header schoolsPage />

      <main>
        <section className="px-4 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="container mx-auto max-w-3xl">
            <p className="text-sm font-semibold tracking-wide text-apty-coral mb-5">
              AptyRead Classroom
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-apty-dark leading-[1.08] tracking-tight mb-6">
              English reading.
              <br />
              Taught together.
            </h1>
            <p className="text-lg md:text-xl text-apty-gray leading-relaxed max-w-xl mb-10">
              One teacher. One screen already in the room. Teachers do not need
              to be phonics experts.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <a
                href={CLASSROOM_URL}
                className="inline-flex items-center justify-center rounded-xl bg-apty-coral px-6 py-3.5 text-base font-semibold text-white hover:bg-[#e95624] transition-colors"
              >
                Start free in Classroom
              </a>
              <a
                href={CLASSROOM_LOGIN_URL}
                className="font-semibold text-apty-dark hover:text-apty-coral transition-colors"
              >
                School login
              </a>
            </div>
            <p className="text-sm text-apty-gray">
              No tablets. No student accounts. No special hardware.
            </p>
          </div>
        </section>

        <section className="px-4 pb-20 md:pb-28">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-center justify-center gap-3 md:gap-4 py-10 border-y border-apty-border">
              {["s", "a", "t"].map((letter, index) => (
                <span
                  key={letter}
                  className={`flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl text-3xl md:text-4xl font-bold ${
                    index === 0
                      ? "bg-apty-coral text-white"
                      : "border border-apty-border text-apty-dark"
                  }`}
                >
                  {letter}
                </span>
              ))}
            </div>
            <p className="mt-6 text-center text-apty-gray">
              First sound group is free. Then buy a level when it works for
              your class.
            </p>
          </div>
        </section>

        <section className="px-4 pb-20 md:pb-28">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-3">
              A lesson on your board
            </h2>
            <p className="text-lg text-apty-gray mb-10 leading-relaxed">
              Open Classroom on a digital board, laptop, or projector. The
              teacher signs in. The class works as one.
            </p>
            <ol className="space-y-8">
              {lessonSteps.map((step, index) => (
                <li key={step.title} className="flex gap-5">
                  <span className="text-apty-coral font-semibold w-6 shrink-0 pt-0.5">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-apty-dark text-lg">
                      {step.title}
                    </p>
                    <p className="mt-1 text-apty-gray leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-4 pb-20 md:pb-28">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-3">
              Five levels. One path.
            </h2>
            <p className="text-lg text-apty-gray mb-10 leading-relaxed">
              Every class starts at Level 1. No skipping. Each level builds on
              the last.
            </p>
            <ol className="space-y-8">
              {levels.map((level) => (
                <li key={level.number} className="flex gap-5">
                  <span className="text-apty-coral font-semibold w-6 shrink-0 pt-0.5">
                    {level.number}
                  </span>
                  <div>
                    <p className="font-semibold text-apty-dark text-lg">
                      {level.name}
                    </p>
                    <p className="mt-1 text-apty-gray leading-relaxed">
                      {level.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-4 pb-20 md:pb-28">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-4">
              Your teachers can start tomorrow
            </h2>
            <div className="space-y-4 text-lg text-apty-gray leading-relaxed">
              <p>
                The lesson shows what to say, what to model, and what to watch
                for. The phonics sits in the sequence, not in a training course.
              </p>
              <p>
                Progress is on the classroom login. Parallel sections use their
                own logins. Children do not need devices.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 md:pb-28">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-8">
              Access
            </h2>
            <ul className="space-y-4 text-lg text-apty-dark leading-relaxed">
              <li>First sound group free: S, A, T.</li>
              <li>One classroom. The whole class. No student accounts.</li>
              <li>Buy a level in Classroom. The price is shown before you pay.</li>
              <li>One level per classroom license. Valid one year from activation.</li>
            </ul>
          </div>
        </section>

        <section className="bg-apty-coral py-16 md:py-20 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Every child reads.
              <br />
              Every teacher succeeds.
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Open Classroom. Start with S, A, T.
            </p>
            <a
              href={CLASSROOM_URL}
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-apty-coral hover:opacity-90 transition-opacity"
            >
              Start free in Classroom
            </a>
          </div>
        </section>
      </main>

      <Footer schoolsPage />
    </div>
  );
}
