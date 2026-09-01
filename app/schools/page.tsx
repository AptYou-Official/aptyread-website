import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

const CLASSROOM_URL = "https://classroom.aptyread.ai";
const CLASSROOM_LOGIN_URL = "https://classroom.aptyread.ai/#/login";

export const metadata: Metadata = {
  title: "AptyRead Classroom for Schools",
  description:
    "English reading for the classroom. Children learn to read English and say the sounds clearly. One teacher. One screen. Ages 4 to 10. First sound group free.",
  alternates: {
    canonical: "https://www.aptyread.ai/schools",
  },
  openGraph: {
    title: "AptyRead Classroom for Schools",
    description:
      "Children who can read English, and say the words clearly. Taught together on a board, laptop, or projector. Ages 4 to 10.",
    url: "https://www.aptyread.ai/schools",
    siteName: "AptyRead",
    type: "website",
  },
};

const schoolFit = [
  {
    title: "The screen you have",
    body: "A digital board, laptop, or projector. No tablets. No computer lab.",
  },
  {
    title: "The whole class",
    body: "No student accounts. Forty children or four. They work as one.",
  },
  {
    title: "A connection",
    body: "Lessons stream. You need the internet for the class, as you would for a video.",
  },
];

const lessonSteps = [
  {
    title: "Watch",
    body: "Video shows the sound. A real mouth. The whole class watches together.",
  },
  {
    title: "Say it",
    body: "The teacher models. The class repeats out loud. That is how the sound gets clear.",
  },
  {
    title: "Try it",
    body: "A child can come to the board. The rest stay with the lesson.",
  },
  {
    title: "Write",
    body: "Formation on screen. Children write on paper. The teacher checks.",
  },
];

const levels = [
  {
    number: "1",
    name: "Sound Foundations",
    body: "Every letter sound, how to say it, how to write it. Before any word.",
  },
  {
    number: "2",
    name: "First Reading",
    body: "First words, common words, short stories. The class reads them aloud.",
  },
  {
    number: "3",
    name: "Confident Reading",
    body: "Longer words: letter teams, blends, silent e. The class can tackle bigger words on the board.",
  },
  {
    number: "4",
    name: "Building Fluency",
    body: "Paragraphs. New words. Reading with understanding, not just sounding out.",
  },
  {
    number: "5",
    name: "Independent Reading",
    body: "Three books. The class reads them together on the board.",
  },
];

const access = [
  {
    title: "Start free",
    body: "First sound group: S, A, T. See it with one class.",
  },
  {
    title: "One classroom",
    body: "The whole class. One login. No student devices.",
  },
  {
    title: "Buy a level",
    body: "When it works. The price is shown before you pay.",
  },
  {
    title: "One year",
    body: "One level per classroom license, from activation.",
  },
];

export default function SchoolsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header schoolsPage />

      <main>
        <section className="px-4 py-14 md:py-20 lg:py-24">
          <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-apty-coral mb-4">
                AptyRead Classroom
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-apty-dark leading-[1.08] tracking-tight mb-5">
                Children who can read English.
                <br />
                And say the words clearly.
              </h1>
              <p className="text-lg md:text-xl text-apty-gray leading-relaxed mb-4 max-w-lg">
                A reading program for the classroom. Ages 4 to 10. One teacher.
                One screen. The class says the sounds out loud.
              </p>
              <p className="text-lg md:text-xl text-apty-gray leading-relaxed mb-8 max-w-lg">
                That is what parents hear. That is what makes a school stand
                out. Not another spoken-English class. Reading they can hear.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href={CLASSROOM_URL}
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-apty-coral px-6 py-3.5 text-base font-semibold text-white hover:bg-[#e95624] transition-colors"
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
            </div>

            <div className="rounded-3xl bg-[#f5f5f7] px-8 py-10 md:px-12 md:py-14">
              <p className="text-sm text-apty-gray mb-8">
                On the classroom screen
              </p>
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
                {["s", "a", "t"].map((letter, index) => (
                  <span
                    key={letter}
                    className={`flex h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-2xl text-2xl sm:text-4xl md:text-5xl font-bold ${
                      index === 0
                        ? "bg-apty-coral text-white"
                        : "bg-white text-apty-dark"
                    }`}
                  >
                    {letter}
                  </span>
                ))}
              </div>
              <p className="mt-10 text-center font-semibold text-apty-dark">
                One screen. The whole class.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-apty-border px-4 py-12 md:py-16">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-8">
              Will it work in your school?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
              {schoolFit.map((item) => (
                <div key={item.title}>
                  <h3 className="text-lg font-semibold text-apty-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-lg text-apty-gray leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:py-24">
          <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            <h2 className="text-3xl md:text-4xl font-bold text-apty-dark">
              Can your teachers take it?
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-apty-dark mb-2">
                  Any teacher who can run a class
                </h3>
                <p className="text-lg text-apty-gray leading-relaxed">
                  The lesson shows what to say, what to model, and what to watch
                  for. No extra teacher. No course before lesson one.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-apty-dark mb-2">
                  Progress sits on the school login
                </h3>
                <p className="text-lg text-apty-gray leading-relaxed">
                  Parallel sections use their own logins. Children do not need
                  devices.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f5f7] px-4 py-16 md:py-24">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-3">
              One period on your board
            </h2>
            <p className="text-lg text-apty-gray max-w-2xl mb-12 leading-relaxed">
              Open Classroom. The teacher signs in. The class watches, says the
              sound, tries it, and writes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {lessonSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="bg-white rounded-2xl p-6 md:p-7"
                >
                  <p className="text-sm font-semibold text-apty-coral mb-3">
                    {index + 1}
                  </p>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-lg text-apty-gray leading-relaxed">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:py-24">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-3">
              Five levels. One path.
            </h2>
            <p className="text-lg text-apty-gray max-w-2xl mb-12 leading-relaxed">
              Every class starts at Level 1. No skipping.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
              {levels.map((level) => (
                <article
                  key={level.number}
                  className="rounded-2xl border border-apty-border p-5 md:p-6"
                >
                  <p className="text-sm font-semibold text-apty-coral mb-3">
                    {level.number}
                  </p>
                  <h3 className="font-semibold text-apty-dark mb-2 leading-snug">
                    {level.name}
                  </h3>
                  <p className="text-lg lg:text-base text-apty-gray leading-relaxed">
                    {level.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f5f5f7] px-4 py-16 md:py-24">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-3">
              Any classroom with a screen can start
            </h2>
            <p className="text-lg text-apty-gray max-w-2xl mb-12 leading-relaxed">
              No lab. No student devices. See it free. Buy a level when it
              works. The price is on screen before you pay.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {access.map((item) => (
                <div key={item.title}>
                  <h3 className="text-lg font-semibold text-apty-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-lg text-apty-gray leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <a
                href={CLASSROOM_URL}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-apty-coral px-8 py-4 text-lg font-semibold text-white hover:bg-[#e95624] transition-colors"
              >
                Start free in Classroom
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer schoolsPage />
    </div>
  );
}
