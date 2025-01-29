import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-serif text-4xl text-copper">Nuestra Aventura Perfecta</h2>
            <p className="text-dark/80 leading-relaxed">
              
            </p>
            <p className="text-dark/80 leading-relaxed">
            Entre miradas cómplices y sonrisas compartidas, construimos un mundo donde cada <strong>Te Amo</strong> es el comienzo de una nueva aventura. Bienvenidos a nuestra historia, donde los pequeños momentos crean los recuerdos más grandes.
            </p>
          </div>
          <div className="relative aspect-[3/4] w-full">
            <Image
              src="/images/ImageAbout.jpg" // Asegúrate de colocar tu imagen en public/images/
              alt="Photographer portrait"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}