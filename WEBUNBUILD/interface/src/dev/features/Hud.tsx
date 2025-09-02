import { debugData } from "@/hook";
export const Hud = (visible: boolean) => {
  debugData([
    {
      action: 'nui:hud:visible:healthArmor',
      data: {
        visible: visible,
        health: 100,
        armor: 100
      }
    }
  ]);
  debugData([
    {
      action: 'nui:hud:visible:microphone',
      data: {
        visible: visible,
        type: 1
      }
    }
  ]);
  debugData([
    {
      action: 'nui:hud:visible:staffboard',
      data: {
        visible: visible,
        players: 179,
        staff: 12,
        reports: 18
      }
    }
  ]);
  debugData([
    {
      action: 'nui:hud:visible:interactNotif',
      data: {
        visible: visible
      }
    }
  ]);
  debugData([
    {
      action: 'nui:speedometer:visible',
      data: {
        visible: visible,
        fuelState: 10,
        speedState: 20,
        motorState: 40,
        HeadlightTop: false,
        HeadlightBottom: false,
        TursignalLeft: false,
        TursignalRight: false,
      }
    },
  ]);
  debugData([
    {
      action: 'nui:safezone:visible',
      data: {visible: visible}
    }
  ]);
  debugData([
    {
      action: 'nui:weapon:data',
      data: {
        visible: visible,
        weapon: "weapon_pistol",
        bullets: 1,
        maxBullets: 4
      }
    }
  ]);
  debugData([
    {
      action: 'nui:hud:visible',
      data: { visible: visible }
    }
  ]);
}