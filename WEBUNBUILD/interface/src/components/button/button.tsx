import React from "react";
import "./style.scss";
import { playOnClickSound, playOnHoverSound } from "@utils/playSound";

const Button: React.FC<any> = ({
	label,
	height,
	width,
	fontSize,
	fontWeight,
	color,
	margin,
	callback,
	selected,
	padding,
	children,
	disabledType,
	selectedStyle = {
		filter: "brightness(1.1)",
	},
	// disableHoverSound = false,
	submitSound = false,
	disabled = false,
	readOnly = false,
	customVisu,
	background
}) => {
	return (
		<div
			onClick={() => {
				if (callback) callback();
				if (submitSound) {
					playOnClickSound();
				} else {
					playOnHoverSound();
				}
			}}
			className={
				"buttonCustom "
				+ color + " " +
				(disabled ? "disabled" : "") +
				(readOnly ? "readOnly" : "") +
				" " + (disabledType ?? "") +
				" " + (selected ? "selected" : "")
			}
			style={{
				height,
				width,
				fontSize,
				fontWeight,
				padding,
				margin,
				minHeight: height,
				...(selected ? { ...selectedStyle } : {}),
				background
			}}>
			{customVisu}
			<div className="buttonCustomContainer">
				{label}
				{children}
				{disabled && disabledType === "goldSubscriptionRequired" && <span className="disabledGoldRequired">ABONNEMENT GOLD</span>}
			</div>
		</div>
	);
};

export default Button;
