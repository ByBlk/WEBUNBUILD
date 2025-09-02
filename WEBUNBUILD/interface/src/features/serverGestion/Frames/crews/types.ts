type TCrewType = "gang" | "organisation" | "mafia" | "mc";

type TRole = {
	name: string;
	role: string;
	color: string;
}

type TCrewMember = {
	identifier: string;
	lname: string;
	fname: string;
	playtime: number;
	xp: number;
	rank: number;
}

type TCrewProperty = {
	id: number;
	address: string;
}

type TCrewVehicles = {
	plate: string;
	name: string;
}

type TCrewTerritory = {
	id: number;
	name: string;
}

type TCrewShop = {
	id: number;
	name: string;
}

type TPos = {
	x: number;
	y: number;
	z: number;
}

interface ICrew {
	id: number;
	name: string;
	type: TCrewType;
	image: string;
	started: boolean;

	moto: string;
	color: string;
	lead: string;
	level: number;
	experience: number;
	posLaboratory: TPos;
	posCraft: TPos;
	posStockage: TPos;
	posGarage: TPos;

	members: TCrewMember[];
	vehicles: TCrewVehicles[];
	territories: TCrewTerritory[];
	properties: TCrewProperty[];
	shops: TCrewShop[];
}


export type { ICrew, TRole, TCrewType, TCrewMember, TCrewProperty, TCrewShop, TCrewVehicles, TCrewTerritory };