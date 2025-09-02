import './MenuLTD.scss';
import React, {useEffect, useState} from "react";
import MenuLeft from "@/components/MenuLeft/MenuLeft.tsx";
import {fetchNui, useNuiEvent} from "@/hook";
import Infos from "@/features/MenuLTD/Components/Infos/Infos.tsx";
import Button from "../../components/MenuLeft/Components/Button/Button.tsx";
import { Slider } from "@mui/material";
import {ltdData} from "@/features/MenuLTD/types.ts";
import MediaCdn from "@/components/mediaCdn/mediaCdn.tsx";
import {useEscapeKey} from "@hooks/useKeys.tsx";

const MenuLTD: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [volume, setVolume] = useState(1);
    const [data, setData] = useState<ltdData | null>(null);
    const [payment, setPayment] = useState("carte");
    const [action, setAction] = useState("plein");
    const [disabled, setDisabled] = useState(false);
    const [sendData, setSendData] = useState({
        volume: 1,
        payment: "",
        action: ""
    });

    const banner = {
        path: 'assets/catalogues/headers',
        name: 'header_ltdgroove.webp'
    }

    const handleClose = () => {
        setVisible(false);
        setPayment("carte");
        setAction("plein");
        fetchNui("nui:menu-ltd:close");
    };

    useEscapeKey(() => {
        handleClose();
    }, visible);

    useNuiEvent('nui:menu-ltd:visible', (status: boolean) => {
        setVisible(status);
    })

    useNuiEvent('nui:menu-ltd:data', (data: ltdData) => {
        setData(data);
        setVolume(data?.quantity)
    })

    const handleVolumeChange = (_e: Event, newValue: number | number[]) => {
        setVolume(newValue as number);
    };

    const handleAction = (action: string, ) => {
        setAction(action);
        if (action === "plein") {
            setDisabled(true);
            setVolume(data?.quantity ?? 0);
        }

        if (action === "manuel") {
            setDisabled(false);
        }

        if (action === "bidon") {
            setDisabled(true);
            setVolume(10);
        }
    }

    const handleSubmit = () => {
        if (!sendData.volume || !sendData.payment || !sendData.action) return;
        fetchNui("nui:menu-ltd:submit", sendData);
        handleClose();
    }

    useEffect(() => {
        setSendData({
            volume: volume,
            payment: payment,
            action: action
        })
    }, [volume, payment, action, disabled])

    const totalPrice = data ? volume * (data.price ?? 0) : 0;

    return visible ?(
        <MenuLeft banner={banner}>
            <div className="MenuLTD_title">
                <p>Pompe à essence</p>
            </div>
            <div className="MenuLTD_container">
                <div className="MenuLTD_info_container">
                    <Infos text="Volume" quantity={volume.toFixed(2)} color="yellow" />
                    <Infos text="Prix" quantity={totalPrice.toFixed(2)} color="green" />
                </div>
                <div className="MenuLTD_action_container">
                    <p className="title-section">Action</p>
                    <div className="MenuLTD_action_button_container">
                        <Button text="Plein" type="MenuLeft_button_action" color={`green-hover ${action === "plein" ? "active" : ""}`} onClick={() => handleAction("plein")} />
                        <Button text="Manuel" type="MenuLeft_button_action" color={`green-hover ${action === "manuel" ? "active" : ""}`} onClick={() => handleAction("manuel")} />
                        <Button text="Bidon" type="MenuLeft_button_action" color={`green-hover ${action === "bidon" ? "active" : ""}`} onClick={() => handleAction("bidon")} />
                    </div>
                </div>
                <div className="MenuLTD_volume_container">
                    <div className="infos">
                        <p className="title-section">Volumes</p>
                        <p className="quantity">{volume} Litres</p>
                    </div>
                    <Slider
                        value={volume}
                        onChange={handleVolumeChange}
                        min={0}
                        max={data?.quantity}
                        step={1}
                        disabled={disabled}
                    />
                </div>
                <div className="MenuLTD_payment_container">
                    <p className="title-section">Paiement</p>
                    <div className={`payment_choice ${payment === "espèce" ? "active" : ""}`} onClick={() => setPayment("espèce")}>
                        <MediaCdn path="assets/icons" name="money.svg" />
                        <p>Espèce</p>
                    </div>

                    <div className={`payment_choice ${payment === "carte" ? "active" : ""}`} onClick={() => setPayment("carte")}>
                        <MediaCdn path="assets/icons" name="card.svg" />
                        <p>Carte bancaire</p>
                    </div>
                </div>
                <Button text="Valider" type="MenuLeft_button_validate" color="green" onClick={() => handleSubmit()} />
            </div>
        </MenuLeft>
    ): null;
}

export default MenuLTD;