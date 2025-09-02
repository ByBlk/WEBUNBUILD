import { PropertyManagementData } from "@/features/propertyManagement/type";
import { debugData } from "@/hook";

export const propertyManagement = (visible: boolean) => {
  debugData([
    {
      action: 'nui:property-management:data',
      data: mockData
    }
  ]);
  debugData([
    {
      action: 'nui:property-management:visible',
      data: visible
    }
  ]);
}

const mockData: PropertyManagementData = {
  timeLeft: 7,
  acces: "ouvert",
  type: "personnel",
  haveAccess: [
    { label: "Marcel Stravinski", id: 1 },
    { label: "Jean Neige", id: 2 },
    { label: "Ash Ketchum", id: 3 },
  ],
  maxDuration: 10,
}