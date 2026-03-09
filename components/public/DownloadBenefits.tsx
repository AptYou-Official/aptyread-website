'use client';

export default function DownloadBenefits() {
  return (
    <section className="bg-apty-warm py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-4">
            Why AptyRead Works
          </h2>
          <p className="text-base md:text-lg text-apty-gray max-w-2xl mx-auto">
            Most children struggle in school because they never learned to read properly. AptyRead fixes this from the start.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Benefit 1 */}
          <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-apty-coral/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-apty-dark mb-2">
                  Structured Learning
                </h3>
                <p className="text-apty-gray text-sm md:text-base">
                  Every lesson builds on the previous one. Your child masters each step before moving forward.
                </p>
              </div>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-apty-cyan/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">⏱️</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-apty-dark mb-2">
                  Respects Your Child&apos;s Pace
                </h3>
                <p className="text-apty-gray text-sm md:text-base">
                  One lesson per day. No pressure, no rushing. Healthy learning habits that protect your child&apos;s wellbeing.
                </p>
              </div>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-apty-gold/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-apty-dark mb-2">
                  Try Before You Commit
                </h3>
                <p className="text-apty-gray text-sm md:text-base">
                  4 free lessons, no registration needed. See if your child connects with our approach before enrolling.
                </p>
              </div>
            </div>
          </div>

          {/* Benefit 4 */}
          <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-apty-coral/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">❤️</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-apty-dark mb-2">
                  Child Wellbeing First
                </h3>
                <p className="text-apty-gray text-sm md:text-base">
                  No ads, no distractions, no hidden subscriptions. A focused environment where your child can learn safely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


