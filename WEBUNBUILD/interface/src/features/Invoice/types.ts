export interface IInvoiceData {
    invoice_id: number;
    sender: string;
    receiver: string;
    isSender: boolean;
    date: string;
    reduce: number;
    items: Array<{
        name: string;
        price: number;
        quantity: number;
    }>;
    total: number;
}

export interface IPropsItems {
    items: Array<{
        name: string;
        price: number;
        quantity: number;
    }>;
}