import React from 'react'
import { useAppContext } from '@/contexts/AppContext';

export const AddHero = () => {
  const { setModal } = useAppContext();

  return (
    <button
      onClick={() => setModal(true)} 
    className='flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 hover:scale-105 transition-all cursor-pointer'
    >
      <p>
        Adicionar Herói
      </p>
      <i className='bx bxs-plus-square text-xl'></i>
    </button>
  )
}
