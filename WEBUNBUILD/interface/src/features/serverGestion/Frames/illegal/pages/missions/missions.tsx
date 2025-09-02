import React from 'react';
import styles from "./missions.module.scss";
import { TMission } from '../../types';
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { fetchNui, useNuiEvent } from "@/hook";
import { getCdnUrl } from "@/utils";
import { useAppContext } from '../../context';

interface Props {
}

const Missions: React.FC<Props> = () => {
	const { missions, setMissions } = useAppContext();
	const [mission, setMission] = React.useState<TMission | undefined>(undefined);
	const [newMission, setNewMission] = React.useState<TMission | undefined>(undefined);
	const [missionKey, setMissionKey] = React.useState<string | undefined>(undefined);
	const nameRef = React.useRef<HTMLInputElement>(null);

	useNuiEvent("nui:server-gestion-illegal:setMissions", (items: TMission[]) => {
		setMissions(items);
	});

	const send = () => {
		fetchNui("nui:server-gestion-illegal:sendMissions", missions);
	}

	const save = () => {
		if (!newMission) return;

		setMission(newMission);

		setMissions(prevMissions => {
			const index = prevMissions.findIndex(i => i.name === missionKey);
			if (index === -1) return prevMissions;

			prevMissions[index] = newMission;

			send();

			return prevMissions;
		});
	}


	const add = () => {
		const i: TMission = {
			name: "newmission_" + Math.random().toString(30).substr(2, 9).replace(/[^a-z]/g, ''),
			img: getCdnUrl("assets/gestion-serveur", "question.svg"),
			reward: 0,
			risk: 0,
			status: "active",
			limit: 0,
			cops: 0,
			xp: 0,
			pifl: 0,
			northMultiplier: 0,
			southMultiplier: 0,
			rank: "A",
			location: { x: 0, y: 0 },
			indicator1: "",
			indicator2: "",
			indicator3: "",
		};

		setMission(i);
		setNewMission(i);

		setMissions(prevMissions => [...prevMissions, i]);
		send();
	}

	const duplicate = () => {
		if (!mission) return;

		const i: {
			name: string;
			img: any;
			reward: any;
			risk: any;
			status: any;
			limit: any;
			cops: any;
			xp: any;
			pifl: any;
			northMultiplier: any;
			southMultiplier: any;
			rank: any;
			location: any;
			indicator1: any;
			indicator2: any;
			indicator3: any
		} = {
			name: "newmission_" + Math.random().toString(30).substr(2, 9).replace(/[^a-z]/g, ''),
			img: mission.img,
			reward: mission.reward,
			risk: mission.risk,
			status: mission.status,
			limit: mission.limit,
			cops: mission.cops,
			xp: mission.xp,
			pifl: mission.pifl,
			northMultiplier: mission.northMultiplier,
			southMultiplier: mission.southMultiplier,
			rank: mission.rank,
			location: mission.location,
			indicator1: mission.indicator1,
			indicator2: mission.indicator2,
			indicator3: mission.indicator3,
		};

		setMission(i);
		setNewMission(i);

		setMissions(prevMissions => [...prevMissions, i]);
		send();
	}

	const remove = () => {
		if (!mission) return;

		setMissions(prevMissions => {
			const index = prevMissions.findIndex(i => i.name === mission.name);
			if (index === -1) return prevMissions;

			const updatedItems = [...prevMissions];
			updatedItems.splice(index, 1);
			return updatedItems;
		});
		setMission(undefined);
		setNewMission(undefined);
		send();
	}

	const updateItem = (key: string, value: any) => {
		setNewMission(prevMissions => {
			if (!prevMissions) return;

			// Check for duplicate keys
			if (key === "name") {
				const exists = missions.find(i => i.name === value);

				if (exists) {
					nameRef.current?.setCustomValidity("Ce nom est déjà utilisé");
				} else {
					nameRef.current?.setCustomValidity("");
				}

				nameRef.current?.reportValidity();

				if (exists) return prevMissions;
			}

			const updatedItem = { ...prevMissions, [key]: value };
			return updatedItem;
		});
	}

	return (
		<div className={styles.Map}>
			<div className={styles.body}>
				<div className={`${styles.column}`}>
					<div className={styles.main}>
						<div className={styles.title}>Liste des missions</div>
						<div className={`${styles.content} ${styles.scrollbar}`}>
							{missions.sort((a, b) => a.name.localeCompare(b.name))
								.map((recipe, i) => (
									<div key={i} className={styles.item} style={{width: '17vh'}} onClick={() => { setMission(recipe); setNewMission(recipe); setMissionKey(recipe.name); }}>
										<img src={recipe.img} alt={recipe.name} />
										<div className={styles.label}>{recipe.name}</div>
									</div>
								))}
							<div className={`${styles.item} ${styles.add}`} style={{width: '17vh'}} onClick={() => add()}>
								+
							</div>
						</div>
					</div>
				</div>
				{mission && (
					<div className={`${styles.column}`}>
						<div className={styles.actions}>
							<div className={styles.title}>
								Sélection
							</div>
							<div className={styles.subtitle}>
								Preview
							</div>

							<div className={styles.preview}>
								<img src={newMission?.img} alt={newMission?.name} />
								<div className={styles.infos}>
									<div className={styles.itemname}>{mission.name}</div>
								</div>
							</div>

							<div className={styles.subtitle}>
								Informations
							</div>

							<div className={`${styles.metadata} ${styles.scrollbar}`}>
								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur/crew" name="name.svg" />
									</div>
									<div className={styles.label}>
										Nom de la mission
										{mission.name !== newMission?.name && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="text"
											value={newMission?.name || ''}
											pattern='[a-z_]*'
											onChange={(e) => {
												const value = e.currentTarget.value;
												if (/^[a-z_]*$/.test(value)) {
													updateItem("name", value);
												}
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur/crew" name="name.svg" />
									</div>
									<div className={styles.label}>
										Récompense
										{mission.reward !== newMission?.reward && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newMission?.reward || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("reward", value);
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur/crew" name="name.svg" />
									</div>
									<div className={styles.label}>
										Risque
										{mission.risk !== newMission?.risk && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newMission?.risk || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("risk", value);
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur/crew" name="name.svg" />
									</div>
									<div className={styles.label}>
										Status
										{mission.status !== newMission?.status && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<select value={newMission?.status || ''} onChange={(e) => updateItem("status", e.currentTarget.value)}>
											<option value="active">Active</option>
											<option value="inactive">Inactive</option>
										</select>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur/crew" name="name.svg" />
									</div>
									<div className={styles.label}>
										Nombre de braquages sur 24h
										{mission.limit !== newMission?.limit && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newMission?.limit || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("limit", value);
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur/crew" name="name.svg" />
									</div>
									<div className={styles.label}>
										Policiers en service
										{mission.cops !== newMission?.cops && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newMission?.cops || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("cops", value);
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur/crew" name="name.svg" />
									</div>
									<div className={styles.label}>
										XP
										{mission.xp !== newMission?.xp && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newMission?.xp || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("xp", value);
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur/crew" name="name.svg" />
									</div>
									<div className={styles.label}>
										Points d'influence
										{mission.pifl !== newMission?.pifl && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newMission?.pifl || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("pifl", value);
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur/crew" name="name.svg" />
									</div>
									<div className={styles.label}>
										Multiplicateur Nord (Argent)
										{mission.northMultiplier !== newMission?.northMultiplier && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newMission?.northMultiplier || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("northMultiplier", value);
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur/crew" name="name.svg" />
									</div>
									<div className={styles.label}>
										Multiplicateur Sud (Argent)
										{mission.southMultiplier !== newMission?.southMultiplier && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newMission?.southMultiplier || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("southMultiplier", value);
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur/crew" name="name.svg" />
									</div>
									<div className={styles.label}>
										Rang
										{mission.rank !== newMission?.rank && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="text"
											value={newMission?.southMultiplier || ''}
											pattern='[A-Z]*'
											onChange={(e) => {
												const value = e.currentTarget.value;
												if (/^[A-Z]*$/.test(value)) {
													updateItem("rank", value);
												}
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}></div>
									<div className={styles.label}>
										Localisation
										{(mission.location.x !== newMission?.location.x || mission.location.y !== newMission?.location.y) && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={`${styles.value} ${styles.location}`}>
										<input
											type="text"
											value={newMission?.location.x || ''}
											placeholder="X"
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("location", { x: value, y: newMission?.location.y });
											}}
										/>
										<input
											type="number"
											value={newMission?.location.y || ''}
											placeholder="Y"
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("location", { x: newMission?.location.x, y: value });
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}></div>
									<div className={styles.label}>
										Indicateur 1
										{mission.indicator1 !== newMission?.indicator1 && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="text"
											value={newMission?.indicator1 || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("indicator1", value);
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}></div>
									<div className={styles.label}>
										Indicateur 2
										{mission.indicator2 !== newMission?.indicator2 && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="text"
											value={newMission?.indicator2 || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("indicator2", value);
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}></div>
									<div className={styles.label}>
										Indicateur 3
										{mission.indicator3 !== newMission?.indicator3 && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="text"
											value={newMission?.indicator3 || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("indicator3", value);
											}}
										/>
									</div>
								</div>

								<div className={styles.subtitle}>
									Image
								</div>

								<div className={styles.info} style={{ backgroundColor: "rgba(170, 170, 170, 0.10)" }}>
									<div className={styles.icon}></div>
									<div className={styles.label}>
										Image CDN
										{mission.img !== newMission?.img && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input type="text" value={newMission?.img || ''} onChange={(e) => updateItem("img", e.currentTarget.value)} />
									</div>
								</div>
							</div>

							<div className={styles.footer}>
								<button className={styles.button} onClick={() => remove()}>Supprimer</button>
								<button className={styles.button} onClick={() => duplicate()}>Dupliquer</button>
								<button className={styles.button} onClick={() => save()}>Sauvegarder</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Missions;
