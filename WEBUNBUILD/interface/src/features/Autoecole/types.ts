export interface IAnswer {
    name: string;
    letter: string;
    selected: boolean;
}

export interface IAutoEcoleData {
    name: string;
    picture: string;
    answer: IAnswer[];
}

