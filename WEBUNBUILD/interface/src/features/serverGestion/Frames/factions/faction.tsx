import { IFaction, TCompanyType } from './types';
import List from '../../components/List';
import React from 'react';
import styles from "./factions.module.scss";
import MediaCdn from '@/components/mediaCdn/mediaCdn';
import ServerGestion from '../../index';
import {getCdnUrl} from "@/utils";

interface ItemProps {
	navigateTo: (component: React.ReactNode) => void,
}

const Factions: React.FC<ItemProps> = ({ navigateTo }) => {
	const [factions, setFactions] = React.useState<IFaction[]>([]);
	const [factionType, setFactionType] = React.useState<TCompanyType>("Police");

	const [faction, setFaction] = React.useState<IFaction | null>(null);
	const [showUnstartedFactions, setShowUnstartedFactions] = React.useState(false);

	const roles = [
		{ name: "Police", role: "Police", color: "red" },
		{ name: "Médecins", role: "EMS", color: "yellow" },
		{ name: "Administrative", role: "Administrative", color: "orange" },
	]

	const updateFaction = (key: string, value: any) => {
		setFaction(prevItem => {
			if (!prevItem) return prevItem;

			const updatedItem = { ...prevItem, [key]: value };

			setFactions(factions.map((f) => f.id === prevItem.id ? updatedItem : f));

			return updatedItem;
		});
	}

	return (
		<div className={styles.frame}>
			<div className={styles.header}>
				<div className={styles.goBack} onClick={() => navigateTo(<ServerGestion />)}>
					<MediaCdn path="assets/gestion-serveur" name="back.svg" props={{}} />
				</div>
				<div className={styles.titles}>
					<h1>Gestion</h1>
					<h2>Factions {faction ? `${faction.name}` : ""}</h2>
				</div>
			</div>
			<div className={styles.body}>
				<div className={`${styles.column} ${styles.nav}`}>
					<List title="Type de faction" elements={roles.map((r) => ({
						name: r.name,
						circle: {
							backgroundColor: r.color,
							padding: true
						},
						selected: r.role === factionType,
						onClick() {
							setFactionType(r.role as TCompanyType);
							setShowUnstartedFactions(false);
						},
					}))}    last={{
						name: "Demandes de faction",
						icon: getCdnUrl("assets/gestion-serveur/crew", "demandes.svg"),
						selected: showUnstartedFactions,
						onClick() {
							// setCrewType("" as TCrewType);
							setShowUnstartedFactions(true);
						},
					}} />
					<List
						title={showUnstartedFactions ? "Demandes de factions" : factionType}
						elements={factions.filter((c) => showUnstartedFactions ? !c.started : c.type === factionType && c.started).map((r) => ({
							name: r.name,
							icon: r.image,
							selected: faction?.id === r.id,
							onClick() {
								setFaction(r);
							}
						}))}
						last={!showUnstartedFactions ? {
							name: "Créer une faction",
							icon: "https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/plus.svg",
							selected: false,
							onClick() {
								setFaction(() => {
									const newFaction: IFaction = {
										id: factions.length + 1,
										name: "Nouvelle faction",
										type: factionType,
										image: "https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/crew/photo.svg",
										lead: "",
										blips: { x: 0, y: 0, z: 0 },
										posGestion: { x: 0, y: 0, z: 0 },
										members: [],
										vehicles: [],
										points: [],
										garages: [],
										properties: [],
									}

									setFactions([...factions, newFaction]);

									return newFaction;

								});
							}
						} : undefined} />
				</div>
				<div className={styles.column}>
					<div className={styles.main}>
						{faction && (
							<>
								<div className={styles.column}>
									<div className={styles.row}>
										<div className={styles.actions}>
											<div className={styles.title}>
												Fiche de groupe
											</div>

											<div className={styles.preview}>
												<img src={faction.image} alt={faction.name} />
												<div className={styles.infos}>
													<div className={styles.itemname}>{faction.name}</div>
													<div className={styles.itemcategory}>{faction.type}</div>
												</div>
											</div>

											<div className={styles.subtitle}>
												Informations
											</div>

											<div className={`${styles.metadata} ${styles.scrollbar}`}>
												<div className={styles.info}>
													<div className={styles.icon}>
														<img src="https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/crew/name.svg" alt="Ajouter item" />
													</div>
													<div className={styles.label}>
														Nom
													</div>
													<div className={styles.value}>
														<input type="text" value={faction.name} onChange={(e) => updateFaction("name", e.currentTarget.value)} />
													</div>
												</div>

												<div className={styles.info}>
													<div className={styles.icon}>
														<img src="https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/name.svg" alt="Ajouter item" />
													</div>
													<div className={styles.label}>
														Type
													</div>
													<div className={styles.value}>
														<select
															value={faction.type}
															onChange={(e) => updateFaction("type", e.currentTarget.value)}
														>
															<option value="Police">Police</option>
															<option value="EMS">Médecins</option>
															<option value="Administrative">Administration</option>
														</select>
													</div>
												</div>

												<div className={styles.info}>
													<div className={styles.icon}>
														<img src="https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/crew/user.svg" alt="Ajouter item" />
													</div>
													<div className={styles.label}>
														Lead
													</div>
													<div className={styles.value}>
														<input type="text" value={faction.lead} onChange={(e) => updateFaction("lead", e.currentTarget.value)} />
													</div>
												</div>

												<div className={styles.info}>
													<div className={styles.icon}>
														<img src="https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/crew/reward.svg" alt="Ajouter item" />
													</div>
													<div className={styles.label}>
														Blips
													</div>
													<div className={styles.value}>
														{faction.blips.x} {faction.blips.y} {faction.blips.z}
													</div>
												</div>

												<div className={styles.info} >
													<div className={styles.icon}>
														<img src="https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/crew/user.svg" alt="Ajouter item" />
													</div>
													<div className={styles.label}>
														Nombre de membres
													</div>
													<div className={styles.value}>
														{faction.members.length || 0}
													</div>
												</div>

												<div className={styles.info} style={{ backgroundColor: "rgba(170, 170, 170, 0.15)" }}>
													<div className={styles.icon}>
													</div>
													<div className={styles.label}>
														Point de gestion
													</div>
													<div className={styles.value}>
														{faction.posGestion.x} {faction.posGestion.y} {faction.posGestion.z}
													</div>
												</div>

												<div className={styles.subtitle}>
													Image
												</div>

												<div className={styles.info} style={{ backgroundColor: "rgba(170, 170, 170, 0.10)" }}>
													<div className={styles.icon}>
														<img src="https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/crew/photo.svg" alt="Ajouter item" />
													</div>
													<div className={styles.label}>
														Image CDN
													</div>
													<div className={styles.value}>
														<input type="text" value={faction.image} onChange={(e) => updateFaction("image", e.currentTarget.value)} />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className={`${styles.column} ${styles.members}`}>
									<div className={styles.row}>
										<List
											title="Liste des employés"
											fallback='Aucun employés'
											maxHeight="10em"
											elements={faction.members.map((m) => ({
												name: m.name,
												icon: "https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/crew/user.svg",
												selected: false,
												onClick() {
													console.log("Membre selected", m)
												}
											}))} />

										<List
											title="Points de faction"
											fallback='Aucun points'
											maxHeight='20em'
											elements={faction.points
												.sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name))
												.map((p) => ({
													name: p.name,
													icon: `https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/crew/${p.type}.svg`,
													selected: false,
													onClick() {
														console.log("Point selected", p)
													}
												}))}
											last={{
												name: "Créer un point",
												icon: "https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/plus.svg",
												selected: false,
												onClick() {
													console.log("Créer un point")
												}
											}} />

									</div>
								</div>
								<div className={styles.column}>
									<div className={styles.row}>

										<List
											title="Points de véhicules"
											fallback='Aucun point'
											maxHeight='10em'
											elements={faction.garages.map((g) => ({
												name: g.name,
												icon: "https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/crew/user.svg",
												selected: false,
												onClick() {
													console.log("Garage selected", g)
												}
											}))}
											last={{
												name: "Créer un garage",
												icon: "https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/plus.svg",
												selected: false,
												onClick() {
													console.log("Créer un point")
												}
											}} />

										<List
											title="Véhicules"
											fallback='Aucun véhicules'
											maxHeight="10em"
											elements={faction.vehicles.map((v) => ({
												name: v.name,
												icon: "https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/crew/car.svg",
												selected: false,
												onClick() {
													console.log("Vehicle selected", v)
												}
											}))} />

										<List
											title="Propriétés"
											fallback='Aucun propriétés'
											maxHeight="10em"
											elements={faction.properties.map((p) => ({
												name: p.name,
												icon: "https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/crew/house.svg",
												selected: false,
												onClick() {
													console.log("Property selected", p)
												}
											}))} />
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Factions;
