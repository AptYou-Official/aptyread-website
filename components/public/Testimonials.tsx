const testimonials = [
  {
    name: "Sarah",
    role: "Parent of 5-year-old",
    content: "My daughter loves learning with AptyRead. I can see her progress every day.",
    rating: 5,
  },
  {
    name: "Raj",
    role: "Parent",
    content: "Finally, an app that respects my child and doesn't try to sell me more.",
    rating: 5,
  },
  {
    name: "Maria",
    role: "Parent of 6-year-old",
    content: "Simple, safe, and effective. Exactly what I was looking for.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-apty-warm py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-apty-dark text-center mb-12">
          What Parents Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg border border-apty-coral-accent shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-apty-gold text-xl">★</span>
                ))}
              </div>
              <p className="text-apty-gray mb-6 leading-relaxed text-lg italic">
                &quot;{testimonial.content}&quot;
              </p>
              <div>
                <p className="font-semibold text-apty-dark">{testimonial.name}</p>
                <p className="text-sm text-apty-gray">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

