import { ReactNode } from "react";

export interface IMenuBuilderListElement {
    name?: string;
    id?: number;
    image?: string;
    price?: number;
    onClickCallback?: Function;
    isPlaceholder?: boolean;
    isNew?: boolean;
    isPremium?: boolean;
    category?: string;
    subCategory?: string;
    isBanId?: boolean;
    owned?: boolean;
    default?: boolean;
    isFavorite?: boolean;
}

export interface IMenuBuilderCategoryElement {
    name?: string;
    elements?: IMenuBuilderListElement[];
    minimumElements?: number;
    onClickCallback?: Function;
}

export interface IMenuBuilderButtonElement {
    name?: string;
    subName?: string;
    image?: string;
    width?: "full" | "half";
    height?: "double";
    onClickCallback?: Function;
    hoverStyle?: string;
    type?: string;
    isPremium?: boolean;
    forceHeader?: {
        headerImage?: string;
        headerIcon?: string;
        headerIconName?: string;
        headerSubName?: string;
    };
    progressBar?: { name: string }[]
}

export interface IMenuBuilderAdditionalData {
    globalTitle?: string;
    topGradient?: string;
}

export interface IMenuBuilderTabData {
    name?: string;
    elements: IMenuBuilderListElement[] | IMenuBuilderCategoryElement[] | IMenuBuilderButtonElement[];
    minimumElements?: number;
    onClickCallback?: Function;
    type: "categories" | "elements" | "buttons" | "shop";
    variation?: string;
    subCategory?: string;
}

export type IMenuBuilderTabsData = Array<IMenuBuilderTabData>

export interface IMenuBuilderCamera {
    label: string;
    callback: string;
    cameraArgument?: string;
}

export interface IMenuBuilderProps {
    tabs?: IMenuBuilderTabsData;
    headerImageCallback?: Function;
    headerImage: string;
    headerIcon: string;
    headerIconName: string;
    headerSubName?: string;
    finalSubmit?: {
        onCancel: Function;
        onSubmit: Function;
        cancelLabel: string;
        submitLabel: string;
        item: {
            label: string;
            image: string;
        };
    };
    cameras?: IMenuBuilderCamera[],
    forceBoutiqueHeader?: boolean;
    stockage?: {
        [key: string]: {
            set: Function;
            get: any;
        };
    };
    selected?: any;
    selectedParent?: any;
    submitButton?: {
        onClickCallback: Function;
        label: string;
        color?: string;
        input?: {
            isInput?: boolean;
            onChange?: Function;
            onSubmit?: Function;
            placeholder?: string;
            onBlur?: Function;
            value?: string;
        };
        customVisu?: any;
        icon?: string;
        disabled?: boolean;
        disabledType?: string;
    };
    progressBar?: {
        current: number;
        elements: Array<{
            name: string;
        }>;
    };
    globalTitle?: string;
    topGradient?: string;
    style?: {
        height?: number;
        width?: number;
        overrideClassName?: {
            submitButton?: string;
            header?: string;
            main?: string;
        };
    };
    preButton?: ReactNode;
    showTurnAroundButtons?: boolean;
    onTabChange?: Function;
    buttonAditionnalColor?: string;
    showValidationButtons?: boolean;
    isBoutique?: boolean;
    origin?: string;
    sideButton?: { title: string; elements: IMenuBuilderButtonElement[], type: string };
}