

export type orgaInfo = {
    label: string,
    value: string | number,
}

export type orgaPermission = {
    [role: string]: {
        [action: string]: boolean;
    }
};
export interface Classement {
	type: "total" | "activity",
	classement: number,
	label: string,
	score: number,
}
export interface IPermission {
    fname: string;
    lname: string;
    id : number
    IsAcces: boolean;
}

export interface IProperties {
	type: string;
	address: string;
	id: number;
	maxPlaces: number;
}

export interface IPlayer {
    identifier: string;
    fname: string;
    lname: string;
    license: string;
    rank: number;
    xp: string;
    Information: Information;
}


export interface Information {
    mugshot: string;
    roles: string;
    seniority: string;
    speciality: string;
    classements?: Classement[];
    status: boolean;
}
export interface IDataMembers {
    fname: string;
    lname: string;
    id : number
    PlayTime?:'150h';
    time: number;
    xp?:'5000';
}

export interface IVehs {
	vehName: string;
	pounded: boolean;
	plate: string;
}
export interface IManagement {
    fname: string;
    lname: string;
    id: number;
    edit: boolean;
    permission: IPermission[];
}

export interface OrgaManagementData {
    type: "crew" | "faction" | "company",
    crewType: string
    infos: [] | orgaInfo[],
    nextRankPercent?: number,
    name: string,
    label : string,
    devise: string,
    colorsList: string[],
    color: string,
    menuColor: string,
    permissions: IManagement[],
    members: IDataMembers[],
    properties: IProperties[],
    vehs: IVehs[],
    territories: string[]
}