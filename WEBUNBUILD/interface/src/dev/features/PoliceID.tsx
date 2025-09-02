import {debugData} from "@/hook";

export const PoliceID = (visible: boolean) => {
    debugData([
        {
            action: 'nui:PoliceID:visible',
            data: visible
        }
    ]);
    debugData([
        {
            action: 'nui:PoliceID:data',
            data: {
                service: "lssd",
                name: "Chris Coleman",
                matricule: "69",
                grade: "Sergeant",
                photo: "",
                divisions: "Traffic division, Metro Platoon, K9 Platoon, Air Support Division, Los Santos Police Academy",
            }
        }
    ])
}