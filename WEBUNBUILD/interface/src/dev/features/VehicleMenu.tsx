import { debugData } from "@/hook";

export const VehicleMenu = (visible: boolean) => {
  debugData([
    {
      action: "nui:vehicleMenu:visible",
      data: visible
    }
  ])
}