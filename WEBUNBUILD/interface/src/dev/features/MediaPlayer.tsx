import { debugData } from "@/hook";

export const MediaPlayer = (visible: boolean) => {
    debugData([
        {
            action: 'nui:media-player:visible',
            data: visible
        }
    ]);
}