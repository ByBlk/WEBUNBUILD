export interface Vehicle {
    id: string;
    name: string;
    model: string;
}
  
export interface PoundData {
    Crew: Vehicle[];
    Personnel: Vehicle[];
    Business: Vehicle[];
}

export enum Category {
    Personnel = 0,
    Entreprise = 1,
    Crews = 2,
}

export interface State {
    selectedCategory: Category;
    selectedCar: number | null;
}