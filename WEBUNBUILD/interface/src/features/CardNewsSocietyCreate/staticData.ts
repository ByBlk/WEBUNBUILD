import {IPresets} from "@/features/CardNewsSocietyCreate/types.ts";

const PRESET_LIST: IPresets = {
    "LSPD": {
        label: "LSPD",
        number: 911,
        image: "https://cdn.eltrane.cloud/3838384859/old_a_trier/vNotif/lspd.webp",
        type1: "INTERVENTION",
        type2: "INFORMATION",
        type3: "ALERTE"
    },
    "LSFD": {
        label: "LSFD",
        number: 912,
        image: "https://cdn.eltrane.cloud/3838384859/old_a_trier/vNotif/lsfd.webp",
        type1: "INTERVENTION",
        type2: "INFORMATION",
        type3: "ALERTE"
    },
    "SAMS": {
        label: "SAMS",
        number: 914,
        image: "https://cdn.eltrane.cloud/3838384859/old_a_trier/vNotif/SAMS.webp",
        type1: "INTERVENTION",
        type2: "INFORMATION",
        type3: "ALERTE"
    },
    "USSS": {
        label: "USSS",
        number: null,
        image: "https://cdn.eltrane.cloud/3838384859/old_a_trier/vNotif/usss.webp",
        type1: "INTERVENTION",
        type2: "INFORMATION",
        type3: "ALERTE"
    },
    "G6": {
        label: "G6",
        number: 914,
        image: "https://cdn.eltrane.cloud/3838384859/old_a_trier/vNotif/g6.webp",
        type1: "SECURISATION",
        type2: "INFORMATION",
        type3: "ALERTE"
    },
    "GOUV": {
        label: "GOUVERNEMENT",
        number: null,
        image: "https://cdn.eltrane.cloud/3838384859/old_a_trier/vNotif/gouv.webp",
        type1: "INTERVENTION",
        type2: "INFORMATION",
        type3: "ALERTE"
    },
    "JUSTICE": {
        label: "JUSTICE",
        number: null,
        image: "https://cdn.eltrane.cloud/3838384859/old_a_trier/vNotif/justice.webp",
        type1: "INTERVENTION",
        type2: "INFORMATION",
        type3: "ALERTE"
    }
};

export default PRESET_LIST;