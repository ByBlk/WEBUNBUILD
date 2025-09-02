import { capitalize } from "@utils/misc";
import React, { useState } from "react";

const Button: React.FC<{ typesNames: [string, string, string, string], value: { x: number, y: number }, setValue: Function, style?: React.CSSProperties }> = (
	{ typesNames = ["", "", "", ""], value, setValue, style }
) => {
	const [selected, setSelected] = useState(false);

	const onMouseUp = () => {
		setSelected(false);
	};

	React.useEffect(() => {
		window.addEventListener("mouseup", onMouseUp);
		return () => window.removeEventListener("mouseup", onMouseUp);
	}, []);

	return (
		<div className="squares" style={style}>
			{typesNames.map((typeName, index) => (
				<React.Fragment key={"square" + index}>
					{typeName && (
						<span className={(index === 0 ? "top" : index === 1 ? "right" : index === 2 ? "bottom" : "left") + " label"}>
							{capitalize(typeName)}
						</span>
					)}
				</React.Fragment>
			))}

			<div
				className="squaresWrapper"
				onMouseDown={() => setSelected(true)}
				onMouseMove={event => {
					if (selected) {
						let localX = event.clientX - event.currentTarget.getBoundingClientRect().left - 0.578125 + 1;
						let localY = event.clientY - event.currentTarget.getBoundingClientRect().top;

						if (localX < 0) localX = 0;
						if (localX > 131) localX = 131;
						if (localY < 0) localY = 0;
						if (localY > 131) localY = 131;
						setValue({ x: localX / 65.5 - 1, y: localY / 65.5 - 1 });
					}
				}}>
				<div className="quadrillage">
					{(() => {
						let SQUARES = [];
						for (let i = 0; i < 36; i++) {
							SQUARES.push(<div className="square"></div>);
						}
						return SQUARES;
					})()}
				</div>
				{
					<div
						className="Cursor"
						style={{
							left: value.x * 65.5 + 65.5 - 5 + "px",
							top: value.y * 65.5 + 65.5 - 5 + "px",
						}}
					/>
				}
			</div>
		</div>
	);
};

export default Button;
