import "./index.scss";

import React, {useState} from "react";
import {fetchNui, useNuiEvent} from "@/hook";
import MediaCdn from "@/components/mediaCdn/mediaCdn.tsx";


interface INotifEntreprise {
    name?: string;
    logo?: string;
    phone?: string;
    message?: string;
    typeannonce?: string;
}

const CardNewsSocietyShow: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState<INotifEntreprise | null>(null);

    useNuiEvent('nui:CardNewsSocietyShow:visible', (status: boolean) => {
        setVisible(status);
    });

    useNuiEvent('nui:CardNewsSocietyShow:data', (data: any) => {
        setData(data);
    })

    const handleClose =  () => {
        fetchNui('notificationSociety_callback');

        setTimeout(() => {}, 8000);
    };

    handleClose();
    return visible ? (
        /* <div className="preview"> */
        <div className="showAnnonce">
            <div className="main">
                <div className="img">
                    <img src={data?.logo} />
                </div>
                <div className="infos">
                    <div className="name">{data?.name}</div>
                    <div className={data?.typeannonce?.toLowerCase()}>{data?.typeannonce?.toUpperCase()}</div>
                    <div className="message">{data?.message}</div>
                    <div className="phone">{data?.phone}</div>
                    <MediaCdn path={"assets/icons"} name={"green-phone.webp"} props={{className: "phonelogo"}} />
                </div>
            </div>
            <div className="cProgressbar">
                <div className="track"></div>
            </div>
        </div>
        /* </div> */
    ) : null;
};

export default CardNewsSocietyShow;
