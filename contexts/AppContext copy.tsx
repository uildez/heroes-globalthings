import api from '../services/api';
import { createContext, useContext, useEffect, useState } from 'react';

const headers = {
    AccessKey: `${process.env.NEXT_PUBLIC_ACESS_KEY}`
};

interface Hero {
    Active: boolean;
    Category: {
        Id: number;
        Name: string;
    };
    Id: number;
    Name: string;
}

type AppContextType = {
    data: Hero[];
    setData: (data: Hero[]) => void;
};

const AppContext = createContext<AppContextType>({
    data: [],
    setData: () => { },
});

export const useAppContext = () => useContext(AppContext);


export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<Hero[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`/Heroes`, { headers });
            setData(result.data.Items);
        };
        fetchData();
    }, []);

    // console.log(typeof data)
    // console.log(data)

    return (
    <AppContext.Provider value={{ data, setData }}>
        { children }
    </AppContext.Provider>
  );
};
