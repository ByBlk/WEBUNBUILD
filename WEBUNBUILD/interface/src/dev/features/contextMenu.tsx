import { debugData } from "@/hook";

export const ContextMenu = (visible: boolean) => {
  debugData([
    {
      action: 'nui:context-menu:visible',
      data: visible
    }
  ])
}