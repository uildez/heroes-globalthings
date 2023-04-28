
import React, { useState } from 'react'
import { Hero } from '@/components/Hero'
import { useAppContext } from '@/contexts/AppContext';

const PAGE_SIZE = 4;

export const HeroesDisplay = () => {
    const { data } = useAppContext();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(Math.ceil(data.length / PAGE_SIZE));

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const renderHeroes = () => {
        const start = (currentPage - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const currentPageData = data.slice(start, end);

        return currentPageData.map((hero, index) => (
            <Hero key={index} {...hero} />
        ));
    }

    return (
        <div className='flex flex-col gap-2 items-center justify-between w-full h-full px-4 py-4 bg-zinc-900 rounded-lg heroes'>
            <div className='flex flex-col gap-2 w-full'>
                {renderHeroes()}
            </div>
            <div className="flex gap-2 w-full">
                <button className='flex items-center justify-center bg-zinc-800 px-4 py-2 rounded-lg hover:border-zinc-200 hover:scale-105 hover:border-2 cursor-pointer transition-all' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <i className='bx bxs-chevron-left'></i>
                </button>
                <button className='flex items-center justify-center bg-zinc-800 px-4 py-2 rounded-lg hover:border-zinc-200 hover:scale-105 hover:border-2 cursor-pointer transition-all' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    <i className='bx bxs-chevron-right'></i>
                </button>
            </div>
        </div>
    )
}
