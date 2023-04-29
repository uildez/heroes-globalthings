import { Inter } from 'next/font/google'
import { Sidebar } from '@/containers/Sidebar'
import { HeroesDisplay } from '@/containers/HeroesDisplay'
import { Modal } from '@/components/Modal'
import { useAppContext } from '@/contexts/AppContext'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main
        className={`flex min-h-screen w-screen items-center justify-center flex-col ${inter.className}`}
      >
        <h1 className='absolute top-10'>Heroes Global Things</h1>
        <div className='flex flex-row h-full gap-4 w-3/5'>
          <div className='max-h-[450px] w-2/5'>
          <Sidebar />
          </div>
          <div className='max-h-[450px] w-3/5'>
            <HeroesDisplay />
          </div>
        </div>
      </main>
    </>
  )
}
