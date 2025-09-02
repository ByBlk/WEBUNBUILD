import { debugData } from "@/hook";

export const MenuPlaque = (visible: boolean) => {
  debugData([
    {
      action: 'nui:menuplaque:visible',
      data: visible
    }
  ]);
  debugData([
    {
      action: 'nui:menuplaque:data',
      data: {
        current: "test"
      }
    }
  ]);
}