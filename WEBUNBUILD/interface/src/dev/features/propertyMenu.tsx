import { PropertyMenuData } from "@/features/propertyMenu/types";
import { debugData } from "@/hook";

export const propertyMenu = (visible: boolean) => {
  debugData([
    {
      action: 'nui:property-menu:data',
      data: mockData
    }
  ]);
  debugData([
    {
      action: 'nui:property-menu:visible',
      data: visible
    }
  ]);
}

const mockData: PropertyMenuData = {
  nameProperty: "",
  rental: 5,
  coOwnerList: [
    {
      id: "0",
      name: "Téléphone",
      face: "https://cdn.eltrane.cloud/3838384859/Propriete/img0.webp",
    },
    {
      id: "1",
      name: "Daily News",
      face: "https://cdn.eltrane.cloud/3838384859/Propriete/img1.webp",
    },
  ],
  name: "28 avenue fleurie",
  access: "sonnette",
}