
import React, { useEffect, useState } from 'react'
import { Hero } from '@/components/Hero'
import { useAppContext } from '@/contexts/AppContext';
import { AddCategory } from '@/components/AddCategory';
import { FilterCategoryMobile } from '@/components/FilterCategoryMobile';

export const HeroesDisplay = () => {
    const { data, selectedCategory, setSelectedCategory } = useAppContext();

    const [pageSize, setPageSize] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            if (width <= 700) {
                setPageSize(6);
            } else {
                setPageSize(4);
            }
        }

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const renderHeroes = () => {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
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
            <div className='flex flex-col gap-2 items-center justify-between w-full h-full px-4 py-4 bg-zinc-900/80 backdrop-blur-md rounded-lg heroes'>
                <FilterCategoryMobile />
                <div className='flex flex-col gap-2 w-full'>
                    {renderHeroes()}
                </div>
                <div className='flex justify-between w-full'>
                    <div className="flex gap-2 w-full">
                        <button
                            className={`flex items-center justify-center px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-zinc-800/50 cursor-none" : "bg-zinc-800 hover:bg-zinc-500 hover:scale-105 cursor-pointer"} transition-all`}
                            onClick={() => {
                                if (currentPage != 1) {
                                    handlePageChange(currentPage - 1)
                                    console.log(currentPage === Math.ceil(data.length / pageSize))
                                }
                            }}
                        >
                            <i className='bx bxs-chevron-left text-zinc-700'></i>
                        </button>
                        <button
                            className={`flex items-center justify-center px-4 py-2 rounded-lg ${currentPage === Math.ceil(data.length / pageSize) ? "bg-zinc-800/50 cursor-none" : "bg-zinc-800 hover:bg-zinc-500 hover:scale-105 cursor-pointer"} transition-all`}
                            onClick={() => {
                                if (currentPage != Math.ceil(data.length / pageSize)) {
                                    handlePageChange(currentPage + 1)
                                }
                            }}
                        >
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
            <div id='mobileshow'>
                <AddCategory />
            </div>
        </>
    )
}
