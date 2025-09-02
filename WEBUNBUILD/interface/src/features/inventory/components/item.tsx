
import React, { useEffect, useMemo, useState } from "react";

import { IInventoryItem } from "../types";
import { fetchNui } from "@hooks/fetchNui";
import { formatQuantity } from "../utils";
import { playOnDoubleClickSound } from "@utils/playSound";

type IItem = IInventoryItem & { dragged?: boolean; selected: boolean; draggedLength?: number | undefined };

const InventoryItem: React.FC<IItem> = React.memo((props: IItem) => {
	const [loading, setLoading] = useState(true);
	const [hovered, setHovered] = useState(false);
	//console.log(props);
	const imageSrc = useMemo(() => {
		if (props.name === "keys" && props.metadatas?.manufacture) {
			return `url(https://cdn.eltrane.cloud/3838384859/items/${props.metadatas.manufacture}.png)`;
		}
		return props.url ? `url(${props.url})` : `url(https://cdn.eltrane.cloud/3838384859/items/${props.name}.webp)`;
	}, [props.url, props.name, props.metadatas?.manufacture]);

	useEffect(() => {
		const img = new Image();
		img.src = props.name === "keys" && props.metadatas?.manufacture ? `https://cdn.eltrane.cloud/3838384859/items/${props.metadatas.manufacture}.png` : props.url || `items/${props.name}.webp`;
		img.onload = () => setLoading(false);
		img.onerror = () => setLoading(false);
	}, [props.url, props.name]);

	return (
		<div
			className={`inventory-item ${props.dragged ? "dragged" : ""} ${props.selected ? "inventory-item-selected" : ""}`}
			onDoubleClick={() => {
				fetchNui('nui:inventory:use-item', props);
				playOnDoubleClickSound();
			}}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div className="item-quantity">{formatQuantity(props.count)}</div>
			{loading ? (
				<div className="item-image-loading-spinner" />
			) : (
				<div className={`item-image ${hovered ? "hovered" : ""}`} style={{ backgroundImage: imageSrc }}/>
			)}
			{props.draggedLength ? <div className="item-label">
				{props.draggedLength} objets
			</div> : <div
				className="item-label"
				style={props.premium ? (props.durability ? { marginTop: "-7.5px", color: "#ffc826" } : {color: "#ffc826"}) : (props.durability ? { marginTop: "-7.5px" } : {})}>
				{props.metadatas?.renamed || props.label}
			</div>}
			{props.durability ? <div className="item-durability">
				<div style={{ width: `${props.durability}%` }} />	
			</div> : null}
		</div>
	);
});

InventoryItem.displayName = "InventoryItem";

export default InventoryItem;
