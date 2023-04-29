import React from 'react'
import { useAppContext } from '@/contexts/AppContext';
import { Modal } from './Modal';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

//Interfaces
const schema = yup.object({
  name: yup.string().required(),
}).required();

type FormData = yup.InferType<typeof schema>;

export const AddCategory = () => {
  const { handleAddCategory, newCategory, setNewCategory } = useAppContext();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    handleAddCategory(data.name)
  }

  return (
    <div className='flex relative w-full'>
      {newCategory &&
        <div className='absolute w-full bg-zinc-600 -top-32 rounded-lg p-4'>
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="name"
              {...register("name")}
              placeholder="Insira o nome da Categoria"
              className="flex w-full px-2 py-1 text-sm border-2 boreder-zinc-600 bg-transparent rounded-lg placeholder:text-zinc-600"
            />
            <button
              type="submit"
              className='bg-slate-100 text-zinc-800 font-bold text-sm px-2 py-1 w-full mt-4 rounded-lg hover:scale-105 hover:bg-green-500 hover:text-white transition-all ease-in-out'
            >
              Salvar nova Categoria
            </button>
          </form>
          <button className='flex absolute items-center justify-center -top-4 -right-3 h-[30px] w-[30px] bg-zinc-500 rounded-lg'>
            <i className='bx bx-window-close text-2xl text-zinc-200 hover:text-red-500'></i>
          </button>
          <div className='w-full'>
            <div className='absolute -bottom-3 rotate-45 w-[35px] h-[35px] bg-zinc-600 rounded-lg translate-x-2/4' />
          </div>
        </div>
      }

      <button
        onClick={() => setNewCategory(true)}
        className='flex w-full items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 hover:scale-105 transition-all cursor-pointer'
      >
        <p>
          Adicionar Categoria
        </p>
        <i className='bx bxs-plus-square text-xl'></i>
      </button>
      <Modal />
    </div>
  )
}
