import Advantage from "./Advantage.tsx";
import React from "react";
import {useBoutiqueStore} from "@/features/escapeMenu/components/store.ts";
import { AnimatePresence } from "motion/react"
import * as motion from "motion/react-client"

const PremiumBase: React.FC = () => {

    const url_cdn: string = "assets/premium"

    const setPageStore = useBoutiqueStore((state) => state.setPageStore)

    const changePage = (page: string) => {
        setPageStore(page);
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div className="main_content"
                key={"premiumBase"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container">
                    <div className="title_container">
                        <p className="title">Premium</p>
                        <p className="subtitle">Avantages</p>
                    </div>
                    <div className="advantage_container">
                        <div className="column_advantage">
                            <Advantage url_cdn={url_cdn} name={"salary.png"} text={"Salaire"} value={"X 1.5"}/>
                            <Advantage url_cdn={url_cdn} name={"garage.png"} text={"Garage public"} value={"X 2"}/>
                            <Advantage url_cdn={url_cdn} name={"animal.png"} text={"Animal de compagnie"} value={""}/>
                            <Advantage url_cdn={url_cdn} name={"priority.png"} text={"Connexion"}
                                       value={"prioritaire"}/>
                        </div>
                        <div className="column_advantage">
                            <Advantage url_cdn={url_cdn} name={"character_double.png"} text={"Double"}
                                       value={"personnage"} revert={true}/>
                            <Advantage url_cdn={url_cdn} name={"peds.png"} text={"Gta V"} value={"peds"}/>
                            <Advantage url_cdn={url_cdn} name={"decoration.png"} text={"Décoration"}
                                       value={"d'intérieur"}/>
                            <Advantage url_cdn={url_cdn} name={"surgery.png"} text={"Chirurgie esthétique"} value={""}/>
                        </div>
                        <div className="column_advantage">
                            <Advantage url_cdn={url_cdn} name={"farm.png"} text={"Limite de farm"} value={"X 2"}/>
                            <Advantage url_cdn={url_cdn} name={"clothes.png"} text={"Créer une"} value={"Tenue"}/>
                            <Advantage url_cdn={url_cdn} name={"plate.png"} text={"Plaque"} value={"custom"}/>
                            <Advantage url_cdn={url_cdn} name={"casino.png"} text={"Accès VIP"} value={"casino"}/>
                        </div>
                    </div>
                    <div className="footer_container">
                        <div className="info_footer pink">
                            <p><span>PPA</span> Armes</p>
                        </div>
                        <div className="info_footer yellow">
                            <p><span>Addons</span> exclusifs</p>
                        </div>
                        <div className="sub_price">
                            <div className="price">
                                <p>15 <span>&euro;</span></p>
                            </div>
                            <div className="btn_sub">
                                <a href="#">S'abonner</a>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            <div className="banner" onClick={() => changePage("PREMIUM+")}>
                <p>Premium <span>+</span></p>
            </div>
        </AnimatePresence>
    )
}

export default PremiumBase;