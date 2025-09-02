import { debugData } from "@/hook";

export const Identity = (visible: boolean) => {
    debugData([
        {
            action: 'nui:identity:visible',
            data: visible
        }
    ]);
    debugData([
        {
            action: 'nui:identity:data',
            data: {
                type: "identity",
                expiration_date: "01/01/2026",
                end_date: "none",
                lastName: "Doe",
                firstName: "John",
                date_of_birth: "29/09/1998",
                rstr: "none",
                sex: "M",
                height: "180",
                hair: "Brn",
                weight: "75",
                eye_color: "Blk",
                address: "123 Main St, Springfield",
                photo: "https://cdn.discordapp.com/attachments/123456789012345678/123456789012345678/unknown.png",
            }
        }
    ]);
}