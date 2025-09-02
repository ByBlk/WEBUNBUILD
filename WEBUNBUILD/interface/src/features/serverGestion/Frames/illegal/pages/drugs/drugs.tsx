import React from 'react';
import styles from "./drugs.module.scss";
import { TDrug } from '../../types';
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { fetchNui, useNuiEvent } from "@/hook";
import { getCdnUrl } from "@/utils";
import { useAppContext } from '../../context';

interface Props {
}

const Drugs: React.FC<Props> = () => {
	const { drugs, setDrugs } = useAppContext();
	const [drug, setDrug] = React.useState<TDrug | undefined>(undefined);
	const [newDrug, setNewDrug] = React.useState<TDrug | undefined>(undefined);
	const [drugKey, setDrugKey] = React.useState<string | undefined>(undefined);
	const nameRef = React.useRef<HTMLInputElement>(null);

	useNuiEvent("nui:server-gestion-illegal:setMissions", (items: TDrug[]) => {
		setDrugs(items);
	});

	const send = () => {
		fetchNui("nui:server-gestion-illegal:sendDrugs", drugs);
	}

	const save = () => {
		if (!newDrug) return;

		setDrug(newDrug);

		setDrugs(prevDrugs => {
			const index = prevDrugs.findIndex(i => i.name === drugKey);
			if (index === -1) return prevDrugs;

			prevDrugs[index] = newDrug;

			send();

			return prevDrugs;
		});
	}


	const add = () => {
		const i: TDrug = {
			name: "newdrug_" + Math.random().toString(30).substr(2, 9).replace(/[^a-z]/g, ''),
			img: getCdnUrl("assets/gestion-serveur", "question.svg"),
			xp: 0,
			influence: 0,
			status: "active",
			price: 0,
			cops: 0,
			volumemin: 0,
			volumemax: 0,
		};

		setDrug(i);
		setNewDrug(i);

		setDrugs(prevDrugs => [...prevDrugs, i]);
		send();
	}

	const duplicate = () => {
		if (!drug) return;

		const i: TDrug = {
			name: "newdrug_" + Math.random().toString(30).substr(2, 9).replace(/[^a-z]/g, ''),
			img: drug.img,
			xp: drug.xp,
			influence: drug.influence,
			status: drug.status,
			price: drug.price,
			cops: drug.cops,
			volumemin: drug.volumemin,
			volumemax: drug.volumemax,
		};

		setDrug(i);
		setNewDrug(i);

		setDrugs(prevDrugs => [...prevDrugs, i]);
		send();
	}

	const remove = () => {
		if (!drug) return;

		setDrugs(prevDrugs => {
			const index = prevDrugs.findIndex(i => i.name === drug.name);
			if (index === -1) return prevDrugs;

			const updatedItems = [...prevDrugs];
			updatedItems.splice(index, 1);
			return updatedItems;
		});
		setDrug(undefined);
		setNewDrug(undefined);
		send();
	}

	const updateItem = (key: string, value: any) => {
		setNewDrug(prevDrugs => {
			if (!prevDrugs) return;

			// Check for duplicate keys
			if (key === "name") {
				const exists = drugs.find(i => i.name === value);

				if (exists) {
					nameRef.current?.setCustomValidity("Ce nom est déjà utilisé");
				} else {
					nameRef.current?.setCustomValidity("");
				}

				nameRef.current?.reportValidity();

				if (exists) return prevDrugs;
			}

			const updatedItem = { ...prevDrugs, [key]: value };
			return updatedItem;
		});
	}

	return (
		<div className={styles.Map}>
			<div className={styles.body}>
				<div className={`${styles.column}`}>
					<div className={styles.main}>
						<div className={styles.title}>Liste des drogues</div>
						<div className={`${styles.content} ${styles.scrollbar}`}>
							{drugs.sort((a, b) => a.name.localeCompare(b.name))
								.map((recipe, i) => (
									<div key={i} className={styles.item} onClick={() => { setDrug(recipe); setNewDrug(recipe); setDrugKey(recipe.name); }}>
										<img src={recipe.img} alt={recipe.name} />
										<div className={styles.label}>{recipe.name}</div>
									</div>
								))}
							<div className={`${styles.item} ${styles.add}`} onClick={() => add()}>
								+
							</div>
						</div>
					</div>
				</div>
				{drug && (
					<div className={`${styles.column}`}>
						<div className={styles.actions}>
							<div className={styles.title}>
								Sélection
							</div>
							<div className={styles.subtitle}>
								Preview
							</div>

							<div className={styles.preview}>
								<img src={newDrug?.img} alt={newDrug?.name} />
								<div className={styles.infos}>
									<div className={styles.itemname}>{drug.name}</div>
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
										Nom de la drogue
										{drug.name !== newDrug?.name && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="text"
											value={newDrug?.name || ''}
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
										XP
										{drug.xp !== newDrug?.xp && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newDrug?.xp || ''}
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
										Influence
										{drug.influence !== newDrug?.influence && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newDrug?.influence || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("influence", value);
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
										{drug.status !== newDrug?.status && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<select value={newDrug?.status || ''} onChange={(e) => updateItem("status", e.currentTarget.value)}>
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
										Prix
										{drug.price !== newDrug?.price && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newDrug?.price || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("price", value);
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
										{drug.cops !== newDrug?.cops && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newDrug?.cops || ''}
											onChange={(e) => {
												const value = e.currentTarget.value;
												updateItem("cops", value);
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
										{drug.img !== newDrug?.img && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input type="text" value={newDrug?.img || ''} onChange={(e) => updateItem("img", e.currentTarget.value)} />
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

export default Drugs;
