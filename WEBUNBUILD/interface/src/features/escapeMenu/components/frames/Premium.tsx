import "../../style/Premium.scss";
import React, {useEffect, useState} from "react";
import PremiumPlus from "../PremiumPlus.tsx";
import PremiumBase from "../PremiumBase.tsx";
import {useEscapeKey} from "@hooks/useKeys.tsx";
import {fetchNui} from "@/hook";

interface IProps {
    premium: string
}

const Premium: React.FC<IProps> = ({premium}) => {
    
    const [premiumPlus, setPremiumPlus] = useState<string>("");

    useEffect(() => {
        setPremiumPlus(premium);
    }, [premium]);

    useEscapeKey(() => {
        fetchNui("nui:premium:close");
    });

    return (
        <div id='premium_interface'>
            {premiumPlus === "PREMIUM" && (<PremiumBase />)}
            {premiumPlus === "PREMIUM+" && (<PremiumPlus />)}    
        </div>
    );
}

export default Premium;