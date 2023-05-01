import { useAppContext } from '@/contexts/AppContext';
import React from 'react'
import { AddCategory } from './AddCategory';

export const DetailsCategories = () => {
  const { categories, handleDeleteCategory, selectedCategory, setSelectedCategory } = useAppContext();

  return (
    <div className='flex flex-col justify-between items-center p-4 bg-zinc-900/80 backdrop-blur-md h-full rounded-lg'>
      <div>
        <h2 className='font-bold text-center'>Categorias cadastradas</h2>
        <span className='font-thin text-center text-sm mb-4'>Clique na categoria para filtrar</span>
      </div>

      <div className='flex flex-col gap-2 w-full max-h-[250px] overflow-y-scroll overflow-x-hidden py-2 pr-4'>
        {categories.map((categorie) => {
          return (
            <div
              key={categorie.Id}
              onClick={() => setSelectedCategory(categorie.Name)}
              className={`flex items-center justify-between w-full px-4 py-2 rounded-lg cursor-pointer ${selectedCategory == categorie.Name ? "bg-zinc-500" : "bg-zinc-800 hover:bg-zinc-500"}  transition-all`}
            >
              <span>{categorie.Name}</span>
              <button
                onClick={() => handleDeleteCategory(categorie.Id)}
                className='flex w-[30px] h-[30px] items-center justify-center gap-2 px-2 py-1 text-xs rounded-md border-2 border-zinc-700 hover:bg-red-600 transition-all'
              >
                <i className='bx bx-trash' ></i>
              </button>
            </div>
          )
        })}
      </div>
      <AddCategory />
    </div>
  )
}
