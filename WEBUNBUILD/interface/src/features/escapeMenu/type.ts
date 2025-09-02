export type EscapeMenuData = {
    premium: boolean,
    premiumEndDate: number,
    credit: number,
    unique_id: string,
    serverType: 'FA' | 'WL',
    cfx: BoutiqueProps['cfx'], 
}

export type BoutiqueProps = {
    cfx: string,
}