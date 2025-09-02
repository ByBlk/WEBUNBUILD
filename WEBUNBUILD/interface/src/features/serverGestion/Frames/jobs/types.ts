type TJob = {
	name: string,
	imgJob: string,
	imgJobcenter: string,

	salary: number,
	timer: number,
	premium: boolean,
	premiumMultiplier: number,
	premiumPlusMultiplier: number,
	location: { x: number, y: number },
	indicator1: string,
	indicator2: string,
	indicator3: string,
	status: string,
}

export type { TJob };