import React, { useContext, useEffect, useState } from "react";

import Button from "../utils/button";
import CreationContexte from "../creationContexte";
import { fetchNui } from "@/hook";
import { SPAWN_POINTS } from "../staticData";
import { ISpawnpointElement } from "../types";
import MediaCdn from "@/components/mediaCdn/mediaCdn";

interface Props {
	onBack: () => void;
}

const SpawnPoint: React.FC<Props> = ({ onBack }) => {
	const { setHideNavigation } = useContext(CreationContexte);
	const [spawnPoint, setSpawnPoint] = useState<ISpawnpointElement>(SPAWN_POINTS[0]?.elements?.[0]);
	useEffect(() => {
		setHideNavigation(true);
	}, []);

	useEffect(() => {
		fetchNui("CreationPersonnage", {
			onglet: "lieuapparition",
		});
	}, []);

	return (
		<div className="spawnStep">
			<div className="spawnHeader">
				<div className="stepTitle">
					LIEU D'APPARITION
				</div>
			</div>

			<div className="SpawnList">
				{SPAWN_POINTS.map((_e) => (
					<>
						<label style={{ padding: 0, marginBottom: 0, marginTop: 16 }}>{_e?.name}</label>
						{_e?.elements?.map(_e => <div className={"Spawn" + (spawnPoint?.id === _e?.id ? " Selected" : "")} onClick={() => setSpawnPoint(_e)}>
							<MediaCdn path={"assets/character-creator"} name={_e?.image + '.png'} />
							<div className="Name">{_e?.name}</div>
						</div>
						)}

					</>
				))}
			</div>
			<div className="menuNavigationButtons">
				<Button
					onClick={() => onBack()}
					type="warn"
					style={{
						width: 139,
						height: 32,
						fontSize: 13,
						background: 'linear-gradient(to bottom, rgba(0, 0, 0, .2), rgba(15, 15, 15, .2)',
						marginRight: 'calc(100% - 390px)'
					}}
				>
					Précédent
				</Button>
				<Button
					onClick={() => {
						fetchNui("nui:char-creator:spawnpoint", {
							spawnPoint: spawnPoint,
						});
					}}
					style={{
						width: 139,
						height: 32,
						fontSize: 13,
						background: 'linear-gradient(to bottom, rgba(42, 189, 83, .35), rgba(15, 131, 47, .35)'
					}}
					type="success">
					Valider
				</Button>
			</div>


		</div>
	);
};

export default SpawnPoint;
