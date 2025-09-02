import { AlternatePropertyMenuData } from "@/features/alternatePropertyMenu/types";
import { debugData } from "@/hook";

export const alternatePropertyMenu = (visible: boolean) => {
  debugData([
    {
      action: 'nui:alternate-property-menu:data',
      data: mockData
    }
  ]);
  debugData([
    {
      action: 'nui:alternate-property-menu:visible',
      data: visible
    }
  ]);
}

const mockData: AlternatePropertyMenuData = {
  boiteWeight: 1.2,
  isLocked: false,
  name: "28 avenue <b>fleurie</b>",
  canPerqui: true,
  owner: "Bryan Anderson",
  playerFace: '',
  hideIdentity: true
}