import "./style.scss";
import "react-circular-progressbar/dist/styles.css";
import React, { useEffect, useState } from "react";
import { fetchNui } from "@hooks/fetchNui";
import { useNuiEvent } from "@hooks/nuiEvent";
import { PropertyMenuData, CoOwnerProps } from "./types";
import Button from "@/components/button/button";
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { useEscapeKey } from "@hooks/useKeys";

const propertyMenu: React.FC = () => {
	const [inputText, setinputText] = useState("");
	const [typePropriete, settypePropriete] = useState("fermer");
	const [visible, setVisible] = useState(false);
	const [data, setData] = useState<PropertyMenuData | undefined>(undefined);
	const [show, setShow] = useState('main');
	const [deletedOwner, setDeletedOwner] = useState<string[]>([]);
	const [coOwner, setCoOwner] = useState<CoOwnerProps[] | undefined>(undefined);
	const [selected, setSelected] = useState<CoOwnerProps | undefined>(undefined);
	const [coOwnerOnly, setCoOwnerOnly] = useState<boolean>(false);

	useNuiEvent<boolean>('nui:property-menu:visible', (status) => {
		setVisible(status);
	});

	useNuiEvent<PropertyMenuData>('nui:property-menu:data', (data) => {
		setData(data);
		settypePropriete(data.access ?? 'fermer');
		setinputText(data.name ?? '');
		setCoOwner(data.coOwnerList);
		setDeletedOwner([]);
		setSelected(undefined);
		setCoOwnerOnly(false);
	});

	useNuiEvent<{ coOwnerList: CoOwnerProps[], name: string }>('nui:property-menu:dataCoowner', (data) => {
		setShow('revoke');
		setinputText(data.name ?? '');
		setCoOwner(data.coOwnerList);
		setDeletedOwner([]);
		setSelected(undefined);
		setCoOwnerOnly(true);
	});

	useEffect(() => { if (show === 'main') setSelected(undefined) }, [show]);

	useEscapeKey(() => fetchNui('nui:property-menu:close'), visible);

	return (<>
		{visible && <div className="propertyMenu">
			{show === 'main' && <div className="mainContainer">
				<div className="title">{data?.nameProperty.toUpperCase()}</div>
				<div className="subTitle">{data?.name.toUpperCase()}</div>
				<div style={{color: (data?.rental ?? 0) > 5 ? 'white' : 'red', marginBottom: "50px"}}>{data?.rental} jours restant(s)</div>

				<div className="label">Nom</div>
				<input className="textInput" value={inputText} onChange={(ev) => setinputText(ev.target.value)} />

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
						callback={() => settypePropriete("ouvert")}
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
						callback={() => settypePropriete("sonnette")}
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
						callback={() => settypePropriete("fermer")}
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
							fetchNui("nui:property-menu:button", {
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
						callback={() => setShow('revoke')}
					/>
				</div>

				<div className="label" style={{ marginTop: 50 }}>Stockage</div>
				<div className="mailBox" onClick={() => fetchNui("nui:property-menu:button", { type: "emptyMailbox" })}>
					<MediaCdn path="assets/icons" name="items.svg" />
					<div className="mailBoxLabel">Boîte aux lettres</div>
				</div>

				<Button
					color="green"
					fontWeight={300}
					fontSize={18}
					label="Sauvegarder"
					width={425}
					height={42}
					callback={() => fetchNui("nui:property-menu:save", { 
						access: typePropriete,
						name: inputText,
						deletedOwner: deletedOwner
					 })}
					margin="50px 0 0 0"
				/>
			</div>}
			{show === 'revoke' && <div className="mainContainer">
				{coOwnerOnly ? (
					<div className="title">{inputText}</div>
				) : (
					<>
						<div className="title">{data?.type}</div>
						<div className="subTitle">{data?.name}</div>
					</>
				)}	

				<div className="label">Co-propriétaires</div>
				<div className="garageItems">
					{
						coOwner?.map((item, index) => (
							<div key={index} className={"garageItem" + (item?.id === selected?.id ? ' selected' : '')} onClick={() => setSelected(item)}>
								<img src={item?.face} style={{ filter: `grayscale(${item?.hide ? 1 : 0})`}} draggable={false} />
								<div className="mailBoxLabel">{item.name}</div>
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
					callback={() => {
						if (selected) {
							if (coOwnerOnly) {
								fetchNui("nui:property-menu:return", selected.id);
							} else {
								setDeletedOwner([...deletedOwner, selected.id]);
								setCoOwner(coOwner?.filter(item => item.id !== selected.id));
								setSelected(undefined);
							}
						}
					}}
					margin="auto 0 0 0"
					background="linear-gradient(rgba(222, 83, 70, .35), rgba(255, 0, 0, .35))"
				/>
				{!coOwnerOnly && <Button
					color="transparent"
					fontWeight={300}
					fontSize={18}
					label="Retour"
					width={425}
					height={42}
					callback={() => setShow('main')}
					margin="13px 0 67px 0"
					background="rgba(0, 0, 0, 0.15)"
				/>}
			</div>}
		</div>}
	</>
	);
};

export default propertyMenu;
