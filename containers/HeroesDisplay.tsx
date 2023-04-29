
import React, { useState } from 'react'
import { Hero } from '@/components/Hero'
import { useAppContext } from '@/contexts/AppContext';

const PAGE_SIZE = 4;

export const HeroesDisplay = () => {
    const { data, selectedCategory, setSelectedCategory } = useAppContext();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(Math.ceil(data.length / PAGE_SIZE));

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const renderHeroes = () => {
        const start = (currentPage - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        // const currentPageData = data.slice(start, end);
        const currentPageData = data
            .filter(hero => {
                const hasCategory = !selectedCategory ? true : hero.Category?.Name === selectedCategory;
                return hasCategory;
            })
            .slice(start, end);

        return currentPageData.length > 0 ?
            <>
                {currentPageData.map((hero, index) => (
                    <Hero key={index} {...hero} />
                ))}
            </>
            :
            <div className='flex flex-col items-center justify-center gap-1 w-full mt-8'>
                <div className='text-xl font-bold'>
                    Sem resultado <i className='bx bx-search-alt'></i>
                </div>
                <span className='font-thin text-center text-sm'>Selecione outro filtro</span>
            </div>
    }

    return (
        <>
            <div className='flex flex-col gap-2 items-center justify-between w-full h-full px-4 py-4 bg-zinc-900 rounded-lg heroes'>
                <div className='flex flex-col gap-2 w-full'>
                    {renderHeroes()}
                </div>
                <div className='flex justify-between w-full'>
                    <div className="flex gap-2 w-full">
                        <button className='flex items-center justify-center bg-zinc-800 px-4 py-2 rounded-lg hover:border-zinc-200 hover:scale-105 hover:border-2 cursor-pointer transition-all' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            <i className='bx bxs-chevron-left'></i>
                        </button>
                        <button className='flex items-center justify-center bg-zinc-800 px-4 py-2 rounded-lg hover:border-zinc-200 hover:scale-105 hover:border-2 cursor-pointer transition-all' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            <i className='bx bxs-chevron-right'></i>
                        </button>
                    </div>
                    {selectedCategory &&
                        <button
                            onClick={() => setSelectedCategory("")}
                            className='flex w-full items-center justify-center gap-2 px-2 py-1 text-xs rounded-md border-2 border-zinc-700 hover:bg-green-600 transition-all'
                        >
                            Limpar filtro
                        </button>
                    }
                </div>
            </div>
        </>
    )
}
