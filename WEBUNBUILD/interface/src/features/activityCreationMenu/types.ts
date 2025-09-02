export interface Activity {
    name: string;
    diminutif: string;
}

export type ActivityCreationData = {
    type: 'crew' | 'company' | 'faction'
}