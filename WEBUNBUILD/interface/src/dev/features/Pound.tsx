import { debugData } from "@/hook";
const PoundData = {
  Crew: [
    { name: "REVOLTER", model: "revolter", price: 1500 },
    { name: "REVOLTER", model: "insurgent", price: 5000 },
  ],
  Personnel: [
    { name: "REVOLTER", model: "blista", price: 1000 },
    { name: "REVOLTER", model: "sultan", price: 1200 },
  ],
  Business: [
    { name: "REVOLTER XF", model: "entityxf", price: 2000 },
    { name: "REVOLTER", model: "zentorno", price: 3000 },
  ],
};


export const Pound = (visible: boolean) => {
  debugData([
    {
      action: 'nui:pound:visible',
      data: visible
    }
  ]);
   debugData([
      {
        action: 'nui:pound:data',
        data: PoundData
      }
    ]);
}





