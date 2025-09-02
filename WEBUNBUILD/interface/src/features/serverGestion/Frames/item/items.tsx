import { IConsumable, IDrug, IItem, IWeapon, TCategory, TItemTypes } from './types';

import React from 'react';
import { useNuiEvent, fetchNui } from '@/hook';
import ServerGestion from '../../index';
import styles from "./item.module.scss";
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { playOnClickSound } from '@/utils/playSound'

interface ItemProps {
	navigateTo: (component: React.ReactNode) => void;
}

const Item: React.FC<ItemProps> = ({ navigateTo}) => {
	const [items, setItems] = React.useState<IItem[]>([]);
	const [selectedCategory, setSelectedCategory] = React.useState<TItemTypes>("consumable");

	const [item, setItem] = React.useState<IItem | undefined>(undefined);
	const [newItem, setNewItem] = React.useState<IItem | undefined>(undefined); // Item qui va être modifié. On ne modifie pas l'item directement pour pouvoir annuler les modifications
	const [itemKey, setItemKey] = React.useState<string | undefined>(undefined);

	const [filter, setFilter] = React.useState<string>("");
	const nameRef = React.useRef<HTMLInputElement>(null);

	useNuiEvent('nui:server-gestion-items:items', (items: IItem[]) => {
		setItems(items);
	});

	const categories: TCategory[] = [
		{ name: "Consommables", page: "consumable", icon: <MediaCdn path="assets/gestion-serveur" name="food.svg" /> },
		// { name: "Véhicules", page: "vehicle", icon: <MediaCdn path="assets/gestion-serveur" name="car.svg" /> },
		{ name: "Armes", page: "weapon", icon: <MediaCdn path="assets/gestion-serveur" name="weapon.svg" /> },
		{ name: "Objets", page: "objects", icon: <MediaCdn path="assets/gestion-serveur" name="object.svg" /> },
		{ name: "Drogues", page: "drugs", icon: <MediaCdn path="assets/gestion-serveur" name="drug.svg" /> },
		{ name: "Munitions", page: "ammo", icon: <MediaCdn path="assets/gestion-serveur" name="weapon.svg" /> },
		{ name: "GPB", page: "gpb", icon: <MediaCdn path="assets/gestion-serveur" name="weapon.svg" /> },
	]

	const navigateBack = () => {
        navigateTo(<ServerGestion />);
    };

	const send = () => {
		playOnClickSound();
		fetchNui("nui:server-gestion-items:save", items);
	}

	const save = () => {
		if (!newItem) return;

		setItem(newItem);

		setItems(prevItems => {
			const index = prevItems.findIndex(i => i.name === itemKey);
			if (index === -1) return prevItems;

			prevItems[index] = newItem;

			send();

			return prevItems;
		});
	}

	// const duplicate = () => {
	// 	if (!item) return;
	// 	const i = { ...item, name: `${item.name}_copy`, label: `${item.label}_copy` };
	//
	// 	setItem(i);
	// 	setNewItem(i);
	//
	// 	items.push(i);
	// 	send();
	// }

	const Give = () => {
		if (!item) return;
		fetchNui("nui:server-gestion-items:give", item.name);
	}


	// const remove = () => {
	// 	if (!item) return;
	//
	// 	const index = items.findIndex(i => i.name === item.name);
	// 	if (index === -1) return;
	//
	// 	items.splice(index, 1);
	// 	setItem(undefined);
	// 	setNewItem(undefined);
	// 	send();
	// }

	// const add = () => {
	// 	console.log("Ajouter");
	// 	const i: IItem = {
	// 		name: "newitem_" + Math.random().toString(36).substr(2, 9).replace(/[^a-z]/g, ''),
	// 		label: "Nouvel item",
	// 		weight: 0,
	// 		buyPrice: 0,
	// 		permanent: false,
	// 		premium: false,
	// 		image: "https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/question.svg",
	// 		type: selectedCategory,
	// 	};
	//
	// 	setItem(i);
	// 	setNewItem(i);
	//
	// 	items.push(i);
	// 	send();
	// }

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	
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
		<div className={styles.Item}>
			<div className={styles.topbuttons}>
				<div className={styles.window} onClick={() => console.log("Je sais pas ce que ca fait ce truc")}>
					<MediaCdn path="assets/gestion-serveur" name="window.svg" />
				</div>
				<div className={styles.close} onClick={() => console.log("Fermer")}>
					<MediaCdn path="assets/gestion-serveur" name="close.svg" />
				</div>
			</div>
			<div className={styles.header}>
				<div className={styles.goBack} onClick={navigateBack}><MediaCdn path="assets/icons" name="left.svg" props={{ width: 12, height: 12 }} /></div>
				<div className={styles.titles}>
					<h1 className={styles.titleGestion}>Gestion Items</h1>
					{/* <h2 className={styles.subtitleGestion}>Items</h2> */}
				</div>
			</div>
			<div className={styles.body}>
				<div className={`${styles.column}`}>
					<div className={styles.categories}>
						<div className={styles.title}>Catégories</div>
						<div className={styles.items}>
							{categories.map((c, i) => (
								<div key={i} className={styles.item} onClick={() => setSelectedCategory(c.page)}>
									<div className={styles.label}>
										{c.icon} {c.name}
										<span className={styles.filter} style={{ opacity: c.page === selectedCategory ? 1 : 0 }}><MediaCdn path="assets/gestion-serveur" name="filter.svg" /></span>
									</div>
									<div className={styles.count}>{items.filter(i => i.type === c.page).length}</div>
								</div>
							))}
						</div>
						<div className={styles.footer}>
							<input type="text" placeholder='Rechercher un item' onChange={(e) => setFilter(e.currentTarget.value)} />
							<MediaCdn path="assets/gestion-serveur" name="search.svg" />
						</div>
					</div>
				</div>
				<div className={`${styles.column}`}>
					<div className={styles.main}>
						<div className={styles.title}>Liste des items</div>
						<div className={styles.subtitle}>{selectedCategory}</div>
						<div className={`${styles.content} ${styles.scrollbar}`}>
							{items.filter(i => i.type === selectedCategory && (i.name.includes(filter) || i.label.includes(filter)))
								.sort((a, b) => a.name.localeCompare(b.name))
								.map((item, i) => (
									<div key={i} className={styles.item} onClick={() => { setItem(item); setNewItem(item); setItemKey(item.name); }}>
										<img src={item.image} alt={item.label} />
										<div className={styles.label}>{item.label}</div>
									</div>
								))}
							{/*<div className={`${styles.item} ${styles.add}`} onClick={() => add()}>*/}
							{/*	+*/}
							{/*</div>*/}
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
								<img src={newItem?.image} alt={newItem?.name} />
								<div className={styles.infos}>
									<div className={styles.itemname}>{item.label}</div>
									<div className={styles.itemcategory}>{item.type}</div>
								</div>
							</div>

							<div className={styles.subtitle}>
								Informations
							</div>

							<div className={`${styles.metadata} ${styles.scrollbar}`}>
								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur" name="name.svg" />
									</div>
									<div className={styles.label}>
										Nom d'affichage
										{item.label !== newItem?.label && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
									<input type="text" value={newItem?.label || ''} onChange={(e) => updateItem("label", e.currentTarget.value)} />
									</div>
								</div>
								<div className={styles.info}>
									<div className={styles.icon}>
									<MediaCdn path="assets/gestion-serveur" name="key.svg" />
									</div>
									<div className={styles.label}>
										Nom de spawn
										{item.name !== newItem?.name && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="text"
											ref={nameRef}
											value={newItem?.name || ''}
											readOnly
											onClick={(e) => e.currentTarget.select()}
										/>
									</div>
								</div>
								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur" name="weight.svg" />
									</div>
									<div className={styles.label}>
										Poids
										{item.weight !== newItem?.weight && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newItem?.weight || 0}
											min={0}
											step="0.01"
											onChange={(e) => updateItem("weight", e.currentTarget.value)}
										/>
									</div>
								</div>
								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur" name="price.svg" />
									</div>
									<div className={styles.label}>
										Prix d'achat
										{item.buyPrice !== newItem?.buyPrice && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="number"
											value={newItem?.buyPrice || 0}
											min={0}
											step="0.01"
											onChange={(e) => updateItem("buyPrice", e.currentTarget.value)}
										/>
									</div>
								</div>
								<div className={styles.info}>
									<div className={styles.icon}>
										<MediaCdn path="assets/gestion-serveur" name="lock.svg" />
									</div>
									<div className={styles.label}>
										Permanent
										{item.permanent !== newItem?.permanent && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input type="checkbox" defaultChecked={newItem?.permanent || false} onClick={(e) => updateItem("permanent", e.currentTarget.checked)} />
									</div>
								</div>
								<div className={styles.info}>
									<div className={styles.icon}>
									<MediaCdn path="assets/gestion-serveur" name="premium.svg" />
									</div>
									<div className={styles.label}>
										Premium
										{item.premium !== newItem?.premium && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
									<input type="checkbox" defaultChecked={newItem?.premium || false} onClick={(e) => updateItem("premium", e.currentTarget.checked)} />
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.icon}>
										<img src="https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/type.svg" alt="Ajouter item" />
									</div>
									<div className={styles.label}>
										Type
										{item.type !== newItem?.type && (<img src="https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/edit.svg" alt='modified' />)}
									</div>
									<div className={styles.value}>
									<select
											value={newItem?.type || ''}
											onChange={(e) => updateItem("type", e.currentTarget.value)}
										>
											<option value="consumable">Consommable</option>
											{/* <option value="vehicle">Véhicule</option> */}
											<option value="weapon">Arme</option>
											<option value="objects">Objet</option>
											<option value="drugs">Drogue</option>
											<option value="ammo">Munition</option>
											<option value="gpb">GPB</option>
										</select>
									</div>
								</div>

								{newItem?.type === "consumable" && (
									<>
										<div className={styles.subtitle}>
											Consommables
										</div>

										<div className={styles.info}>
											<div className={styles.icon}>
											<MediaCdn path="assets/gestion-serveur" name="hunger.svg" />
											</div>
											<div className={styles.label}>
												Faim (%)
												{(item as IConsumable).hunger !== (newItem as IConsumable)?.hunger && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
											</div>
											<div className={styles.value}>
												<input
													type="number"
													value={(newItem as IConsumable)?.hunger || 0}
													min={0}
													max={100}
													onChange={(e) => {
														console.log("value", e.currentTarget.value);
														const value = parseInt(e.currentTarget.value);
														updateItem("hunger", isNaN(value) ? 0 : value);
													}}
												/>
											</div>
										</div>

										<div className={styles.info}>
											<div className={styles.icon}>
											<MediaCdn path="assets/gestion-serveur" name="thirst.svg" />
											</div>
											<div className={styles.label}>
												Soif (%)
												{(item as IConsumable).thirst !== (newItem as IConsumable)?.thirst && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
											</div>
											<div className={styles.value}>
												<input
													type="number"
													value={(newItem as IConsumable)?.thirst || 0}
													min={0}
													max={100}
													onChange={(e) => updateItem("thirst", e.currentTarget.value)}
												/>
											</div>
										</div>

										<div className={styles.info}>
											<div className={styles.icon}>
											<MediaCdn path="assets/gestion-serveur" name="expiry.svg" />
											</div>
											<div className={styles.label}>
												Délais de péremption
												{(item as IConsumable).name !== (newItem as IConsumable)?.name && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
											</div>
											<div className={styles.value}>
												<input
													type="number"
													value={(newItem as IConsumable)?.expiration || 0}
													min={0}
													onChange={(e) => updateItem("expiration", e.currentTarget.value)}
												/>
											</div>
										</div>

										<div className={styles.info}>
											<div className={styles.icon}>
											<MediaCdn path="assets/gestion-serveur" name="type.svg" />
											</div>
											<div className={styles.label}>
												Props
												{(item as IConsumable).prop !== (newItem as IConsumable)?.prop && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
											</div>
											<div className={styles.value}>
												<input
													type="text"
													ref={nameRef}
													value={(newItem as IConsumable)?.prop || ''}
													pattern='[a-z0-9_]*'
													onChange={(e) => {
														const value = e.currentTarget.value;
														if (/^[a-z0-9_]*$/.test(value)) {
															updateItem("prop", value);
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
												Animation
												{item.anim !== newItem?.anim && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
											</div>
											<div className={styles.value}>
												<select
													value={newItem?.anim || 'drink'}
													onChange={(e) => updateItem("anim", e.currentTarget.value)}
												>
													<option value="eat">Manger</option>
													<option value="drink">Boire</option>
												</select>
											</div>
										</div>
									</>
								)}

								{newItem?.type === "weapon" && (
									<>
										<div className={styles.subtitle}>
											Armes
										</div>

										<div className={styles.info}>
											<div className={styles.icon}>
												<MediaCdn path="assets/gestion-serveur" name="type.svg" />
											</div>
											<div className={styles.label}>
												Munition
												{(item as IWeapon).ammoType !== (newItem as IWeapon)?.ammoType && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
											</div>
											<div className={styles.value}>
												<input
													type="text"
													ref={nameRef}
													value={(newItem as IWeapon)?.ammoType || ''}
													pattern='[a-z_]*'
													onChange={(e) => {
														const value = e.currentTarget.value;
														if (/^[a-z_]*$/.test(value)) {
															updateItem("ammoType", value);
														}
													}}
												/>
											</div>
										</div>
									</>
								)}

								{newItem?.type === "ammo" && (
									<>
										<div className={styles.subtitle}>
											Munition
										</div>

										{/* Add own properties */}
									</>
								)}

								{newItem?.type === "drugs" && (
									<>
										<div className={styles.subtitle}>
											Drogues
										</div>

										<div className={styles.info}>
											<div className={styles.icon}></div>
											<div className={styles.label}>
												Effet
												{(item as IDrug).effect !== (newItem as IDrug)?.effect && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
											</div>
											<div className={styles.value}>
												<input type="number" value={(newItem as IDrug)?.effect || 0} min={0} onChange={(e) => updateItem("effect", e.currentTarget.value)} />
											</div>
										</div>

										<div className={styles.info}>
											<div className={styles.icon}></div>
											<div className={styles.label}>
												Durée (s)
												{(item as IDrug).duration !== (newItem as IDrug)?.duration && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
											</div>
											<div className={styles.value}>
												<input type="number" value={(newItem as IDrug)?.duration || 0} min={0} onChange={(e) => updateItem("duration", e.currentTarget.value)} />
											</div>
										</div>
									</>
								)}
							</div>

							<div className={styles.footer}>
								<button className={styles.button} onClick={() => save()}>Sauvegarder</button>
								{/*<button className={styles.button} onClick={() => duplicate()}>Duppliquer</button>*/}
								{/*<button className={styles.button} onClick={() => remove()}>Supprimer</button>*/}
								<button className={styles.button} onClick={() => Give()}>Give</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Item;
