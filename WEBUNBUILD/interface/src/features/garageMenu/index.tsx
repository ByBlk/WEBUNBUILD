import "./style.scss";
import "react-circular-progressbar/dist/styles.css";
import React, { useCallback, useEffect, useState } from "react";
import { fetchNui } from "@hooks/fetchNui";
import { useNuiEvent } from "@hooks/nuiEvent";
import Button from "@/components/button/button";
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { useBackspaceKey, useEscapeKey } from "@hooks/useKeys";
import { GarageElementData, GarageMenuData } from "./types";
import _ from "lodash";

const garageMenu: React.FC = () => {
	const [inputText, setinputText] = useState("");
	const [typePropriete, settypePropriete] = useState("fermer");
	const [visible, setVisible] = useState(false);
	const [data, setData] = useState<GarageMenuData | undefined>(undefined);
	const [show, setShow] = useState('revoke');
	const [selected, setSelected] = useState<GarageElementData | undefined>(undefined);
	const [coOwner, setCoOwner] = useState<GarageElementData[] | undefined>(undefined);

	useNuiEvent<boolean>('nui:garage-menu:visible', (status) => {
		setVisible(status);
	});

	useBackspaceKey(() => {
		if (show === 'garage' && data?.advancedPerm) {
			setShow('main');
		}
		if (show === 'revoke' && data?.advancedPerm) {
			setShow('main');
		}
	});

	const setVehicle = (item: GarageElementData) => {
		fetchNui("nui:garage-menu:setVehicle", item);
		setSelected(item);
	}

	useNuiEvent<GarageMenuData>('nui:garage-menu:data', (data) => {
		setData(data);
		setShow(data?.advancedPerm ? 'main' : 'garage');
		settypePropriete(data.access ?? 'fermer')
		setinputText(data.name ?? '')
	});

	const fonction_choiceTypePropriete = useCallback((info: string) => {
		settypePropriete(info);
		fetchNui("nui:garage-menu:button", {
			type: "access",
			value: info,
		});
	}, []);

	useEffect(() => { if (show === 'main') setSelected(undefined) }, [show]);

	useEscapeKey(() => fetchNui('nui:garage-menu:close'), visible);

	return (<>
		{visible && data && <div className="garageMenu">
			{show === 'main' && <div className="mainContainer">
				<div className="title">{'GARAGE'}</div>
				<div className="subTitle">{data?.subTitle}</div>

				<div className="label">Nom</div>
				<input className="textInput" value={inputText} onChange={(ev) => setinputText(ev.target.value)} onBlur={() =>
					fetchNui("nui:garage-menu:rename", {
						rename: inputText,
					})
				} />

				<div className="label" style={{ marginTop: 45 }}>Accès</div>
				<div className="accessContainer">
					<Button
						color="green"
						fontWeight={700}
						fontSize={12}
						label="Ouvert"
						width={133}
						height={202}
						selected={typePropriete === "ouvert"}
						callback={() => fonction_choiceTypePropriete("ouvert")}
					/>
					<div style={{ width: 14 }} />
					<Button
						color="yellow"
						fontWeight={700}
						fontSize={12}
						label="Sonnette"
						width={133}
						height={202}
						selected={typePropriete === "sonnette"}
						callback={() => fonction_choiceTypePropriete("sonnette")}
					/>
					<div style={{ width: 14 }} />
					<Button
						color="red"
						fontWeight={700}
						fontSize={12}
						label="Fermé"
						width={133}
						height={202}
						selected={typePropriete === "fermer"}
						callback={() => fonction_choiceTypePropriete("fermer")}
					/>
				</div>

				<div className="label" style={{ marginTop: 40 }}>Locataires</div>
				<div className="tenantContainer">
					<Button
						color="blue"
						fontWeight={700}
						fontSize={12}
						label="Attribuer le double"
						width={425}
						height={55}
						callback={() =>
							fetchNui("nui:garage-menu:button", {
								type: "set_double",
							})
						}
					/>
					<Button
						color="red"
						fontWeight={700}
						fontSize={12}
						label="Révoquer l'accès"
						width={425}
						height={55}
						callback={async () => {
							const result = await fetchNui<{ data: any[] }>('nui:garage-menu:get-co-owner');
							if (!result) return;
							setCoOwner(result.data);
							setShow('revoke');
						}}
					/>
				</div>

				<div className="label" style={{ marginTop: 50 }}>Stockage</div>
				<div className="mailBox" onClick={() => { fetchNui("nui:garage-menu:button", { type: "open-garage" }); setShow('garage') }}>
					<MediaCdn path="icons" name="car.svg" />
					<div className="mailBoxLabel">Véhicules</div>
				</div>

				<Button
					color="green"
					fontWeight={300}
					fontSize={18}
					label="Sauvegarder"
					width={425}
					height={42}
					callback={() => fetchNui("nui:garage-menu:button", { type: "save" })}
					margin="50px 0 0 0"
				/>
			</div>}
			{show === 'garage' && <div className="mainContainer">
				<div className="title">GARAGE</div>
				<div className="subTitle">{data?.subTitle}</div>

				<div className="label">{_.capitalize(data?.type)}</div>
				<div className="garageItems">
					{
						data?.garageList.map((item, index) => (
							<div key={index} className={"garageItem" + (item?.id === selected?.id ? ' selected' : '')} onClick={() => setVehicle(item)}>
								<img src={item?.img} alt="" className="image" />
								<div className="mailBoxLabel">{item.label}</div>
							</div>
						))
					}
				</div>

				<Button
					color="green"
					fontWeight={300}
					fontSize={18}
					label="Utiliser"
					width={425}
					height={68}
					callback={() => fetchNui("nui:garage-menu:use", { selected })}
					margin="auto 0 0 0"
				/>
				<Button
					color="red"
					fontWeight={300}
					fontSize={18}
					label="Fourrière"
					width={425}
					height={42}
					callback={() => fetchNui("nui:garage-menu:pound", { selected })}
					margin="13px 0 67px 0"
				/>
			</div>}
			{show === 'revoke' && <div className="mainContainer">
				<div className="title">GARAGE</div>
				<div className="subTitle">{data?.subTitle}</div>

				<div className="label">Co-propriétaires</div>
				<div className="garageItems">
					{
						coOwner?.map((item, index) => (
							<div key={index} className={"garageItem" + (item?.id === selected?.id ? ' selected' : '')} onClick={() => setSelected(item)}>
								<img src={item?.img} alt="" className="image" />
								<div className="mailBoxLabel">{item.label}</div>
							</div>
						))
					}
				</div>

				<Button
					color="transparent"
					fontWeight={300}
					fontSize={18}
					label="Révoquer l'accès"
					width={425}
					height={68}
					callback={() => selected && fetchNui("nui:garage-menu:button", {
						type: "revoke_access",
						element: selected
					})}
					margin="auto 0 0 0"
					background="linear-gradient(rgba(222, 83, 70, .35), rgba(255, 0, 0, .35))"
				/>
				<Button
					color="transparent"
					fontWeight={300}
					fontSize={18}
					label="Retour"
					width={425}
					height={42}
					callback={() => setShow('main')}
					margin="13px 0 67px 0"
					background="rgba(0, 0, 0, 0.15)"
				/>
			</div>}
		</div>}
	</>
	);
};

export default garageMenu;
