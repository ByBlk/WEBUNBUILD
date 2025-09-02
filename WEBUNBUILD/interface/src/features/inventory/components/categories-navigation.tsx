import React, { useMemo } from "react";
import { InventoryCategory } from "../types";
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { playOnClick2Sound } from "@utils/playSound";

const InventoryCategoriesNavigation: React.FC<{ current: InventoryCategory; onChange: (category: InventoryCategory) => void }> = props => {
	const array = useMemo(() => {
		const _array = [
			{ id: 'items', image: 'items', label: 'Objets' },
			{ id: 'keys', image: 'keys', label: 'Clés' },
			{ id: 'weapons', image: 'guns', label: 'Armes' },
			{ id: 'clothes', image: 'tShirt', label: 'Vêtements' },
		];
		return [..._array.filter(e => e.id === props.current), ..._array.filter(e => e.id !== props.current)]
	}, [props]);
	return (
		<div className="category-navigation">
			{
				array.map(e => <div className={props.current == e.id ? "navigation active" : "navigation"} onClick={() => {
					props.onChange(e.id as InventoryCategory);
					playOnClick2Sound();
				}}>
					<div style={{ width: 22, height: 22 }}>
						<MediaCdn path="assets/icons" name={`${e.image}.svg`} />
					</div>
					{props.current === e.id && e.label}
				</div>)
			}

		</div>
	);
};

export default InventoryCategoriesNavigation;
