import {LatLngExpression, PathOptions} from "leaflet";

export type Crew = {
    leader: string;
    influence: number;
    color: string;
};

export type Business = {
    label: string;
};

export interface TerritoriesData {
    zone: string;
    location: string;
    crews: {
        semaine: Crew[];
        mois: Crew[];
        global: Crew[];
    };
    crews_over: "semaine" | "mois" | "global";
    revendication: number;
    crew: string;
    territories?: TTerritory[];
}

export type TPages = {
    name: string;
    page: string;
    icon: string;
};

export type TRole = {
    name: string;
    role: string;
    color: string;
};

export type TTerritory = {
    crewid: number;
    name: string;
    image: string;
    polygon: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][];
    color: string;
    options?: PathOptions;
    topCrews: Crew[];
    business: Business[];
    resellIndice: number
    zone: string;
    location: string;
};
