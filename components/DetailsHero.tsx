import { useAppContext } from '@/contexts/AppContext';
import { disconnect } from 'process';
import React from 'react'

export const DetailsHero = () => {
  const { categories } = useAppContext();

  return (
    <div className='flex flex-col items-center p-4 bg-zinc-900 h-full rounded-lg'>
      <h2 className='font-bold text-center mb-4'>Categorias cadastradas</h2>
      <div className='flex flex-col gap-2 w-full'>
        {categories.map((categorie) => {
          return (
            <button
              className={`flex items-center justify-between w-full bg-zinc-800 px-4 py-2 rounded-lg hover:scale-105 hover:bg-zinc-500 transition-all`}
              key={categorie.Id}
            >
              <span>{categorie.Name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
