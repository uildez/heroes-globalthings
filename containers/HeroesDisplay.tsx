
import React from 'react'
import { Hero } from '@/components/Hero'
import { useAppContext } from '@/contexts/AppContext';

export const HeroesDisplay = () => {
    const { data } = useAppContext();

    return (
        <div>
            {data.map((hero, index) => {
                return (
                    <Hero 
                        key={index}
                        name={hero.Name}
                        category={hero.Category.Name}
                        active={hero.Active}
                    />
                )
            })}
        </div>
    )
}
