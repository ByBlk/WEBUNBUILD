import { debugData } from "@/hook";

export const ServerGestion = (visible: boolean) => {
  debugData([
    {
      action: 'nui:server-gestion:visible',
      data: visible
    }
  ])
}