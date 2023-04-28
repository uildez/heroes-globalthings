import api from '@/services/api';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const headers = {
    AccessKey: `${process.env.NEXT_PUBLIC_ACESS_KEY}`
};

interface Hero {
    Id: number;
    Name: string;
    Active: boolean;
    Category: {
        Id: number;
        Name: string;
    };
}

interface Categories {
    Id: number,
    Name: string
}

type AppContextType = {
    data: Hero[];
    setData: (data: Hero[]) => void;
    categories: Categories[];
    setCategories: (data: Categories[]) => void;
    modal: boolean;
    setModal: (modal: boolean) => void;
    handleDelete: (id: number) => void;
    handleAddHero: (newHero: Hero) => void;
};

const AppContext = createContext<AppContextType>({
    data: [],
    setData: () => { },
    categories: [],
    setCategories: () => { },
    modal: false,
    setModal: () => { },
    handleDelete: () => { },
    handleAddHero: () => { },
});

export const useAppContext = () => useContext(AppContext);


export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<Hero[]>([]);
    const [categories, setCategories] = useState<Categories[]>([]);
    const [modal, setModal] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`/Heroes`, { headers });
            setData(result.data.Items);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`/Category`, { headers });
            setCategories(result.data.Items);
        };
        fetchData();
    }, []);


    const handleAddHero = (async (newHero: Hero) => {
        console.log(newHero)
        try {
            const hero = {
                Name: newHero.Name,
                CategoryId: newHero.Category.Id,
                CategoryName: newHero.Category.Name,
                Active: newHero.Active,
            };
            const response = await api.post('/Heroes', hero, { headers });
            setData(prevState => [...prevState, response.data]);
            setModal(false);
        } catch (error) {
            console.error(error);
        }
    });


    const handleDelete = useCallback(async (id: number) => {
        try {
            await api.delete(`/Heroes/${id}`, { headers });
            setData(data.filter((hero) => hero.Id !== id));
        } catch (error) {
            console.error(error);
        }
    }, [data]);

    return (
        <AppContext.Provider value={{
            data,
            setData,
            modal,
            setModal,
            handleDelete,
            handleAddHero,
            categories,
            setCategories
        }}>
            {children}
        </AppContext.Provider>
    );
};
