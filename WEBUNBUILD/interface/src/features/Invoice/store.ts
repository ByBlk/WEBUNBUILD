import {create} from 'zustand';

interface InvoiceStore {
    total: number;
    setTotal: (total: number) => void;
    totalWithReduce: number;
    setTotalWithReduce: (totalWithReduce: number) => void;
    reduce: number;
    setReduce: (reduce: number) => void;
    check: boolean;
    setCheck: (check: boolean) => void;
    signature: string;
    setSignature: (signature: string) => void;
    list: {
        name: string;
        quantity: number;
        price: number;
    }[];
    setList: (list: { name: string; quantity: number; price: number }[]) => void;
    clearList: () => void;
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
    total: 0,
    setTotal: (total) => set({ total }),
    totalWithReduce: 0,
    setTotalWithReduce: (totalWithReduce) => set({ totalWithReduce }),
    reduce: 0,
    setReduce: (reduce) => set({ reduce }),
    check: false,
    setCheck: (check) => set({ check }),
    signature: "",
    setSignature: (signature) => set({ signature }),
    list: [
        {
            name: "Entrez un nom",
            quantity: 0,
            price: 0
        }
    ],
    setList: (list) => set({ list }),
    clearList: () => set({
        list: [
            {
                name: "Entrez un nom",
                quantity: 0,
                price: 0
            }
        ],
        total: 0,
        reduce: 0
    })
}));