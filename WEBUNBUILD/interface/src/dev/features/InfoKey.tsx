import { debugData } from "@/hook";

export const InfoKey = (visible: boolean) => {
  debugData([
    {
      action: 'nui:infokey:visible',
      data: visible
    }
  ]);
  debugData([
    {
        action: 'nui:infokey:data',
        data: [
            {
                key: "E",
                desc: "Ouvrir le menu"
            },
            {
                key: "leftclick",
                desc: "Selection"
            }
        ]
    }
  ])
}