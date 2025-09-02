export type CoOwnerProps = {
    id: string;
    name: string;
    face: string;
    hide?: boolean;
}

export type PropertyMenuData = {
    coOwnerList: CoOwnerProps[],
    name: string,
    access: 'fermer' | 'ouvert' | 'sonnette'
    nameProperty: string,
    rental: number,
    type?: string,
}