interface Item {
    name: string;
    quantity: number;
  }
  
  interface Order {
    date: string;
    items: Item[];
    price: number;
    type: 'armes' | 'drogues';
  }
  
  interface Informations {
    mostOrdered: string;
    totalCommands: number;
    totalSpent: number;
  }
  
  export interface ShopItem {
    id: number;
    image: string;
    name: string;
    price: number;
    stock?: number;
    cooldown?: number; 
    quantity?: number;
    crewLevel: IIllegalTabletData['crewLevel'];
    type?: string;
  }
  
  interface Shop {
    armes: ShopItem[];
    drogues: ShopItem[];
  }
  
  export interface IIllegalTabletData {
    crewColor: string;
    crewDesc: string;
    crewInitials: string;
    crewLevel: number;
    crewMotto: string;
    crewName: string;
    crewXp: number;
    hourStart: number;
    hourStop: number;
    minStart: number;
    minStop: number;
    informations: Informations;
    orders: Order[];
    shop: Shop;
    force?: string;
    errorMessage?: string;
  }