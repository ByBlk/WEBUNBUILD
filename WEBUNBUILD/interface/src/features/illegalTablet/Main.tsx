import "./style.scss";
import React from "react";
import dayjs from "dayjs";
import { IIllegalTabletData } from "./types";
import { formatNumberForDollar } from "@/components/menuBuilder/utils";
import _ from "lodash";

const TabletteMain: React.FC<any> = ({ data }: {data: IIllegalTabletData}) => {
	const levels = [
		{
			xp: 0, 
			name: "RANG D",
			letter: "D",
			id: "territory",
		},
		{
			xp: 1000,
			name: "RANG C",
			letter: "C",
			id: "laboratory",
		},
		{
			xp: 3000,
			name: "RANG B",
			letter: "B",
			id: "doubleBusiness",
		},
		{
			xp: 7000,
			name: "RANG A",
			letter: "A",
			id: "weaponTrafic",
		},
		{
			xp: 14000,
			name: "RANG S",
			letter: "S",
			id: "upgrade",
		},
	];

	return (
		<>
			<div className="Content">
				<div
					className="Informations A-SlideIn"
					style={{
						animationDelay: ".8s",
					}}>
					<div className="Up">
						<div className="Logo">
							<img src="https://cdn.eltrane.cloud/3838384859/assets/tabletteIllegale/profile.webp" />
						</div>
						<div className="Span">{data?.crewName.toUpperCase()}</div>
						<div className="Motto">{data?.crewMotto.toUpperCase()}</div>
					</div>
					<div className="Infos">
						<div className="Span">INFORMATIONS</div>
						<div className="Bar"></div>
					</div>
					<div
						className="InfosContainer"
						style={{
							marginTop: 30,
						}}>
						<div className="Name">
							TOTAL DÉPENSÉ :<div className="Span">{formatNumberForDollar(data?.informations.totalSpent)}</div>
						</div>
					</div>
					<div className="InfosContainer">
						<div className="Name">
							COMMANDES PASSÉES :<div className="Span">{data?.informations.totalCommands}</div>
						</div>
					</div>
					<div className="InfosContainer">
						<div className="Name">
							PRODUIT LE PLUS COMMANDÉ :<div className="Span">{data?.informations.mostOrdered}</div>
						</div>
					</div>
				</div>
				<div
					className="Commandes A-SlideIn"
					style={{
						animationDelay: "1s",
					}}>
					<div className="Logo">
						<img src="https://cdn.eltrane.cloud/3838384859/assets/tabletteIllegale/calendar.webp" />
					</div>
					<div className="Container">
						<div className="Title">Historique des commandes</div>
						<div className="CommandeList">
							{data?.orders.map((e, key) => (
								<div key={key} className="CommandeContainer">
									<div
										className="Commande"
										style={
											dayjs(e.date).isBefore(dayjs())
												? {
														borderLeft: "10px solid white",
													}
												: {
														borderLeft: "10px solid #F6C903",
													}
										}>
										<div className="Up">
											<div className="Date">{dayjs(e.date).format("DD MMM")}</div>
											<div className="Additional">
												{_.capitalize(e.type) +
													(dayjs(e.date).isBefore(dayjs()) ? " à " : " à venir ") +
													dayjs(e.date).format("hh:mm")}
											</div>
											<div className="Price">{formatNumberForDollar(e.price)}</div>
										</div>
										<div className="Items">
											{e.items.map((_e, key) => (
												<div key={key} className="Item">
													x{_e.quantity} {_e.name}
												</div>
											))}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div
					className="CrewRank A-SlideIn"
					style={{
						animationDelay: "1.2s",
					}}>
					<div className="CrewGeneral">
						<div className="Logo">
							<img src="https://cdn.eltrane.cloud/3838384859/assets/tabletteIllegale/levelup.webp" />
						</div>
						<div className="Span">
							Rang de Crew
							<div className="SubSpan">{data?.crewXp} XP</div>
						</div>
					</div>
					<div className="CrewLevels">
						{levels.map((e, index) => (
							<div key={index} className="Level">
								<div className={"Head " + (data?.crewXp >= e.xp ? "yellow" : "")}>{e.xp} XP</div>
								<div className={"Body " + (data?.crewXp >= e.xp ? "yellow" : "")}>
									<h1 className="letter">{e.letter}</h1>
									<div className="Span">{e.name}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				style={{
					position: "fixed",
					top: -300,
				}}>
				<linearGradient id="initial" x1="0" x2="0" y1="0" y2="1">
					<stop offset="0%" stopColor="#FFFFFF" />
					<stop offset="100%" stopColor="#C5C5C5" />
				</linearGradient>
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				style={{
					position: "fixed",
					top: -300,
				}}>
				<linearGradient id="high" x1="0" x2="0" y1="0" y2="1">
					<stop offset="0%" stopColor="#F89427" />
					<stop offset="100%" stopColor="#FBBC04" />
				</linearGradient>
			</svg>
		</>
	);
};

export default TabletteMain;
