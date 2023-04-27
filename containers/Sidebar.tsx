import React from 'react'
import { AddHero } from '@/components/AddHero'
import { DetailsHero } from '@/components/DetailsHero'

export const Sidebar = () => {
  return (
    <div>
      <AddHero />
      <DetailsHero />
    </div>
  )
}
