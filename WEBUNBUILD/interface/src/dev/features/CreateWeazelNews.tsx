import {debugData} from "@/hook";

export const CreateWeazelNews = (visible: boolean) => {
    debugData([
        {
            action: 'nui:weazelNewsAnnouncement:visible',
            data: visible,
        }
    ]);
    debugData([
        {
            action: 'nui:weazelNewsAnnouncement:data',
            data: {
                job: "weazelnews"
            }
        }
    ]);
}
