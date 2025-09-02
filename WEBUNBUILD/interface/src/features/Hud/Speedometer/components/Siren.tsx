import React from "react";
import MediaCdn from "@/components/mediaCdn/mediaCdn.tsx";

interface HeadlightProps {
    data: {
        isSiren: boolean;
        isSirenSound: boolean;
    };
}
const SirenComponent: React.FC<HeadlightProps> = ({ data }) => {
    return (
        <div className="SirenComponent">
            <div className='icon'>
                {(data.isSiren ?
                        <MediaCdn path={"assets/hud"} name="siren-on.svg" />
                        :
                        <MediaCdn path={"assets/hud"} name="siren.svg" />
                )}
            </div>
            <div className='icon'>
                {(data.isSirenSound ?
                        <MediaCdn path={"assets/hud"} name="siren-sound-on.svg" />
                        :
                        <MediaCdn path={"assets/hud"} name="siren-sound.svg" />
                )}
            </div>
        </div>
    );
};

export default SirenComponent;