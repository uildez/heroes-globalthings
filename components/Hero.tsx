import React from 'react'


export const Hero = ({name, category, active}: any) => {
    return (
        <div className='flex justify-between w-full'>
            <div>
                <h2>{name}</h2>
                <span>{category}</span>
            </div>
            <label className="switch">
                <input type="checkbox" checked={active === true ? true : false} readOnly/>
                <span className="slider round"></span>
            </label>
        </div>
    )
}
