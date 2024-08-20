"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Navbar from './_components/Navbar'
import Hero from './_components/Hero'
import Copilot from './_components/Copilot'
import Sync from './_components/Sync'
import GetStarted from './_components/GetStarted'
import SharedThinking from './_components/SharedThinking'
import WorkTogether from './_components/WorkTogether'
import Control from './_components/Control'
import Transform from './_components/Transform'
import Announcement from './_components/Announcement'
import Footer from './_components/Footer'

export default function Home() {
  let { push } = useRouter()
  return (
    <div className=''>
      <Navbar />
      <Hero />
      <Copilot />
      <Sync />
      <GetStarted />
      <SharedThinking />
      <WorkTogether />
      <Control />
      <Transform />
      <Announcement />
      <Footer />
    </div>
  )
}
