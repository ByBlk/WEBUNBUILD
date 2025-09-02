import "./Button.scss";
import React from "react";
import { ButtonProps } from "../../types.ts";

const Button: React.FC<ButtonProps> = ({text, type, color, onClick}) => {
    return (
        <div onClick={onClick} className={`MenuLeft_button ${type} ${color}`}>
            <p>{text}</p>
        </div>
    )
}

export default Button;