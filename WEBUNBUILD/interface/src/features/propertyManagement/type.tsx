export type PropertyManagementData = {
    timeLeft: number,
    acces: string,
    type: string,
    haveAccess: PropertyManagementPropertyElement[],
    maxDuration: number;
    prolongation?: number;
    hideDuration?: boolean;
}

export type PropertyManagementPropertyElement = {
    label: string;
    id: number;
}