import "./style/style.scss";

import {Companies, Crews, Factions, Illegal, ItemComponent, PermissionsComponent, CatalogueComponent} from "./Frames";
import React, {useRef, useState} from "react";
import {useEscapeKey} from "@/hook/useKeys";
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import {useNuiEvent, fetchNui} from "@/hook";
import styles from "@/features/serverGestion/Frames/crews/crews.module.scss";

interface ServerGestionProps {
}

const ServerGestion: React.FC<ServerGestionProps> = ({}) => {
    const [isVisible, setVisible] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    const [isMinimized, setIsMinimized] = useState(false);

    const containerPage = useRef<HTMLDivElement>(null)

    useNuiEvent<boolean>('nui:server-gestion:visible', (status) => {
        setVisible(status);
    });

    useNuiEvent<number>('nui:server-gestion:setPage', (page) => {
        setActiveItem(page);
    });

    useEscapeKey(() => {
        handleClose();
    }, isVisible);

    const handleClose = () => {
        setVisible(false);
        fetchNui('nui:closeServerGestion');
    }

    const handleItemClick = (id: number) => {
        fetchNui('nui:server-gestion:itemEnter', {id});
        setActiveItem(id);
    };

    const handleMinimize = () => {
        if (containerPage.current && isMinimized) {
            containerPage.current.style.display = 'block';
            document.querySelector(".background-servergestion")?.classList.remove("minimized");
            fetchNui("nui:server-gestion:minimize", {minimize: false});
            setIsMinimized(false);
        } else if (containerPage.current && !isMinimized) {
            containerPage.current.style.display = 'none';
            document.querySelector(".background-servergestion")?.classList.add("minimized");
            fetchNui("nui:server-gestion:minimize", {minimize: true});
            setIsMinimized(true);
        }
    }

    const items = [
        {
            id: 1,
            name: 'Permissions',
            svg: <MediaCdn path="assets/gestion-serveur" name="permission.svg" props={{}}/>,
            visible: true
        },
        {
            id: 2,
            name: 'Illégal',
            svg: <MediaCdn path="assets/gestion-serveur" name="illegal.svg" props={{}}/>,
            visible: true
        },
        // {
        //     id: 3,
        //     name: 'Grand catalogues',
        //     svg: <MediaCdn path="assets/gestion-serveur" name="legal.svg" props={{}}/>,
        //     visible: true,
        // },
        // {
        //     id: 4, 
        //     name: '911',
        //     svg: <MediaCdn path="assets/gestion-serveur" name="911.svg" props={{}}/>, 
        //     visible: false
        // },
        // {
        //     id: 5,
        //     name: 'Blips',
        //     svg: <MediaCdn path="assets/gestion-serveur" name="blips.svg" props={{}}/>,
        //     visible: true
        // },
        // {
        //     id: 6,
        //     name: 'Joueurs',
        //     svg: <MediaCdn path="assets/gestion-serveur" name="joueurs.svg" props={{}}/>,
        //     visible: true
        // },
        {
            id: 7,
            name: 'Groupes illégaux',
            svg: <MediaCdn path="assets/gestion-serveur" name="groupes.svg" props={{}}/>,
            visible: true
        },
        {
            id: 8,
            name: 'Entreprises',
            svg: <MediaCdn path="assets/gestion-serveur" name="entreprise.svg" props={{}}/>,
            visible: false
        },
        {
            id: 9,
            name: 'Items',
            svg: <MediaCdn path="assets/gestion-serveur" name="items.svg" props={{}}/>,
            visible: true
        },
        // {
        //     id: 10,
        //     name: 'Boutique',
        //     svg: <MediaCdn path="assets/gestion-serveur" name="boutique.svg" props={{}}/>,
        //     visible: false
        // },
    ];


    return isVisible ? (
        <div className="background-servergestion">
            <div className="servergestion">
                {/* <button className="close-button" onClick={handleClose}>✖</button> */}
                <div className="topbuttons">
                    <div className={styles.window} onClick={() => handleMinimize()}>
                        <MediaCdn path="assets/gestion-serveur" name="window.svg" props={{}}/>
                    </div>
                    <div className={styles.close} onClick={() => handleClose()}>
                        <MediaCdn path="assets/gestion-serveur" name="close.svg" props={{}}/>
                    </div>
                </div>

                <div ref={containerPage} style={{height: '100%'}}>
                    {activeItem === 0 && (
                        <div>
						<span className="servergestion__titlebox">
							<span className="servergestion__title">MENU DE GESTION</span>
							<br/><span className='servergestion__subtitle'>SERVEUR</span>
						</span>
                            <div className="servergestion__main__grid">
                                {items.filter(item => item.visible).map(item => (
                                    <div key={item.id} className="servergestion__main__grid_item"
                                         onClick={() => handleItemClick(item.id)}>
                                        {item.svg}
                                        <span className="servergestion__main__grid_item_name">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeItem === 1 && (
                        <PermissionsComponent navigateTo={() => setActiveItem(0)}/>
                    )}
                    {activeItem === 2 && (
                        <Illegal navigateTo={() => setActiveItem(0)}/>
                    )}

                    {activeItem === 3 && (
                        <CatalogueComponent navigateTo={() => setActiveItem(0)}/>
                    )}

                    {activeItem === 4 && (
                        <Factions navigateTo={() => setActiveItem(0)}/>
                    )}

                    {activeItem === 7 && (
                        <Crews navigateTo={() => setActiveItem(0)}/>
                    )}

                    {activeItem === 8 && (
                        <Companies navigateTo={() => setActiveItem(0)}/>
                    )}

                    {activeItem === 9 && (
                        <ItemComponent navigateTo={() => setActiveItem(0)}/>
                    )}
                </div>

            </div>

        </div>

    ) : null;

};

export default ServerGestion;

