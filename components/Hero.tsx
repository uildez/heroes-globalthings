import { useAppContext } from '@/contexts/AppContext';
import React from 'react'


export const Hero = ({ Id, Name, Active, Category }: any) => {
    const { handleDelete, handleSelectedHero, selectedHero, setSelectedHero, categories, handleUptadedHero } = useAppContext();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newHero = {
            Id: selectedHero.Id,
            Name: selectedHero.Name,
            Active: selectedHero.Active,
            Category: {
                Id: selectedHero.Category.Id,
                Name: selectedHero.Category.Name
            }
        };

        handleUptadedHero(newHero);
    };


    return (
        <div className={`flex items-center justify-between w-full bg-zinc-800 px-4 py-2 rounded-lg border-l-8 ${Active === true ? "border-green-500" : "border-red-500"}`}>
            {selectedHero.Id === Id ?
                <form
                    onSubmit={handleSubmit}
                    className='flex items-center justify-between w-full'
                >
                    <div className="flex flex-col gap-1">
                        <input
                            type="name"
                            placeholder="Digite o nome do Herói"
                            value={selectedHero.Name}
                            onChange={(e) => setSelectedHero({
                                ...selectedHero,
                                Name: e.target.value
                            })}
                            className="flex w-full text-sm px-2 py-1 border-2 boreder-zinc-600 bg-transparent rounded-lg placeholder:text-zinc-600"
                        />

                        <div className='flex gap-4'>
                            <select
                                value={selectedHero.Category?.Id}
                                className="flex w-full text-sm px-2 py-1 border-2 boreder-zinc-600 bg-transparent rounded-lg placeholder:text-zinc-600"
                                onChange={(e) => {
                                    const selectedCategoryId = parseInt(e.target.value);
                                    const selectedCategory = categories.find((category) => category.Id === selectedCategoryId);
                                    setSelectedHero({
                                        ...selectedHero,
                                        Category: {
                                            Id: selectedCategory?.Id,
                                            Name: selectedCategory?.Name
                                        }
                                    })
                                }}
                            >
                                {categories.map((categorie) => {
                                    return (
                                        <option key={categorie.Id} value={categorie.Name && categorie.Id} className="text-zinc-700">{categorie.Name}</option>
                                    )
                                })}
                            </select>

                            <div className="flex items-center text-sm">
                                <label htmlFor="check">{selectedHero.Active === true ? "Ativado" : "Desativado"}</label>
                                <input
                                    type="checkbox"
                                    className="check"
                                    checked={selectedHero.Active}
                                    onChange={(e) =>
                                        setSelectedHero({ ...selectedHero, Active: e.target.checked })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <button
                            className='flex w-full items-center justify-center gap-2 px-2 py-1 text-xs rounded-md border-2 border-zinc-700 hover:bg-green-600 transition-all'
                        >
                            Salvar
                            <i className='bx bx-edit' ></i>
                        </button>
                        <button
                            onClick={() => handleSelectedHero({...selectedHero, Id: 0})}
                            className='flex w-full items-center justify-center gap-2 px-2 py-1 text-xs rounded-md border-2 border-zinc-700 hover:bg-red-600 transition-all'
                        >
                            Cancelar
                            <i className='bx bx-x-circle'></i>
                        </button>
                    </div>
                </form>
                :
                <div className='flex items-center justify-between w-full'>
                    <div>
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
                            onClick={() => handleSelectedHero({ Id, Name, Active, Category })}
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
            }
        </div>
    )
}
