import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

const CLASSROOM_URL = "https://classroom.aptyread.ai";
const CLASSROOM_LOGIN_URL = "https://classroom.aptyread.ai/#/login";

export const metadata: Metadata = {
  title: "AptyRead Classroom for Schools",
  description:
    "The same English reading program, taught together. One teacher. One screen. Five levels. No student accounts. No speech scoring.",
  alternates: {
    canonical: "https://www.aptyread.ai/schools",
  },
  openGraph: {
    title: "AptyRead Classroom for Schools",
    description:
      "Teacher-led English reading on a digital board, laptop, or projector. Five levels. One path. First sound group free.",
    url: "https://www.aptyread.ai/schools",
    siteName: "AptyRead",
    type: "website",
  },
};

const levels = [
  {
    number: "1",
    name: "I Am Learning Letters",
    body: "Every letter sound, before any word.",
  },
  {
    number: "2",
    name: "I Can Read!",
    body: "First words. First sentences. First stories.",
  },
  {
    number: "3",
    name: "I Can Read Big Words!",
    body: "Letter teams. Blends. Short passages.",
  },
  {
    number: "4",
    name: "I Am Reading!",
    body: "Paragraphs that get smoother.",
  },
  {
    number: "5",
    name: "I Am a Reader!",
    body: "Three books, cover to cover. In class, you read them together on the board.",
  },
];

export default function SchoolsPage() {
  return (
    <div className="min-h-screen bg-apty-warm">
      <Header schoolsPage />

      <main>
        <article className="px-4 py-14 md:py-20">
          <div className="container mx-auto max-w-3xl">
            <p className="text-sm font-semibold tracking-wide text-apty-coral mb-4">
              AptyRead Classroom
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-apty-dark mb-4 leading-tight">
              The same program. Taught together.
            </h1>
            <p className="text-lg md:text-xl text-apty-gray mb-8 leading-relaxed">
              English reading for children. Five levels. One path. The teacher
              leads from a digital board, laptop, or projector. Children do not
              need accounts or tablets.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <a
                href={CLASSROOM_URL}
                className="inline-flex items-center justify-center rounded-xl bg-apty-coral px-6 py-3.5 text-base font-semibold text-white hover:bg-[#e95624] transition-colors"
              >
                Start in Classroom
              </a>
              <a
                href={CLASSROOM_LOGIN_URL}
                className="font-semibold text-apty-dark hover:text-apty-coral transition-colors"
              >
                School login
              </a>
            </div>
            <p className="text-sm text-apty-gray mb-14">
              First sound group is free: S, A, T.
            </p>

            <section className="mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-4">
                How a lesson runs
              </h2>
              <div className="space-y-4 text-base md:text-lg text-apty-dark leading-relaxed">
                <p>
                  The class watches the sound on screen. The teacher models it.
                  The class says it together, out loud. A child can come to the
                  board. Then they write.
                </p>
                <p>
                  The home app can listen when a child practises a word.
                  Classroom does not. There is no speech scoring. The class
                  speaks with the teacher.
                </p>
              </div>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-3">
                Five levels. One path.
              </h2>
              <p className="text-apty-gray mb-8 leading-relaxed">
                Same sequence as the home app. No skipping. Lessons that need a
                microphone are left out of Classroom.
              </p>
              <ol className="space-y-6">
                {levels.map((level) => (
                  <li key={level.number} className="flex gap-4">
                    <span className="text-apty-coral font-bold w-6 shrink-0">
                      {level.number}
                    </span>
                    <div>
                      <p className="font-semibold text-apty-dark">
                        {level.name}
                      </p>
                      <p className="text-apty-gray mt-1">{level.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-4">
                For the teacher
              </h2>
              <div className="space-y-4 text-base md:text-lg text-apty-dark leading-relaxed">
                <p>
                  You do not need to be a phonics expert. The lesson shows what
                  to say and what to watch for.
                </p>
                <p>
                  Progress sits on the classroom login. Parallel sections use
                  their own logins. Optional home practice is the AptyRead app.
                  That is a separate product.
                </p>
              </div>
            </section>

            <section className="mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-4">
                Access
              </h2>
              <ul className="space-y-3 text-base md:text-lg text-apty-dark leading-relaxed list-disc pl-5">
                <li>First sound group free: S, A, T.</li>
                <li>One classroom login. No student accounts.</li>
                <li>Buy a level in Classroom. The price is shown before you pay.</li>
                <li>One level per classroom license. Valid one year from activation.</li>
              </ul>
            </section>
          </div>
        </article>

        <section className="bg-apty-coral py-16 md:py-20 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Open Classroom. Start with S, A, T.
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Buy a level when it works for your class.
            </p>
            <a
              href={CLASSROOM_URL}
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-apty-coral hover:opacity-90 transition-opacity"
            >
              Start in Classroom
            </a>
          </div>
        </section>
      </main>

      <Footer schoolsPage />
    </div>
  );
}
