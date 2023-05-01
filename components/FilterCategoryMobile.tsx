import { useAppContext } from '@/contexts/AppContext';
import React, { useState } from 'react'

export const FilterCategoryMobile = () => {
    const { categories, handleDeleteCategory, selectedCategory, setSelectedCategory } = useAppContext();
    const [filterCategoryModal, setFilterCatgoryModal] = useState(false)

    return (
        <div id='mobileshow' className='relative w-full text-center px-4 py-2 z-20 rounded-lg border-2 border-zinc-600'>
            <button
                onClick={() => setFilterCatgoryModal(!filterCategoryModal)}
                className='flex items-center justify-center gap-2 mx-auto'
            >
                Filtrar por Categoria
                <i className={`bx bx-chevron-down text-2xl ${filterCategoryModal ? "rotate-180 transition-all" : "rotate-0 transition-all"}`}></i>
            </button>
            {filterCategoryModal &&
                <div className='flex flex-col bg-zinc-200 top-12 left-0 z-0 absolute gap-2 px-4 py-2 rounded-b-lg w-full max-h-[250px] overflow-y-scroll overflow-x-hidden'>
                    {categories.map((categorie) => {
                        return (
                            <div
                                key={categorie.Id}
                                onClick={() => setSelectedCategory(categorie.Name)}
                                className={`flex items-center justify-between w-full px-4 py-2 rounded-lg cursor-pointer ${selectedCategory == categorie.Name ? "bg-zinc-500 text-white" : "border-zinc-800 border-2 text-zinc-800 hover:bg-zinc-500 hover:text-white"}  transition-all`}
                            >
                                <span>{categorie.Name}</span>
                                <button
                                    onClick={() => { handleDeleteCategory(categorie.Id); setFilterCatgoryModal(false) }}
                                    className='flex w-[30px] h-[30px] items-center justify-center gap-2 px-2 py-1 text-xs rounded-md border-2 border-zinc-700 hover:bg-red-600 transition-all'
                                >
                                    <i className='bx bx-trash' ></i>
                                </button>
                            </div>
                        )
                    })}
                </div>}
        </div>
    )
}
