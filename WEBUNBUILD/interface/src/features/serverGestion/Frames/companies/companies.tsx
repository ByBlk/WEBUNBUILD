import { ICompany, TCompanyType } from './types';

import List from '../../components/List';
import React from 'react';
import { useNuiEvent, fetchNui } from "@/hook";
import styles from "./companies.module.scss";
import MediaCdn from '@/components/mediaCdn/mediaCdn';
import { getCdnUrl } from "@utils/misc";
import ServerGestion from '../../index';

interface ItemProps {
	navigateTo: (component: React.ReactNode) => void;
}

const Companies: React.FC<ItemProps> = ({ navigateTo }) => {
	const [companies, setCompanies] = React.useState<ICompany[]>([]);
	const [companyType, setCompanyType] = React.useState<TCompanyType>("Bars - Restaurants");
	const [company, setCompany] = React.useState<ICompany | null>(null);

	const roles = [
		{ name: "Bars & Restaurants", role: "Bars - Restaurants", color: "green" },
		{ name: "Garages", role: "Garages", color: "orange" },
		{ name: "Commerces", role: "Commerces", color: "yellow" },
	]

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const updateCompany = (key: string, value: any) => {
		setCompany(prevItem => {
			if (!prevItem) return null;

			const updatedItem = { ...prevItem, [key]: value };

			setCompanies(companies.map((c) => c.id === updatedItem.id ? updatedItem : c));

			return updatedItem;
		});
	}

	const handleSave = () => {
		if (!companies) return;
		fetchNui("nui:server-gestion-compagnies:save", companies);
	}

	const handleDelete = () => {
		if (!company) return;
		const updatedCompanies = companies.filter((c) => c.id !== company.id);
		setCompanies(updatedCompanies);
		setCompany(null);

		handleSave();
	}

	const handleDuplicate = () => {
		if (!company) return;
		const newCompany = { ...company, id: companies.length + 1, name: `${company.name} (Copie)` };
		setCompanies([...companies, newCompany]);
		setCompany(newCompany);
	}


	useNuiEvent('nui:server-gestion-compagnies:addPoint', ({ type, coords }: { type: string, coords: { x: number, y: number, z: number }, plate?: string }) => {
		if (company) {
			let updatedCompany: ICompany = company;

			switch (type) {
				case "casier":
					updatedCompany = { ...company, casier: [...company.casier, { id: company.casier.length + 1, name: `Point de craft ${company.casier.length + 1}`, pos: coords }] };
					break;
				case "catalogue":
					updatedCompany = { ...company, catalogue: [...company.catalogue, { id: company.catalogue.length + 1, name: `Point de catalogue ${company.catalogue.length + 1}`, pos: coords }] };
					break;
				case "garage":
					updatedCompany = { ...company, garage: [...company.garage, { id: company.garage.length + 1, name: `Point de garage ${company.garage.length + 1}`, pos: coords }] };
					break;
				case "DJ":
					updatedCompany = { ...company, DJ: [...company.DJ, { id: company.DJ.length + 1, name: `Point DJ ${company.DJ.length + 1}`, pos: coords }] };
					break;
				case "property":
					updatedCompany = { ...company, properties: [...company.properties, { id: company.properties.length + 1, name: `Propriété ${company.properties.length + 1}`, pos: coords }] };
					break;
			}

			setCompany(updatedCompany);
			setCompanies(companies.map((c) => c.id === updatedCompany.id ? updatedCompany : c));
		}
	});

	useNuiEvent('nui:server-gestion-compagnies:newMember', (member: { id: number, name: string, discord: string }) => {
		if (company) {
			const updatedCompany = { ...company, members: [...company.members, member] };
			setCompany(updatedCompany);
			setCompanies(companies.map((c) => c.id === updatedCompany.id ? updatedCompany : c));
		}
	});

	useNuiEvent('nui:server-gestion-compagnies:newVehicle', (vehicle: { id: number, name: string, plate: string }) => {
		if (company) {
			const updatedCompany = { ...company, vehicles: [...company.vehicles, vehicle] };
			setCompany(updatedCompany);
			setCompanies(companies.map((c) => c.id === updatedCompany.id ? updatedCompany : c));
		}
	});

	return (
		<div className={styles.frame}>
			<div className={styles.topbuttons}>
				<div className={styles.window} onClick={() => console.log("Je sais pas ce que ca fait ce truc")}>
					<MediaCdn path="assets/gestion-serveur" name="window.svg" props={{}} />
				</div>
				<div className={styles.close} onClick={() => console.log("Fermer")}>
					<MediaCdn path="assets/gestion-serveur" name="close.svg" props={{}} />
				</div>
			</div>
			<div className={styles.header}>
				<div className={styles.goBack} onClick={() => navigateTo(<ServerGestion />)}>
					<MediaCdn path="assets/gestion-serveur" name="back.svg" props={{}} />
				</div>
				<div className={styles.titles}>
					<h1>Gestion</h1>
					<h2>Entreprise {company ? `${company.name}` : ""}</h2>
				</div>
			</div>
			{company ? (
				<div className={styles.headButtons}>
					<div className={styles.button} onClick={() => fetchNui("nui:server-gestion-compagnies:general", company?.id)}>
						<span>General</span>
					</div>
					<div className={styles.button} onClick={() => fetchNui("nui:server-gestion-compagnies:members", company?.id)}>
						<span>Catalogue</span>
					</div>
					<div className={styles.button} onClick={() => fetchNui("nui:server-gestion-compagnies:members", company?.id)}>
						<span>Craft</span>
					</div>
				</div>
			) : <div className={styles.spacer}></div>}
			<div className={styles.body}>
				<div className={`${styles.column} ${styles.nav}`}>
					<List title="Type d'entreprise" elements={roles.map((r) => ({
						name: r.name,
						circle: {
							backgroundColor: r.color,
							padding: true
						},
						selected: r.role === companyType,
						onClick() {
							setCompanyType(r.role as TCompanyType);
						},
					}))} />
					<List
						title={companyType.charAt(0).toUpperCase() + companyType.slice(1).toLowerCase()}
						elements={companies.filter((c) => c.type === companyType).map((r) => ({
							name: r.name,
							icon: r.image,
							selected: company?.id === r.id,
							onClick() {
								setCompany(r);
							}
						}))}
						last={{
							name: "Créer une entreprise",
							icon: getCdnUrl("assets/gestion-serveur", "plus.svg"),
							selected: false,
							onClick() {
								setCompany(() => {
									const newCompany: ICompany = {
										id: companies.length + 1,
										name: "Nouvelle entreprise",
										type: companyType,
										color: "",
										lead: "",
										blips: { x: 0, y: 0, z: 0 },
										members: [],
										posGestion: { x: 0, y: 0, z: 0 },
										posCraft: { x: 0, y: 0, z: 0 },
										image: getCdnUrl("assets/gestion-serveur/crew", "photo.svg"),
										casier: [],
										catalogue: [],
										garage: [],
										vehicles: [],
										DJ: [],
										properties: []
									}

									setCompanies([...companies, newCompany]);

									return newCompany;

								});
							}
						}} />
				</div>
				<div className={styles.column}>
					<div className={styles.main}>
						{company && (
							<>
								<div className={styles.column}>
									<div className={styles.actions}>
										<div className={styles.title}>
											Fiche d'entreprise
										</div>

										<div className={styles.preview}>
											<img src={company.image} alt={company.name} />
											<div className={styles.infos}>
												<div className={styles.itemname}>{company.name}</div>
												<div className={styles.itemcategory}>{company.type}</div>
											</div>
										</div>

										<div className={styles.subtitle}>
											Informations
										</div>

										<div className={`${styles.metadata} ${styles.scrollbar}`}>
											<div className={styles.info}>
												<div className={styles.icon}>
													<MediaCdn path="assets/gestion-serveur/crew" name="name.svg" props={{}} />
												</div>
												<div className={styles.label}>
													Nom
												</div>
												<div className={styles.value}>
													<input type="text" value={company.name} onChange={(e) => updateCompany("name", e.currentTarget.value)} />
												</div>
											</div>

											<div className={styles.info}>
												<div className={styles.icon}>
													<MediaCdn path="assets/gestion-serveur" name="name.svg" props={{}} />
												</div>
												<div className={styles.label}>
													Type
												</div>
												<div className={styles.value}>
													<select
														value={company.type}
														onChange={(e) => updateCompany("type", e.currentTarget.value)}
													>
														<option value="Bars - Restaurants">Bars & Restaurants</option>
														<option value="Garages">Garage</option>
														<option value="Commerces">Commerce</option>
													</select>
												</div>
											</div>

											<div className={styles.info}>
												<div className={styles.icon}>
													<MediaCdn path="assets/gestion-serveur/crew" name="color.svg" props={{}} />
												</div>
												<div className={styles.label}>
													Couleur
												</div>
												<div className={styles.value}>
													<input type="text" value={company.color} onChange={(e) => updateCompany("color", e.currentTarget.value)} />
												</div>
											</div>

											<div className={styles.info}>
												<div className={styles.icon}>
													<MediaCdn path="assets/gestion-serveur/crew" name="user.svg" props={{}} />
												</div>
												<div className={styles.label}>
													PDG
												</div>
												<div className={styles.value}>
													<input type="text" value={company.lead} onChange={(e) => updateCompany("lead", e.currentTarget.value)} />
												</div>
											</div>

											<div className={styles.info}>
												<div className={styles.icon}>
													<MediaCdn path="assets/gestion-serveur/crew" name="reward.svg" props={{}} />
												</div>
												<div className={styles.label}>
													Blip
												</div>
												<div className={styles.value}>
													<input type="number" value={company.blips.x} onChange={(e) => updateCompany("blips", { ...company.blips, x: parseFloat(e.currentTarget.value) })} onWheel={(e) => e.currentTarget.blur()} placeholder="X" />
													<input type="number" value={company.blips.y} onChange={(e) => updateCompany("blips", { ...company.blips, y: parseFloat(e.currentTarget.value) })} onWheel={(e) => e.currentTarget.blur()} placeholder="Y" />
													<input type="number" value={company.blips.z} onChange={(e) => updateCompany("blips", { ...company.blips, z: parseFloat(e.currentTarget.value) })} onWheel={(e) => e.currentTarget.blur()} placeholder="Z" />
												</div>
											</div>

											<div className={styles.info} >
												<div className={styles.icon}>
													<MediaCdn path="assets/gestion-serveur/crew" name="user.svg" props={{}} />
												</div>
												<div className={styles.label}>
													Nombre d'employés
												</div>
												<div className={styles.value}>
													{company.members.length || 0}
												</div>
											</div>
											<div className={styles.info} style={{ backgroundColor: "rgba(170, 170, 170, 0.10)" }}>
												<div className={styles.icon}>
													<MediaCdn path="assets/gestion-serveur/crew" name="experience.svg" props={{}} />
												</div>
												<div className={styles.label}>
													Point de gestion
												</div>
												<div className={styles.value}>
													<input type="number" value={company.posGestion.x} onChange={(e) => updateCompany("posGestion", { ...company.posGestion, x: parseFloat(e.currentTarget.value) })} onWheel={(e) => e.currentTarget.blur()} placeholder="X" />
													<input type="number" value={company.posGestion.y} onChange={(e) => updateCompany("posGestion", { ...company.posGestion, y: parseFloat(e.currentTarget.value) })} onWheel={(e) => e.currentTarget.blur()} placeholder="Y" />
													<input type="number" value={company.posGestion.z} onChange={(e) => updateCompany("posGestion", { ...company.posGestion, z: parseFloat(e.currentTarget.value) })} onWheel={(e) => e.currentTarget.blur()} placeholder="Z" />
												</div>
											</div>
											<div className={styles.info}>
												<div className={styles.icon}>
													<MediaCdn path="assets/gestion-serveur/crew" name="experience.svg" props={{}} />
												</div>
												<div className={styles.label}>
													Point de craft
												</div>
												<div className={styles.value}>
													<input type="number" value={company.posCraft.x} onChange={(e) => updateCompany("posCraft", { ...company.posCraft, x: parseFloat(e.currentTarget.value) })} onWheel={(e) => e.currentTarget.blur()} placeholder="X" />
													<input type="number" value={company.posCraft.y} onChange={(e) => updateCompany("posCraft", { ...company.posCraft, y: parseFloat(e.currentTarget.value) })} onWheel={(e) => e.currentTarget.blur()} placeholder="Y" />
													<input type="number" value={company.posCraft.z} onChange={(e) => updateCompany("posCraft", { ...company.posCraft, z: parseFloat(e.currentTarget.value) })} onWheel={(e) => e.currentTarget.blur()} placeholder="Z" />
												</div>
											</div>

											<div className={styles.subtitle} style={{ backgroundColor: "rgba(170, 170, 170, 0.10)" }}>
												Image
											</div>

											<div className={styles.info}>
												<div className={styles.icon}>
													<MediaCdn path="assets/gestion-serveur/crew" name="photo.svg" props={{}} />
												</div>
												<div className={styles.label}>
													Image CDN
												</div>
												<div className={styles.value}>
													<input type="text" value={company.image} onChange={(e) => updateCompany("image", e.currentTarget.value)} />
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className={`${styles.column} ${styles.members}`}>
									<div className={styles.row}>
										<List
											title="Liste des employés"
											fallback='Aucun employé'
											maxHeight="8em"
											elements={company.members.map((e) => ({
												name: e.name,
												icon: getCdnUrl("assets/gestion-serveur/crew", "user.svg"),
												selected: false,
												delete: {
													icon: getCdnUrl("assets/gestion-serveur", "close.svg"),
													onClick() {
														const updatedCompany = { ...company, members: company.members.filter((m) => m.id !== e.id) };
														setCompany(updatedCompany);
														setCompanies(companies.map((c) => c.id === updatedCompany.id ? updatedCompany : c));
													}
												},
												onClick() {
													console.log("Employee selected", e)
												}
											}))}
											first={{
												name: "Ajouter un employé (id discord)",
												icon: getCdnUrl("assets/gestion-serveur", "plus.svg"),
												selected: false,
												input: {
													type: "number",
													onEnter: (e) => {
														if (e.currentTarget && (e.currentTarget as HTMLInputElement).value)
															fetchNui("nui:server-gestion-compagnies:addMember", company.id, { data: (e.currentTarget as HTMLInputElement).value });
														(e.currentTarget as HTMLInputElement).value = "";
													}
												}
											}}
										/>
										<List
											title="Points de casier"
											fallback='Aucun point de casier'
											maxHeight="5.5em"
											elements={company.casier.map((t) => ({
												name: t.name,
												icon: getCdnUrl("assets/gestion-serveur/crew", "map.svg"),
												selected: false,
												delete: {
													icon: getCdnUrl("assets/gestion-serveur", "close.svg"),
													onClick() {
														const updatedCompany = { ...company, casier: company.casier.filter((m) => m.id !== t.id) };
														setCompany(updatedCompany);
														setCompanies(companies.map((c) => c.id === updatedCompany.id ? updatedCompany : c));
													}
												},
												onClick() {
													console.log("Casier selected", t)
												}
											}))}
											first={{
												name: "Ajouter un point de casier",
												icon: getCdnUrl("assets/gestion-serveur", "plus.svg"),
												selected: false,
												onClick() {
													fetchNui("nui:server-gestion-compagnies:defineCasier", company.id);
												}
											}}
										/>
										<List
											title="Points de catalogue"
											fallback='Aucun point de catalogue'
											maxHeight="5.5em"
											elements={company.catalogue.map((p) => ({
												name: p.name,
												icon: getCdnUrl("assets/gestion-serveur/crew", "house.svg"),
												selected: false,
												delete: {
													icon: getCdnUrl("assets/gestion-serveur", "close.svg"),
													onClick() {
														const updatedCompany = { ...company, catalogue: company.catalogue.filter((m) => m.id !== p.id) };
														setCompany(updatedCompany);
														setCompanies(companies.map((c) => c.id === updatedCompany.id ? updatedCompany : c));
													}
												},
												onClick() {
													console.log("Catalogue selected", p)
												}

											}))}
											first={{
												name: "Ajouter un point de catalogue",
												icon: getCdnUrl("assets/gestion-serveur", "plus.svg"),
												selected: false,
												onClick() {
													fetchNui("nui:server-gestion-compagnies:defineCatalogue", company.id);
												}
											}}
										/>
										<List
											title="Points de garage"
											fallback='Aucun point de garage'
											maxHeight="5.5em"
											elements={company.garage.map((p) => ({
												name: p.name,
												icon: getCdnUrl("assets/gestion-serveur/crew", "house.svg"),
												selected: false,
												delete: {
													icon: getCdnUrl("assets/gestion-serveur", "close.svg"),
													onClick() {
														const updatedCompany = { ...company, garage: company.garage.filter((m) => m.id !== p.id) };
														setCompany(updatedCompany);
														setCompanies(companies.map((c) => c.id === updatedCompany.id ? updatedCompany : c));
													}
												},
												onClick() {
													console.log("Property selected", p)
												}
											}))}
											first={{
												name: "Ajouter un point de garage",
												icon: getCdnUrl("assets/gestion-serveur", "plus.svg"),
												selected: false,
												onClick() {
													fetchNui("nui:server-gestion-compagnies:defineGarage", company.id);
												}
											}}
										/>
									</div>
								</div>
								<div className={styles.column}>
									<div className={styles.row}>
										<List
											title="Véhicules"
											fallback='Aucun véhicule'
											maxHeight="9em"
											elements={company.vehicles.map((v) => ({
												name: v.name + " - " + v.plate,
												icon: getCdnUrl("visionv2/gesti</div>on-serveur/crew", "car.svg"),
												selected: false,
												delete: {
													icon: getCdnUrl("assets/gestion-serveur", "close.svg"),
													onClick() {
														const updatedCompany = { ...company, vehicles: company.vehicles.filter((m) => m.id !== v.id) };
														setCompany(updatedCompany);
														setCompanies(companies.map((c) => c.id === updatedCompany.id ? updatedCompany : c));
													}
												},
												onClick() {
													console.log("Vehicle selected", v)
												}
											}))}
											first={{
												name: "Ajouter un véhicule (nom de spawn)",
												icon: getCdnUrl("assets/gestion-serveur", "plus.svg"),
												selected: false,
												input: {
													type: "text",
													onEnter: (e) => {
														if (e.currentTarget && (e.currentTarget as HTMLInputElement).value)
															fetchNui("nui:server-gestion-compagnies:addVehicle", company.id, { data: (e.currentTarget as HTMLInputElement).value });
														(e.currentTarget as HTMLInputElement).value = "";
													}
												}
											}}
										/>

										<List
											title="Point DJs"
											fallback='Aucun point DJ'
											maxHeight="9em"
											elements={company.DJ.map((t) => ({
												name: t.name,
												icon: getCdnUrl("assets/gestion-serveur/crew", "map.svg"),
												selected: false,
												delete: {
													icon: getCdnUrl("assets/gestion-serveur", "close.svg"),
													onClick() {
														const updatedCompany = { ...company, DJ: company.DJ.filter((m) => m.id !== t.id) };
														setCompany(updatedCompany);
														setCompanies(companies.map((c) => c.id === updatedCompany.id ? updatedCompany : c));
													}
												},
												onClick() {
													console.log("Territory selected", t)
												}
											}))}
											first={{
												name: "Ajouter un point DJ",
												icon: getCdnUrl("assets/gestion-serveur", "plus.svg"),
												selected: false,
												onClick() {
													fetchNui("nui:server-gestion-compagnies:defineDJ", company.id);
												}
											}}
										/>

										<List
											title="Propriétés"
											fallback='Aucune propriété'
											maxHeight="9em"
											elements={company.properties.map((p) => ({
												name: p.name,
												icon: getCdnUrl("assets/gestion-serveur/crew", "house.svg"),
												selected: false,
												delete: {
													icon: getCdnUrl("assets/gestion-serveur", "close.svg"),
													onClick() {
														const updatedCompany = { ...company, properties: company.properties.filter((m) => m.id !== p.id) };
														setCompany(updatedCompany);
														setCompanies(companies.map((c) => c.id === updatedCompany.id ? updatedCompany : c));
													}
												},
												onClick() {
													console.log("Property selected", p)
												}
											}))}
											first={{
												name: "Ajouter une propriété",
												icon: getCdnUrl("assets/gestion-serveur", "plus.svg"),
												selected: false,
												onClick() {
													fetchNui("nui:server-gestion-compagnies:defineProperty", company.id);
												}
											}}
										/>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
			{company && (
				<div className={styles.footerButtons}>
					<div className={styles.button} onClick={() => fetchNui("nui:server-gestion-compagnies:join", company?.id)}>
						<span>Rejoindre</span>
					</div>
					<div className={styles.button} onClick={() => handleDuplicate()}>
						<span>Dupliquer</span>
					</div>
					<div className={styles.button} onClick={() => handleDelete()}>
						<span>Supprimer</span>
					</div>
					<div className={styles.buttonSave} id="save" onClick={() => handleSave()}>
						<span>Sauvegarder</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default Companies;
