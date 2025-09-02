import { debugData } from "@/hook";

export const GaragePublic = (visible: boolean) => {
  debugData([
    {
      action: 'nui:garagePublic:visible',
      data: visible
    }
  ]);
  debugData([
    {
      action: 'nui:garagePublic:Emplacement',
      data: {
        items: EmplacementData,
        premium: false, 
        premiumplus: false,
      }
    }
  ]);

  debugData([
    {
      action: 'nui:garagePublic:Fourrière',
      data: FourriereData,
    }
  ]);
};

const EmplacementData = [
  {
    id: 'davdav',
    name: "Glof XZ",
    img: "2.png",
  },
  
]

const FourriereData = [
  {
    id: 1,
    name: "Fourriere 1",
    img: "2.png",
  },
  {
    id: 2,
    name: "Fourriere 2",
    img: "1.png",
  },
  {
    id: 3,
    name: "Fourriere 3",
    img: "2.png",
  },
]