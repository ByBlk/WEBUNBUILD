import { debugData } from "@/hook";

export const DeathScreen = (visible: boolean) => {
  debugData([
    {
      action: 'nui:deathscreen:visible',
      data: visible
    }
  ]);
}