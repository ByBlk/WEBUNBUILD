import { debugData } from "@/hook";
import { getCdnUrl } from "@utils/misc";
export const Multichar = (visible: boolean) => {
  debugData([
    {
      action: 'nui:multichar:visible',
      data: visible
    }
  ]);
  debugData([
    {
      action: 'nui:multichar:data',
      data: { 
        visible: visible, 
        items: [
          { 
            id: 5412,
            info: 1,
            firstName: 'Gros', 
            lastName: 'Lardon', 
            img: getCdnUrl("visionv2/creator", "perso.png")
          }
        ], 
        isPremium: true, 
        isPremiumPlus: false 
      }
    }
  ]);

}