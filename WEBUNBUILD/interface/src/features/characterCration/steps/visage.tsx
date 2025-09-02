import React, { useContext, useEffect, useState } from "react";

import CreationContexte from "../creationContexte";
import InputRange from "../utils/inputRange";
import SquareSelector from "../utils/squareSelector";
import { fetchNui } from "@/hook";

const Visage: React.FC = () => {
	const { setData, data, setCanContinue } = useContext(CreationContexte);
	const [nose, setNose] = useState({ x: data?.visage?.nose?.x ?? 0, y: data?.visage?.nose?.y ?? 0 });
	const [noseProfile, setNoseProfile] = useState({ x: data?.visage?.noseProfile?.x ?? 0, y: data?.visage?.noseProfile?.y ?? 0 });
	const [nosePointe, setNosePointe] = useState({ x: data?.visage?.nosePointe?.x ?? 0, y: data?.visage?.nosePointe?.y ?? 0 });
	const [sourcils, setSourcils] = useState({ x: data?.visage?.sourcils?.x ?? 0, y: data?.visage?.sourcils?.y ?? 0 });
	const [pommettes, setPommettes] = useState({ x: data?.visage?.pommettes?.x ?? 0, y: data?.visage?.pommettes?.y ?? 0 });
	const [menton, setMenton] = useState({ x: data?.visage?.menton?.x ?? 0, y: data?.visage?.menton?.y ?? 0 });
	const [mentonShape, setMentonShape] = useState({ x: data?.visage?.mentonShape?.x ?? 0, y: data?.visage?.mentonShape?.y ?? 0 });
	const [machoire, setMachoire] = useState({ x: data?.visage?.machoire?.x ?? 0, y: data?.visage?.machoire?.y ?? 0 });
	const [joues, setJoues] = useState((data?.visage?.joues ?? 0) / 2 + 50 || 50);
	const [yeux, setYeux] = useState((data?.visage?.yeux ?? 0) / 2 + 50 || 50);
	const [levres, setLevres] = useState((data?.visage?.levres ?? 0) / 2 + 50 || 50);
	const [cou, setCou] = useState((data?.visage?.cou ?? 0) / 2 + 50 || 50);

	useEffect(() => {
		const visageData = {
			nose: {
				x: Number(nose.x.toFixed(2)),
				y: Number(nose.y.toFixed(2)),
			},
			nosePointe: {
				x: Number(nosePointe.x.toFixed(2)),
				y: Number(nosePointe.y.toFixed(2)),
			},
			noseProfile: {
				x: Number(noseProfile.x.toFixed(2)),
				y: Number(noseProfile.y.toFixed(2)),
			},
			sourcils: {
				x: Number(sourcils.x.toFixed(2)),
				y: Number(sourcils.y.toFixed(2)),
			},
			pommettes: {
				x: Number(pommettes.x.toFixed(2)),
				y: Number(pommettes.y.toFixed(2)),
			},
			menton: {
				x: Number(menton.x.toFixed(2)),
				y: Number(menton.y.toFixed(2)),
			},
			mentonShape: {
				x: Number(mentonShape.x.toFixed(2)),
				y: Number(mentonShape.y.toFixed(2)),
			},
			machoire: {
				x: Number(machoire.x.toFixed(2)),
				y: Number(machoire.y.toFixed(2)),
			},
			joues: Number((joues * 2 - 100).toFixed(2)),
			yeux: Number((yeux * 2 - 100).toFixed(2)),
			levres: Number((levres * 2 - 100).toFixed(2)),
			cou: Number((cou * 2 - 100).toFixed(2)),
		};
		if (JSON.stringify(data.visage) === JSON.stringify(visageData)) return;
		setData({
			...data,
			visage: structuredClone(visageData),
		});
		setCanContinue(true);
	}, [nose, noseProfile, nosePointe, sourcils, pommettes, menton, mentonShape, machoire, joues, yeux, levres, cou, data]);

	useEffect(() => {
		fetchNui("CreationPersonnage", {
			onglet: "visage",
			currentData: data,
		});
	}, []);

	return (
		<div className="traitsStep">
			<div className="stepTitle" style={{ marginLeft: 12 }}>TRAITS DU VISAGE</div>
			<div className="traitsWrapper" style={{ marginTop: 10 }}>
				<div className="container square">
					<label style={{ marginLeft: 5, marginTop: 10, paddingBottom: 5 }}>Nez</label>
					<SquareSelector style={{ marginLeft: -8, marginTop: 2 }} value={nose} setValue={setNose} typesNames={["Haut", "large", "bas", "fin"]} />
				</div>
				<div className="container square">
					<label style={{ marginLeft: 10, fontSize: 14 }}>Profil du nez</label>
					<SquareSelector style={{ marginLeft: -1, marginTop: 1 }} value={noseProfile} setValue={setNoseProfile} typesNames={["Casser a droite en haut", "long", "Casser a gauche en bas", "Court"]} />
				</div>
				<div className="container square">
					<label style={{ marginLeft: 5, marginTop: 5 }}>Pointe du nez</label>
					<SquareSelector
						value={nosePointe}
						setValue={setNosePointe}
						typesNames={["cassé à gauche", "pointe haute", "cassé à droite", "pointe basse"]}
						style={{ marginLeft: -6, marginTop: 8 }}
					/>
				</div>
				<div className="container square">
					<label>Sourcils</label>
					<SquareSelector style={{ marginTop: 8 }} value={sourcils} setValue={setSourcils} typesNames={["Haut", "extérieur", "bas", "intérieur"]} />
				</div>
				<div className="container square">
					<label>Pommettes</label>
					<SquareSelector style={{ marginLeft: -6, marginTop: 8 }} value={pommettes} setValue={setPommettes} typesNames={["Haut", "creuse", "bas", "gonflée"]} />
				</div>
				<div className="container square">
					<label>Menton</label>
					<SquareSelector style={{ marginTop: 8 }} value={menton} setValue={setMenton} typesNames={["Haut", "extérieur", "bas", "intérieur"]} />
				</div>
				<div className="container square">
					<label>Forme du menton</label>
					<SquareSelector style={{ marginLeft: -6, marginTop: 8 }} value={mentonShape} setValue={setMentonShape} typesNames={["pointu", "rond", "arrondi", "carré"]} />
				</div>
				<div className="container square">
					<label>Machoire</label>
					<SquareSelector style={{ marginTop: 8 }} value={machoire} setValue={setMachoire} typesNames={["ronde", "fine", "carrée", "large"]} />
				</div>
				<div className="container line">
					<div className="label left">Gonflées</div>
					<div className="label right">Creuses</div>
					<label>Joues</label>
					<InputRange
						onChange={(event) => {
							setJoues(event.target.valueAsNumber);
						}}
						className="--flex"
						max={100}
						min={1}
						defaultV={joues}
						customStyle={{
							background:
								joues < 50
									? `linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) ${joues}%, rgba(255, 255, 255, 1) ${joues}%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) ${joues}%, rgba(0, 0, 0, 0.4) ${joues}%, rgba(0, 0, 0, 0.4) 100%)`
									: joues === 50
										? ""
										: `linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) ${joues}%, rgba(0, 0, 0, 0.4) ${joues}%, rgba(0, 0, 0, 0.4) 100%)`,
						}}
					/>
				</div>
				<div className="container line">
					<div className="label left">Ouverts</div>
					<div className="label right">Plissés</div>
					<label>Yeux</label>
					<InputRange
						onChange={(event) => {
							setYeux(event.target.valueAsNumber);
						}}
						className="--flex"
						max={100}
						min={1}
						defaultV={yeux}
						customStyle={{
							background:
								yeux < 50
									? `linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) ${yeux}%, rgba(255, 255, 255, 1) ${yeux}%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) ${yeux}%, rgba(0, 0, 0, 0.4) ${yeux}%, rgba(0, 0, 0, 0.4) 100%)`
									: yeux === 50
										? ""
										: `linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) ${yeux}%, rgba(0, 0, 0, 0.4) ${yeux}%, rgba(0, 0, 0, 0.4) 100%)`,
						}}
					/>
				</div>
				<div className="container line">
					<div className="label left">Épaisses</div>
					<div className="label right">Fines</div>
					<label>Lèvres</label>
					<InputRange
						onChange={(event) => {
							setLevres(event.target.valueAsNumber);
						}}
						className="--flex"
						max={100}
						min={1}
						defaultV={levres}
						customStyle={{
							background:
								levres < 50
									? `linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) ${levres}%, rgba(255, 255, 255, 1) ${levres}%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) ${levres}%, rgba(0, 0, 0, 0.4) ${levres}%, rgba(0, 0, 0, 0.4) 100%)`
									: levres === 50
										? ""
										: `linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) ${levres}%, rgba(0, 0, 0, 0.4) ${levres}%, rgba(0, 0, 0, 0.4) 100%)`,
						}}
					/>
				</div>
				<div className="container line">
					<div className="label left">Fin</div>
					<div className="label right">Épais</div>
					<label>Cou</label>
					<InputRange
						onChange={(event) => {
							setCou(event.target.valueAsNumber);
						}}
						className="--flex"
						max={100}
						min={1}
						defaultV={cou}
						customStyle={{
							background:
								cou < 50
									? `linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) ${cou}%, rgba(255, 255, 255, 1) ${cou}%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) ${cou}%, rgba(0, 0, 0, 0.4) ${cou}%, rgba(0, 0, 0, 0.4) 100%)`
									: cou === 50
										? ""
										: `linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) ${cou}%, rgba(0, 0, 0, 0.4) ${cou}%, rgba(0, 0, 0, 0.4) 100%)`,
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Visage;
