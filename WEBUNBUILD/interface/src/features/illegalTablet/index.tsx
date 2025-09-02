import "./style.scss";
import React, { useEffect, useState } from "react";
import TabletteLogin from "./Login";
import TabletteLogout from "./Logout";
import TabletteMain from "./Main";
import TabletteShop from "./Shop";
import { IIllegalTabletData } from "./types";
import { useNuiEvent } from "@hooks/nuiEvent";
import { fetchNui } from "@hooks/fetchNui";
import { useEscapeKey } from "@hooks/useKeys";

const TabletteIllegale: React.FC = () => {
	const [err, setErr] = useState(false);
	const [visible, setVisible] = useState(false);
	const [data, setData] = useState<IIllegalTabletData>();

	useNuiEvent<boolean>('nui:illegal-tablet:visible', (status) => {
		if (status === true && visible) { 
			setType("Login");
		} else if (status === false && visible) {
			setType("Logout");
		} else if (status === true && !visible) {
			setType("Login");
		}
		setVisible(status);
	});

	useNuiEvent<IIllegalTabletData>('nui:illegal-tablet:data', (data) => {
		setData(data);
	});

	useEffect(() => {
		if (data?.force === "Shop" && data?.errorMessage) {
			setErr(true);
		}
	}, [data?.errorMessage, data?.force]);

	useEscapeKey(() => {
		if (visible) {
			setType("Logout");
		}
		fetchNui('nui:illegal-tablet:close');
	}, visible, 'keydown');

	const close = () => {
		if (visible) {
			setType("Logout");
		}
		setTimeout(() => {
			fetchNui('nui:illegal-tablet:close');
		} , 3000); 
	}

	const [type, setType] = useState(data?.force ?? "Login");

	const showHeader = () => {
		return type === "Main" || type === "Shop";
	};

	return (<>
		{data && visible && <div className={"Tablette " + type}>
			<img className="bg" src="https://cdn.eltrane.cloud/3838384859/assets/tabletteIllegale/tablette.webp"></img>
			{showHeader() && (
				<div className="Header">
					<div className="Buttons">
						<div
							className="Container A-BounceIn"
							style={{
								animationDelay: "0s",
							}}>
							<div
								className="Logo"
								style={{
									background: "linear-gradient(180deg, #FFFFFF 0%, #B7B7B7 100%)",
									border: "1px #d6d5d5 solid",
								}}
								onClick={() => {
									setType("Main");
								}}>
								<img src="https://cdn.eltrane.cloud/3838384859/assets/tabletteIllegale/home.webp" />
							</div>
							<div className="Span">Menu principal</div>
						</div>
						<div
							className="Container A-BounceIn"
							style={{
								animationDelay: "0.2s",
							}}>
							<div
								className="Logo"
								style={{
									background: "linear-gradient(180deg, rgba(30, 180, 90, 0.58) 0%, #002911 100%)",
									border: "1px #135c32 solid",
								}}
								onClick={() => {
									setType("Shop");
								}}>
								<img src="https://cdn.eltrane.cloud/3838384859/assets/tabletteIllegale/shop.webp" />
							</div>
							<div className="Span">Boutique</div>
						</div>
						<div
							className="Container A-BounceIn"
							style={{
								animationDelay: ".4s",
							}}>
							<div
								className="Logo"
								style={{
									background: "linear-gradient(180deg, #3A0000 0%, #840000 100%)",
									border: "1px #650908 solid",
								}}
								onClick={() => {
									close();
								}}>
								<img src="https://cdn.eltrane.cloud/3838384859/assets/tabletteIllegale/disconnect.webp" />
							</div>
							<div className="Span">Déconnexion</div>
						</div>
					</div>
					<div className="Profile">
						<div
							className="Container A-FadeInRight"
							style={{
								animationDelay: ".6s",
							}}>
							<div className="Name">{data?.crewName}</div>
							<div className="Desc">{data?.crewDesc}</div>
						</div>
						<div
							className="Logo A-BounceIn"
							style={{
								background: data?.crewColor,
								animationDelay: ".65s",
							}}>
							{data?.crewInitials}
						</div>
					</div>
				</div>
			)}
			{type === "Login" && <TabletteLogin changePage={setType} />}
			{type === "Logout" && <TabletteLogout changePage={setType} />}
			{type === "Main" && <TabletteMain changePage={setType} data={data} />}
			{type === "Shop" && <TabletteShop changePage={setType} data={data} err={err} setErr={setErr} />}
		</div>}
	</>
	);
};

export default TabletteIllegale;
