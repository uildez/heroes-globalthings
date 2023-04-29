import React from 'react'
import { AddHero } from '@/components/AddHero'
import { DetailsCategories } from '@/components/DetailsCategories'

export const Sidebar = () => {
  return (
    <div className='flex flex-col w-full h-full gap-4'>
      <AddHero />
      <DetailsCategories />
    </div>
  )
}
