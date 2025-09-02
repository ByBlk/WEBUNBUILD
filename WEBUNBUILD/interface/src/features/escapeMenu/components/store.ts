import {create} from 'zustand';

interface BoutiqueStore {
    pageStore: string;
    setPageStore: (page: string) => void;
}

export const useBoutiqueStore = create<BoutiqueStore>((set) => ({
    pageStore: "",
    setPageStore: (pageStore) => set({ pageStore }),
}))