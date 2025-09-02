import "./Elevator.scss";

import React, { useState } from "react";
import {fetchNui, useNuiEvent} from "@/hook";
import Button from "./Components/Button/Button";
import {IElevatorData} from "@/features/Elevator/types.ts";
import {useEscapeKey} from "@hooks/useKeys.tsx";

const Elevator: React.FC = () => {
	const [selected, setSelected] = useState("0");
	const [data, setData] = useState<IElevatorData | null >(null);
	const [visible, setVisible] = useState(false);
	const [previousFloor, setPreviousFloor] = useState<string | null>(null);

	useNuiEvent("nui:elevator:visible", (status: boolean) => {
		setVisible(status);
	});

	useNuiEvent("nui:elevator:data", (data: IElevatorData) => {
		setData(data);
	})

	useEscapeKey(() => {
		fetchNui("nui:elevator:close");
	}, visible)

	const startSelected = (floor: string) => {
		fetchNui("nui:elevator:selectFloor", {
			floor,
		});

		setSelected(data?.currentFloor ?? "");

		if(previousFloor) {
			setSelected(previousFloor)
		}

		setPreviousFloor(floor);
		setTimeout(() => {
			setSelected(floor);
		}, 2500);

	};

	return visible ? (
		<div id="elevator">
			<div className="viewer">
				<p>
					{selected.includes('-') ? selected : `0${selected}`}
				</p>
			</div>

			<div className="buttons">

				<div className="button_floor_container">
					{data?.floor.map((floor, index) => (
						<Button
							key={index}
							name={floor}
							borderColor="#e4a045"
							className={floor == selected ? "button active" : "button"}
							onClick={() => startSelected(floor)}
						/>
					))}
				</div>

				<div className="button_bottom_container">
					<div className="button_utils_container">
						<Button className="button" borderColor="#32c45a" icon="https://cdn.eltrane.cloud/3838384859/old_a_trier/icons/bouton_vert.webp?zoom=125" />
						<Button className="button" borderColor="#d9392c" icon="https://cdn.eltrane.cloud/3838384859/old_a_trier/icons/bouton_rouge.webp?zoom=125" />
						<Button className="button" borderColor="#529098" icon="https://cdn.eltrane.cloud/3838384859/old_a_trier/icons/bouton_bleu.webp?zoom=125" />
					</div>

					<div className="img_speech">
						<img src="https://cdn.eltrane.cloud/3838384859/old_a_trier/icons/grille.webp" />
					</div>
				</div>
			</div>
		</div>
	) : null;
};

export default Elevator;
