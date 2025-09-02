import "./style.scss";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import React, { useState } from "react";
import { Slider } from "@mui/material";
import Button from "@/components/button/button";
import { fetchNui } from "@hooks/fetchNui";
import { useNuiEvent } from "@hooks/nuiEvent";
import { PropertyManagementData } from "./type";
import { useEscapeKey } from "@hooks/useKeys";

const propertyManagement: React.FC = () => {
	const [visible, setVisible] = useState(false);
	const [data, setData] = useState<PropertyManagementData | undefined>(undefined);
	useNuiEvent<boolean>('nui:property-management:visible', (status) => {
		setVisible(status);
	});

	useNuiEvent<PropertyManagementData>('nui:property-management:data', (data) => {
		setData(data);
	});
	useEscapeKey(() => fetchNui('nui:property-management:close'), visible);

	const [acces, sAcces] = useState(data?.acces ?? "ouvert");
	const [type, sType] = useState(data?.type ?? "personnel");
	const [prolongation, sProlongation] = useState(0);

	const [s, sS] = useState("main");
	const [selected, setSelected] = useState<null | number>(null);

	return (
		<>{visible && <div className={"GestionPropriete"}>
			<div className="Header">
				<img src="https://cdn.eltrane.cloud/3838384859/assets/gestion-propriete/header.webp" />
			</div>

			{s === "main" && (
				<>
					<div className="Container">
						<div className="Title">GESTION PROPRIÉTÉ</div>
						<div className="Span">ACCÈS À LA PROPRIÉTÉ</div>
						<div className="Buttons">
							<Button
								color="green"
								fontWeight={500}
								fontSize={12}
								label="OUVERT"
								width={121}
								height={25}
								selected={acces === "ouvert"}
								callback={() => sAcces("ouvert")}
							/>
							<Button
								color="yellow"
								fontWeight={500}
								fontSize={12}
								label="SONNETTE"
								width={121}
								height={25}
								selected={acces === "sonnette"}
								callback={() => sAcces("sonnette")}
							/>
							<Button
								color="red"
								fontWeight={500}
								fontSize={12}
								label="FERMÉ"
								width={121}
								height={25}
								selected={acces === "fermer"}
								callback={() => sAcces("fermer")}
							/>
						</div>
						<div className="Span">CLEF DE LA PROPRIÉTÉ</div>
						<div className="Buttons">
							<Button
								color="blue"
								fontWeight={500}
								fontSize={12}
								label="ATTRIBUER LE DOUBLE"
								width={188}
								height={25}
								callback={() =>
									fetchNui("nui:property-management:button", {
										button: "giveDouble",
									})
								}
							/>
							<Button
								color="red"
								fontWeight={500}
								fontSize={12}
								label="REVOQUER L'ACCÈS"
								width={188}
								height={25}
								callback={() => sS("list")}
							/>
						</div>
						<div className="Span">PROLONGER L'HABITATION</div>
						<div className="Buttons">
							<Slider
								className="cSlider"
								valueLabelDisplay="on"
								value={prolongation}
								onChange={(_, value) => sProlongation(value as number)}
								min={0}
								max={data?.maxDuration}
							/>
							<Button
								color="green"
								fontWeight={500}
								fontSize={12}
								label="VENDRE"
								width={121}
								height={25}
								callback={() =>
									fetchNui("nui:property-management:button", {
										button: "sell",
									})
								}
							/>
						</div>
						<div className="Span">TYPE D'HABITATION</div>
						<div className="Buttons">
							<Button
								color="green"
								fontWeight={500}
								fontSize={12}
								label="PERSONNEL"
								width={121}
								height={25}
								selected={type === "personnel"}
								callback={() => sType("personnel")}
							/>
							<Button
								color="yellow"
								fontWeight={500}
								fontSize={12}
								label="CREW"
								width={121}
								height={25}
								selected={type === "crew"}
								callback={() => sType("crew")}
							/>
							<Button
								color="blue"
								fontWeight={500}
								fontSize={12}
								label="ENTREPRISE"
								width={121}
								height={25}
								selected={type === "entreprise"}
								callback={() => sType("entreprise")}
							/>
						</div>
						<div className="Span">GESTION DE LA PROPRIÉTÉ</div>
						<div className="Buttons">
							<Button
								color="blue"
								fontWeight={500}
								fontSize={12}
								label="TRANSFÉRER LA PROPRIÉTÉ"
								width={188}
								height={25}
								callback={() =>
									fetchNui("nui:property-management:button", {
										button: "transfer",
									})
								}
							/>
							<Button
								color="red"
								fontWeight={500}
								fontSize={12}
								label="SUPPRIMER LA PROPRIÉTÉ"
								width={188}
								height={25}
								callback={() =>
									fetchNui("nui:property-management:button", {
										button: "delete",
									})
								}
							/>
						</div>
						<div className="Submit">
							<Button
								color="green"
								fontWeight={500}
								fontSize={12}
								label="VALIDER"
								width={188}
								height={25}
								callback={() =>
									fetchNui("nui:property-management:submit", {
										submit: {
											...(acces !== data?.acces ? { acces } : {}),
											...(type !== data?.type ? { type } : {}),
											...(prolongation != (data?.prolongation ?? 0) ? { prolongation } : {}),
										},
									})
								}
							/>
						</div>
					</div>

					{!data?.hideDuration && (
						<div style={{ height: 40, width: 45, position: "absolute", right: 30, top: 110 }}>
							<CircularProgressbarWithChildren
								background
								strokeWidth={6}
								value={0.66}
								maxValue={1}
								minValue={0}
								styles={buildStyles({
									pathColor: "#ffffff",
									trailColor: "rgba(255,255,255,0.2)",
									backgroundColor: "transparent",
									pathTransitionDuration: 2,
								})}>
								<div className="text_title">{data?.timeLeft ?? 0}J</div>
							</CircularProgressbarWithChildren>
						</div>
					)}
				</>
			)}
			{s === "list" && (
				<div className="Container">
					<div className="Span">
						<Button
							color="red"
							fontWeight={500}
							fontSize={12}
							width={81}
							height={25}
							callback={() => {
								sS("main");
								setSelected(null);
							}}>
							<img src="https://cdn.eltrane.cloud/3838384859/assets/icons/left.webp" />
							RETOUR
						</Button>
					</div>
					<div className="List">
						{data?.haveAccess.map((e, i: number) => (
							<div key={i} className={"El" + (e.id === selected ? " selected " : "")} onClick={() => setSelected(e.id)}>
								{e.label}
							</div>
						))}
					</div>
					<Button
						color="red"
						fontWeight={500}
						fontSize={12}
						label="REVOQUER L'ACCÈS"
						width={188}
						height={25}
						callback={() => {
							fetchNui("nui:property-management:button", {
								revoke: data?.haveAccess.find(e => e.id === selected),
							});
							sS("main");
						}}
						margin={"20px auto"}
					/>
				</div>
			)}
		</div>}
		</>
	);
};

export default propertyManagement;
