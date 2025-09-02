import { debugData } from "@/hook";

export const PPA = (visible: boolean) => {
  debugData([
    {
      action: 'nui:ppa:visible',
      data: visible
    }
  ]);
  debugData([
    {
      action: 'nui:ppa:setData',
      data: { name: "test", residence: "test", address: "test", occupation: "test", business: "test", photo: "test", issuer: "test" }
    }
  ]);
}