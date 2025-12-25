'use client';

const testimonials = [
  {
    name: "Sarah",
    role: "Parent of 5-year-old",
    content: "My daughter loves learning with AptyRead. I can see her progress every day.",
    rating: 5,
    gradient: "from-apty-coral to-orange-400",
  },
  {
    name: "Raj",
    role: "Parent",
    content: "Finally, an app that respects my child and doesn&apos;t try to sell me more.",
    rating: 5,
    gradient: "from-apty-cyan to-blue-400",
  },
  {
    name: "Maria",
    role: "Parent of 6-year-old",
    content: "Simple, safe, and effective. Exactly what I was looking for.",
    rating: 5,
    gradient: "from-apty-gold to-yellow-400",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-apty-dark mb-4">
            What Parents Say
          </h2>
          <p className="text-xl text-apty-gray max-w-2xl mx-auto">
            Real stories from real parents
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white p-10 rounded-2xl border-2 border-apty-coral-accent hover:border-apty-coral shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${testimonial.gradient} rounded-t-2xl`}></div>
              
              <div className="mt-2">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-apty-gold text-2xl">★</span>
                  ))}
                </div>
                <p className="text-apty-gray mb-8 leading-relaxed text-lg italic">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="pt-6 border-t border-apty-coral-accent">
                  <p className="font-bold text-apty-dark text-lg">{testimonial.name}</p>
                  <p className="text-sm text-apty-gray">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
