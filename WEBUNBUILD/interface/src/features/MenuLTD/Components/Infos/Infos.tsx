import './Infos.scss';
import React from "react";
import Button from "../../../../components/MenuLeft/Components/Button/Button.tsx";
import { InfosProps } from "../../types.ts";

const Infos: React.FC<InfosProps> = ({text, quantity, color}) => {
    return (
        <div className="MenuLTD_info">
            <Button text={text} type="MenuLeft_button_infos" color={color} onClick={() => {}} />
            <div className="MenuLTD_quantity">
                <p className="">{ quantity }</p>
            </div>
        </div>
    )
}

export default Infos;