import { debugData } from "@/hook";

export const sound = (visible: boolean) => {
  debugData([
    {
      action: 'nui:SoundPlayer:visible',
      data: visible
    }
  ])
}