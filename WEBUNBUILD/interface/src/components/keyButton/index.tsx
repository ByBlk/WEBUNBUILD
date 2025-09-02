import "./style.scss";

import React from "react";

interface ButtonHintsProps {
	keybind: string;
	disabled: boolean;
	onClick?: () => void;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	children: string;
	color: string;
	style?: React.CSSProperties;
}

export const KeyButton: React.FC<ButtonHintsProps> = props => {
	return (
		<button
			style={props.style || {}}
			className={"key-button animate " + props.color}
			disabled={props.disabled}
			onClick={() => props.onClick && props.onClick()}
			onMouseEnter={() => props.onMouseEnter && props.onMouseEnter()}
			onMouseLeave={() => props.onMouseLeave && props.onMouseLeave()}>
			<h1 className={props.disabled ? "disabled" : props.color}>{props.keybind}</h1>
			<div className="text">{props.children}</div>
		</button>
	);
};
