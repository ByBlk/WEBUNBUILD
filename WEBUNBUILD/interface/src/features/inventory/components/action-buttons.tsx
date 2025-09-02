import React from "react";
import { DragContainers } from "../types";
import Input from "./input";

interface IInventoryActionButtonsProps {
	layout: "horizontal" | "vertical";
	setDropTo: (to: DragContainers | "") => void;
	canDrop: boolean;
	allSelected?: boolean;
	toggleSelected?: () => void;
	selectedQuantity?: number;
	setSelectedQuantity: (quantity: number) => void;
}
const InventoryActionButtons: React.FC<IInventoryActionButtonsProps> = props => {
	return (
		<div className={`inventory-actions-${props.layout}`}>
			<div
				className={`inventory-button top-auto ${props.canDrop ? "drop-hover" : ""}`}
				onMouseEnter={() => props.setDropTo("use")}
				onMouseLeave={() => props.setDropTo("")}>
				Utiliser
			</div>
			<div
				className={`inventory-button  ${props.canDrop ? "drop-hover" : ""}`}
				onMouseEnter={() => props.setDropTo("throw")}
				onMouseLeave={() => props.setDropTo("")}>
				Jeter
			</div>
			<div
				className={`inventory-button  ${props.canDrop ? "drop-hover" : ""}`}
				onMouseEnter={() => props.setDropTo("give")}
				onMouseLeave={() => props.setDropTo("")}>
				Donner
			</div>
			{props.setSelectedQuantity && (
				<div className="quantity-input top-auto">
					<Input
						type="number"
						placeholder="Quantité"
						value={props.selectedQuantity}
						onChange={e => {
							const value = e.target.value.replace(/[.,]/g, "");
							props.setSelectedQuantity(+value);
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default InventoryActionButtons;
