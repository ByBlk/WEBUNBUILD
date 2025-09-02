type TCompanyType = "Bars - Restaurants" | "Garages" | "Commerces";

type TEmployee = {
	id: number;
	name: string;
	discord: string;
}

type TVehicle = {
	id: number;
	plate: string;
	name: string;
}

type TPos = {
	x: number;
	y: number;
	z: number;
}

type TPoint = {
	id: number;
	name: string,
	pos: TPos,
}

interface ICompany {
	id: number;
	name: string;
	type: TCompanyType;
	image: string;
	color: string;

	lead: string;
	blips: TPos;

	posGestion: TPos,
	posCraft: TPos,

	members: TEmployee[];
	vehicles: TVehicle[];
	casier: TPoint[];
	catalogue: TPoint[];
	garage: TPoint[];
	DJ: TPoint[];
	properties: TPoint[];
}


export type { ICompany, TCompanyType, TEmployee, TVehicle, TPos, TPoint };