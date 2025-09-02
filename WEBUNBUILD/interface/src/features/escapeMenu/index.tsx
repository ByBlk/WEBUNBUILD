import "./style/style.scss";
import React, {useEffect, useState} from "react";
import { fetchNui } from "@hooks/fetchNui";
import { useEscapeKey, useBackspaceKey, useEnterKey } from "@hooks/useKeys";
import { playBoutiqueEnter } from '@/utils/playSound'
import { EscapeMenuData } from "./type";
import { getCdnUrl } from "@utils/misc"; 
import { useNuiEvent } from "@hooks/nuiEvent";
import VCoins from "./vcoins"; 
import BoutiqueVehicules from "./components/BoutiqueVehicules";
import Premium from "./components/frames/Premium.tsx";
import {useBoutiqueStore} from "@/features/escapeMenu/components/store.ts";

const EscapeMenu: React.FC = () => {
    const [isSupportOpen, setIsSupportOpen] = useState(false);
    const [isBoutiquePageOpen, setIsBoutiquePageOpen] = useState(false);
    const [report, setReport] = useState("");
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState<EscapeMenuData | undefined>(undefined);
    const [isErrorShown, setIsErrorShown] = useState(false);
    const [page, setPage] = useState<string>("");
    const [pageOpen, setPageOpen] = useState(false);
    const [hovered, setHovered] = useState<string>("");
    const pageStore = useBoutiqueStore((state) => state.pageStore)
    const setPageStore = useBoutiqueStore((state) => state.setPageStore)

    useEffect(() => {
        setPage(pageStore)
    }, [pageStore]);

    useNuiEvent<boolean>('nui:escape-menu:visible', (status) => {
        setVisible(status);
        setIsSupportOpen(false);
        setIsBoutiquePageOpen(false);
        setPageOpen(false);
    });

    useNuiEvent<EscapeMenuData>('nui:escape-menu:data', (data) => {;
        console.log("EscapeMenu data reçue :", data, JSON.stringify(data));
        setData(data);
    });

    useEscapeKey(() => {
        if (visible) {
            fetchNui('nui:escape-menu:close');
            setVisible(false);
            setIsBoutiquePageOpen(false);
            setIsSupportOpen(false);
            setPageOpen(false);
            setPage("");
            setPageStore("");
        }
    }, visible, 'keydown');

    useBackspaceKey(() => {
        if (pageOpen) {
            setPageOpen(false);
            setPage("");
            setPageStore("");
        } else if (isBoutiquePageOpen) {
            setIsBoutiquePageOpen(false);
        }
    });

    useEnterKey(() => {
        if (isSupportOpen) {
            handleSupport();
        }
    });

    const handleMap = () => {
        fetchNui("nui:escape-menu:open-map");
        playBoutiqueEnter()
    }

    const handleOptions = () => {
        fetchNui("nui:escape-menu:open-options");
        playBoutiqueEnter()
    };

    const handlePersonnage = () => {
        fetchNui("nui:escape-menu:open-personnage");
        playBoutiqueEnter()
    };

    const handleBoutique = () => {
        setIsBoutiquePageOpen(!isBoutiquePageOpen);
        playBoutiqueEnter()
    };

    const handleSupport = () => {
        if (isSupportOpen) {
            if (report.trim().split(" ").length < 4 && data?.serverType === 'FA') {
                setIsErrorShown(true);
                return;
            }
            if (report.trim().length > 0) fetchNui("nui:escape-menu:send-report", { report: report.trim() });
                setIsSupportOpen(false);
                setIsErrorShown(false);
                setReport("");
        } else setIsSupportOpen(true);
    };

    const OpenPage = (page: string) => {
        setPage(page);
        setPageOpen(true);
    }

    return (
        <>
            {visible && !data && (
                <div style={{color: 'white', fontSize: 32, textAlign: 'center', marginTop: 100}}>Chargement de la boutique...</div>
            )}
            {data && visible && page !== "VEHICLES" && page !=="PREMIUM" && page !== "PREMIUM+" && (
                <div className="MenuEscape">
                    <div className="MenuEscape__container">
                        {!isBoutiquePageOpen ? (
                            <>
                                <div className="MenuEscape__containerrow">
                                    <div className="MenuEscape__container__Items" onClick={handlePersonnage} >
                                        <h1>PERSONNAGE</h1>
                                        <img src={getCdnUrl("assets/escapemenu", "personnage.png")} draggable={false} />
                                    </div>
                                    <div className="MenuEscape__container__Items" onClick={handleMap}>
                                        <h1>CARTE</h1>
                                        <img src={getCdnUrl("assets/escapemenu", "map.png")} draggable={false} />
                                    </div>
                                    <div className="MenuEscape__container__Items" onClick={handleBoutique}>
                                        <h1>BOUTIQUE</h1>
                                        <img src={getCdnUrl("assets/escapemenu", "boutique.png")} draggable={false} />
                                    </div>
                                </div>
                                <div className="MenuEscape__containercolumn">
                                    <div className="MenuEscape__container__Items" onClick={handleOptions}>
                                        <h1>REGLAGES</h1>
                                        <img src={getCdnUrl("assets/escapemenu", "settings.png")} draggable={false} />
                                    </div>
                                    {isSupportOpen ? (
                                        <div className="SupportReport">
                                            <div className="SupportReport__container">
                                                <h1>Besoin d’aide ?</h1>
                                                <textarea
                                                    value={report}
                                                    onChange={(e) => setReport(e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    placeholder="Entrer votre message..."
                                                />
                                                {isErrorShown && (
                                                    <div className="error">Le message doit comporter au moins 4 mots</div>
                                                )}
                                                <div className="button" onClick={handleSupport}>Report</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="MenuEscape__container__Items" onClick={handleSupport}>
                                            <h1>SUPPORT</h1>
                                            <img src={getCdnUrl("assets/escapemenu", "support.png")} draggable={false} />
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="MenuEscape__BoutiquePage">
                                {page === "VCOINS" ? (
                                    <VCoins 
                                        cfx={data.cfx} 
                                        premium={data.premium} 
                                        premiumEndDate={data.premiumEndDate} 
                                        credit={data.credit} 
                                        unique_id={data.unique_id} 
                                        serverType={data.serverType} 
                                    />
                                ) : (
                                    <div className="BoutiquePage__content">
                                        <div className="BoutiquePage__items" onClick={() => {OpenPage("PREMIUM"); playBoutiqueEnter()}}>
                                            <h1>PREMIUM</h1>
                                            <img src={getCdnUrl("assets/escapemenu", "personnage.png")} draggable={false} />
                                        </div>
                                        <div className="BoutiquePage__items" onClick={() => {OpenPage("PREMIUM+"); playBoutiqueEnter()}}>
                                            <h1>PREMIUM+</h1>
                                            <img src={getCdnUrl("assets/escapemenu", "vcoins.png")} draggable={false} />
                                        </div>
                                        <div className="BoutiquePage__items" onClick={() => {OpenPage("VEHICLES"); playBoutiqueEnter()}}>
                                            <h1>VÉHICULES</h1>
                                            <img src={getCdnUrl("assets/escapemenu", "vehicles.png")} draggable={false} />
                                        </div>
                                        <div className="BoutiquePage__items" onClick={() => {OpenPage("VCOINS"); playBoutiqueEnter()} }>
                                            <h1>VCOINS</h1>
                                            <div 
                                                onMouseEnter={() => setHovered("VCOINS")} 
                                                onMouseLeave={() => setHovered("")}
                                                style={{
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: "100%",
                                                    height: "100%",
                                                }}
                                            >
                                                {!hovered ? (
                                                    <img src={getCdnUrl("assets/escapemenu", "visioncoinnnsss.png")} draggable={false} style={{
                                                        width: "80%",
                                                        height: "60%",
                                                    }} />
                                                ) : (
                                                    <img src={getCdnUrl("assets/escapemenu", "visioncoinsHover.png")} draggable={false} />
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {page === "VEHICLES" && (
               <BoutiqueVehicules onTypeChange={(type) => console.log(type)} />
            )}
            {page === "PREMIUM" && (
                <Premium premium={"PREMIUM"}/>
            )}
            {page === "PREMIUM+" && (
                <Premium premium={"PREMIUM+"}/>
            )}
        </>
    );
};

export default EscapeMenu;