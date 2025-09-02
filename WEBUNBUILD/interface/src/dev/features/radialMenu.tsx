import { RadialMenuData } from "@/features/RadialMenus/types";
import { debugData } from "@/hook";

export const radialMenu = (visible: boolean) => {
  debugData([
    {
      action: 'nui:radial-menu:data',
      data: mockData
    }
  ]);
  debugData([
    {
      action: 'nui:radial-menu:visible',
      data: visible
    }
  ]);
}

const mockData: RadialMenuData = {
  elements: [
    { name: "Salut" },
    { name: "Bonjour" },
    { name: "Hey" },
    { name: "Yo !" }
  ],
  title: "GESTION ANIMAL",
  key: "e",
  bar: {
    crew: "Ballas gang",
    time: "0",
    color: "#33963C",
    value: "57",
    valueString: "Level 57",
    rank: "S",
    postAsync: {
      url: "core:medicalBed:heal",
      data: {},
    },
  },
}