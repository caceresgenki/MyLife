import Image from "next/image";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-32">
      {/* Capa de fondo con imagen y overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/GraySolid2.jpg" // Asegúrate de colocar tu imagen en public/images/
          alt="Mountain landscape"
          fill
          className="object-cover"
          priority={false}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-sage/70" />
      </div>

      {/* Contenido del testimonio */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <blockquote className="font-serif text-4xl text-cream mb-8">
          <p>
            En cada momento difícil, tu mano sostuvo la mía. En cada alegría, tu
            sonrisa duplicó la mía.
          </p>
          <p>Gracias por ser mi constante.</p>
        </blockquote>
        <p className="max-w-2xl mx-auto text-cream/90 italic font-light">
          Jorge Bucay
        </p>
      </div>
    </section>
  );
}
