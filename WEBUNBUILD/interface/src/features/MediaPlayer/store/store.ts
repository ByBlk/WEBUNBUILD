import { create } from "zustand";

interface MediaState {
    volume: number;
    time: number;
    currentId: string;
    setVolume: (volume: number) => void;
    setTime: (time: number) => void;
    setCurrentId: (currentUrl: string) => void;
}

export const useMediaStore = create<MediaState>((set) => ({
    volume: 50,
    time: 0,
    currentId: "",
    setVolume: (volume) => set({ volume }),
    setTime: (time) => set({ time }),
    setCurrentId: (currentId: string) => set({ currentId }),
}));
