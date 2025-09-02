import { LatLngExpression, PathOptions } from "leaflet";

type TPages = {
	name: string;
	page: string;
	icon: string;
}

type TRole = {
	name: string;
	role: string;
	color: string;
}

type TInfluences = {
	crew: string;
	id: number;
	value: number;
	color: string;
	territoryId: number;
}

type TTerrotory = {
	id: number,
	crewid: number;
	name: string;
	image: string;
	polygon: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][];
	options?: PathOptions;

	shop1?: string;
	shop2?: string;
	shop3?: string;

	price1?: number;
	price2?: number;
	price3?: number;
}

type TItemTablet = {
	name: string;
	img: string;

	crewType: string;
	crewRang: string;

	level: number;
	stock: number;
	status: string;
	price: number;
	cooldown: number;
	matierePremiere: boolean;
	armes: boolean;
	rang: string;
}

type TXpTablet = {
	rang: string;
	xp: number;
}

type TRecipe = {
	name: string;
	img: string;
	crewType: string;
	crewRang: string;
	ingredients: TIngredient[];
}

type TIngredient = {
	item: string;
	quantity: number;
}

type TDrug = {
	name: string;
	img: string;
	xp: number;
	influence: number;
	status: string;
	price: number;
	cops: number;
	volumemin: number;
	volumemax: number;
}

type TMission = {
    pifl: any;
	name: string;
	img: string;
	reward: number;
	risk: number;
	status: string;
	limit: number;
	cops: number;
	xp: number;
	northMultiplier: number;
	southMultiplier: number;
	rank: string;
	location: { x: number, y: number };

	indicator1: string;
	indicator2: string;
	indicator3: string;
}

export type { TPages, TRole, TInfluences, TTerrotory, TItemTablet, TXpTablet, TRecipe, TIngredient, TDrug, TMission };