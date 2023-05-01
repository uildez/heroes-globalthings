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
        Id?: number;
        Name?: string;
    };
}

interface Categories {
    Id: number,
    Name: string
}

type AppContextType = {
    data: Hero[];
    setData: (data: Hero[]) => void;
    selectedHero: Hero;
    setSelectedHero: (data: Hero) => void;
    categories: Categories[];
    setCategories: (data: Categories[]) => void;
    modal: boolean;
    setModal: (modal: boolean) => void;
    handleDelete: (id: number) => void;
    handleAddHero: (newHero: Hero) => void;
    handleSelectedHero: (heroUpdate: Hero) => void;
    handleUptadedHero: (heroUpdate: Hero) => void;
    
    newCategory: boolean;
    selectedCategory: string;
    setSelectedCategory: (name: string) => void;
    setNewCategory: (modal: boolean) => void;
    handleAddCategory: (name: string) => void;
    handleDeleteCategory: (id: number) => void;
};

const AppContext = createContext<AppContextType>({
    data: [],
    setData: () => { },
    selectedHero: {} as Hero,
    setSelectedHero: () => { },
    categories: [],
    setCategories: () => { },
    modal: false,
    setModal: () => { },
    handleDelete: () => { },
    handleAddHero: () => { },
    handleSelectedHero: () => { },
    handleUptadedHero: () => { },
    
    newCategory: false,
    selectedCategory: "",
    setSelectedCategory: () => { },
    setNewCategory: () => { },
    handleAddCategory: () => { },
    handleDeleteCategory: () => { },
});

export const useAppContext = () => useContext(AppContext);


export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<Hero[]>([]);
    const [categories, setCategories] = useState<Categories[]>([]);

    const [modal, setModal] = useState<boolean>(false);
    const [newCategory, setNewCategory] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("")

    const [selectedHero, setSelectedHero] = useState<Hero>({
        Id: 0,
        Name: '',
        Active: true,
        Category: {
            Id: 0,
            Name: ''
        }
    });


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

    const handleAddHero = useCallback(async (newHero: Hero) => {
        const hero = {
            Name: newHero.Name,
            CategoryId: newHero.Category.Id,
            Active: newHero.Active,
        };

        try {
            const response = await api.post('/Heroes', hero, { headers });
            setData(prevState => [...prevState, response.data]);
            setModal(false);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const handleDelete = useCallback(async (id: number) => {
        try {
            await api.delete(`/Heroes/${id}`, { headers });
            setData(data.filter((hero) => hero.Id !== id));
        } catch (error) {
            console.error(error);
        }
    }, [data]);

    const handleSelectedHero = async (heroUpdate: Hero) => {
        setSelectedHero(heroUpdate)
    }

    const handleUptadedHero = useCallback(async (heroToUpdate: Hero) => {
        const hero = {
            Name: heroToUpdate.Name,
            CategoryId: heroToUpdate.Category.Id,
            CategoryName: heroToUpdate.Category.Name,
            Active: heroToUpdate.Active,
        };

        try {
            const response = await api.put(`/Heroes/${selectedHero.Id}`, hero, { headers });
            const updatedData = response.data;
            setData(prevState => prevState.map(hero => (hero.Id === heroToUpdate.Id ? updatedData : hero)));
        } catch (error) {
            console.error(error);
        }

        setSelectedHero({ ...selectedHero, Id: 0 })
    }, [selectedHero]);

    

    const handleAddCategory = useCallback(async (name: string) => {
        const newCategorie = { Name: name} 
        try {
            const response = await api.post('/Category', newCategorie, { headers });
            setCategories(prevState => [...prevState, response.data]);
            setNewCategory(false)
        } catch (error) {
            console.error(error);
        }
    }, []);

    const handleDeleteCategory = async (idDelete: number) => {
        try {
            await api.delete(`/Category/${idDelete}`, { headers });
            setCategories(categories.filter((category) => category.Id !== idDelete));
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <AppContext.Provider value={{
            data,
            setData,
            selectedHero,
            setSelectedHero,
            modal,
            setModal,
            handleDelete,
            handleAddHero,
            handleSelectedHero,
            handleUptadedHero,

            newCategory,
            setNewCategory,
            selectedCategory, 
            setSelectedCategory,
            categories,
            setCategories,
            handleAddCategory,
            handleDeleteCategory
        }}>
            {children}
        </AppContext.Provider>
    );
};
