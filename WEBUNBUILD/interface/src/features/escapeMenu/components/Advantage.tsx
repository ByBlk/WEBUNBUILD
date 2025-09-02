import MediaCdn from "@/components/mediaCdn/mediaCdn.tsx";
import React from "react";

interface Props {
    url_cdn: string;
    name: string;
    text: string;
    value: string;
    revert?: boolean;
}

const Advantage: React.FC<Props> = ({url_cdn, name, text, value, revert=false}) => {
    return (
        <div className="advantage">
            <div className="logo">
                <MediaCdn path={url_cdn} name={name} />
            </div>
            <div className="text">
                {revert ? (
                    <p><span>{text} </span>{value}</p>
                )
                :
                (
                    <p>{text} <span>{value}</span></p>
                )
                }



            </div>
        </div>
    )
}

export default Advantage;