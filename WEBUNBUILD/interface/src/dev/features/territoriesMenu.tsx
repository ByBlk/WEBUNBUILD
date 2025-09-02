import { debugData } from "@/hook";

export const territoriesMenu = (visible: boolean) => {
  debugData([
    {
      action: 'nui:territories:data',
      data: mockData
    }
  ]);
  debugData([
    {
      action: 'nui:territories:visible',
      data: visible
    }
  ]);
}

// const mockData = {


//   crews_over: "global",
//   revendication: 100,
//   crew: "F4L",
// };

const mockData = {
  zone: "Forum Drive",
  location: "Los Santos",
  crews: {
    semaine: [
      { leader: "Salut c'est greg", influence: 4567, color: "#3737db" },
      { leader: "83 Hoover Criminals Gang", influence: 4067, color: "#a2a2a3" },
      { leader: "Ballas", influence: 2067, color: "#37dbce" },
      { leader: "Los Santos Vagos", influence: 567, color: "#8fdb37" },
      { leader: "AZTECAS", influence: 67, color: "#db37a7" },
      { leader: "AZTECAS2", influence: 66, color: "#db37a7" },
      { leader: "AZTECAS3", influence: 65, color: "#db37a7" },
      { leader: "AZTECAS4", influence: 64, color: "#db37a7" },
      { leader: "AZTECAS5", influence: 63, color: "#db37a7" },
    ],
    mois: [
      { leader: "Ballas", influence: 2067, color: "#37dbce" },
      { leader: "Los Santos Vagos", influence: 567, color: "#8fdb37" },
      { leader: "AZTECAS", influence: 67, color: "#db37a7" },
      { leader: "AZTECAS2", influence: 66, color: "#db37a7" },
      { leader: "AZTECAS3", influence: 65, color: "#db37a7" },
      { leader: "AZTECAS4", influence: 64, color: "#db37a7" },
      { leader: "AZTECAS5", influence: 63, color: "#db37a7" },
    ],
    global: [
      { leader: "83 Hoover Criminals Gang", influence: 4067, color: "#a2a2a3" },
      { leader: "Ballas", influence: 2067, color: "#37dbce" },
      { leader: "Los Santos Vagos", influence: 567, color: "#8fdb37" },
      { leader: "AZTECAS", influence: 67, color: "#db37a7" },
      { leader: "AZTECAS2", influence: 66, color: "#db37a7" },
      { leader: "AZTECAS3", influence: 65, color: "#db37a7" },
      { leader: "AZTECAS4", influence: 64, color: "#db37a7" },
      { leader: "AZTECAS5", influence: 63, color: "#db37a7" },
    ]
  },
  revendication: 100,
  crew: "F4L",
  territories: [
    {
      zone: "Green Beach",
      location: "Vespucci Beach",
      crewid: 1,
      name: 'Territory A',
      image: 'https://cdn.eltrane.cloud/3838384859/territories/territory_a.svg',
      polygon: [
        [-900, -600],
        [-900, -400],
        [-300, -400],
        [-300, -600],
      ],
      options: { color: '#FF5733' },
      business: [
        { label: 'Magasin de masques' },
        { label: 'Commerce 2' },
        { label: 'Commerce 3' },
      ],
      topCrews: [
        { leader: "Le winner", influence: 4567, color: "#FF5733" },
        { leader: "Le deuxième", influence: 4067, color: "#a2a2a3" },
        { leader: "Je suis le deuxième", influence: 2067, color: "#37dbce" },
        { leader: "L'antépénultième", influence: 567, color: "#8fdb37" },
        { leader: "Le loser", influence: 67, color: "#db37a7" },
      ]
    },
  ]
};