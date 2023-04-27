import React from 'react'

export const Hero = () => {
    return (
        <div className='flex justify-between w-full'>
            <div>
                <h2>Nome</h2>
                <span>Tipo</span>
            </div>
            <label className="switch">
                <input type="checkbox" checked />
                <span className="slider round"></span>
            </label>
        </div>
    )
}
