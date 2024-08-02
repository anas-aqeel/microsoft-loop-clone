"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
  let { push } = useRouter()
  return (
    <div className='flex justify-center items-center h-screen flex-col gap-2'>
      Hello
      <Button onClick={() => {
        push('/dashboard')
      }}>Go to Dashboard</Button>
    </div>
  )
}
