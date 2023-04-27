import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Sidebar } from '@/containers/Sidebar'
import { HeroesDisplay } from '@/containers/HeroesDisplay'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>Heroes Global Things</h1>
      <div className='grid md:grid-cols-2 grid-cols-1 h-full'>
        <Sidebar />
        <HeroesDisplay />
      </div>
    </main>
  )
}
