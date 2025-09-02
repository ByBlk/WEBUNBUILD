import {debugData} from "@/hook";

export const CardNewsSocietyShow = (visible: boolean) => {
    debugData([
        {
            action: 'nui:CardNewsSocietyShow:visible',
            data: visible
        }
    ]);
    debugData([
        {
            action: 'nui:CardNewsSocietyShow:data',
            data: {
                name: "Ammunation",
                logo: "https://cdn.eltrane.cloud/3838384859/old_a_trier/other/logo_dynasti.webp",
                phone: "4321",
                message: "Ammunation test notification bla bla bla plus d'espace",
                typeannonce: "INFORMATION",
            }
        }
    ])
}