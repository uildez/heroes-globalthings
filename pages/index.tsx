import { Inter } from 'next/font/google'
import { Sidebar } from '@/containers/Sidebar'
import { HeroesDisplay } from '@/containers/HeroesDisplay'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main
        className={`flex min-h-screen w-screen items-center justify-center flex-col bg-[url(https://ffwallpaper.com/wallup/avengers-minimalist/avengers-minimalist-6.jpg)] bg-no-repeat bg-cover bg-opacity-80 ${inter.className}`}
      >
        <div className='flex items-center justify-center mb-4 bg-zinc-900/80 backdrop-blur-md rounded-lg w-3/5'>
          <Image
            src="/assets/images/logo.png"
            alt="Picture of the author"
            width={150}
            height={150}
            className='my-4'
          />
        </div>
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
