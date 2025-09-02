import React, { FocusEventHandler } from "react";

const Input: React.FC<{
	label: string;
	value: string;
	setValue: Function;
	onBlur?: FocusEventHandler<HTMLInputElement>;
	style?: React.CSSProperties;
}> = ({ label, value, setValue, onBlur, style }) => {
	return (
		<div className="inputComponent" style={style}>
			{label && <label>{label}</label>}
			<input value={value} onChange={e => setValue(e.currentTarget.value)} onBlur={onBlur} type="text" />
		</div>
	);
};

export default Input;
