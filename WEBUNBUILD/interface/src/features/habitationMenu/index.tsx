import "./style.scss";
import React, { useState, useRef, useEffect } from "react";
import { useNuiEvent, fetchNui } from "@hooks/index";
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { Slider } from "@mui/material";
import { useEscapeKey } from "@hooks/useKeys";

const habitationMenu: React.FC = () => {
	const [visible, setVisible] = useState(false);
	const [type, setType] = useState(""); // Creation | Gestion
	const [duration, setDuration] = useState(1);
	const [maxLocationJours, setMaxLocationJours] = useState(30); 
	const progressRef = useRef<HTMLDivElement>(null)
	const [selectedCapacité, setSelectedCapacité] = useState("aucun");
	const [selectedType, setSelectedType] = useState("Habitations"); 
	const [selectedItems, setSelectedItems] = useState("");
	const [selectedTempItems, setSelectedTempItems] = useState("");
	const [name, setName] = useState("");
	const [Listing, setListing] = useState<any>([]);
	const [durationProlongation, setDurationProlongation] = useState(1);
	const [selectedAccess, setSelectedAccess] = useState<"ouvert" | "fermer" | "sonnette">("sonnette");
	const [selectedOwnerType, setSelectedOwnerType] = useState<"player" | "crew" | "job" | "">("player");

	useEffect(() => {
	  if (progressRef.current) {
		const percentage = ((duration - 1) / maxLocationJours ) * 100
		progressRef.current.style.width = `${percentage}%`
	  }
	}, [duration])

	useNuiEvent<boolean>('nui:habitation-menu:visible', (status) => {
		setVisible(status);
	});

	useNuiEvent<string>('nui:habitation-menu:data', (data: any) => {
		setMaxLocationJours(30);
		setName(data.name || "");
		setListing(data.items);
		setType(data.type); 
		setDuration(data.duration); 
		setDurationProlongation(0);
		setSelectedAccess(data.access || "sonnette");
		setSelectedOwnerType(data.ownerType || "");
	});

	const HandleProperty = (handle: string) => {
		console.log(handle);
		if (handle === "Donner le double des cléfs") {
			fetchNui('nui:habitation-menu:double');
		} else if (handle === "Transférer la propriété") {
			fetchNui('nui:habitation-menu:transfert');
		} else if (handle === "Liste des co-propriétaires") {
			fetchNui('nui:habitation-menu:copro');
		}
	}

	const HandleCapacité = (capacité: string) => {
		setSelectedCapacité(capacité); 
	}

	useEscapeKey(() => {
		fetchNui('nui:habitation-menu:close');
		setVisible(false);
	}, visible);

	return (
		<>
			{visible && <div className={"MenuHabitation"}> 
				{type === "Creation" && (
					<div className="MenuHabitationCreation">
						<div className="MenuHabitation__header">
							<div className="MenuHabitation__header__img">
								<MediaCdn path="assets/catalogues/headers" name="header_dynasty.webp" props={{}}  />
							</div>
							<div className="MenuHabitation__header__title">
								<h1>Création de propriétés</h1> 
							</div> 
						</div>

						<div className="MenuHabitation__name">
							<h1>Nom</h1>
							<input type="text" value={name} className="inputName" onChange={(e) => {
								setName(e.target.value);
							}}/> 
						</div>

						<div className="MenuHabitation__ButtonType">
							<h1>Type de propriété</h1>
							<div className="MenuHabitation__ButtonType__Items">
								<div className={`MenuHabitation__ButtonType__Items__Btn ${selectedType === 'Habitations' ? 'selected' : ''}`} onClick={() => {
										setSelectedType('Habitations');
										setSelectedItems("");
									}}>
									<MediaCdn path="assets/catalogues/habitation" name="HabitationImg.png" props={{
										className: "MenuHabitation__ButtonType__Items__Btn__img"
									}}  />
									<div className="MenuHabitation__ButtonType__Items__Btn__title">
										<h1>Habitations</h1>
									</div>
								</div>
								<div className={`MenuHabitation__ButtonType__Items__Btn ${selectedType === 'Garage' ? 'selected' : ''}`} onClick={() => {
									setSelectedType('Garage');
									setSelectedItems("");
								}}>
									<MediaCdn path="assets/catalogues/habitation" name="GarageImg.png" props={{
										className: "MenuHabitation__ButtonType__Items__Btn__img"
									}}  />
									<div className="MenuHabitation__ButtonType__Items__Btn__title">
										<h1>Garages</h1>
									</div>
								</div>
								<div className={`MenuHabitation__ButtonType__Items__Btn ${selectedType === 'Entrepot' ? 'selected' : ''}`} onClick={() => {
									setSelectedType('Entrepot');
									setSelectedItems("");
								}}>
									<MediaCdn path="assets/catalogues/habitation" name="stockageImg.png" props={{
										className: "MenuHabitation__ButtonType__Items__Btn__img"
									}}/>
									<div className="MenuHabitation__ButtonType__Items__Btn__title">
										<h1>Entrepots</h1>
									</div>
								</div>
							</div>

						</div>

						<div className="MenuHabitation__stockage">
							<h1>Capacité de stockage</h1>
							<div className="MenuHabitation__stockage__capacite">
								<div className={`MenuHabitation__stockage__capacite__num ${selectedCapacité === 'aucun' ? 'selected' : ''} `} onClick={ () => {HandleCapacité('aucun')}}>
									<h1>X</h1>
								</div>
								<div className={`MenuHabitation__stockage__capacite__num ${selectedCapacité === '50' ? 'selected' : ''} `} onClick={ () => {HandleCapacité('50')}}>
									<h1>50</h1>
								</div>
								<div className={`MenuHabitation__stockage__capacite__num ${selectedCapacité === '100' ? 'selected' : ''} `} onClick={() => {HandleCapacité('100')}}>
									<h1>100</h1>
								</div>
								<div className={`MenuHabitation__stockage__capacite__num ${selectedCapacité === '300' ? 'selected' : ''} `} onClick={() => {HandleCapacité('300')}}>
									<h1>300</h1>
								</div>
								<div className={`MenuHabitation__stockage__capacite__num ${selectedCapacité === '500' ? 'selected' : ''} `} onClick={() => {HandleCapacité('500')}}>
									<h1>500</h1>
								</div>
								<div className={`MenuHabitation__stockage__capacite__num ${selectedCapacité === '1000' ? 'selected' : ''} `} onClick={() => {HandleCapacité('1000')}}>
									<h1>1000</h1>
								</div>
							</div>
						</div>

						<div className="MenuHabitation__duration">
							<div className="MenuHabitation__duration__text">
								<h1>Durée de location</h1>
								<h2><span>{duration}</span> jours</h2>
							</div>
							<div className="MenuHabitation__duration__slider">
								<div className="MenuHabitation__duration__slider__progress" ref={progressRef}></div>
								<Slider
									max={maxLocationJours}
									min={1}
									defaultValue={duration}
									className="cSlider"
									onChange={(_, value) => setDuration(value as number)}
								/>
							</div>
						</div>

						<div className="MenuHabitation__Listing">
							<h1>{selectedType}</h1>
							<div className="MenuHabitation__Listing__Case" onClick={() => {
								setType("Listing");
								setSelectedTempItems(selectedItems);
								if (selectedItems != "") {
									fetchNui('nui:habitation-menu:selectedItems', {
										items: selectedItems,
									});
								}
							}}>
								<MediaCdn path="assets/catalogues/habitation" name="habitation.svg" props={{
									className: "MenuHabitation__Listing__Case__img"
								}} />
								<h1>Listing des {selectedType}</h1>
							</div>
						</div>

						<div className={`MenuHabitation__Button ${selectedItems != "" ? 'green' : ''}`} onClick={() => {
							if (selectedItems != "")
								fetchNui('nui:habitation-menu:create', {
									type: selectedType,
									items: selectedItems, 
									capacité: HandleCapacité,
									duration: duration,
									name: name,
									weight: selectedCapacité
								});
						}}>
							<h1 style={{ opacity: selectedItems !== "" ? '1' : '.35' }}>Confirmer</h1>
						</div>
					</div>
					
				)}
				{type === "Listing" && (
					<div className="MenuHabitationListing">
						<div className="MenuHabitation__header">
							<div className="MenuHabitation__header__img">
								<MediaCdn path="assets/catalogues/habitation" name="header.png" props={{}}  />
							</div>
							<div className="MenuHabitation__header__title">
								<h1>{selectedType}</h1> 
							</div> 
						</div>

						<div className="MenuHabitationListing__container">
							{Listing.filter((item: { type: string; }) => item.type === selectedType).map((item: { name: string; img: string; }, index: number) => (
								<div className={`MenuHabitationListing__container__item ${selectedTempItems === item.name ? 'selected' : ''}`} key={index} onClick={() => {
									setSelectedTempItems(item.name);
									fetchNui('nui:habitation-menu:selectedItems', {
										items: item.name,
									});
								}}> 
									<MediaCdn path="assets/catalogues/properties" name={`${item.img}.webp`}  props={{ 
										className: "MenuHabitationListing__container__item__img",
										draggable: false
									}}/>
									<h1>{item.name}</h1> 
								</div>
							))}
						</div>

						<div className="MenuHabitationListing__Button">
							<div className={`MenuHabitationListing__Button__Btn ${selectedTempItems != "" ? 'green' : ''}`} onClick={() => {
								if (selectedTempItems != "") {
									setSelectedItems(selectedTempItems);
									setType("Creation");
									fetchNui("nui:habitation-menu:disablePreview");
								}
							}}>
								<h1 style={{ opacity: selectedTempItems !== "" ? '1' : '.35' }}>Selectionner</h1>
							</div>
							<div className="MenuHabitationListing__Button__Btn red" onClick={() => {
								setType("Creation");
								fetchNui("nui:habitation-menu:disablePreview");
							}}>
								<h1>Retour</h1>
							</div>
						</div>

						
					</div>
				)}
				{type === "Gestion" && (
					<div className="MenuHabitationGestion">
						<div className="MenuHabitation__header">
							<div className="MenuHabitation__header__img">
								<MediaCdn path="assets/catalogues/habitation" name="header.png" props={{}}  />
							</div>
							<div className="MenuHabitation__header__title">
								<h1>Gestion de propriétés</h1> 
							</div> 
						</div>
						<div className="MenuHabitation__name">
							<h1>Nom</h1>
							<input type="text" value={name} className="inputName" onChange={(e) => {
								setName(e.target.value);
							}}/> 
						</div>
						<div className="MenuHabitationGestion__ButtonType">
							<h1>Accès</h1>
							<div className="MenuHabitationGestion__ButtonType__Items">
								<div className={`MenuHabitationGestion__ButtonType__Items__btn ${selectedAccess == "ouvert" ? "green" : ""}`} onClick={() => {{
									setSelectedAccess("ouvert");
								}}}>
									<h1>Ouvert</h1>
								</div>
								<div className={`MenuHabitationGestion__ButtonType__Items__btn ${selectedAccess == "sonnette" ? "yellow" : ""}`} onClick={() => {{
									setSelectedAccess("sonnette");
								}}}>
									<h1>Sonnette</h1>
								</div>
								<div className={`MenuHabitationGestion__ButtonType__Items__btn ${selectedAccess == "fermer" ? "red" : ""}`} onClick={() => {{
									setSelectedAccess("fermer");
								}}}>
									<h1>Fermer</h1>
								</div>
							</div>
						</div>
						<div className="MenuHabitationGestion__ButtonType">
							<h1>Propriété</h1>
							<div className="MenuHabitationGestion__ButtonType__Items">
								<div className="MenuHabitationGestion__ButtonType__Items__btn" onClick={() => {{
									HandleProperty("Donner le double des cléfs");
								}}}>
									<h1>Mettre co-propriétaires</h1>
								</div>
								<div className="MenuHabitationGestion__ButtonType__Items__btn" onClick={() => {{
									HandleProperty("Transférer la propriété");
								}}}>
									<h1>Transférer la propriété</h1>
								</div>
								<div className="MenuHabitationGestion__ButtonType__Items__btn" onClick={() => {{
									HandleProperty("Liste des co-propriétaires");
								}}}>
									<h1>Liste des co-propriétaires</h1>
								</div>
							</div>
						</div>
						<div className="MenuHabitation__duration">
							<div className="MenuHabitation__duration__text">
								<h1>Prolonger l'habition</h1>
								<h2><span>{durationProlongation}</span> jours</h2>
							</div>
							<div className="MenuHabitation__duration__slider">
								<div className="MenuHabitation__duration__slider__progress" ref={progressRef}></div>
								<Slider
									max={maxLocationJours}
									min={1}
									value={durationProlongation}
									className="cSlider"
									onChange={(_, value) => setDurationProlongation(value as number)}
								/>
							</div>
						</div>
						<div className="MenuHabitationGestion__ButtonType">
							<h1>Type d’habitation</h1>
							<div className="MenuHabitationGestion__ButtonType__Items">
								<div className={`MenuHabitationGestion__ButtonType__Items__btn ${selectedOwnerType == "player" ? "selected" : ""}`} onClick={() => {
									setSelectedOwnerType("player");
								}}>
									<h1>Personnel</h1>
								</div>
								<div className={`MenuHabitationGestion__ButtonType__Items__btn ${selectedOwnerType == "crew" ? "selected" : ""}`} onClick={() => {
									setSelectedOwnerType("crew");
								}}>
									<h1>Crews</h1>
								</div>
								<div className={`MenuHabitationGestion__ButtonType__Items__btn ${selectedOwnerType == "job" ? "selected" : ""}`} onClick={() => {
									setSelectedOwnerType("job");
								}}>
									<h1>Entreprise</h1>
								</div>
								
							</div>

						</div>
						<div className="MenuHabitationListing__Button">
							<div className="MenuHabitationListing__Button__Btn green" onClick={() => {
								fetchNui('nui:habitation-menu:confirm', {
									name: name,
									duration: durationProlongation,
									access: selectedAccess,
									ownerType: selectedOwnerType
								});
							}}>
								<h1>Confirmer</h1>
							</div>
							<div className="MenuHabitationListing__Button__Btn red" onClick={() => {
								fetchNui('nui:habitation-menu:delete');
							}}>
								<h1>Supprimer la propriété</h1>
							</div>
						</div>
					</div>
				)}
			</div>}
		</>
	);
};

export default habitationMenu;
