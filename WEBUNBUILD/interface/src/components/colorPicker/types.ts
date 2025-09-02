export interface IColorPickerValues {
    color1?: number;
    color2?: number;
    opacity?: number;
}

export interface ColorPickerProps {
    showOpacity?: boolean;
    showColor1?: boolean;
    showColor2?: boolean;
    showColorFard?: boolean;
    colors?: Record<string, any>; // Adapter le type si necessaire
    changeColor1: (n: number) => void;
    changeColorFard: (n: number) => void;
    changeColor2: (n: number) => void;
    changeOpacity: (n: number) => void;
  }