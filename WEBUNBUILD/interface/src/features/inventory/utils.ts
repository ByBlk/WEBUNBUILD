import { fetchNui } from "@hooks/fetchNui";
import { IInventoryItem, ClothesContainersList, ClothesContainers, DragContainers, WeaponsContainersList, WeaponsContainers } from "./types";
import { playOnClick2Sound } from "@utils/playSound";

export const useItem = (item: IInventoryItem, quantity: number) => fetchNui("nui:inventory:use-item", { item, quantity });

export const putClothe = (item: IInventoryItem) => {
	if (ClothesContainersList.includes(item.name as ClothesContainers)) {
		fetchNui("nui:inventory:put-clothe", { item });
	}
};

// Helper function to extract weapon bind number
const extractWeaponBind = (container: string): number => {
	return parseInt(container.replace("weapon", ""), 10);
};

// Main function to determine the drop action based on context
export const getDropAction = (
	from: DragContainers,
	to: DragContainers,
	item: IInventoryItem,
	selected: IInventoryItem | IInventoryItem[] | undefined,	
	selectedQuantity: number | undefined,
): (() => void) | undefined => {
	if (selectedQuantity === 0) selectedQuantity = undefined;
	// Throw item from inventory
	if (to === "throw" && from === "inventory") {
		playOnClick2Sound();
		return () => fetchNui("nui:inventory:throw-item", { item: selected ? selected : item, quantity: selectedQuantity });
	}

	// Move item in inventory
	if (to.includes('inventory-grid') && from === "inventory") {
		const [_, x, y] = to.split('=');
		if (Number(x) == item?.position?.x && Number(y) == item?.position?.y) return;
		return () => fetchNui("nui:inventory:move-item", {
			item, newPosition: { x, y, }, quantity: selectedQuantity
		});
	}

	// Move item in target
	if (to.includes('target-grid') && from === "target") {
		const [_, x, y] = to.split('=');
		if (Number(x) == item?.position?.x && Number(y) == item?.position?.y) return;
		return () => fetchNui("nui:inventory:move-item-in-target", {
			item, newPosition: { x, y, }, quantity: selectedQuantity
		});
	}

	// Give item from inventory
	if (to === "give" && from === "inventory") {
		playOnClick2Sound();
		return () => fetchNui("nui:inventory:give", { item: selected ? selected : item, quantity: selectedQuantity });
	}

	// Bind weapon
	if (from === "inventory" && WeaponsContainersList.includes(to as WeaponsContainers)) {
		const bind = extractWeaponBind(to);
		return () => fetchNui("nui:inventory:bind-weapon", { item, bind });
	}
	
	// Unbind weapon
	if (WeaponsContainersList.includes(from as WeaponsContainers)) {
		const bind = extractWeaponBind(from);
		return () => fetchNui("nui:inventory:unbind-weapon", { item, bind });
	}

	// Take item from target
	if (to.includes('inventory-grid') && from === "target") {
		return () => fetchNui("nui:inventory:take-item", {
			item: selected ? selected : item,
			quantity: selectedQuantity
		});
	}

	// Put item to target
	if (to.includes('target-grid') && from === "inventory") {
		return () => fetchNui("nui:inventory:put-item", {
			item: selected ? selected : item,
			quantity: selectedQuantity
		});
	}

	return undefined; // Explicit return for undefined cases
};

export function formatQuantity(amount: number | undefined) {
	if (!amount) return '';

	if (amount >= 1_000_000) {
		const formatted = Math.floor(amount / 10_000) / 100;
		return (formatted % 1 === 0 ? formatted.toFixed(0) : formatted.toFixed(2)) + "M";
	}

	if (amount >= 1000) {
		const formatted = Math.floor(amount / 10) / 100;
		return (formatted % 1 === 0 ? formatted.toFixed(0) : formatted.toFixed(2)) + "k";
	}

	return amount.toString();
}