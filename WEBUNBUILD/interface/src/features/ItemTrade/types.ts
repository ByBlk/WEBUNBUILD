export interface IItem {
    id: number;
    type: number;
    time: number;
    item_number: number;
    item_image: string;
}

export interface IItemsList {
    items: IItem[];
}

export interface IItemTradeState {
    visible: boolean;
    data: IItem | null;
    setVisible: (visible: boolean) => void;
    setData: (data: IItemsList) => void;
}