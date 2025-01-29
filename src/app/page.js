import Nav from "@/Components/nav"
import Hero from "@/Components/hero"
import About from "@/Components/about"
import Galery from "@/Components/galery"
import Testimonials from "@/Components/testimonials"

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Galery />
      <Testimonials />
    </main>
  )
}