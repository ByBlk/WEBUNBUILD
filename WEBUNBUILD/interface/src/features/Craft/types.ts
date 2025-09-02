export interface CraftRecipe {
    name: string;
    label: string;
    timer: number;
    recipe: {
        name: string;
        label: string;
        amount: number;
    }[];
}

export interface CraftInventoryItem {
    name: string;
    label: string;
    amount: number;
}

export interface CraftData {
    craft: CraftRecipe[];
    recipePossible: {
        name: string;
        amount: boolean;
    }[];
    inventory: CraftInventoryItem[];
    title?: string;
}

export interface NotificationProps {
    id: number;
    name: string;
    label: string;
    quantity: number;
    duration: number;
    onClose: (id: number) => void;
}