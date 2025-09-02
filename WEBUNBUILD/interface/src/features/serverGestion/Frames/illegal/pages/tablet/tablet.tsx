import React from 'react';
import styles from "./tablet.module.scss";
import { useNuiEvent, fetchNui } from "@/hook";
import { TItemTablet, TXpTablet } from '../../types';
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import List from "../../../../components/List";
import { useAppContext } from '../../context';

interface Props {
	crew: string;
}

const Tablet: React.FC<Props> = ({ crew }) => {
	const { items, setItems, xps, setXps } = useAppContext();
	const [item, setItem] = React.useState<TItemTablet | undefined>(undefined);
	const [newItem, setNewItem] = React.useState<TItemTablet | undefined>(undefined);
	const [itemKey, setItemKey] = React.useState<string | undefined>(undefined);
	const nameRef = React.useRef<HTMLInputElement>(null);

	useNuiEvent("nui:server-gestion-illegal:tabletItems", (items: TItemTablet[]) => {
		setItems(items);
	});

	useNuiEvent("nui:server-gestion-illegal:sendTabletXP", (xp: TXpTablet[]) => {
		setXps(xp);
	});

	const sendXP = () => {
		fetchNui("nui:server-gestion-illegal:sendTabletXP", xps);
	}

	const save = () => {
		if (!newItem) return;
	
		setItem(newItem);
	
		setItems(prevItems => {
			const index = prevItems.findIndex(i => i.name === itemKey);
			if (index === -1) return prevItems;
	
			const updatedItems = [...prevItems];
			updatedItems[index] = newItem;
			// Envoyer les items mis à jour après la sauvegarde
			fetchNui("nui:server-gestion-illegal:sendTabletItems", updatedItems);
			return updatedItems;
		});
	}


	const add = () => {
		console.log("Ajouter");
		const i: TItemTablet = {
			name: "newitem_" + Math.random().toString(30).substr(2, 9).replace(/[^a-z]/g, ''),
			img: "https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/question.svg",
			crewType: crew,
			crewRang: "d",
			level: 0,
			stock: 0,
			status: "active",
			price: 0,
			cooldown: 0,
			matierePremiere: false,
			armes: false,
			rang: "A",
		};

		setItem(i);
		setNewItem(i);

		setItems(prevItems => {
			const newItems = [...prevItems, i];
			// Envoyer les items mis à jour après l'ajout
			fetchNui("nui:server-gestion-illegal:sendTabletItems", newItems);
			return newItems;
		});
	}

	const remove = () => {
		if (!item) return;

		setItems(prevItems => {
			const index = prevItems.findIndex(i => i.name === item.name);
			if (index === -1) return prevItems;
			const updatedItems = [...prevItems];
			updatedItems.splice(index, 1);
			// Envoyer les items mis à jour après la suppression
			fetchNui("nui:server-gestion-illegal:sendTabletItems", updatedItems);
			return updatedItems;
		});
		setItem(undefined);
		setNewItem(undefined);
	}

	const updateItem = (key: string, value: any) => {
		setNewItem(prevItem => {
			if (!prevItem) return;

			// Check for duplicate keys
			if (key === "name") {
				const exists = items.find(i => i.name === value);

				if (exists) {
					nameRef.current?.setCustomValidity("Ce nom est déjà utilisé");
				} else {
					nameRef.current?.setCustomValidity("");
				}

				nameRef.current?.reportValidity();

				if (exists) return prevItem;
			}

			const updatedItem = { ...prevItem, [key]: value };
			return updatedItem;
		});
	}

	return (
		<div className={styles.Map}>
			<div className={`${styles.column} ${styles.xp}`}>
				<div className={styles.main}>
					<List title="XP Crew" maxHeight="8em" elements={xps.map((x) => ({
						name: `Rang ${x.rang}`,
						endlabel: {
							value: x.xp,
							input: true,
							max: 999999,
						},
						selected: false,
						onBlur() {
							setXps(prevXps => prevXps.map(xp => xp.rang === x.rang ? { ...xp, xp: x.xp } : xp));
							sendXP();
						},
					}))} />
				</div>
			</div>
			<div className={styles.body}>
				<div className={`${styles.column}`}>
					<div className={styles.main}>
						<div className={styles.title}>Liste des items</div>
						<div className={styles.subtitle}>{crew.charAt(0).toUpperCase() + crew.slice(1)}</div>
						<div className={`${styles.content} ${styles.scrollbar}`}>
							{items.filter(i => i.crewType === crew)
								.sort((a, b) => "SABCD".indexOf(a.crewRang) - "SABCD".indexOf(b.crewRang))
								.map((item, i) => (
									<div key={i} className={styles.item} onClick={() => { setItem(item); setNewItem(item); setItemKey(item.name); }}>
										<img src={"https://cdn.eltrane.cloud/3838384859/https://cdn.eltrane.cloud/3838384859/cdnitems/" + item.name + ".webp"} alt={item.name} />
										<div className={styles.label}>{item.name}</div>
										<span style={{ position: 'absolute', top: '0', right: '0', color: '#FBC504', padding: '5px' }}>{item.crewRang.toUpperCase()}</span>									</div>
								))}
							<div className={`${styles.item} ${styles.add}`} onClick={() => add()}>
								+
							</div>
						</div>
					</div>
				</div>
				{item && (
					<div className={`${styles.column}`}>
						<div className={styles.actions}>
							<div className={styles.title}>
								Sélection
							</div>
							<div className={styles.subtitle}>
								Preview
							</div>

							<div className={styles.preview}>
								<img src={"https://cdn.eltrane.cloud/3838384859/https://cdn.eltrane.cloud/3838384859/cdnitems/" + newItem?.name + ".webp"} alt={newItem?.name} />
								<div className={styles.infos}>
									<div className={styles.itemname}>{item.name}</div>
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
										Nom de l'item
										{item.name !== newItem?.name && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="text"
											value={newItem?.name || ''}
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
										<MediaCdn path="assets/gestion-serveur" name="type.svg" />
									</div>
									<div className={styles.label}>
										Type
										{item.crewType !== newItem?.crewType && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<select
											value={newItem?.crewType || ''}
											onChange={(e) => updateItem("crewType", e.currentTarget.value)}
										>
											<option value="mafia">Mafia</option>
											<option value="organisation">Organisation</option>
											<option value="mc">MC</option>
											<option value="gang">Gang</option>
										</select>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur" name="type.svg" />
									</div>
									<div className={styles.label}>
										Rang
										{item.crewRang !== newItem?.crewRang && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<select
											value={newItem?.crewRang || ''}
											onChange={(e) => updateItem("crewRang", e.currentTarget.value)}
										>
											<option value="d">Rang D</option>
											<option value="c">Rang C</option>
											<option value="b">Rang B</option>
											<option value="a">Rang A</option>
											<option value="s">Rang S</option>
										</select>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur" name="type.svg" />
									</div>
									<div className={styles.label}>
										Stock
										{item.stock !== newItem?.stock && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newItem?.stock || ''}
											pattern='[a-z0-9_]*'
											onChange={(e) => {
												const value = e.currentTarget.value;
												if (/^[a-z0-9_]*$/.test(value)) {
													updateItem("stock", value);
												}
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur" name="type.svg" />
									</div>
									<div className={styles.label}>
										Statut
										{item.status !== newItem?.status && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<select
											value={newItem?.status || ''}
											onChange={(e) => updateItem("status", e.currentTarget.value)}
										>
											<option value="active">Active</option>
											<option value="inactive">Inactive</option>
										</select>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur" name="type.svg" />
									</div>
									<div className={styles.label}>
										Prix
										{item.price !== newItem?.price && (<MediaCdn path="assets/gestion-serveur" name="price.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newItem?.price || ''}
											pattern='[a-z0-9_]*'
											onChange={(e) => {
												const value = e.currentTarget.value;
												if (/^[a-z0-9_]*$/.test(value)) {
													updateItem("price", value);
												}
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur" name="type.svg" />
									</div>
									<div className={styles.label}>
										Cooldown
										{item.cooldown !== newItem?.cooldown && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newItem?.cooldown || ''}
											pattern='[a-z0-9_]*'
											onChange={(e) => {
												const value = e.currentTarget.value;
												if (/^[a-z0-9_]*$/.test(value)) {
													updateItem("cooldown", value);
												}
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur/crew" name="weaponAnalysis.svg" />
									</div>
									<div className={styles.label}>
										Matière première
										{item.matierePremiere !== newItem?.matierePremiere && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="checkbox"
											checked={newItem?.matierePremiere || false}
											onChange={(e) => {
												const value = e.currentTarget.checked;
												updateItem("matierePremiere", value);
											}}
										/>
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur/crew" name="weapon.svg" />
									</div>
									<div className={styles.label}>
										Armes
										{item.armes !== newItem?.armes && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="checkbox"
											checked={newItem?.armes || false}
											onChange={(e) => {
												const value = e.currentTarget.checked;
												updateItem("armes", value);
											}}
										/>
									</div>
								</div>
							</div>

							<div className={styles.footer}>
								<button className={styles.button} onClick={() => save()}>Sauvegarder</button>
								<button className={styles.button} onClick={() => remove()}>Supprimer</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Tablet;
