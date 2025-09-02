import { IColorPickerValues } from "@/components/colorPicker/types";
import { IMenuBuilderButtonElement, IMenuBuilderCategoryElement, IMenuBuilderListElement } from "@/components/menuBuilder/types";

export interface ICharacterCreatorData {
  premium: boolean;
  hideItemList: string[];
  catalogue: (IMenuBuilderListElement & { targetId?: number; idVariation?: number; img?: string; label?: string; })[];
  buttons: (IMenuBuilderButtonElement & { progressBar: { name: string }[], price?: number })[];
  peds: ICharacterCreatorPedElement[];
  pedsVariantes: ICharacterCreatorPedVariationElement[];
  recoverableCharacters: IRecoverableCharacter[];
}

export interface IRecoverableCharacter {
  name: string;
  data: IRecoverData;
}

export interface ICharacterCreatorPedElement {
  category: string;
  label: string;
  id: number;
  image?: string;
}

export interface ICharacterCreatorPedVariationElement {
  category: string;
  subCategory: string;
  id: number;
  idVariante?: number;
  targetId?: number;
}

export interface ICharacterCreatorPedPhysique {
  [key: string]: {
    [key: string]: ICharacterCreatorPedVariationElement
  }
}

export interface ICharacterCreatorUserData {
  identity?: {
    firstName: string;
    lastName: string;
    birthDate: string;
    birthPlace: string;
    characterChoice: string;
  };
  ped?: {
    sexe: string;
    selectedPled: ICharacterCreatorPedElement;
    physique: ICharacterCreatorPedPhysique;
  };
  character?: {
    lookingValue: number;
    skinValue: number;
    parent1: number;
    parent2: number;
  };
  visage?: {
    nose: {
      x: number,
      y: number,
    },
    noseProfile: {
      x: number,
      y: number,
    },
    nosePointe: {
      x: number,
      y: number,
    },
    sourcils: {
      x: number,
      y: number,
    },
    pommettes: {
      x: number,
      y: number,
    },
    menton: {
      x: number,
      y: number,
    },
    mentonShape: {
      x: number,
      y: number,
    },
    machoire: {
      x: number,
      y: number,
    },
    joues: number,
    yeux: number,
    levres: number,
    cou: number,
  };
  vetements?: {
    [key: string]: IMenuBuilderListElement[]
  };
  apparence?: {
    [key: string]: IColorPickerValues & { item?: IMenuBuilderCategoryElement };
  }
}

export interface ICharacterCreatorStore {
  current: number,
  setCurrent: Function,
  data: ICharacterCreatorUserData,
  setData: Function,
  canContinue: boolean,
  setCanContinue: Function,
  hideNavigation: boolean,
  setHideNavigation: Function,
  hidden2: boolean,
  setHidden2: Function,
  catalogue: (IMenuBuilderListElement & { targetId?: number; idVariation?: number; img?: string; label?: string; })[];
  dataButtons: (IMenuBuilderButtonElement & { progressBar: { name: string }[], price?: number })[];
  peds: ICharacterCreatorPedElement[],
  pedsVariantes: ICharacterCreatorPedVariationElement[],
  hideItemList: string[],
  premium: boolean,
  recoverableCharacters: IRecoverableCharacter[],
}

export interface IVisageMenuData {
  name: string;
  items: IVisageMenuItem[];
}

export interface IVisageMenuItem {
  name: string;
  id: string;
  image?: string;
  choices: string[];
  hideOnWoman?: boolean;
  fullName?: string;
}

export interface ISpawnPoint {
  name: string;
  elements: ISpawnpointElement[];
}

export interface ISpawnpointElement {
  name: string;
  image: string;
  id: string;
}

interface Identity {
  firstName?: string;
  lastName?: string;
  dateOfBirthdayr?: string;
  height?: number;
  birthplace?: string;
  sex?: number;
}

interface ICharacter {
  mom?: number;
  dad?: number;
  skin?: number;
  face?: number;
}

interface IVisage {
  nose_1?: number;
  nose_2?: number;
  nose_3?: number;
  nose_4?: number;
  nose_5?: number;
  nose_6?: number;
  eyebrows_5?: number;
  eyebrows_6?: number;
  cheeks_1?: number;
  cheeks_2?: number;
  chin_height?: number;
  chin_lenght?: number;
  chin_width?: number;
  chin_hole?: number;
  jaw_1?: number;
  jaw_2?: number;
  neck_thick?: number;
  lips_thick?: number;
  cheeks_3?: number;
  eye_open?: number;
}

interface IApparence {
  hair_1?: number;
  hair_color_1?: number;
  hair_color_2?: number;
  beard_1?: number;
  beard_2?: number;
  beard_3?: number;
  eyebrows_1?: number;
  eyebrows_2?: number;
  eyebrows_3?: number;
  eyebrows_4?: number;
  chest_1?: number;
  chest_2?: number;
  chest_3?: number;
  eye_color?: number;
  makeup_1?: number;
  makeup_2?: number;
  makeup_3?: number;
  makeup_4?: number;
  blush_1?: number;
  blush_2?: number;
  blush_3?: number;
  lipstick_1?: number;
  lipstick_2?: number;
  lipstick_3?: number;
  bodyb_1?: number;
  bodyb_2?: number;
  age_1?: number;
  age_2?: number;
  blemishes_1?: number;
  blemishes_2?: number;
  moles_1?: number;
  moles_2?: number;
  complexion_1?: number;
  complexion_2?: number;
  sun_1?: number;
  sun_2?: number;
}

interface IPed {
  head: number;
  mask_1: number;
  arms: number;
  arms_2: number;
  pants_1: number;
  pants_2: number;
  shoes_1: number;
  shoes_2: number;
}

interface IOutfit {
  torso_1?: number;
  torso_2?: number;
  arms?: number;
  arms_2?: number;
  tshirt_1?: number;
  tshirt_2?: number;
  pants_1?: number;
  pants_2?: number;
  shoes_1?: number;
  shoes_2?: number;
  helmet_1?: number;
  helmet_2?: number;
  glasses_1?: number;
  glasses_2?: number;
  bags_1?: number;
  bags_2?: number;
}

export interface IRecoverData {
  identity?: Identity;
  skin?: ICharacter & IVisage & IApparence & IPed & IOutfit
}

export type PageNameStringType = 'identity' | 'character' | 'apparence' | 'visage' | 'vetements' | 'ped'