import { Craft, Drugs, Map, Missions, Tablet } from "./pages";
import { TInfluences, TPages, TRole, TTerrotory } from './types';
import { fetchNui } from '@/hook';

import List from "../../components/List";
import React from 'react';
import styles from "./main.module.scss";
import MediaCdn from '@/components/mediaCdn/mediaCdn';
import ServerGestion from '../../index';
import { AppProvider } from './context';

interface MainProps {
    navigateTo: (component: React.ReactNode) => void,
    influences?: TInfluences[],
    territories?: TTerrotory[]
}

const Item: React.FC<MainProps> = ({ navigateTo }) => {
    const [page, setPage] = React.useState<string>("zones de territoires");
    const [crewType, setCrewType] = React.useState<string>("mafia");

    const pages: TPages[] = [
        {
            name: "Zones de territoires",
            page: "zones de territoires",
            icon: "https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/food.svg"
        },
        { name: "Craft", page: "craft", icon: "https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/car.svg" },
        {
            name: "Tablette",
            page: "tablette",
            icon: "https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/weapon.svg"
        },
        {
            name: "Drogues",
            page: "drogues",
            icon: "https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/clothe.svg"
        },
        {
            name: "Missions",
            page: "missions",
            icon: "https://cdn.eltrane.cloud/3838384859/assets/gestion-serveur/jewelry.svg"
        },
    ]

    const roles: TRole[] = [
        { name: "Mafia", role: "mafia", color: "red" },
        { name: "MC", role: "mc", color: "yellow" },
        { name: "Organisation", role: "organisation", color: "orange" },
        { name: "Gang", role: "gang", color: "green" },
    ]

    return (
        <AppProvider>
            <div className={styles.frame}>
                <div className={styles.header}>
                    <div className={styles.goBack} onClick={() => navigateTo(<ServerGestion />)}>
                        <MediaCdn path="assets/gestion-serveur" name="back.svg" props={{}} />
                    </div>
                    <div className={styles.titles}>
                        <h1>Gestion</h1>
                        <h2>ILLÉGAL <span>({page})</span></h2>
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={`${styles.column} ${styles.nav}`}>
                        <List title="Pages" elements={pages.map((p) => ({
                            name: p.name,
                            icon: p.icon,
                            selected: false,
                            onClick() {
                                setPage(p.page);
                            },
                        }))} />
                        {(page === "tablette" || page === "craft") && (
                            <List title="Type de crew" elements={roles.map((r) => ({
                                name: r.name,
                                circle: {
                                    backgroundColor: r.color,
                                    padding: true
                                },
                                selected: r.role === crewType,
                                onClick() {
                                    fetchNui("nui:server-gestion:illegal:typeCrew", r.role);
                                    setCrewType(r.role);
                                },
                            }))} />
                        )}
                    </div>
                    <div className={styles.column}>
                        <div className={styles.main}>
                            {page === "zones de territoires" && <Map />}
                            {page === "craft" && <Craft crew={crewType} />}
                            {page === "tablette" && <Tablet crew={crewType} />}
                            {page === "drogues" && <Drugs />}
                            {page === "missions" && <Missions />}
                        </div>
                    </div>
                </div>
            </div>
        </AppProvider>
    );
};

export default Item;
