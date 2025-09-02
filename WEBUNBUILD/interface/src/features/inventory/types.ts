export interface DragState {
  item: IInventoryItem | null;
  offsetX: number;
  offsetY: number;
}

export interface InventoryData {
  items: IInventoryItem[];
  playerInfo: {
    firstname: string;
    lastname: string;
    mugshot: string;
    money: number;
  };
  shortcuts: IInventoryShortcuts;
  showShortcut: boolean;
  maxWeight: number;
  currentWeight: number;
  thirst: number;
  hunger: number;
  activeFilter?: string | undefined;
  target?: {
    items: IInventoryItem[];
    name: string;
    maxWeight: number;
    currentWeight: number;
    search: boolean;
  };
}

export type InventoryCategory = "items" | "weapons" | "clothes" | "keys";

export const WeaponsContainersList = ["weapon1", "weapon2", "weapon3", "weapon4", "weapon5"] as const;
export type WeaponsContainers = (typeof WeaponsContainersList)[number];

export const ClothesContainersList = [
  "hat",
  "glasses",
  "tshirt",
  "pant",
  "feet",
  "access",
  "bague",
  "montre",
  "ongle",
  "piercing",
  "bracelet",
  "bouclesoreilles",
  "collier",
  "phat",
  "pglasses",
  "ptshirt",
  "ppant",
  "pfeet",
  "paccess",
  "pbague",
  "pmontre",
  "pongle",
  "ppiercing",
  "pbracelet",
  "pbouclesoreilles",
  "pcollier",
] as const;
export type ClothesContainers = (typeof ClothesContainersList)[number];

export const AllContainerList = [
  "",
  "inventory",
  "target",
  "give",
  "use",
  "throw",
  "weapon-slots",
  ...WeaponsContainersList,
  ...ClothesContainersList,
] as const;
export type DragContainers = (typeof AllContainerList | string)[number];

export interface IInventoryItem {
  id?: string;
  name?: string;
  url?: string;
  label?: string;
  weight?: number;
  count?: number;
  position?: {
    x?: number;
    y?: number;
  }
  category?: string;
  type?: InventoryCategory;
  premium?: boolean;
  durability?: number;
  metadatas?: {
      manufacture: readonly unknown[];
    renamed?: string;
    drawableId?: number;
    variationId?: number;
    index?: number;
    ammo?: number;
    name?: string;
    canRename?: boolean;
    plate?: string;
    identity?: { [key: string]: string };
    clothesCategory?: CategoryName;
  };
}

export interface IInventoryClothes {
  hat?: IInventoryItem;
  tshirt?: IInventoryItem;
  pant?: IInventoryItem;
  feet?: IInventoryItem;
  glasses?: IInventoryItem;
  access?: IInventoryItem;
  phat?: IInventoryItem;
  ptshirt?: IInventoryItem;
  ppant?: IInventoryItem;
  pfeet?: IInventoryItem;
  pglasses?: IInventoryItem;
  paccess?: IInventoryItem;
}

export interface IInventoryShortcuts { [key: number]: IInventoryItem }

export interface IInventoryHud {
  hunger: number;
  thirst: number;
  maxWeight: number;
}

export interface IItemGridProps {
  items: IInventoryItem[];
  onItemClick?: (item: IInventoryItem) => void;
  onItemDoubleClick?: (item: IInventoryItem) => void;
  onItemDragStart?: (item: IInventoryItem) => void;
  setDropTo?: (zone: DragContainers) => void;
  draggedItem?: IInventoryItem;
  selectedItem?: IInventoryItem | IInventoryItem[];
  selectedItems?: IInventoryItem[];
  canDrop?: boolean;
  containerName: "inventory" | "target";
  allSelected?: boolean;
  onItemRightClick?: (item: IInventoryItem) => void;
  separateByName?: boolean;
  separateByWeight?: boolean;
}

export type CategoryName =
  | "all"
  | "outfit"
  | "hat"
  | "top"
  | "accessory"
  | "bottom"
  | "shoe";