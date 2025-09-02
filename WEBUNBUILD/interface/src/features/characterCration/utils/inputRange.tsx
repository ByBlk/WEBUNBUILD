import clsx from "clsx";
import React, { ChangeEventHandler } from "react";

const InputRange: React.FC<{
	rangeName?: string;
	className?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	customStyle?: React.CSSProperties;
	max?: number;
	min?: number;
	defaultV: number;
	containerStyle?: React.CSSProperties;
}> = (
	{ rangeName, className, onChange, customStyle, max = 10, min = 0, defaultV = 5, containerStyle }
) => {
		const classx = clsx("range rangeWrapper", className);
		return (
			<div className={classx} style={containerStyle}>
				<span className="rangeLabel">{rangeName}</span>
				<div className="rangeBottom">
					<input type="range" max={max} defaultValue={defaultV} min={min} onChange={onChange} style={customStyle} />
				</div>
			</div>
		);
	};

export default InputRange;
