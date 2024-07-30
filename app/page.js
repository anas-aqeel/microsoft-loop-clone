import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='flex justify-center items-center h-screen flex-col gap-2'>
      Hello
      <Button>Hello World</Button>
    </div>
  )
}
