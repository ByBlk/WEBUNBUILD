import { debugData } from "@/hook";

export const MenuVehicule = (visible: boolean) => {
  debugData([
    {
      action: 'nui:menuvehicule:visible',
      data: visible
    }
  ]);
  debugData([
    {
      action: 'nui:menuvehicule:setData',
      data: { name: "test", residence: "test", address: "test", occupation: "test", business: "test", photo: "test", issuer: "test" }
    }
  ]);
}