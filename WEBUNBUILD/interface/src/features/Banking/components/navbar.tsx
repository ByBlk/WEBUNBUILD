import { useState } from 'react';
import {fetchNui} from "@/hook";

interface NavbarProps {
    data: {
        visible: boolean;
        name: string;
        jobLabel: string;
        isBoss: boolean;
        mugshot: string;
    };
}

const NavbarComponent: React.FC<NavbarProps> = ({ data }) => {
    const [isVisible] = useState(data.visible);

    return isVisible ? (
        <div className="banking__navbar">
            <img src="https://cdn.eltrane.cloud/3838384859/assets/banking/logo.png" alt="" className="banking__navbar__img"/>

            <div className="banking__navbar__item">
                <div className="banking__navbar__item_global">Globale</div>
                <div className="banking__navbar__item_transactions">Transactions</div>
                
                <div className="banking__navbar__item_gestion">Gestion</div>
                <div className="banking__navbar__item_comptes">Comptes</div>
                <div className="banking__navbar__item_cartes">Cartes</div>
    
                <div className="banking__navbar__item_acces">Accès</div>
                <div className="banking__navbar__item_perso" onClick={() => fetchNui("nui:banking:account", 1)}>{data.name}</div>
                {data.isBoss && (
                    <div className="banking__navbar__item_job" onClick={() => fetchNui("nui:banking:account", 2)}>{data.jobLabel}</div>
                )}
                <div className="banking__navbar__item_profile">
                    <img src={data.mugshot} alt="" className="banking__navbar__item_profile_img"/>
                    <div className="banking__navbar__item_profile_name">{data.name}</div>
                    <div className="banking__navbar__item_profile_type">Compte particulier</div>
                </div>
            </div>
        </div>
    ) : null;
};

export default NavbarComponent;