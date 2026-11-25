import { Cursor } from '@/components/site/cursor'
import { Footer } from '@/components/site/footer'
import { Nav } from '@/components/site/nav'
import { Contact } from '@/components/sections/contact'
import { Hero } from '@/components/sections/hero'
import { Process } from '@/components/sections/process'
import { Services } from '@/components/sections/services'
import { Studio } from '@/components/sections/studio'
import { Work } from '@/components/sections/work'

export default function Home() {
  return (
    <>
      <Nav />
      <Cursor />
      <main>
        <Hero />
        <Work />
        <Services />
        <Studio />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
