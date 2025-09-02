import {debugData} from "@/hook";

export const Orga = (visible: boolean) => {
    debugData([
        {
            action: 'nui:orgaManagement:data',
            data: {}
        }
    ]);
    debugData([
        {
            action: 'nui:orgaManagement:visible',
            data: visible
        }
    ]);
}