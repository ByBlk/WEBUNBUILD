import React from "react";

interface ButtonHintsProps {
	buttons: { [key: string]: string };
}

const isUrl = (str: string) => {
	console.log(str);
	try {
		new URL(str);
		return true;
	} catch (_) {
		return false;
	}
};

export const ButtonHints: React.FC<ButtonHintsProps> = props => {
	return (
		<div className="ButtonHints">
			{Object.keys(props.buttons).map((key, index) => (
				<div key={index}>
					{/* {props.buttons[key]} <div className="Button">{key}</div> */}
					{isUrl(key) ? (
						<>
							{props.buttons[key]}
							<div className="Button">
								<img src={key} alt={props.buttons[key]} />
							</div>
						</>
					) : (
						<>
							{props.buttons[key]} <div className="Button">{key}</div>
						</>
					)}
				</div>
			))}
		</div>
	);
};
