import React from "react";
import { DragContainers, IInventoryItem, IInventoryShortcuts } from "../types";
import MediaCdn from "@/components/mediaCdn/mediaCdn";

const InventoryWeaponSlots: React.FC<{
	setDropTo: (zone: DragContainers) => void;
	onItemDragStart: (item: IInventoryItem | undefined, from: DragContainers) => void;
	shortcuts: IInventoryShortcuts;
	items: IInventoryItem[];
	show: boolean,
	toggleShowShortcuts: () => void
}> = props => {
	return (
		<div className="weapon-container">
			<div className="show-weapons" onClick={props.toggleShowShortcuts} style={!props.show ? { bottom: 68 } : {}}>
				<MediaCdn path={props.show ? "assets/icons" : "assets/inventory"} name={props.show ? "crossed-eye.svg" : "shortcuts.svg"} />
				<span>Inventaire rapide</span>
			</div>
			{props.show && <div className="weapon-slots" style={{ opacity: props.show ? 1 : 0 }}>
				<div
					className={`slot ${1 ? "drop-effect" : ""}`}
					onMouseEnter={() => props.setDropTo("weapon1")}
					onMouseLeave={() => props.setDropTo("")}>
					{props.shortcuts[1] && (
						<div
							className="item-image"
							style={{
								backgroundImage: props.shortcuts[1].url
									? `url(${props.shortcuts[1].url})`
									: `url(https://cdn.eltrane.cloud/3838384859/items/${props.shortcuts[1].name}.webp)`,
							}}
							onMouseDown={() => props.onItemDragStart(props.shortcuts[1], "weapon1")}
						/>
					)}
					<div className="placeholder"
						onMouseEnter={() => props.setDropTo("weapon1")}
						onMouseLeave={() => props.setDropTo("")}>1</div>
				</div>
				<div
					className={`slot ${1 ? "drop-effect" : ""}`}
					onMouseEnter={() => props.setDropTo("weapon2")}
					onMouseLeave={() => props.setDropTo("")}>
					{props.shortcuts[2] && (
						<div
							className="item-image"
							style={{
								backgroundImage: props.shortcuts[2].url
									? `url(${props.shortcuts[2].url})`
									: `url(https://cdn.eltrane.cloud/3838384859/items/${props.shortcuts[2].name}.webp)`,
							}}
							onMouseDown={() => props.onItemDragStart(props.shortcuts[2], "weapon2")}
						/>
					)}
					<div className="placeholder">2</div>
				</div>
				<div
					className={`slot ${1 ? "drop-effect" : ""}`}
					onMouseEnter={() => props.setDropTo("weapon3")}
					onMouseLeave={() => props.setDropTo("")}>
					{props.shortcuts[3] && (
						<div
							className="item-image"
							style={{
								backgroundImage: props.shortcuts[3].url
									? `url(${props.shortcuts[3].url})`
									: `url(https://cdn.eltrane.cloud/3838384859/items/${props.shortcuts[3].name}.webp)`,
							}}
							onMouseDown={() => props.onItemDragStart(props.shortcuts[3], "weapon3")}
						/>
					)}
					<div className="placeholder">3</div>
				</div>
				<div
					className={`slot ${1 ? "drop-effect" : ""}`}
					onMouseEnter={() => props.setDropTo("weapon4")}
					onMouseLeave={() => props.setDropTo("")}>
					{props.shortcuts[4] && (
						<div
							className="item-image"
							style={{
								backgroundImage: props.shortcuts[4].url
									? `url(${props.shortcuts[4].url})`
									: `url(https://cdn.eltrane.cloud/3838384859/items/${props.shortcuts[4].name}.webp)`,
							}}
							onMouseDown={() => props.onItemDragStart(props.shortcuts[4], "weapon4")}
						/>
					)}
					<div className="placeholder">4</div>
				</div>
				<div
					className={`slot ${1 ? "drop-effect" : ""}`}
					onMouseEnter={() => props.setDropTo("weapon5")}
					onMouseLeave={() => props.setDropTo("")}>
					{props.shortcuts[5] && (
						<div
							className="item-image"
							style={{
								backgroundImage: props.shortcuts[5].url
									? `url(${props.shortcuts[5].url})`
									: `url(https://cdn.eltrane.cloud/3838384859/items/${props.shortcuts[5].name}.webp)`,
							}}
							onMouseDown={() => props.onItemDragStart(props.shortcuts[5], "weapon5")}
						/>
					)}
					<div className="placeholder">5</div>
				</div>
			</div>}
		</div>
	);
};

export default InventoryWeaponSlots;
