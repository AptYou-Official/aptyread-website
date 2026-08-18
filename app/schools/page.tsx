import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

const CLASSROOM_URL = "https://classroom.aptyread.ai";
const CLASSROOM_LOGIN_URL = "https://classroom.aptyread.ai/#/login";

export const metadata: Metadata = {
  title: "AptyRead Classroom for Schools | Structured English Literacy",
  description:
    "Teach structured English literacy from a digital board, classroom laptop, or projector. Try free AptyRead Classroom lessons, then license a level when your school is ready.",
  alternates: {
    canonical: "https://www.aptyread.ai/schools",
  },
  openGraph: {
    title: "AptyRead Classroom for Schools",
    description:
      "Teacher-led, structured English literacy lessons for digital boards, classroom laptops, and projectors.",
    url: "https://www.aptyread.ai/schools",
  },
};

const principles = [
  {
    number: "01",
    title: "Science of Reading",
    body: "Explicit, systematic instruction built around how children learn to decode and understand written English.",
  },
  {
    number: "02",
    title: "SATPIN sequence",
    body: "Children begin with a useful sequence of sounds and letters, so they can start combining them into words early.",
  },
  {
    number: "03",
    title: "Sound before letter",
    body: "Hear the sound. Feel how it is made. See the letter. Then form and write it.",
  },
  {
    number: "04",
    title: "Mastery before progression",
    body: "Lessons follow a clear sequence. Each new skill builds on a secure foundation.",
  },
];

const levels = [
  {
    level: "Level 1",
    label: "School entry point",
    title: "Sounds and letters",
    body: "Letter names and sounds, long vowels, soft C and G, letter recognition, and correct letter formation.",
    active: true,
  },
  {
    level: "Level 2",
    title: "First words and stories",
    body: "Children blend sounds into first words, learn common words, and read short stories.",
  },
  {
    level: "Level 3",
    title: "Stronger decoding",
    body: "Silent e, letter pairs, and vowel teams. Longer words, and reading with understanding.",
  },
  {
    level: "Level 4",
    title: "Fluency and understanding",
    body: "Longer words, new vocabulary, and deeper understanding of what they read.",
  },
];

const classroomSteps = [
  {
    step: "Open",
    title: "The teacher signs in",
    body: "Open AptyRead Classroom on a digital board, classroom laptop, or projector using the school email and password.",
  },
  {
    step: "Teach",
    title: "Lead one clear lesson",
    body: "The teacher guides the whole class through the structured sequence. Children do not need individual accounts.",
  },
  {
    step: "Continue",
    title: "Return to the class pathway",
    body: "Progress belongs to the classroom account. Parallel sections or grades use separate classroom logins.",
  },
];

const lessonFlow = [
  {
    step: "01",
    title: "Watch and listen",
    body: "Video shows the sound. A real mouth. A real sound. The whole class watches together.",
  },
  {
    step: "02",
    title: "Model and repeat",
    body: "The teacher pauses and models the sound. The class repeats together, out loud.",
  },
  {
    step: "03",
    title: "Practice on screen",
    body: "One child at a time comes up to try it. The rest of the class stays part of the lesson.",
  },
  {
    step: "04",
    title: "Write and check",
    body: "Letter formation loops on screen. Children write on paper. The teacher checks.",
  },
];

const teacherPoints = [
  {
    title: "No prior training needed",
    body: "Every lesson guides the teacher on screen: what to say, model, and watch for.",
  },
  {
    title: "The programme carries the expertise",
    body: "The phonics knowledge lives in the lesson, not in the teacher's memory.",
  },
  {
    title: "Confident from lesson one",
    body: "Any teacher, in any classroom, can deliver this well from the first day.",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="M4 10h12m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="mt-0.5 h-5 w-5 shrink-0 text-apty-coral"
    >
      <path
        d="m4 10 4 4 8-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SchoolsPage() {
  return (
    <div className="min-h-screen bg-[#fffdfb]">
      <Header schoolsPage />

      <main>
        <section className="relative overflow-hidden border-b border-apty-coral-accent bg-[#fffaf7] px-4 py-20 md:py-28 lg:py-32">
          <div
            aria-hidden="true"
            className="absolute -right-28 -top-32 h-96 w-96 rounded-full bg-apty-coral-accent/60 blur-3xl"
          />
          <div className="container relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="max-w-3xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-apty-coral">
                AptyRead for Schools
              </p>
              <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-apty-dark sm:text-5xl md:text-6xl lg:text-7xl">
                English literacy, taught together.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-apty-gray md:text-xl">
                Teacher-led lessons for digital boards, classroom laptops, and
                projectors. The teacher leads. The class learns together.
              </p>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a
                  href={CLASSROOM_URL}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-apty-coral px-7 py-3.5 text-base font-semibold text-white shadow-[0_10px_30px_rgba(255,107,53,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#e95624]"
                >
                  Start free in Classroom
                  <ArrowIcon />
                </a>
                <a
                  href={CLASSROOM_LOGIN_URL}
                  className="inline-flex items-center gap-1.5 px-2 py-2 font-semibold text-apty-dark transition-colors hover:text-apty-coral"
                >
                  School login
                  <span aria-hidden="true">›</span>
                </a>
              </div>
              <p className="mt-5 text-sm text-apty-gray">
                School email and password. No student accounts.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="rounded-[2rem] border border-apty-coral-accent bg-white p-5 shadow-[0_24px_70px_rgba(45,55,72,0.10)] md:p-7">
                <div className="mb-6 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff8f68]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffd078]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#76c9ba]" />
                  <span className="ml-2 h-2 w-28 rounded-full bg-slate-100" />
                </div>
                <div className="rounded-2xl bg-[#fff5f0] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-apty-coral">
                    Today&apos;s lesson
                  </p>
                  <p className="mt-3 text-2xl font-bold text-apty-dark">
                    Hear it. Feel it. See it.
                  </p>
                  <div className="mt-8 flex items-center justify-center gap-4">
                    {["s", "a", "t"].map((letter, index) => (
                      <div
                        key={letter}
                        className={`flex h-20 w-20 items-center justify-center rounded-2xl text-4xl font-bold shadow-sm ${
                          index === 0
                            ? "bg-apty-coral text-white"
                            : "border border-apty-coral-accent bg-white text-apty-dark"
                        }`}
                      >
                        {letter}
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 h-2 overflow-hidden rounded-full bg-white">
                    <div className="h-full w-2/3 rounded-full bg-apty-coral" />
                  </div>
                </div>
              </div>
              <p className="mt-5 text-center text-sm text-apty-gray">
                One screen. One teacher. The whole class.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 md:py-28">
          <div className="container mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-apty-coral">
                Why it works
              </p>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-apty-dark md:text-5xl">
                A clear sequence for learning to read.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-apty-gray">
                AptyRead makes structured literacy practical for whole-class
                teaching.
              </p>
            </div>
            <div className="mt-12 grid border-y border-apty-border md:grid-cols-2">
              {principles.map((principle, index) => (
                <article
                  key={principle.title}
                  className={`py-8 md:p-9 ${
                    index % 2 === 0 ? "md:border-r md:border-apty-border" : ""
                  } ${index < 2 ? "border-b border-apty-border" : ""}`}
                >
                  <p className="text-sm font-semibold text-apty-coral">
                    {principle.number}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-apty-dark md:text-2xl">
                    {principle.title}
                  </h3>
                  <p className="mt-3 max-w-md text-lg leading-relaxed text-apty-gray">
                    {principle.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f8fa] px-4 py-20 md:py-28">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-apty-coral">
                  The learning pathway
                </p>
                <h2 className="text-balance text-3xl font-bold tracking-tight text-apty-dark md:text-5xl">
                  Four levels. One connected foundation.
                </h2>
              </div>
              <p className="max-w-sm text-lg leading-relaxed text-apty-gray">
                Level 1 is the current classroom entry point. The full pathway
                shows where each skill leads next.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {levels.map((item) => (
                <article
                  key={item.level}
                  className={`rounded-3xl border p-7 md:p-9 ${
                    item.active
                      ? "border-apty-coral bg-[#fff7f3]"
                      : "border-apty-border bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-apty-coral">
                      {item.level}
                    </p>
                    {item.label ? (
                      <span className="rounded-full bg-apty-coral px-3 py-1 text-xs font-semibold text-white">
                        {item.label}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-apty-dark">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-apty-gray">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 md:py-28">
          <div className="container mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-apty-coral">
                  In the classroom
                </p>
                <h2 className="text-balance text-3xl font-bold tracking-tight text-apty-dark md:text-5xl">
                  One teacher. The whole class.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-apty-gray">
                  No individual devices to distribute. No child accounts to
                  manage. The teacher leads from one classroom screen.
                </p>
                <a
                  href={CLASSROOM_URL}
                  className="mt-8 inline-flex items-center gap-2 font-semibold text-apty-coral hover:text-[#d94d1b]"
                >
                  Try free lessons
                  <ArrowIcon />
                </a>
              </div>

              <div className="divide-y divide-apty-border border-y border-apty-border">
                {classroomSteps.map((item) => (
                  <article
                    key={item.step}
                    className="grid gap-3 py-7 sm:grid-cols-[7rem_1fr] md:py-9"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-apty-coral">
                      {item.step}
                    </p>
                    <div>
                      <h3 className="text-xl font-bold text-apty-dark">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-lg leading-relaxed text-apty-gray">
                        {item.body}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fff5f0] px-4 py-20 md:py-28">
          <div className="container mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-apty-coral">
                How a lesson works
              </p>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-apty-dark md:text-5xl">
                In your classroom, on your screen.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-apty-gray">
                One screen. One teacher. The whole class moves through the
                lesson together.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {lessonFlow.map((item) => (
                <article
                  key={item.step}
                  className="rounded-3xl border border-apty-coral-accent bg-white p-7 md:p-8"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-apty-coral">
                    Step {item.step}
                  </p>
                  <h3 className="mt-4 text-2xl font-bold text-apty-dark">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-apty-gray">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-10 max-w-3xl text-base font-semibold text-apty-dark md:text-lg">
              No individual devices. Nothing to print or order. A school can
              begin with free lessons.
            </p>
          </div>
        </section>

        <section className="px-4 py-20 md:py-28">
          <div className="container mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-apty-coral">
                  For teachers
                </p>
                <h2 className="text-balance text-3xl font-bold tracking-tight text-apty-dark md:text-5xl">
                  The teacher facilitates. AptyRead teaches.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-apty-gray">
                  Teachers do not need to become phonics specialists first. The
                  lesson carries the method.
                </p>
                <p className="mt-8 rounded-2xl bg-apty-dark px-6 py-5 text-base font-semibold text-white md:text-lg">
                  The teacher leads the room. AptyRead leads the lesson.
                </p>
              </div>

              <div className="divide-y divide-apty-border border-y border-apty-border">
                {teacherPoints.map((item) => (
                  <article key={item.title} className="py-7 md:py-8">
                    <h3 className="text-xl font-bold text-apty-dark">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-lg leading-relaxed text-apty-gray">
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-apty-dark px-4 py-20 text-white md:py-28">
          <div className="container mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-20">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#ff9a75]">
                Access
              </p>
              <h2 className="text-balance text-3xl font-bold tracking-tight md:text-5xl">
                Start free. Buy a level when it works.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
                Register your school and try the free lessons. If they work for
                your class, upgrade a level in Classroom when you are ready.
              </p>
              <ul className="mt-8 grid gap-4 text-lg text-white/90 sm:grid-cols-2">
                {[
                  "Free lessons after school registration",
                  "One classroom with unlimited students",
                  "One level per classroom license",
                  "Valid for one year from activation",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-7 text-apty-dark shadow-2xl md:p-9">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-apty-coral">
                Purchase
              </p>
              <h3 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
                Buy in Classroom
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-apty-gray">
                Start with free lessons. Upgrade a level in Classroom when you
                want full access. The price is shown before you pay.
              </p>
              <a
                href={CLASSROOM_URL}
                className="mt-7 inline-flex items-center gap-2 font-semibold text-apty-coral hover:text-[#d94d1b]"
              >
                Start free in Classroom
                <ArrowIcon />
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#fff5f0] px-4 py-20 md:py-24">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-apty-dark md:text-5xl">
              Bring this to your classroom screen.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-apty-gray">
              Start with free lessons today. Upgrade a level in Classroom when
              you are ready.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={CLASSROOM_URL}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-apty-coral px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#e95624]"
              >
                Start free in Classroom
                <ArrowIcon />
              </a>
            </div>
            <p className="mt-10 text-lg font-semibold text-apty-dark md:text-xl">
              Every child reads. Every teacher succeeds.
            </p>
          </div>
        </section>

        <section className="border-t border-apty-border bg-white px-4 py-10">
          <div className="container mx-auto max-w-6xl text-sm text-apty-gray">
            <p>
              Optional home practice is also available through the AptyRead
              companion app.
            </p>
          </div>
        </section>
      </main>

      <Footer schoolsPage />
    </div>
  );
}
