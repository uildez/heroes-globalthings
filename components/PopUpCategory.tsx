import React from 'react'
import { useAppContext } from '@/contexts/AppContext';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

//Interfaces
const schema = yup.object({
    name: yup.string().required(),
}).required();

type FormData = yup.InferType<typeof schema>

export const PopUpCategory = () => {
    const { handleAddCategory, newCategory, setNewCategory } = useAppContext();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: FormData) => {
        handleAddCategory(data.name)
    }

    return (
        <>
            {newCategory &&
                <div className={`bg-zinc-800 border-2 border-zinc-600  w-full pb-8 rounded-lg p-4 z-10 ${newCategory && `absolute -top-24`}`}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input
                            type="name"
                            {...register("name")}
                            placeholder="Insira o nome da Categoria"
                            className="flex w-full px-2 py-1 text-sm border-2 border-zinc-200 bg-transparent rounded-lg placeholder:text-zinc-600"
                        />
                        <button
                            type="submit"
                            className='bg-zinc-200 text-zinc-800 font-bold text-sm px-2 py-1 w-full mt-4 rounded-lg hover:scale-105 transition-all ease-in-out'
                        >
                            Salvar nova Categoria
                        </button>
                    </form>
                    <button onClick={() => setNewCategory(false)} className='flex absolute items-center justify-center -top-4 -right-3 h-[30px] w-[30px] bg-zinc-600 rounded-lg'>
                        <i className='bx bx-x text-2xl text-zinc-200 hover:text-zinc-900'></i>
                    </button>
                </div>
            }
        </>
    )
}
