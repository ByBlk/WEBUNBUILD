import React from "react";

interface IButtonProps {
    name?: string;
    icon?: any;
    borderColor?: string;
    className?: string;
    onClick?: () => void;
}

const Button: React.FC<IButtonProps> = ({ name, icon, borderColor, className, onClick }) => {
    return (
        <div className="button_floor_box">
            <div
                style={{ borderColor: borderColor ? borderColor : "#e4a045", color: "#e4a045" }}
                className={className}
                onClick={onClick}>
                {name && <p>{name}</p>}
                {icon && <img src={icon} />}
            </div>
        </div>
    );
};

export default Button;