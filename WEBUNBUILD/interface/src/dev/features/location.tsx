import { debugData } from "@/hook";
import { getCdnUrl } from "@utils/misc";

export const location = (visible: boolean) => {
  debugData([
    {
      action: 'nui:location:data',
      data: mockData
    }
  ]);
  debugData([
    {
      action: 'nui:location:visible',
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
    },
    {
      id: 30,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/Binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
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
      subCategory: "haut",
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
      image: getCdnUrl('autoecole', 'question6.webp'),
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
  headerSubName: "Salut",
  isUserPremium: false,
  sideButtonsTitle: 'Catégories',
  menuEstheticData: {
    globalTitle: 'Bob Mulet',
    topGradient: 'linear-gradient(to right, rgba(139, 106, 34, .6) 0%, rgba(234, 215, 148, .6) 56%, rgba(219, 200, 147, 0) 100%)'
  },
  cameras: [
    { label: '1', callback: 'camera1', cameraArgument: 'test' },
    { label: '1', callback: 'camera1' },
    { label: '1', callback: 'camera1' },
    { label: '1', callback: 'camera1' },
    { label: '1', callback: 'camera1' },
  ]
}