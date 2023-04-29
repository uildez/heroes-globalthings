import { useAppContext } from '@/contexts/AppContext';
import React from 'react'


export const Hero = ({ Id, Name, Active, Category }: any) => {
    const { handleDelete, handleEditHero } = useAppContext();

    return (
        <div className={`flex items-center justify-between w-full bg-zinc-800 px-4 py-2 rounded-lg border-l-8 ${Active === true ? "border-green-500" : "border-red-500"}`}>
            <div className='flex flex-col'>
                <h2 className='font-bold text-xl'>{Name}</h2>
                <span className='text-sm text-zinc-500'>
                    {Category ? Category.Name : "Desconhecido"}
                </span>
                <label className="switch">
                    {Active === true ?
                        <span className='flex items-center gap-1 text-sm text-zinc-500 mr-2'><i className='bx bx-check-circle' ></i>Ativado</span>
                        :
                        <span className='flex items-center gap-1 text-sm text-zinc-500 mr-2'><i className='bx bx-x-circle'></i>Desativado</span>
                    }
                </label>
            </div>
            <div className='flex flex-col gap-2'>
                <button
                    onClick={() => handleEditHero({ Id, Name, Active, Category })}
                    className='flex w-full items-center justify-center gap-2 px-2 py-1 text-xs rounded-md border-2 border-zinc-700 hover:bg-green-600 transition-all'
                >
                    Editar
                    <i className='bx bx-edit' ></i>
                </button>
                <button
                    onClick={() => handleDelete(Id)}
                    className='flex w-full items-center justify-center gap-2 px-2 py-1 text-xs rounded-md border-2 border-zinc-700 hover:bg-red-600 transition-all'
                >
                    Deletar
                    <i className='bx bx-trash' ></i>
                </button>
            </div>
        </div>
    )
}
