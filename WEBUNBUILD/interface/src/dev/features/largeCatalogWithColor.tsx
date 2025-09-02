import { debugData } from "@/hook";

export const largeCatalogWithColor = (visible: boolean) => {
  debugData([
    {
      action: 'nui:large-catalog-color:data',
      data: mockData
    }
  ]);
  debugData([
    {
      action: 'nui:large-catalog-color:visible',
      data: visible
    }
  ]);
}

const mockData = {
  catalogue: [
    {
      id: 0,
      label: 20,
      image: "https://cdn.eltrane.cloud/3838384859/Binco/Hauts/0.webp",
      category: "cheveux",
      price: 12,
    },
    {
      id: 0,
      label: 20,
      image: "https://cdn.eltrane.cloud/3838384859/Binco/Hauts/0.webp",
      category: "cheveux",
    },
  ],
  buttons: [
    {
      name: "cheveux",
      width: "full",
      image: "https://cdn.eltrane.cloud/3838384859/svg/tshirt.svg",
      hoverStyle: "fill-black stroke-black",
      opacity: true,
      color1: true,
      color2: false,
      colorFard: false,
      forceHeader: {
        headerImage: 't',
        headerIcon: 't',
        headerIconName: 't',
        headerSubName: '('
      }
    },
    {
      name: "cheveux2",
      width: "full",
      image: "https://cdn.eltrane.cloud/3838384859/svg/tshirt.svg",
      hoverStyle: "fill-black stroke-black",
    },
    {
      name: "cheveux2",
      width: "full",
      image: "https://cdn.eltrane.cloud/3838384859/svg/tshirt.svg",
      hoverStyle: "fill-black stroke-black",
    },
    {
      name: "cheveux2",
      width: "full",
      image: "https://cdn.eltrane.cloud/3838384859/svg/tshirt.svg",
      hoverStyle: "fill-black stroke-black",
    },
    {
      name: "cheveux2",
      width: "full",
      image: "https://cdn.eltrane.cloud/3838384859/svg/tshirt.svg",
      hoverStyle: "fill-black stroke-black",
      type: "coverBackground",
    },
  ],
  headerIcon: "https://cdn.eltrane.cloud/3838384859/icons/market-cart.webp",
  headerIconName: "VEHICULES",
  headerImage: "https://cdn.eltrane.cloud/3838384859/headers/burgerShot.webp",
  callbackName: "MenuCatalogue",
  showTurnAroundButtons: false,
  disableSubmit: false,
  hideItemList: [""],
  cameras: [
    { label: '1', callback: 'Camera1' }
  ],
}