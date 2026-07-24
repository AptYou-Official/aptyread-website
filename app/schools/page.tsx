import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import SchoolDemoForm from "@/components/public/SchoolDemoForm";

export const metadata: Metadata = {
  title: "AptyRead for Schools and Educators. Every Child Reads.",
  description:
    "AptyRead is a complete English literacy program for schools. Built on the Science of Reading and SATPIN methodology. Student workbook, teacher handbook, and companion app. Request a school demo today.",
  alternates: {
    canonical: "https://www.aptyread.ai/schools",
  },
  openGraph: {
    title: "AptyRead for Schools and Educators. Every Child Reads.",
    description:
      "A complete English literacy program for schools. Science of Reading. SATPIN. Workbook, handbook, and companion app.",
    url: "https://www.aptyread.ai/schools",
  },
};

const methods = [
  {
    title: "Science of Reading",
    body: "The most research-validated approach to teaching children how to read. Not a trend. Decades of evidence. AptyRead is built on these principles.",
  },
  {
    title: "SATPIN methodology",
    body: "Most schools teach A, B, C, D. AptyRead teaches S, A, T, P, I, N first. A child who learns these six letters in this order reads real words after just six lessons.",
  },
  {
    title: "Sound before letter",
    body: "The child hears the sound first. Feels how it is made. Then sees the letter. Sound to letter. That is how the brain learns to read.",
  },
  {
    title: "Mastery before progression",
    body: "Nothing unlocks until the child is ready. No gaps. No rushing. No skipping. Every step mastered before the next begins.",
  },
];

const components = [
  {
    title: "Student workbook",
    body: "Structured. Sequential. Lesson by lesson. Every sound in the right order. Designed for classroom use. Clean. Focused. Age appropriate.",
  },
  {
    title: "Teacher handbook",
    body: "Exact lesson notes for every lesson. No prior phonics knowledge needed. A teacher picks it up on day one and teaches confidently from lesson one.",
  },
  {
    title: "Companion app",
    body: "Every evening, the child continues at home. Fifteen to twenty minutes with a parent beside them. AI checks pronunciation in real time. Every parent sees progress.",
  },
  {
    title: "Optional teacher training",
    body: "A one-hour live online session on the Science of Reading and SATPIN. The handbook and app are enough to begin. Training goes further.",
  },
];

const steps = [
  {
    title: "In the classroom",
    body: "Teacher opens the handbook. Delivers the lesson. No extra devices. No timetable disruption. No prior phonics knowledge required.",
  },
  {
    title: "At home that evening",
    body: "Child opens the app with a parent beside them. Same lesson from the morning. AI checks pronunciation. Parents see exactly how their child is progressing.",
  },
  {
    title: "The teacher stays informed",
    body: "Through classroom interaction and observation. The handbook guides what comes next. No child falls behind without the teacher knowing.",
  },
];

const differentiators = [
  {
    title: "No devices in the classroom",
    body: "Workbook and handbook only during school hours. No screens. No internet dependency. No disruption.",
  },
  {
    title: "No prior teacher training needed",
    body: "Written for any teacher. Not just phonics specialists. Confident delivery from day one.",
  },
  {
    title: "Home learning built in",
    body: "The companion app extends every classroom lesson into the home. Parents become partners, not spectators.",
  },
  {
    title: "Mastery guaranteed",
    body: "No child moves forward until the previous step is mastered. No gaps. No guessing.",
  },
  {
    title: "One school. One standard.",
    body: "Same sequence. Same methodology. Every child arrives at the same foundation. Not dependent on which classroom they were assigned to.",
  },
];

export default function SchoolsPage() {
  return (
    <div className="min-h-screen bg-apty-warm">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-white py-16 md:py-24 px-4 border-b border-apty-coral-accent/30">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-sm md:text-base font-semibold text-apty-coral mb-3 tracking-wide uppercase">
              For Schools and Educators
            </p>
            <p className="text-sm md:text-base text-apty-gray mb-4">
              Built on the Science of Reading
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-apty-dark mb-6 leading-tight">
              The school that gets English literacy right.
              <br />
              From the very first day.
            </h1>
            <p className="text-lg md:text-xl text-apty-gray max-w-2xl mx-auto mb-8 leading-relaxed">
              A complete English literacy program for children aged 3 to 10.
              Four levels. 243 lessons. One connected system.
              Built for classrooms. Extended into homes.
            </p>
            <a
              href="#request-demo"
              className="inline-block bg-apty-coral text-white px-8 py-4 rounded-xl text-base md:text-lg font-semibold shadow-lg hover:opacity-95 transition-opacity"
            >
              Request a School Demo
            </a>
            <p className="mt-8 text-lg font-semibold text-apty-dark">
              Every child reads. Every teacher succeeds.
            </p>
          </div>
        </section>

        {/* Golden window */}
        <section className="py-14 md:py-20 px-4 bg-apty-warm">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-6">
              The window is open. For now.
            </h2>
            <div className="space-y-4 text-base md:text-lg text-apty-gray leading-relaxed">
              <p>
                Between ages four and eight, the brain is at its peak readiness to connect sounds to letters.
              </p>
              <p className="text-apty-dark font-semibold">
                This is the golden window.
              </p>
              <p>
                What happens inside it determines whether a child becomes a confident, fluent reader in English. Or a child who finds reading a struggle for years.
              </p>
              <p>
                Most schools know this window exists. Very few have a program built specifically for it.
              </p>
              <p className="text-apty-dark font-semibold">
                AptyRead is built for this window. From the very first sound.
              </p>
            </div>
          </div>
        </section>

        {/* Problem + SATPIN */}
        <section className="py-14 md:py-20 px-4 bg-white">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-6 leading-tight">
              Most children who struggle to read are not struggling because of ability.
              They are struggling because the foundation was never built correctly.
            </h2>
            <div className="space-y-4 text-base md:text-lg text-apty-gray leading-relaxed">
              <p>
                Reading is not a natural skill. It has to be explicitly taught.
              </p>
              <p>
                Most schools teach the alphabet in order. A. B. C. D.
                Research has shown a better sequence. One that gets children reading real words far faster.
              </p>
              <p className="text-2xl md:text-3xl font-bold text-apty-dark tracking-wide">
                S. A. T. P. I. N.
              </p>
              <p>
                A child who learns these six letters in this specific order reads real words after just six lessons.
                Sat. Pin. Tin. Tap. Spin.
              </p>
              <p>
                This is the Science of Reading. Decades of research. Proven results. Still not in most classrooms.
              </p>
              <p className="text-apty-dark font-semibold">
                AptyRead brings it to yours.
              </p>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-14 md:py-20 px-4 bg-apty-warm">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-10 text-center">
              How AptyRead teaches children to read
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {methods.map((item) => (
                <div
                  key={item.title}
                  className="bg-white p-6 md:p-7 rounded-2xl border border-apty-coral-accent"
                >
                  <h3 className="text-xl font-bold text-apty-dark mb-2">{item.title}</h3>
                  <p className="text-apty-gray leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What the school gets */}
        <section className="py-14 md:py-20 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-4">
                Not an app. A complete English literacy program.
              </h2>
              <p className="text-lg text-apty-gray">
                Four components. One connected system. Teaching English. In English. From the very first sound.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {components.map((item) => (
                <div
                  key={item.title}
                  className="p-6 md:p-7 rounded-2xl border border-apty-coral-accent bg-apty-warm/40"
                >
                  <h3 className="text-xl font-bold text-apty-dark mb-2">{item.title}</h3>
                  <p className="text-apty-gray leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-14 md:py-20 px-4 bg-apty-warm">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-3">
                Simple for teachers. Powerful for children.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((item, index) => (
                <div
                  key={item.title}
                  className="bg-white p-6 md:p-7 rounded-2xl border border-apty-coral-accent"
                >
                  <p className="text-sm font-semibold text-apty-coral mb-2">
                    Step {index + 1}
                  </p>
                  <h3 className="text-xl font-bold text-apty-dark mb-2">{item.title}</h3>
                  <p className="text-apty-gray leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-14 md:py-20 px-4 bg-white">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-6">
              What happens when a child completes AptyRead
            </h2>
            <div className="space-y-4 text-base md:text-lg text-apty-gray leading-relaxed mb-8">
              <p className="text-apty-dark font-semibold text-lg md:text-xl">
                A child who begins AptyRead in LKG reads chapter books independently by Class 2.
              </p>
              <p>
                That is what structured, sequential, mastery-based literacy instruction does when followed consistently.
              </p>
              <p>
                A child who reads fluently does not just do better in English. They do better in every subject that requires reading with understanding. Which is every subject.
              </p>
              <p className="text-apty-dark font-semibold">
                Foundational English literacy is not one part of your school&apos;s results. It is the foundation of all of them.
              </p>
            </div>
            <ul className="space-y-3 text-base md:text-lg text-apty-gray">
              <li className="flex gap-3">
                <span className="text-apty-coral font-bold">•</span>
                <span>Every child who completes Level 1 knows every letter sound and can write every letter correctly.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-apty-coral font-bold">•</span>
                <span>Every child who completes Level 2 reads their first real words, sentences, and short stories.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-apty-coral font-bold">•</span>
                <span>Every child who completes Level 4 reads chapter books independently.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Why schools choose */}
        <section className="py-14 md:py-20 px-4 bg-apty-warm">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-10 text-center">
              What makes AptyRead different
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {differentiators.map((item) => (
                <div
                  key={item.title}
                  className="bg-white p-6 md:p-7 rounded-2xl border border-apty-coral-accent"
                >
                  <h3 className="text-xl font-bold text-apty-dark mb-2">{item.title}</h3>
                  <p className="text-apty-gray leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Classroom equilibrium */}
        <section className="py-14 md:py-20 px-4 bg-white">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-6">
              Why AptyRead works best as a whole-class program
            </h2>
            <div className="space-y-4 text-base md:text-lg text-apty-gray leading-relaxed">
              <p>
                When some children learn using AptyRead at home and others follow a different method in school, something breaks.
              </p>
              <p>
                The AptyRead child learns S. A. T. P. I. N. The classroom teaches A. B. C. D. The methods conflict. The child is confused. Not because the child is wrong. Because the systems are different.
              </p>
              <p className="text-apty-dark font-semibold">
                AptyRead is designed as a whole-class program for this reason.
              </p>
              <p>
                Every child. Same sequence. Same sounds. Same foundation.
              </p>
              <p>
                When the whole class moves together, the teacher leads confidently. Every child progresses consistently. No child is left behind. No child is learning something different at home.
              </p>
              <p className="text-apty-dark font-semibold">
                One class. One method. One foundation.
              </p>
              <p>
                That is how English literacy becomes a school strength. Not just a home activity.
              </p>
            </div>
          </div>
        </section>

        {/* Your school becomes */}
        <section className="py-14 md:py-20 px-4 bg-apty-dark text-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your school becomes the school that gets English literacy right.
            </h2>
            <div className="space-y-3 text-base md:text-lg text-white/90 leading-relaxed mb-8">
              <p>Not just in test scores.</p>
              <p>In classrooms where children raise their hands confidently.</p>
              <p>In parents who see real progress every evening.</p>
              <p>In teachers who deliver lessons with clarity and confidence.</p>
              <p>In children who arrive at Class 3 already reading independently.</p>
            </div>
            <p className="text-lg md:text-xl font-semibold text-white">
              From the very first day of school.
            </p>
          </div>
        </section>

        {/* Demo form */}
        <section id="request-demo" className="py-14 md:py-20 px-4 bg-apty-warm scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-apty-coral-accent shadow-sm">
              <h2 className="text-3xl md:text-4xl font-bold text-apty-dark mb-4 text-center">
                See AptyRead in your school
              </h2>
              <p className="text-base md:text-lg text-apty-gray text-center mb-8 leading-relaxed">
                We will walk you through the complete program. Answer every question. Show you exactly how it works in a classroom.
                No pressure. No obligation. Just clarity.
              </p>
              <SchoolDemoForm />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-12 md:py-16 px-4 bg-white border-t border-apty-coral-accent/30">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-6">
              Bring AptyRead to your school
            </h2>
            <div className="space-y-2 text-base md:text-lg text-apty-gray mb-8">
              <p>
                <a
                  href="mailto:contact@aptyread.ai"
                  className="text-apty-coral font-semibold hover:text-apty-dark transition-colors"
                >
                  contact@aptyread.ai
                </a>
              </p>
              <p>
                <a
                  href="tel:+919074142163"
                  className="text-apty-coral font-semibold hover:text-apty-dark transition-colors"
                >
                  +91 90741 42163
                </a>
              </p>
              <p>
                <a
                  href="https://www.aptyread.ai"
                  className="text-apty-coral font-semibold hover:text-apty-dark transition-colors"
                >
                  aptyread.ai
                </a>
              </p>
            </div>
            <p className="text-lg md:text-xl font-semibold text-apty-dark">
              Every child reads. Every teacher succeeds.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
