import React from 'react'
import { useAppContext } from '@/contexts/AppContext';
import { Modal } from './Modal';

export const AddHero = () => {
  const { setModal } = useAppContext();

  return (
    <>
      <button
        onClick={() => setModal(true)}
        className='flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#E2041D] hover:bg-red-800 hover:scale-105 transition-all cursor-pointer'
      >
        <p>
          Adicionar Herói
        </p>
        <i className='bx bxs-plus-square text-xl'></i>
      </button>
      <Modal />
    </>
  )
}
