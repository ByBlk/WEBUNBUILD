import React from 'react';
import styles from "./craft.module.scss";
import { TRecipe, TIngredient } from '../../types';
import List from "../../../../components/List";
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { fetchNui, useNuiEvent } from "@/hook";
import { getCdnUrl } from "@/utils";
import { useAppContext } from '../../context';

interface Props {
	crew: string;
}

const Craft: React.FC<Props> = ({ crew }) => {
	const { recipes, setRecipes } = useAppContext();
	const [recipe, setRecipe] = React.useState<TRecipe | undefined>(undefined);
	const [newRecipe, setNewRecipe] = React.useState<TRecipe | undefined>(undefined);
	const [recipeKey, setRecipeKey] = React.useState<string | undefined>(undefined);
	const [newIngredientName, setNewIngredientName] = React.useState<string>('');
	const nameRef = React.useRef<HTMLInputElement>(null);

	useNuiEvent('server-gestion-illegal:setRecipes', (recipes: TRecipe[]) => {
		setRecipes(recipes);
	});

	const send = () => {
		fetchNui("nui:server-gestion-illegal:sendCrafts", recipes);
	}

	const save = () => {
		if (!newRecipe) return;

		setRecipe(newRecipe);

		setRecipes(prevRecipes => {
			const index = prevRecipes.findIndex(i => i.name === recipeKey);
			if (index === -1) return prevRecipes;

			prevRecipes[index] = newRecipe;

			send();

			return prevRecipes;
		});
	}


	const add = () => {
		const i: TRecipe = {
			name: "newrecipe_" + Math.random().toString(30).substr(2, 9).replace(/[^a-z]/g, ''),
			img: "https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/question.svg",
			crewType: crew,
			crewRang: "d",
			ingredients: [],
		};

		setRecipe(i);
		setNewRecipe(i);

		setRecipes(prevRecipes => [...prevRecipes, i]);
		send();
	}

	const duplicate = () => {
		if (!recipe) return;

		const i: { name: string; img: any; crewType: any; crewRang: any; ingredients: any } = {
			name: "newrecipe_" + Math.random().toString(30).substr(2, 9).replace(/[^a-z]/g, ''),
			img: recipe.img,
			crewType: recipe.crewType,
			crewRang: recipe.crewRang,
			ingredients: recipe.ingredients,
		};

		setRecipe(i);
		setNewRecipe(i);

		setRecipes(prevRecipes => [...prevRecipes, i]);
		send();
	}

	const remove = () => {
		if (!recipe) return;

		setRecipes(prevRecipes => {
			const index = prevRecipes.findIndex(i => i.name === recipe.name);
			if (index === -1) return prevRecipes;

			const updatedItems = [...prevRecipes];
			updatedItems.splice(index, 1);
			return updatedItems;
		});
		setRecipe(undefined);
		setNewRecipe(undefined);
		send();
	}

	const updateItem = (key: string, value: any) => {
		setNewRecipe(prevRecipes => {
			if (!prevRecipes) return;

			// Check for duplicate keys
			if (key === "name") {
				const exists = recipes.find(i => i.name === value);

				if (exists) {
					nameRef.current?.setCustomValidity("Ce nom est déjà utilisé");
				} else {
					nameRef.current?.setCustomValidity("");
				}

				nameRef.current?.reportValidity();

				if (exists) return prevRecipes;
			}

			const updatedItem = { ...prevRecipes, [key]: value };
			return updatedItem;
		});
	}

	const handleAddIngredient = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && newIngredientName.trim() !== '' && (newRecipe?.ingredients.length || 0) < 6) {
			const newIngredient: TIngredient = { item: newIngredientName.trim(), quantity: 1 };
			setNewRecipe(prevRecipe => {
				if (!prevRecipe) return;
				return { ...prevRecipe, ingredients: [...prevRecipe.ingredients, newIngredient] };
			});
			setNewIngredientName('');
		}
	};

	return (
		<div className={styles.Map}>
			<div className={styles.body}>
				<div className={`${styles.column}`}>
					<div className={styles.main}>
						<div className={styles.title}>Liste des recettes</div>
						<div className={styles.subtitle}>{crew.charAt(0).toUpperCase() + crew.slice(1)}</div>
						<div className={`${styles.content} ${styles.scrollbar}`}>
							{recipes.filter(i => i.crewType === crew)
								.sort((a, b) => "SABCD".indexOf(a.crewRang) - "SABCD".indexOf(b.crewRang))
								.map((recipe, i) => (
									<div key={i} className={styles.item} onClick={() => { setRecipe(recipe); setNewRecipe(recipe); setRecipeKey(recipe.name); }}>
										<img src={"https://cdn.eltrane.cloud/3838384859/https://cdn.eltrane.cloud/3838384859/cdnitems/" + recipe.name + ".webp"} alt={recipe.name} />
										<div className={styles.label}>{recipe.name}</div>
										<span style={{ position: 'absolute', top: '0', right: '0', color: '#FBC504', padding: '5px' }}>{recipe.crewRang.toUpperCase()}</span>									</div>
								))}
							<div className={`${styles.item} ${styles.add}`} onClick={() => add()}>
								+
							</div>
						</div>
					</div>
				</div>
				{recipe && (
					<div className={`${styles.column}`}>
						<div className={styles.actions}>
							<div className={styles.title}>
								Sélection
							</div>
							<div className={styles.subtitle}>
								Preview
							</div>

							<div className={styles.preview}>
								<img src={"https://cdn.eltrane.cloud/3838384859/https://cdn.eltrane.cloud/3838384859/cdnitems/" + newRecipe?.name + ".webp"} alt={newRecipe?.name} />								<div className={styles.infos}>
									<div className={styles.itemname}>{recipe.name}</div>
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
										{recipe.name !== newRecipe?.name && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<input
											type="text"
											value={newRecipe?.name || ''}
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
										Rang
										{recipe.crewRang !== newRecipe?.crewRang && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<select
											value={newRecipe?.crewRang || ''}
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
										Type
										{recipe.crewType !== newRecipe?.crewType && (<MediaCdn path="assets/gestion-serveur" name="edit.svg" />)}
									</div>
									<div className={styles.value}>
										<select
											value={newRecipe?.crewType || ''}
											onChange={(e) => updateItem("crewType", e.currentTarget.value)}
										>
											<option value="mafia">Mafia</option>
											<option value="organisation">Organisation</option>
											<option value="mc">MC</option>
											<option value="gang">Gang</option>
										</select>
									</div>
								</div>

								<List title="Ingrédients" maxHeight="15em" elements={newRecipe?.ingredients.map((x, index) => ({
									name: x.item,
									endlabel: {
										value: x.quantity,
										input: true,
										max: 9999,
										onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
											const value = parseInt(e.currentTarget.value);
											setNewRecipe(prevRecipe => {
												if (!prevRecipe) return prevRecipe;
												const updatedIngredients = [...prevRecipe.ingredients];
												updatedIngredients[index].quantity = value;
												return { ...prevRecipe, ingredients: updatedIngredients };
											});
										}
									},
									delete: {
										icon: getCdnUrl("assets/gestion-serveur", "close.svg"),
										onClick() {
											setNewRecipe(prevRecipe => {
												if (!prevRecipe) return prevRecipe;
												const updatedIngredients = [...prevRecipe.ingredients];
												updatedIngredients.splice(index, 1);
												return { ...prevRecipe, ingredients: updatedIngredients };
											});
										}
									},
									selected: false,
								})) || []} />
								<input
									type="text"
									value={newIngredientName}
									onChange={(e) => setNewIngredientName(e.currentTarget.value)}
									onKeyDown={handleAddIngredient}
									placeholder="Ajouter un ingrédient"
									className={styles.input}
									ref={nameRef}
								/>
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
			<div className={styles.ingredientsList} style={{ display: 'flex', width: '65%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', textAlign: 'center' }}>
				{newRecipe?.ingredients.map((ingredient, index) => (
					<div key={index} className={styles.ingredientItem} style={{ position: 'relative', padding: '10px', width: "12vh", background: 'linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.15))' }}>
						<img src={`https://cdn.eltrane.cloud/3838384859/https://cdn.eltrane.cloud/3838384859/cdnitems/${ingredient.item}.webp`} alt={ingredient.item} />
						<span>{ingredient.item}</span>
						<span style={{ position: 'absolute', top: '0', right: '0', background: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '10px 10px' }}>{ingredient.quantity}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default Craft;
