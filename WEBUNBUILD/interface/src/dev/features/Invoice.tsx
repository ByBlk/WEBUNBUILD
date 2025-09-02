import {debugData} from "@/hook";

export const Invoice = (visible: boolean) => {
    debugData([
        {
            action: "nui:invoice:visible",
            data: visible
        }
    ]);
    debugData([
        {
            action: "nui:invoice:data",
            data: {
                sender: "Brian Anderson",
                receiver: "Marcus Johnson",
                date: "2023-12-31",
                reduce: 23,
                items: [
                    {name: "Item 1", price: 100, quantity: 2},
                    {name: "Item 2", price: 200, quantity: 3},
                    {name: "Item 3", price: 300, quantity: 5}
                ],
                total: 600,
                isSender: true,
            }
        }
    ])
}