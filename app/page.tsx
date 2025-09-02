import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import AnimatedBlob from '@/components/AnimatedBlob'

export default function Home() {
  return (
    <>
      <div className="relative overflow-hidden">
        {/* <AnimatedBlob /> */}
        <Hero />
      </div>
      <About />
      <Experience />
      <Skills />
      <Contact />
    </>
  )
}
