import { debugData } from "@/hook";

export const habitationMenu = (visible: boolean) => {
  debugData([
    {
      action: 'nui:habitation-menu:visible',
      data: visible
    }
  ]);
}