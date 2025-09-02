import React from "react";
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { fetchNui } from "@hooks/fetchNui";

export interface IInventoryHudProps {
	hunger: number;
	thirst: number;
	maxWeight: number;
	currentWeight: number;
	playerInfo: {
		firstname: string;
		lastname: string;
		mugshot: string;
		money: number;
	};
}

const InventoryHud: React.FC<IInventoryHudProps> = props => {
	const {playerInfo} = props;
	const money = playerInfo?.money;

	const formatMoney = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

	return (
		<div className="inventory-hud">
			<div className="hud-money">
				<div className="hud-moneyValue">
					<div className="label-moneyValue">
						<MediaCdn path="assets/inventory" name={`money.svg`} />
						<p>Argent</p>
					</div>
					<span>$ {formatMoney}</span></div>
				<div 
					className="hud-give"
					onClick={() => fetchNui('nui:inventory:giveMoney')}
				>
					<MediaCdn path="assets/inventory" props={{style: {width: "18px", height: "18px"}}} name={`givemoney.svg`} />
				</div>
			</div>
			<div className="hud-character">
				<img src={playerInfo?.mugshot} alt="Avatar" />
				<p>{playerInfo?.firstname} {playerInfo?.lastname}</p>
			</div>
			<div className="hud-items">
				<div
					className="hud-item"
					style={{ backgroundImage: 'url("https://cdn.eltrane.cloud/3838384859/assets/inventory/backpack.webp")' }}>
					<svg height="60" width="60">
						<circle cx="30" cy="30" r="27" fill="transparent" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="5" />
					</svg>
					<svg height="60" width="60">
						<circle
							cx="30"
							cy="30"
							r="27"
							stroke="white"
							strokeWidth="5.5"
							fill="transparent"
							strokeDasharray={`${2 * Math.PI * 27 * (props.currentWeight / props.maxWeight)}, ${2 * Math.PI * 27}`}
							style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
						/>
					</svg>
					<p className="hud-percent">{Math.round(props.currentWeight / props.maxWeight * 100)}%</p>
				</div>
				<div className="hud-item" style={{ backgroundImage: 'url("https://cdn.eltrane.cloud/3838384859/assets/inventory/thirst.webp")' }}>
					<svg height="60" width="60">
						<circle cx="30" cy="30" r="27" fill="transparent" stroke="rgba(120, 214, 255, 0.2)" strokeWidth="5.5" />
					</svg>
					<svg height="60" width="60">
						<defs>
							<linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="100%">
								<stop offset="100%" stopColor="rgba(0, 255, 242, 1)" />
								<stop offset="0%" stopColor="rgba(0, 246, 255, 0.4)" />
							</linearGradient>
						</defs>
						<circle
							cx="30"
							cy="30"
							r="27"
							stroke="url(#gradientStroke)"
							strokeWidth="5.5"
							fill="transparent"
							strokeDasharray={`${2 * Math.PI * 27 * props.thirst / 100}, ${2 * Math.PI * 27}`}
							style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
						/>
					</svg>
					<p className="hud-percent">{props.thirst}%</p>
				</div>
				<div className="hud-item" style={{ backgroundImage: 'url("https://cdn.eltrane.cloud/3838384859/assets/inventory/hunger.webp")' }}>
					<svg height="60" width="60">
						<circle cx="30" cy="30" r="27" fill="transparent" stroke="rgba(115, 255, 96, 0.2)" strokeWidth="5.5" />
					</svg>
					<svg height="60" width="60">
						<linearGradient id="gradientStroke2" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="100%" stopColor="rgba(0, 255, 102, 1)" />
							<stop offset="0%" stopColor="rgba(0, 255, 102, 0.5)" />
						</linearGradient>
						<circle
							cx="30"
							cy="30"
							r="27"
							stroke="url(#gradientStroke2)"
							strokeWidth="5.5"
							fill="transparent"
							strokeDasharray={`${2 * Math.PI * 27 * props.hunger / 100}, ${2 * Math.PI * 27}`}
							style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
						/>
					</svg>
					<p className="hud-percent">{props.hunger}%</p>
				</div>
			</div>
		</div>
	);
};

export default InventoryHud;
