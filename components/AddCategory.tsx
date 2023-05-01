import React from 'react'
import { useAppContext } from '@/contexts/AppContext';
import { Modal } from './Modal';
import { PopUpCategory } from './PopUpCategory';

export const AddCategory = () => {
  const { setNewCategory } = useAppContext();

  return (
    <div className='flex relative w-full'>
      <PopUpCategory />
      <button
        onClick={() => setNewCategory(true)}
        className='flex w-full items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#E2041D] hover:bg-red-800 hover:scale-105 transition-all cursor-pointer'
      >
        <p>
          Adicionar Categoria
        </p>
        <i className='bx bxs-layer-plus text-xl'></i>
      </button>
      <Modal />
    </div>
  )
}
