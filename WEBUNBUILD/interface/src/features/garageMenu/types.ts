export type GarageElementData = {
    id: number;
    label: string;
    img: string;
}

export type GarageMenuData = {
    garageList: GarageElementData[],
    subTitle: string,
    name: string,
    advancedPerm: boolean,
    type: string,
    access?: 'fermer' | 'ouvert' | 'sonnette'
}