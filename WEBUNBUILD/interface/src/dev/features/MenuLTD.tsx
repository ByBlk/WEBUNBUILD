import { debugData } from "@/hook";

export const MenuLTD = (visible: boolean) => {
    debugData([
        {
            action: 'nui:menu-ltd:visible',
            data: visible
        }
    ]);
    debugData([
        {
            action: 'nui:menu-ltd:data',
            data: {
                price: 2.00,
                quantity: 10,
            }
        }
    ]);
}