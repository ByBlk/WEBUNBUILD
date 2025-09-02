import {ICrew, TCrewType, TRole} from './types';

import List from '../../components/List';
import React from 'react';
import {fetchNui, useNuiEvent} from "@/hook";
import styles from "./crews.module.scss";
import MediaCdn from '@/components/mediaCdn/mediaCdn';
import {getCdnUrl} from "@utils/misc";
import ServerGestion from '../../index';
import {TPos} from "@/features/serverGestion/Frames/factions/types.ts";


interface ItemProps {
    navigateTo: (component: React.ReactNode) => void;
}

const Crews: React.FC<ItemProps> = ({navigateTo}) => {
    const [crews, setCrews] = React.useState<ICrew[]>([]);
    const [crewType, setCrewType] = React.useState<TCrewType>("mafia");
    const [crew, setCrew] = React.useState<ICrew | null>(null);
    const [showUnstartedCrews, setShowUnstartedCrews] = React.useState(false);

    useNuiEvent('nui:server-gestion-crews:setCrews', (crews: ICrew[]) => {
        console.log("Setting crews", crews);
        setCrews(crews);
    });

    const roles: TRole[] = [
        {name: "Indépendant", role: "normal", color: "white"},
        {name: "Mafia", role: "mafia", color: "red"},
        {name: "MC", role: "mc", color: "yellow"},
        {name: "Organisation", role: "orga", color: "orange"},
        {name: "Gang", role: "gang", color: "green"},
    ]

    const updateCrew = (key: string, value: any) => {

        console.log("Previews crew", crew);
        setCrew(prevItem => {
            if (!prevItem) return prevItem;

            console.log("Updating crew", key, value);
            const updatedItem = { ...prevItem, [key]: value };

            console.log("Updated crew", updatedItem);

            setCrews(prevCrews =>
                prevCrews.map(c => (c.id === prevItem.id ? updatedItem : c))
            );

            return updatedItem;
        });

        
    }

    const handleSave = () => {
        if (!crew) return;
        fetchNui("nui:server-gestion-crews:save", crew);
    }

    const handleDelete = (wipe = false) => {
        if (!crew) return;
        const updatedCompanies = crews.filter((c) => c.id !== crew.id);
        setCrews(updatedCompanies);
        setCrew(null);

        return fetchNui(`nui:server-gestion-crews:${wipe ? 'wipe' : 'delete'}`, crew.name);
        //handleSave();
    }

    const checkIfPosSetup = () => {
        if (crew) {
            // Check if all pos are setup
            if (crew.posLaboratory.x === 0 || crew.posLaboratory.y === 0 || crew.posLaboratory.z === 0) {
                console.log("Laboratory pos not setup");
                return false;
            }

            if (crew.posCraft.x === 0 || crew.posCraft.y === 0 || crew.posCraft.z === 0) {
                console.log("Craft pos not setup");
                return false;
            }

            if (crew.posStockage.x === 0 || crew.posStockage.y === 0 || crew.posStockage.z === 0) {
                console.log("Stockage pos not setup");
                return false;
            }

            if (crew.posGarage.x === 0 || crew.posGarage.y === 0 || crew.posGarage.z === 0) {
                console.log("Garage pos not setup");
                return false;
            }

            return true;
        }
    }
    const handleDefineCrewPos = async (posType: string) => {
        fetchNui("nui:server-gestion-crew:getPos").then((data: any) => {
            const pos = JSON.parse(data.pos) as TPos;

            const {x, y, z} = pos;

            switch (posType) {
                case "laboratory":
                    updateCrew("posLaboratory", {x, y, z});
                    break
                case "craft":
                    updateCrew("posCraft", {x, y, z});
                    break
                case "stockage":
                    updateCrew("posStockage", {x, y, z});
                    break
                case "garage":
                    updateCrew("posGarage", {x, y, z});
                    break
            }
        });


    }

    return (
        <div className={styles.frame}>

            <div className={styles.header}>
                <div className={styles.goBack} onClick={() => navigateTo(<ServerGestion/>)}>
                    <MediaCdn path="assets/gestion-serveur" name="back.svg" props={{}}/>
                </div>
                <div className={styles.titles}>
                    <h1>Gestion</h1>
                    <h2>Crew {crew ? `${crew.name}` : ""}</h2>
                </div>
            </div>
            <div className={styles.body}>
                <div className={`${styles.column} ${styles.nav}`}>
                    <List title="Type de crew" elements={roles.map((r) => ({
                        name: r.name,
                        circle: {
                            backgroundColor: r.color,
                            padding: true
                        },
                        selected: r.role === crewType && !showUnstartedCrews,
                        onClick() {
                            setCrewType(r.role as TCrewType);
                            setShowUnstartedCrews(false);
                        },
                    }))}
                          last={{
                              name: "Demandes de crew",
                              icon: getCdnUrl("assets/gestion-serveur/crew", "demandes.svg"),
                              selected: showUnstartedCrews,
                              onClick() {
                                  setCrewType("" as TCrewType);
                                  setShowUnstartedCrews(true);
                              },
                          }}
                    />

                    <List
                        title={showUnstartedCrews ? "Demandes de crew" : crewType.charAt(0).toUpperCase() + crewType.slice(1).toLowerCase()}
                        elements={crews.filter((c) => showUnstartedCrews ? !c.started : c.type === crewType && c.started).map((r) => ({
                            name: r.name,
                            icon: r.image,
                            selected: crew?.id === r.id,
                            onClick() {
                                console.log("Setting crew", r);
                                setCrew(r);
                            }
                        }))}
                        last={!showUnstartedCrews ? {
                            name: "Créer un crew",
                            icon: getCdnUrl("assets/gestion-serveur", "plus.svg"),
                            selected: false,
                            onClick() {
                                setCrew(() => {
                                    const newCrew: ICrew = {
                                        id: crews.length + 1,
                                        name: "Nouveau crew",
                                        type: crewType,
                                        image: getCdnUrl("assets/gestion-serveur/crew", "photo.svg"),
                                        started: false,
                                        moto: "",
                                        color: "",
                                        lead: "",
                                        level: 1,
                                        experience: 0,
                                        posLaboratory: {x: 0, y: 0, z: 0},
                                        posCraft: {x: 0, y: 0, z: 0},
                                        posStockage: {x: 0, y: 0, z: 0},
                                        posGarage: {x: 0, y: 0, z: 0},
                                        members: [],
                                        vehicles: [],
                                        territories: [],
                                        properties: [],
                                        shops: [],
                                    }

                                    setCrews([...crews, newCrew]);

                                    return newCrew;

                                });
                            }
                        } : undefined}
                    />
                </div>
                <div className={styles.column}>
                    <div className={styles.main}>
                        {crew && (
                            <>
                                <div className={styles.column}>
                                    <div className={styles.actions}>
                                        <div className={styles.title}>
                                            Fiche de groupe
                                        </div>

                                        <div className={styles.preview}>
                                            <img src={crew.image} alt={crew.name}/>
                                            <div className={styles.infos}>
                                                <div className={styles.itemname}>{crew.name}</div>
                                                <div className={styles.itemcategory}>{crew.type}</div>
                                            </div>
                                        </div>

                                        <div className={styles.subtitle}>
                                            Informations
                                        </div>

                                        <div className={`${styles.metadata} ${styles.scrollbar}`}>
                                            <div className={styles.info}>
                                                <div className={styles.icon}>
                                                    <MediaCdn path="assets/gestion-serveur/crew" name="name.svg"
                                                              props={{}}/>
                                                </div>
                                                <div className={styles.label}>
                                                    Nom
                                                </div>
                                                <div className={styles.value}>
                                                    <input type="text" value={crew.name}
                                                           onChange={(e) => updateCrew("name", e.currentTarget.value)}/>
                                                </div>
                                            </div>

                                            <div className={styles.info}>
                                                <div className={styles.icon}>
                                                    <MediaCdn path="assets/gestion-serveur/crew" name="name.svg"
                                                              props={{}}/>
                                                </div>
                                                <div className={styles.label}>
                                                    Type
                                                </div>
                                                <div className={styles.value}>
                                                    <select
                                                        value={crew.type}
                                                        onChange={(e) => updateCrew("type", e.currentTarget.value)}
                                                    >
                                                        <option value="normal">Indépendant</option>
                                                        <option value="gang">Gang</option>
                                                        <option value="orga">Orga</option>
                                                        <option value="mafia">Mafia</option>
                                                        <option value="mc">MC</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className={styles.info}>
                                                <div className={styles.icon}>
                                                    <MediaCdn path="assets/gestion-serveur" name="name.svg" props={{}}/>
                                                </div>
                                                <div className={styles.label}>
                                                    Devise
                                                </div>
                                                <div className={styles.value}>
                                                    <input type="text" value={crew.moto}
                                                           onChange={(e) => updateCrew("moto", e.currentTarget.value)}/>
                                                </div>
                                            </div>

                                            <div className={styles.info}>
                                                <div className={styles.icon}>
                                                    <MediaCdn path="assets/gestion-serveur/crew" name="color.svg"
                                                              props={{}}/>
                                                </div>
                                                <div className={styles.label}>
                                                    Couleur
                                                </div>
                                                <div className={styles.value}>
                                                    <input type="text" value={crew.color}
                                                           onChange={(e) => updateCrew("color", e.currentTarget.value)}/>
                                                </div>
                                            </div>

                                            <div className={styles.info}>
                                                <div className={styles.icon}>
                                                    <MediaCdn path="assets/gestion-serveur/crew" name="user.svg"
                                                              props={{}}/>
                                                </div>
                                                <div className={styles.label}>
                                                    Lead
                                                </div>
                                                <div className={styles.value}>
                                                    <input type="text" value={crew.lead}
                                                           onChange={(e) => updateCrew("lead", e.currentTarget.value)}/>
                                                </div>
                                            </div>

                                            <div className={styles.info}>
                                                <div className={styles.icon}>
                                                    <MediaCdn path="assets/gestion-serveur/crew" name="reward.svg"
                                                              props={{}}/>
                                                </div>
                                                <div className={styles.label}>
                                                    Niveau
                                                </div>
                                                <div className={styles.value}>
                                                    <input type="text" value={crew.level}
                                                           onChange={(e) => updateCrew("level", e.currentTarget.value)}/>
                                                </div>
                                            </div>

                                            <div className={styles.info}>
                                                <div className={styles.icon}>
                                                    <MediaCdn path="assets/gestion-serveur/crew" name="experience.svg"
                                                              props={{}}/>
                                                </div>
                                                <div className={styles.label}>
                                                    Experience
                                                </div>
                                                <div className={styles.value}>
                                                    <input type="text" value={crew.experience}
                                                           onChange={(e) => updateCrew("experience", e.currentTarget.value)}/>
                                                </div>
                                            </div>

                                            <div className={styles.info}>
                                                <div className={styles.icon}>
                                                    <MediaCdn path="assets/gestion-serveur/crew" name="user.svg"
                                                              props={{}}/>
                                                </div>
                                                <div className={styles.label}>
                                                    Nombre de membres
                                                </div>
                                                <div className={styles.value}>
                                                    {crew.members.length > 0 ? crew.members.length : 1}
                                                </div>
                                            </div>
                                            <div className={styles.info}
                                                 style={{backgroundColor: "rgba(170, 170, 170, 0.10)"}}>
                                                <div className={styles.icon}>
                                                    <MediaCdn path="assets/gestion-serveur/crew" name="map.svg"
                                                              props={{}}/>
                                                </div>
                                                <div className={styles.label}>
                                                    Point de laboratoire
                                                </div>
                                                <div className={styles.value}>
                                                    <button className={styles.button}
                                                            onClick={() => handleDefineCrewPos("laboratory")}>
                                                        Définir à la pos actuelle
                                                        <div className={styles.tooltip}>
                                                            x
                                                            : {Math.round(crew.posLaboratory.x)} y: {Math.round(crew.posLaboratory.y)} z: {Math.round(crew.posLaboratory.z)}
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className={styles.info}
                                                 style={{backgroundColor: "rgba(170, 170, 170, 0.15)"}}>
                                                <div className={styles.icon}>
                                                    <MediaCdn path="assets/gestion-serveur/crew" name="map.svg"
                                                              props={{}}/>
                                                </div>
                                                <div className={styles.label}>
                                                    Point de craft
                                                </div>
                                                <div className={styles.value}>
                                                    <button
                                                        className={styles.button}
                                                        onClick={() => {
                                                            const pos = `x: ${Math.round(crew.posCraft.x)} y: ${Math.round(crew.posCraft.y)} z: ${Math.round(crew.posCraft.z)}`;
                                                            const textarea = document.createElement("textarea");
                                                            textarea.value = pos;
                                                            document.body.appendChild(textarea);
                                                            textarea.select();
                                                            document.execCommand("copy");
                                                            document.body.removeChild(textarea);
                                                        }}
                                                    >
                                                        Copier la pos
                                                        <div className={styles.tooltip}>
                                                            x: {Math.round(crew.posCraft.x)} y: {Math.round(crew.posCraft.y)} z: {Math.round(crew.posCraft.z)}
                                                        </div>
                                                    </button>

                                                </div>
                                            </div>

                                            <div className={styles.info}
                                                 style={{backgroundColor: "rgba(170, 170, 170, 0.10)"}}>
                                                <div className={styles.icon}>
                                                    <MediaCdn path="assets/gestion-serveur/crew" name="map.svg"
                                                              props={{}}/>
                                                </div>
                                                <div className={styles.label}>
                                                    Point de stockage
                                                </div>
                                                <div className={styles.value}>
                                                    <button className={styles.button}
                                                            onClick={() => handleDefineCrewPos("stockage")}>
                                                        Définir à la pos actuelle
                                                        <div className={styles.tooltip}>
                                                            x
                                                            : {Math.round(crew.posStockage.x)} y: {Math.round(crew.posStockage.y)} z: {Math.round(crew.posStockage.z)}
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className={styles.info}
                                                 style={{backgroundColor: "rgba(170, 170, 170, 0.10)"}}>
                                                <div className={styles.icon}>
                                                    <MediaCdn path="assets/gestion-serveur/crew" name="car.svg"
                                                              props={{}}/>
                                                </div>
                                                <div className={styles.label}>
                                                    Garage de crew
                                                </div>
                                                <div className={styles.value}>
                                                    <button className={styles.button}
                                                            onClick={() => handleDefineCrewPos("garage")}>
                                                        Définir à la pos actuelle
                                                        <div className={styles.tooltip}>
                                                            x
                                                            : {Math.round(crew.posGarage.x)} y: {Math.round(crew.posGarage.y)} z: {Math.round(crew.posGarage.z)}
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className={styles.subtitle}>
                                                Image
                                            </div>

                                            <div className={styles.info}
                                                 style={{backgroundColor: "rgba(170, 170, 170, 0.10)"}}>
                                                <div className={styles.icon}>
                                                    <MediaCdn path="assets/gestion-serveur/crew" name="photo.svg"
                                                              props={{}}/>
                                                </div>
                                                <div className={styles.label}>
                                                    Image CDN
                                                </div>
                                                <div className={styles.value}>
                                                    <input type="text" value={crew.image}
                                                           onChange={(e) => updateCrew("image", e.currentTarget.value)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={`${styles.column} ${styles.members}`}>
                                    <List
                                        title="Liste des membres"
                                        maxHeight="35.8em"
                                        fallback='Aucun membre'
                                        elements={crew.members.map((m) => ({
                                            name: m.lname + " " + m.fname + " - " + m.identifier,
                                            icon: getCdnUrl("assets/gestion-serveur/crew", "user.svg"),
                                            selected: false,
                                            onClick() {
                                                console.log("Membre selected", m)
                                            }
                                        }))}
                                        first={{
                                            name: "Ajouter un membre (id discord)",
                                            icon: getCdnUrl("assets/gestion-serveur", "plus.svg"),
                                            selected: false,
                                            input: {
                                                type: "text",
                                                onEnter: (e) => {
                                                    if (e.currentTarget && (e.currentTarget as HTMLInputElement).value)
                                                        fetchNui("nui:server-gestion-crews:addMember", {crew: crew?.name, discord: (e.currentTarget as HTMLInputElement).value}).then((res: any) => {
                                                            console.log(res)
                                                            if (res.state) {
                                                                updateCrew("members", [...crew.members, res.value]);
                                                            }
                                                        });
                                                    (e.currentTarget as HTMLInputElement).value = "";
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div className={styles.column}>
                                    <div className={styles.row}>
                                        <List
                                            title="Véhicules"
                                            fallback='Aucun véhicule'
                                            maxHeight="9em"
                                            elements={crew.vehicles.map((v) => ({
                                                name: v.name,
                                                icon: getCdnUrl("assets/gestion-serveur/crew", "car.svg"),
                                                selected: false,
                                                onClick() {
                                                    console.log("Vehicle selected", v)
                                                }
                                            }))}
                                            first={{
                                                name: "Ajouter un véhicule (nom de spawn)",
                                                icon: getCdnUrl("assets/gestion-serveur", "plus.svg"),
                                                selected: false,
                                                input: {
                                                    type: "text",
                                                    onEnter: (e) => {
                                                        if (e.currentTarget && (e.currentTarget as HTMLInputElement).value)
                                                            fetchNui("nui:server-gestion-crews:addVehicle", {crew: crew?.name, vehicle: (e.currentTarget as HTMLInputElement).value}).then((res: any) => {
                                                                if (res.state) {
                                                                    updateCrew("vehicles", [...crew.vehicles, {name : res.name, plate: res.plate}]);
                                                                }
                                                            });
                                                        (e.currentTarget as HTMLInputElement).value = "";
                                                    }
                                                }
                                            }}
                                        />

                                        <List
                                            title="Territoires"
                                            fallback='Aucun territoire'
                                            maxHeight="5.5em"
                                            elements={crew.territories.map((t) => ({
                                                name: t.name,
                                                icon: getCdnUrl("assets/gestion-serveur/crew", "map.svg"),
                                                selected: false,
                                                onClick() {
                                                    console.log("Territory selected", t)
                                                }
                                            }))}
                                        />

                                        <List
                                            title="Propriétés"
                                            fallback='Aucune propriété'
                                            maxHeight="5.5em"
                                            elements={crew.properties.map((p) => ({
                                                name: p.address,
                                                icon: getCdnUrl("assets/gestion-serveur/crew", "house.svg"),
                                                selected: false,
                                                onClick() {
                                                    console.log("Property selected", p)
                                                }
                                            }))}
                                        />

                                        <List
                                            title="Commerces"
                                            fallback='Aucun commerce'
                                            maxHeight="5.5em"
                                            elements={crew.shops.map((c) => ({
                                                name: c.name,
                                                icon: getCdnUrl("assets/gestion-serveur/crew", "house.svg"),
                                                selected: false,
                                                onClick() {
                                                    console.log("Comercial selected", c)
                                                }
                                            }))}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {crew && (
                <div className={styles.footerButtons}>
                    {!crew.started ? (
                        <div className={styles.button} onClick={() => {
                            if (!checkIfPosSetup()) return
                            updateCrew("started", true);
                            handleSave();
                            setTimeout(() => {
                                fetchNui("nui:server-gestion-crews:start", crew?.name);
                            }, 5000)
                        }}>
                            <span>Start le crew</span>
                        </div>
                    ) : (
                        <>
                            <div className={styles.button}
                                 onClick={() => fetchNui("nui:server-gestion-crews:join", crew?.name)}>
                                <span>Rejoindre</span>
                            </div>
                            <div className={styles.button} onClick={() => handleDelete(true)}>
                                <span>Supprimer & wipe</span>
                            </div>
                        </>
                    )}
                    <div className={styles.button} onClick={() => handleDelete()}>
                        <span>Supprimer</span>
                    </div>
                    <div className={styles.buttonSave} id="save" onClick={() => handleSave()}>
                        <span>Sauvegarder</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Crews;
