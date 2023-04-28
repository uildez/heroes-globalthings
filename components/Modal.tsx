import React, { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

//Interfaces
const schema = yup.object({
    Name: yup.string().required(),
    Category: yup.string().required(),
    Active: yup.boolean().required(),
}).required();

type FormData = yup.InferType<typeof schema>;

export function Modal() {
    const { setModal, categories, handleAddHero, data } = useAppContext();
    const [selectedCategory, setSelectedCategory] = useState<{ Id: number, Name: string }>({ Id: 0, Name: '' });

    const Heroes = data

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: FormData) => {
        const newHero = {
            Id: Heroes.length + 1,
            Name: data.Name,
            Active: data.Active,
            Category: {
                Id: selectedCategory.Id,
                Name: selectedCategory.Name
            }
        };

        handleAddHero(newHero)
    }

    return (
        <>
            <div
                className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none bg-zinc-800/50 backdrop-blur-md"
            >
                <div className="w-full my-6 mx-auto max-w-3xl">
                    <div className="border-0 shadow-lg relative flex flex-col w-full mx-4 rounded-lg text-white py-4 px-8 bg-zinc-800">
                        <div className='flex gap-2 items-center justify-between w-full mb-4'>
                            <div className="flex gap-4 items-center text-xl font-bold">
                                Cadastrar novo Herói
                            </div>
                            <button
                                type="button"
                                onClick={() => setModal(false)}
                                className='bg-slate-100 text-zinc-800 font-bold text-lg px-4 py-2 rounded-lg hover:scale-105 hover:bg-zinc-900 hover:text-white transition-all ease-in-out'>
                                Fechar
                            </button>
                        </div>
                        <div className="flex flex-col">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="flex flex-col gap-4">
                                    <input
                                        type="name"
                                        {...register("Name")}
                                        placeholder="Digite o nome do Herói"
                                        className="flex w-full px-4 py-2 border-2 boreder-zinc-600 bg-transparent rounded-lg placeholder:text-zinc-600"
                                    />

                                    <select
                                        {...register("Category")}
                                        className="flex w-full px-4 py-2 border-2 boreder-zinc-600 bg-transparent rounded-lg placeholder:text-zinc-600"
                                        onChange={(e) => {
                                            const categoryId = parseInt(e.target.value);
                                            const category = categories.find(c => c.Id === categoryId);
                                            setSelectedCategory(category || { Id: 0, Name: '' });
                                        }}
                                    >
                                        {categories.map((categorie) => {
                                            return (
                                                <option key={categorie.Id} value={categorie.Name && categorie.Id} className="text-zinc-700">{categorie.Name}</option>
                                            )
                                        })}
                                    </select>

                                    <div className="flex items-center">
                                        <label htmlFor="check">Ativo</label>
                                        <input
                                            type="checkbox"
                                            id="check"
                                            {...register("Active")}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className='bg-slate-100 text-zinc-800 font-bold text-lg px-4 py-2 mt-4 rounded-lg hover:scale-105 hover:bg-green-500 hover:text-white transition-all ease-in-out'
                                >
                                    Salvar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}