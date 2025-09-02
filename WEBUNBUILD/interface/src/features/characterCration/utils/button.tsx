import clsx from "clsx";
import React, { MouseEventHandler } from "react";

const Button: React.FC<{
	disabled?: boolean,
	className?: string,
	onClick?: MouseEventHandler<HTMLButtonElement>,
	style?: React.CSSProperties,
	children?: React.ReactNode,
	type?: string
}> = ({ disabled, className, onClick, style, children, type = "none" }) => {
	const btnClass = clsx("buttonComponent", `buttonComponent-${type}`, className, disabled ? "disabled" : "");

	return (
		<button style={{ ...style }} className={btnClass} disabled={disabled} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
