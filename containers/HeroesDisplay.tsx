
import React from 'react'
import { Hero } from '@/components/Hero'
import { useAppContext } from '@/contexts/AppContext';

export const HeroesDisplay = () => {
    const { data } = useAppContext();

    return (
        <div className='flex flex-col gap-2 items-center justify-center w-full h-full overflow-y-scroll px-4 py-4 pt-40 bg-zinc-900 rounded-lg'>
            {data.map((hero, index) => {
                return (
                    <Hero
                        key={index}
                        {...hero}
                    />
                )
            })}
        </div>
    )
}
