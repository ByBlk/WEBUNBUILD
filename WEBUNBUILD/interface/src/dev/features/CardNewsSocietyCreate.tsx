import {debugData} from "@/hook";

export const CardNewsSocietyCreate = (visible: boolean) => {
    debugData([
        {
            action: 'nui:CardNewsSocietyCreate:visible',
            data: visible
        }
    ]);
    debugData([
        {
            action: 'nui:CardNewsSocietyCreate:data',
            data: {
                name_society: 'Dynasti 8',
                logo_society: 'https://cdn.eltrane.cloud/3838384859/old_a_trier/other/logo_dynasti.webp',
                preset: 'LSPD'
            }
        }
    ])
}