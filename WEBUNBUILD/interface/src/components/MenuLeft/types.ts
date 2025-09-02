import {ReactNode} from "react";

export interface MenuLeftProps {
    children: ReactNode;
    banner: {
        path: string;
        name: string;
    }
}

export interface ButtonProps {
    text: string;
    type: string;
    color?: string;
    onClick?: () => void;
}