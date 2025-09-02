import { debugData } from "@/hook";

const BuilderData = {
  // banners: "header1.webp",
  // CdnUrl: "Concessionnaire/Voiture",
  // type: "vestiaire",
  // options: ["Service", "Division"],
  // categories: {
  //   Service: [
  //     { name: "Manche courte" },
  //     { name: "Manche courte" },
  //     { name: "Cérémonie" },
  //     { name: "Manche courte" },
  //     { name: "Manche courte" },
  //     { name: "Manche courte" },
  //     { name: "Manche courte" },
  //     { name: "Manche courte" },
  //     { name: "Manche courte" },
  //     { name: "Manche courte" },
  //     { name: "Manche courte" },
  //     { name: "Manche courte" },
  //     { name: "Manche courte" },
  //     { name: "Manche courte" },
  //     { name: "Manche courte" },
  //     { name: "Manche courte" },
  //     { name: "Manche courte" },
  //     { name: "Manche courte" },
  //     { name: "Manche courte" },
  //     { name: "Manche courte" },
  //   ],
  //   Division: [
  //     { name: "Manche courte" },

  //   ],
  //   Utilitaire: [
  //     { name: "Camion de transport" },
  //   ],
  // },
  banners: "header1.webp",
  CdnUrl: "Concessionnaire/Voiture",
  type: "garage",
  options: ["Service", "Division", "Utilitaire"],
  categories: {
    Service: [
      { name: "Manche courte" },
      { name: "Manche courte" },
      { name: "Cérémonie" },
      { name: "Manche courte" },
      { name: "Manche courte" },
      { name: "Manche courte" },
      { name: "Manche courte" },
      { name: "Manche courte" },
      { name: "Manche courte" },
      { name: "Manche courte" },
      { name: "Manche courte" },
      { name: "Manche courte" },
      { name: "Manche courte" },
      { name: "Manche courte" },
      { name: "Manche courte" },
      { name: "Manche courte" },
      { name: "Manche courte" },
      { name: "Manche courte" },
      { name: "Manche courte" },
      { name: "Manche courte" },
    ],
    Division: [
      { name: "Manche courte" },

    ],
    Utilitaire: [
      { name: "Camion de transport" },
    ],
  },
};

export const Builder = (visible: boolean) => {
  debugData([
    {
      action: "nui:Builder:visible",
      data: visible,
    },
  ]);
  debugData([
    {
      action: "nui:builder:data",
      data: BuilderData,
    },
  ]);
};
