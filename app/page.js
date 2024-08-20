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
    <div className='bg-white flex w-full flex-col gap-y-12 sm:gap-y-16 md:gap-y-20 lg:gap-y-24 xl:gap-y-32 2xl:gap-y-40'>
      <div>
        <Navbar />
        <Hero />
      </div>
      <Copilot />
      <Sync />
      <GetStarted />
      <SharedThinking />
      <WorkTogether />
      <Control />
      <div>

        <Transform />
        <Announcement />
        <Footer />
      </div>
    </div>
  )
}
