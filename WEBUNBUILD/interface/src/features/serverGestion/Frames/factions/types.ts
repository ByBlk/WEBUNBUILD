type TCompanyType = "Police" | "EMS" | "Administrative";

type TEmployee = {
	id: number;
	name: string;
	discord: string;
}

type TVehicle = {
	plate: string;
	name: string;
}

type TPos = {
	x: number;
	y: number;
	z: number;
}

type TPoint = {
	name: string;
	pos: TPos;
}

type TJobPoint = {
	type: "locker" | "weapon" | "weaponAnalysis" | "DJ" | "EUP",
} & TPoint;

type TJobGarages = {
	type: "carGarage" | "helicopterGarage" | "boatGarage" | "vehicleCustom",
} & TPoint;

interface IFaction {
	id: number;
	name: string;
	type: TCompanyType;
	image: string;

	lead: string;
	blips: TPos;
	started?: boolean;

	posGestion: TPos,

	members: TEmployee[];
	vehicles: TVehicle[];

	points: TJobPoint[]; // lockers, weapons, analysis

	garages: TJobGarages[]; // car, helicopter, boat, custom

	properties: TPoint[];
}

export type { IFaction, TCompanyType, TEmployee, TVehicle, TPos, TPoint, TJobPoint, TJobGarages };