import { debugData } from "@/hook";

export const escapeMenu = (visible: boolean) => {
  debugData([
    {
      action: 'nui:escape-menu:data',
      data: mockData
    }
  ]);
  debugData([
    {
      action: 'nui:escape-menu:visible',
      data: visible
    }
  ]);
}

const mockData = {
  premium: true,
  premiumEndDate: 1709691273,
  credit: 1000,
  unique_id: "69",
  serverType: 'FA'
}