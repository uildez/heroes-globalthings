import React from 'react'
import { AddHero } from '@/components/AddHero'
import { DetailsHero } from '@/components/DetailsHero'

export const Sidebar = () => {
  return (
    <div className='flex flex-col w-full h-full gap-4'>
      <AddHero />
      <DetailsHero />
    </div>
  )
}
