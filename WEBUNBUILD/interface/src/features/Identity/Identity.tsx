import "./Identity.scss";
import React, {useEffect, useState} from "react";
import {fetchNui, useNuiEvent} from "@/hook";
import {useBackspaceKey} from "@hooks/useKeys.tsx";
import {IIdentityData} from "@/features/Identity/types.ts";

const Identity: React.FC = () => {

    const [visible, setVisible] = useState(false);
    const [data, setData] = useState<IIdentityData | null>(null);
    const [cardType, setCardType] = useState<string | null>(null);

    useBackspaceKey(() => {
        fetchNui("nui:identity:close");
    }, visible);

    useNuiEvent("nui:identity:visible", (status: boolean) => {
        setVisible(status);
    });

    useNuiEvent("nui:identity:data", (data: IIdentityData) => {
        setData(data);
    })

    useEffect(() => {
        if (data) {
            setCardType(data.type);
        }
    }, [data]);

    return visible ? (
        <div id="layout_card" className={`${cardType}-card`}>
            {cardType === "driver" && <p className="driver_licence">{data?.dl}</p>}
            <p className="exp_date">{data?.expiration_date}</p>
            <p className="last_name">{data?.lastName}</p>
            <p className="first_name">{data?.firstName}</p>
            <p className="address">{data?.address}</p>
            <p className="date_of_birth">{data?.date_of_birth}</p>
            <p className="rstr">{data?.rstr}</p>
            {cardType === "driver" &&<p className="class">{data?.class}</p>}
            <p className="end_date">{data?.end_date}</p>
            <p className="sex">{data?.sex}</p>
            <p className="height">{data?.height}</p>
            <p className="hair">{data?.hair}</p>
            <p className="weight">{data?.weight}kg</p>
            <p className="eyes">{data?.eye_color}</p>
            <img className="primary_mugshot" src={data?.photo} alt="mugshot"/>
            <img className="secondary_mugshot" src={data?.photo} alt="mughsot"/>
        </div>
    ) : null;
}

export default Identity;