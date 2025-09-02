import "../style/Localisation.scss";
import React from "react";
import MediaCdn from "@/components/mediaCdn/mediaCdn.tsx";

export interface LocalisationProps {
    data: {
        visible: boolean;
        color: string;
        icon: string;
        position: string;
    };
}

const Localisation: React.FC<LocalisationProps> = ({data: {visible, color, icon, position}}) => {
    return visible ? (
        <div id="localisation" style={{ '--hover-color': color } as React.CSSProperties}>
            <div className="icon-wrapper">
                <MediaCdn
                    path="assets/hud/localisation"
                    name={`indicator.svg`}
                    props={{className: "icon default"}}
                />
                <MediaCdn
                    path="assets/Illégal/Image/Groupes"
                    name={`${icon}.webp`}
                    props={{className: "icon hover"}}
                />
            </div>
            <p>{position}</p>
        </div>
    ) : null;
}

export default Localisation;