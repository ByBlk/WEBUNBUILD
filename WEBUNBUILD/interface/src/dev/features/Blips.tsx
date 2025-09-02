import { debugData } from "@/hook";
export const Blips = (visible: boolean) => {
  debugData([
    {
      action: 'nui:blips:visible',
      data: visible
    }
  ]);

  debugData([
    {
      action: 'nui:blips:blips',
      data: [
        {
          numero: 1,
          nom: "Commissariat",
          taille: "1.0",
          couleur: "#FF0000",
          positions: [
            { label: "Position 1", coords: { x: 10, y: 20, z: 30 } },
            { label: "Position 2", coords: { x: 15, y: 25, z: 35 } }
          ]
        },
        {
          numero: 2,
          nom: "Hôpital",
          taille: "1.2",
          couleur: "#00FF00",
          positions: [
            { coords: { x: 50, y: 60, z: 70 } },
            { label: "Position 2", coords: { x: 55, y: 65, z: 75 } }
          ]
        }
      ]
    }
  ])
}