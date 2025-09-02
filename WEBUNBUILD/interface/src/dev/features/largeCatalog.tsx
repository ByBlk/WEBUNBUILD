import { debugData } from "@/hook";
import { getCdnUrl } from "@utils/misc";

export const largeCatalog = (visible: boolean) => {
  debugData([
    {
      action: 'nui:large-catalog:data',
      data: mockData
    }
  ]);
  debugData([
    {
      action: 'nui:large-catalog:visible',
      data: visible
    }
  ]);
}

const mockData = {
  catalogue: [
    {
      id: 0,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/Binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
      label: "Haut",
      isPremium: true,
    },
    {
      id: 10,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/Binco/Hauts/0.webp",
      category: "bas",
      subCategory: "haut",
      isPremium: true,
      owned: true,
    },
    {
      id: 20,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/Binco/Hauts/0.webp",
      category: "chaussures",
      subCategory: "haut",
      idVariation: 1,
    },
    {
      id: 30,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/Binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
      idVariation: 2
    },
    {
      id: 40,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/Binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
    },
    {
      id: 50,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/Binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
    },
    {
      id: 60,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/Binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
    },
    {
      id: 70,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/Binco/Hauts/0.webp",
      category: "haut",
      subCategory: "variations",
      targetId: 1
    },
    {
      id: 80,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/Binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
    },
    {
      id: 90,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/Binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
    },
    {
      id: 100,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/Binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
    },
    {
      id: 110,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/Binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
    },
  ],
  buttons: [
    {
      name: "haut",
      progressBar: [
        {
          name: "haut",
        },
        {
          name: "variations",
        },
        {
          name: "sous-haut",
        },
        {
          name: "bras",
        },
      ],
      width: "full",
      height: "double",
      image: getCdnUrl('assets/autoecole', 'question1.webp'),
      // hoverStyle: "fill-black stroke-black",
      type: "coverBackground",
      disableAction: true,
    },
    {
      name: "bas",
      progressBar: [
        {
          name: "haut",
        },
        {
          name: "variations",
        },
        {
          name: "sous-haut",
        },
        {
          name: "bras",
        },
      ],
      width: "full",
      image: getCdnUrl('assets/autoecole', 'question2.webp'),
      hoverStyle: " stroke-black",
      type: "coverBackground",
    },
    {
      name: "chaussures",
      progressBar: [
        {
          name: "haut",
        },
        {
          name: "variations",
        },
        {
          name: "sous-haut",
        },
        {
          name: "bras",
        },
      ],
      width: "full",
      hoverStyle: "fill-black ",
      image: getCdnUrl('assets/autoecole', 'question3.webp'),
      type: "coverBackground",
    },
    {
      name: "chaussures3",
      progressBar: [
        {
          name: "haut",
        },
        {
          name: "variations",
        },
        {
          name: "sous-haut",
        },
        {
          name: "bras",
        },
      ],
      width: "full",
      hoverStyle: "fill-black ",
      image: getCdnUrl('assets/autoecole', 'question4.webp'),
      type: "coverBackground",
    },
    {
      name: "chaussures2",
      progressBar: [
        {
          name: "haut",
        },
        {
          name: "variations",
        },
        {
          name: "sous-haut",
        },
        {
          name: "bras",
        },
      ],
      width: "full",
      image: getCdnUrl('assets/autoecole', 'question5.webp'),
      hoverStyle: "fill-black ",
      type: "coverBackground",
    },
    {
      name: "chaussures",
      progressBar: [
        {
          name: "haut",
        },
        {
          name: "variations",
        },
        {
          name: "sous-haut",
        },
        {
          name: "bras",
        },
      ],
      width: "full",
      image: getCdnUrl('assets/autoecole', 'question6.webp'),
      hoverStyle: "fill-black ",
      type: "coverBackground",
    },
    {
      name: "accessoires",
      isPremium: true,
      progressBar: [
        {
          name: "haut",
        },
        {
          name: "variations",
        },
        {
          name: "sous-haut",
        },
        {
          name: "bras",
        },
      ],
      width: "half",
      image: getCdnUrl('assets/autoecole', 'question6.webp'),
      hoverStyle: "fill-black stroke-black",
      type: "coverBackground",
    },
    {
      name: "autres",
      progressBar: [
        {
          name: "haut",
        },
        {
          name: "variations",
        },
        {
          name: "sous-haut",
        },
        {
          name: "bras",
        },
      ],
      width: "half",
      image: getCdnUrl('assets/autoecole', 'question6.webp'),
      hoverStyle: "fill-black stroke-white",
      type: "coverBackground",
    },
  ],
  headerIcon: "https://cdn.eltrane.cloud/3838384859/icons/market-cart.webp",
  headerIconName: "Véhicules",
  headerImage: "https://cdn.eltrane.cloud/3838384859/headers/burgerShot.webp",
  callbackName: "MenuGrosCatalogue",
  showTurnAroundButtons: false,
  disableSubmit: false,
  isUserPremium: false,
  sideButtonsTitle: 'Catégories',
}