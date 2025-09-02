import React, { useState } from "react";
import "./BoutiqueVehicules.scss";
import "./ColorPalette.scss";

interface State {
	onTypeChange: (type: "vehicules" | "nautic" | "air") => void;
}

import { Vehicules } from "./frames/Vehicules";
import { Nautic } from "./frames/Nautic";
import { Air } from "./frames/Air";

const BoutiqueVehicules: React.FC<State> = ({
	onTypeChange,
}) => {
	const [type, setType] = useState<"vehicules" | "nautic" | "air">("vehicules");
	
	const handleTypeChange = (type: "vehicules" | "nautic" | "air") => {
		setType(type);
		onTypeChange(type);
	};
	return (
		<>
			{type === "vehicules" && <Vehicules />}
			{type === "nautic" && <Nautic onTypeChange={handleTypeChange} />}
			{type === "air" && <Air onTypeChange={handleTypeChange} />}
		</>
	);
};

export default BoutiqueVehicules;
