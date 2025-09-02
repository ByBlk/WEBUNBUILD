export type IWeazelNewsButton = {
    type: "info" | "music" | "price" | "interact" | "pos" | "time";
    text: string;
};

export type IWeazelNewsBroadcastData = {
    category: "fame" | "media" | "news" | "music";
    media: "image" | "video";
    media_url: string;
    buttons: IWeazelNewsButton[];
    preview: boolean;
    type: "WEAZEL";
};

export interface IAlertData {
    id?: string;
    content: string;
    image?: string;
};

export interface INotification {
    type: string;
    content?: string;
    duration?: number;
    mainMessage?: string;
    label?: string;
    logo?: string;
    mainColor?: string;
    title?: string;
}

export type IAlertDatas = IAlertData[];

export type SnackbarKey = string | number;

export interface INotificationPresetProps {
    type?: string,
    distance?: number,
    distancepnj?: number,
    title?: string,
    adress?: string,
    adress2?: string,
    duration?: number,
    labeltype?: string,
    parsedContent?: string,
    typeannonce?: string,
    name?: string,
    utils?: string,
    staffReason?: number,
    mainColor?: string,
    logo?: string,
    overrideCategory?: string,
    phone?: string,
    staff?: string,
    backgroundStart?: string,
    backgroundEnd?: string,
    tagStart?: string,
    tagEnd?: string,
    labelColor?: string,
    label?: string,
    mainMessage?: string,
    subject?: string,
    id?: string | number,
    color?: string,
    hasSpecialColor?: boolean,
    icon?: string,
    autoHideDuration?: number,
    key?: number;
    variant?: "mainNotification" | "default" | "error" | "success" | "warning" | "info" | undefined;
}

export interface IWeatherTimeData {
    weather: string;
    hour: number;
    minute: number;
    visible: boolean;
}

export interface ILocalisation {
    visible: boolean;
    color: string;
    icon: string;
    position: string;
}

/* 
    NOTIFICATIONS V2 :
    {
        type: un string parmi 'VISION' 'MISSIONTAXI' 'ALERTEJOBS' 'JOB' 'ILLEGAL' 'ADMIN_NEW_REPORT' qui défini le style global de la notification
        ^ ^ ^ Seul le style ILLEGAL est vérifié pour la V2, les autres datent de la V1 et sont peut être à revoir
        content?: string, le texte principal pour les notifications de type ALERTEJOBS et VISION, permet d'afficher des touches avec ~K B 
        (pour la touche B par exemple) et du texte en couleur avec ~sCouleur (liste dans staticData);
        duration?: number, durée en secondes;
        mainMessage?: string, le texte affiché dans ILLEGAL, pas de gestion de couleur ou touches;
        label?: string, le petit label affiché en haut à droite;
        logo?: string, le lien vers le logo affiché à gauche;
        mainColor?: string, un nom de couleur parmi yellow, green, red, main (main = noir);
        title?: string, le texte affiché en haut de la notif;
    }

    ALERTS V2 (comme la V1) : {
        content: string, le texte affiché,
        image: string, le lien vers l'image
    }
*/

export interface WeaponProps {
    visible: boolean;
    weapon: string;
    bullets: number;
    maxBullets: number;
}