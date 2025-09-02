type TItemTypes = "consumable" | "gpb" | "weapon" | "objects" | "drugs" | "ammo";

interface IItem {
	name: string,
	label: string,
	weight: number,
	buyPrice: number,
	permanent: boolean,
	premium: boolean,
	image: string,
	drop?: string,
	type: TItemTypes,

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

interface IConsumable extends IItem {
	hunger: number,
	thirst: number,
	expiration: number, // in days
	prop: string,
	anim: string,
}

interface IWeapon extends IItem {
	ammoType: string,
}

interface IObject extends IItem {
}

interface IGPB extends IItem {
}

interface IDrug extends IItem {
	effect: string,
	duration: number,
}

type IAnyItem = IConsumable | IWeapon | IGPB | IDrug ;

type TCategory = {
	name: string,
	page: TItemTypes,
	icon: string | React.ReactNode,
}

export type { IItem, IConsumable, IGPB, IDrug, IWeapon, IObject, TItemTypes, TCategory, IAnyItem };