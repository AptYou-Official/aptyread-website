export default function Hero() {
  return (
    <section className="bg-apty-warm py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-apty-dark mb-6 leading-tight">
          Learn to Read English Naturally
        </h1>
        <p className="text-xl md:text-2xl text-apty-gray mb-8 leading-relaxed max-w-3xl mx-auto">
          AptyRead helps children ages 4-10 learn English phonics through sounds they hear every day. Our unique approach uses environmental sounds to teach letters - making learning natural and memorable.
        </p>
        <p className="text-lg text-apty-dark mb-10 max-w-2xl mx-auto">
          We teach phonics through sounds your child already knows. Steam makes the &apos;S&apos; sound. Tapping makes the &apos;T&apos; sound.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="bg-apty-coral text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg opacity-90 cursor-not-allowed">
            Available soon on Google Play Store
          </div>
          <p className="text-apty-gray text-sm">
            Try it free - First 4 lessons are free
          </p>
        </div>
      </div>
    </section>
  );
}

