import { debugData } from "@/hook";

export const jobMenu = (visible: boolean) => {
  debugData([
    {
      action: 'nui:job:data',
      data: mockData
    }
  ]);
  debugData([
    {
      action: 'nui:job:visible',
      data: visible
    }
  ]);
}

const mockData = {
  headerBanner: "https://cdn.eltrane.cloud/3838384859/MenuJob/ferme.webp",
  choice: {
    label: "Véhicules Agricoles",
    isOptional: false,
    choices: [
      {
        id: 1,
        label: "Plantation",
        img: "https://cdn.eltrane.cloud/3838384859/MenuJob/tractor.webp",
      },
      {
        id: 2,
        label: "Récolte",
        img: "https://cdn.eltrane.cloud/3838384859/MenuJob/trailer_1.webp",
      },
      {
        id: 3,
        label: "Transport",
        img: "https://cdn.eltrane.cloud/3838384859/MenuJob/trailer_2.webp",
      },
    ],
  },
  participants: [{ name: "Carlos", id: 1, uniqueId: 19299 }],
  participantsNumber: 4,
  callbackName: "MetierFerme",
}