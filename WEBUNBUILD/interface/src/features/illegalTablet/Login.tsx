import "./style.scss";
import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";

const TabletteLogin: React.FC<any> = ({ changePage }) => {
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsLogged(true);
		}, 3000);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			changePage("Main");
		}, 4000);
	}, [changePage]);

	return (
		<>
			<ReactSVG
				className={"DigitalPrint " + (isLogged ? "yellow" : "")}
				src={"https://cdn.eltrane.cloud/3838384859/assets/tabletteIllegale/empreinte.svg"}
			/>
			<div className="span inser">{!isLogged ? "authentification..." : "authentification réussie"}</div>

			{isLogged ? (
				<div className="checkmark">
					<img src="https://cdn.eltrane.cloud/3838384859/assets/tabletteIllegale/checkmark_yellow.webp" />
				</div>
			) : (
				<div className="progressBar">
					<div className="track"></div>
				</div>
			)}
		</>
	);
};

export default TabletteLogin;
