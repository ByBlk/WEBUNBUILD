import React, { useMemo } from "react";
import { IItemGridProps } from "../types";
import InventoryItem from "./item";
import _ from 'lodash';

const InventoryItemGrid: React.FC<IItemGridProps> = props => {

	const itemGrid = useMemo(() => {
		const items = [];
		let highestItemY = _.max(props.items.map(e => e?.position?.y));
		const rowAmount = (_.max([(highestItemY ?? 0) + 2, 5]) ?? 5);
		for (let y = 0; y <= rowAmount - 1; y++) {
			for (let x = 0; x <= 3; x++) {
				let existingItem = props.items.find(e => (e.position?.x === x) && (e.position?.y === y))
				if (existingItem) {
					items.push(<div
						onMouseEnter={() => props.setDropTo?.(`${props.containerName}-grid=${x}=${y}`)}
						onMouseLeave={() => props.setDropTo?.("")}
						className="item-container"
						key={`item-${x}-${y}`}
						onClick={() => props.onItemClick?.(existingItem)}
						onMouseDown={(ev) => ev.button === 0 && props.onItemDragStart?.(existingItem)}
						onContextMenu={() => props.onItemRightClick?.(existingItem)}>
						<InventoryItem
							{...existingItem}
							dragged={(props.selectedItems && props.selectedItems.includes(existingItem) && !!props.draggedItem) || props.draggedItem === existingItem}
							selected={
								(!!props.allSelected ||
									props.selectedItem === existingItem ||
									(props.selectedItems && props.selectedItems.includes(existingItem))) ?? false
							}
						/>
					</div>)
				} else {
					items.push(<div className={`item-container disable-hover ${props.draggedItem ? "dragging" : ""}`} key={`placeholder-${x}-${y}`}
						onMouseEnter={() => props.setDropTo?.(`${props.containerName}-grid=${x}=${y}`)}
						onMouseLeave={() => props.setDropTo?.("")}></div>)
				}
			}
		}
		return items
	}, [props])

	return (
		<div className="grid-container"
			onMouseEnter={() => props.setDropTo?.(props.containerName)}
			onMouseLeave={() => props.setDropTo?.("")}
		>
			<div className="inventory-grid">{itemGrid}</div>
		</div>
	);
};

export default InventoryItemGrid;
