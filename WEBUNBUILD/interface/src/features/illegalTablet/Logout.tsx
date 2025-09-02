import "./style.scss";
import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";

const TabletteLogout: React.FC<any> = () => {
	const [isLogged, _setIsLogged] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			close();
		}, 3000);
	}, []);

	return (
		<>
			<ReactSVG
				className={"DigitalPrint " + (isLogged ? "yellow" : "")}
				src={"https://cdn.eltrane.cloud/3838384859/assets/tabletteIllegale/empreinte.svg"}
			/>
			<div className="span inser">déconnexion...</div>

			{isLogged ? (
				<div className="checkmark">
					<svg xmlns="http://www.w3.org/2000/svg" width="39" height="31" viewBox="0 0 39 31" fill="none">
						<path
							d="M12.6092 24.1586L3.47457 14.7318L0.429688 17.8741L12.6092 30.4431L38.7082 3.50945L35.6633 0.367188L12.6092 24.1586Z"
							fill="url(#paint0_linear_2072_273)"
						/>
						<defs>
							<linearGradient
								id="paint0_linear_2072_273"
								x1="19.5689"
								y1="0.367187"
								x2="19.5689"
								y2="30.4431"
								gradientUnits="userSpaceOnUse">
								<stop stopColor="#BD8D00" />
								<stop offset="1" stopColor="#F4C703" />
							</linearGradient>
						</defs>
					</svg>
				</div>
			) : (
				<div className="progressBar">
					<div className="track"></div>
				</div>
			)}
		</>
	);
};

export default TabletteLogout;
