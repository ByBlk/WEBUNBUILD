import { debugData } from "@/hook";

export const activityCreationMenu = (visible: boolean) => {
  debugData([
    {
      action: 'nui:activity-creation:data',
      data: mockData
    }
  ]);
  debugData([
    {
      action: 'nui:activity-creation:visible',
      data: visible
    }
  ]);
}

const mockData = {
  type: 'faction'
}