import React, { useEffect } from "react";

import { fetchNui } from "@/hook/fetchNui";

export type IInputProps = {
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	onFocus?: React.FocusEventHandler<HTMLInputElement>;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = React.forwardRef((props: IInputProps, ref) => {
	const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		fetchNui("setTyping", { value: false });
		if (props.onBlur) {
			props.onBlur(event);
		}
	};

	const onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		fetchNui("setTyping", { value: true });
		if (props.onFocus) props.onFocus(event);
	};

	useEffect(() => {
		return () => {
			fetchNui("setTyping", { value: false });
		};
	}, []);

	return <input {...props} onFocus={onFocus} onBlur={onBlur} ref={ref as any} />;
});

Input.displayName = "Input";

export default Input;
