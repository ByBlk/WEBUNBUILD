import React, { createContext, useContext, useState } from 'react';
import { TTerrotory, TInfluences, TRecipe, TDrug, TMission, TItemTablet, TXpTablet } from './types';

interface AppContextProps {
    territories: TTerrotory[];
    setTerritories: React.Dispatch<React.SetStateAction<TTerrotory[]>>;
    influences: TInfluences[];
    setInfluences: React.Dispatch<React.SetStateAction<TInfluences[]>>;
    recipes: TRecipe[];
    setRecipes: React.Dispatch<React.SetStateAction<TRecipe[]>>;
    drugs: TDrug[];
    setDrugs: React.Dispatch<React.SetStateAction<TDrug[]>>;
    missions: TMission[];
    setMissions: React.Dispatch<React.SetStateAction<TMission[]>>;
    items: TItemTablet[];
    setItems: React.Dispatch<React.SetStateAction<TItemTablet[]>>;
    xps: TXpTablet[];
    setXps: React.Dispatch<React.SetStateAction<TXpTablet[]>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
    children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [territories, setTerritories] = useState<TTerrotory[]>([]);
    const [influences, setInfluences] = useState<TInfluences[]>([]);
    const [recipes, setRecipes] = useState<TRecipe[]>([]);
    const [drugs, setDrugs] = useState<TDrug[]>([]);
    const [missions, setMissions] = useState<TMission[]>([]);
    const [items, setItems] = useState<TItemTablet[]>([]);
    const [xps, setXps] = useState<TXpTablet[]>([]);

    return (
        <AppContext.Provider value={{ territories, setTerritories, influences, setInfluences, recipes, setRecipes, drugs, setDrugs, missions, setMissions, items, setItems, xps, setXps }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};