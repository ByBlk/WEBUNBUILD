import "../../../style/invite.scss";
import React from "react";
import MediaCdn from "@/components/mediaCdn/mediaCdn.tsx";
import {INotificationPresetProps} from "@/features/Hud/types.ts";

export const Invite: React.FC<INotificationPresetProps> = ({title, mainMessage}) => {

    return (
        <div className="notification_wrapper">
            <div className="notification_header">
                <p>{title}</p>
                <div className="buttons_container">
                    <MediaCdn path="assets/icons" name="yes_icon.svg" />
                    <MediaCdn path="assets/icons" name="no_icon.svg" />
                </div>
            </div>
            <div className="notification_message">
                <p>{mainMessage}</p>
            </div>
        </div>
    );
}

