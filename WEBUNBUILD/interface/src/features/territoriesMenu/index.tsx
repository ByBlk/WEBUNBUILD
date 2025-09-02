import "./style.scss";
import React, { useState } from "react";
import { TerritoriesData, TTerritory } from "./types";
import { useNuiEvent } from "@hooks/nuiEvent";
import { fetchNui } from "@hooks/fetchNui";
// import { playOnHoverSound } from "@utils/playSound";
import Map from "./components/map";
import { useBackspaceKey, useEscapeKey } from "@hooks/useKeys";
import {getCdnUrl} from "@/utils";

const MenuTerritoire: React.FC = () => {
	const [visible, setVisible] = useState(false);
	const [data, setData] = useState<TerritoriesData>();
	const [selectedTerritory, setSelectedTerritory] = useState<TTerritory | undefined>(undefined);
	console.log(data);
	useNuiEvent<boolean>('nui:territories:visible', (status) => {
		setVisible(status);
	});

	useNuiEvent<TerritoriesData>('nui:territories:data', (data) => {
		setData(data);
	});

	const [over, setOver] = useState<"semaine" | "mois" | "global">(data?.crews_over ?? "semaine");

	const alphaLowered = (color: string, alpha: number) => {
		return color + alpha.toString(16);
	};

	const changeOverValue = (value: "semaine" | "mois" | "global") => {
		setOver(value);
	};

	// const submit = () => {
	// 	playOnHoverSound();
	// 	fetchNui("nui:territories:submit", { crew: data?.crew, revendication: data?.revendication, territory: selectedTerritory });
	// };

	const renderLeader = (text: string) => {
		const words = text.split(" ");
		const initials = words.map(word => word[0]).join("");
		const numbers = text.match(/\d+/g)?.join("");
	
		if (numbers) return numbers + " " + initials.replace(numbers[0], "");
		if (text.length > 6) return initials;
		return text.toLowerCase();
	};

	useEscapeKey(() => fetchNui('nui:territories:close'), visible);

	useBackspaceKey(() => setSelectedTerritory(undefined));

	return (
		<>
			{visible && data && <div className="MenuTerritoire">
				<Map territories={data.territories ?? []} changeTerritory={setSelectedTerritory} />
				{(!selectedTerritory) && <div className="menu">
					<div className="header">
						<p className="title">{data?.zone}</p>
						<p className="subTitle" style={{color: "#FBC504"}}>{data?.location}</p>
					</div>
					<div className="body">
						<div className="section-body">
							<div className="label">Classement</div>
							<div className="crews">
								{data?.crews?.[over]?.map((crew, index) => (
									<div
										className="crew"
										key={index}
										style={{
											backgroundColor: alphaLowered(crew.color, 100),
										}}
										onMouseEnter={() => fetchNui('nui:territories:over-list', { leader: crew.leader })}>
										{index === 0 && (
											<>
												<div className="rang" style={{ backgroundColor: alphaLowered(crew.color, 100) }}>
													<p className="title">{index + 1}</p>
													{/*<p className="subtitle">Rang</p>*/}
												</div>
												<div className="leader">
													<p className="title">{renderLeader(crew.leader)}</p>
													{/*<p className="subtitle">Leader</p>*/}
												</div>
												<div className="influence">
													{/*<p className="title">{crew.influence}</p>*/}
													{/*<p className="subtitle">Influence</p>*/}
												</div>
											</>
										)}

										{index !== 0 && (
											<>
												<p className="rang" style={{ backgroundColor: alphaLowered(crew.color, 100) }}>
													{index + 1}
												</p>
												<p className="leader">{crew.leader}</p>
											</>
										)}
									</div>
								))}
							</div>
						</div>
						<div className="section-body">
							<div className="label" style={{ marginTop: 50 }}>Période</div>
							<div className="crews_over">
								<p className={`value` + (over === "semaine" ? " active" : "")} onClick={() => changeOverValue("semaine")}>
									Semaine
								</p>
								<p className={`value` + (over === "mois" ? " active" : "")} onClick={() => changeOverValue("mois")}>
									Mois
								</p>
								<p className={`value` + (over === "global" ? " active" : "")} onClick={() => changeOverValue("global")}>
									Global
								</p>
							</div>
						</div>
					</div>
				</div>}
				{selectedTerritory && <div className="menu local">
					<div className="header">
						<p className="title" style={{color: "#FBC504"}}>{selectedTerritory?.zone}</p>
						<p className="subTitle">{selectedTerritory?.location}</p>
					</div>
					<div className="body">
						<img src={getCdnUrl("assets/Illégal/Image/territories", selectedTerritory.zone.toLowerCase().split(" ").join("")+ ".png")} alt=""/>
						<div className={"resellIndice"}>
							<p>Indice de vente </p>
							<p className={"indice"}><span>x</span>{selectedTerritory.resellIndice}</p>
						</div>
						<div className="section-body">
						<div className="label" style={{marginTop: 35 }}>Influence de la zone</div>
						<div className="crews">
							{selectedTerritory?.topCrews?.map((crew, index) => (
								<div
									className={`crew ${index === 0 ? 'first' : ''}`}
									key={index}
									style={{
										backgroundColor: alphaLowered(crew.color, 100),
									}}>

									{index === 0 && (
										<>
											<div className="rang"
												 style={{backgroundColor: alphaLowered(crew.color, 100)}}>
												<p className="title">{index + 1}</p>
												{/*<p className="subtitle">Rang</p>*/}
											</div>
											<div className="leader">
												<p className="title">{renderLeader(crew.leader)}</p>
												{/*<p className="subtitle">Leader</p>*/}
											</div>
											<div className="influence">
												{/*<p className="title">{crew.influence}</p>*/}
												{/*<p className="subtitle">Influence</p>*/}
											</div>
										</>
									)}

									{index !== 0 && (
										<>
											<p className="rang"
											   style={{backgroundColor: alphaLowered(crew.color, 175)}}>
												{index + 1}
											</p>
											<p className="leader">{crew.leader}</p>
										</>
									)}
								</div>
							))}
						</div>
						</div>
						<div className="section-body">
						<div className="label" style={{marginTop: 35}}>Zone de vente</div>
						<div className="crews_over">
							{/*{selectedTerritory.business.map(e => <p*/}
							{/*	className={`value` + (over === "semaine" ? " active" : "")}>*/}
							{/*	{e.label}*/}
							{/*</p>)}*/}
							<p className={`value` + (over === "semaine" ? " active" : "")}>
								{selectedTerritory.business[0].label}
							</p>
						</div>
						</div>
						{/*<div className="revendication" onClick={submit}>*/}
						{/*	<img src={"https://cdn.eltrane.cloud/3838384859/assets/menuterritoire/zone.webp"} />*/}
						{/*	<p className="title">Revendiquer la Zone</p>*/}
						{/*</div>*/}
					</div>
				</div>}
			</div>}
		</>
	);
};

export default MenuTerritoire;
