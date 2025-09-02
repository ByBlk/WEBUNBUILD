import styles from "./propertyContainer.module.scss"
import React from "react";
import MediaCdn from "@/components/mediaCdn/mediaCdn.tsx";
import {IProperties, IVehs} from "@/features/orgaManagement/orga.type.ts";
import {getCdnUrl} from "@/utils";

type Props = {
    properties: IProperties[],
    vehs: IVehs[],
    territories: string[],
    type: "crew" | "faction" | "company",
}

const PropertyContainer = ({properties, vehs, territories, type}: Props) => {
    const [propertyType, setPropertyType] = React.useState('Stockage');

    return (
        <div className={`${styles.subContainer} ${styles.properties}`}>
            <div className={styles.title} style={{marginTop: -13, transform: 'translateX(-3px)'}}>PROPRIÉTÉS
            </div>
            <div className={styles.informations} style={{marginTop: 29}}>
                <div className={styles.button + (propertyType === 'Stockage' ? ' ' + styles.selected : '')}
                     onClick={() => setPropertyType('Stockage')}>
                    <MediaCdn path={"assets/crew-management"} name={"storage.png"}
                              props={{className: styles.background}}/>
                    <p className={styles.title}>{(properties ?? []).length}</p>
                    <p className={styles.subtitle}>Propriétées</p>
                </div>
                <div className={styles.button + (propertyType === 'Garage' ? ' ' + styles.selected : '')}
                     onClick={() => setPropertyType('Garage')}>
                    <MediaCdn path={"assets/crew-management"} name={"vehicle.png"}
                              props={{className: styles.background}}/>
                    <p className={styles.title}>{(vehs ?? []).length}</p>
                    <p className={styles.subtitle}>Véhicules</p>
                </div>
                {type === "crew" && (
                    <div className={styles.button + (propertyType === 'Territories' ? ' ' + styles.selected : '')}
                         onClick={() => setPropertyType('Territories')}>
                        <p className={styles.title}>{territories.length}</p>
                        <p className={styles.subtitle}>Territoires</p>
                    </div>
                )}
            </div>
            {
                propertyType === "Stockage" && (
                    <>
                        <div className={styles.label} style={{marginTop: 25}}>Garage</div>
                        <div className={styles.buttonList}>
                            {
                                properties.filter((p) => p.type == "Garage").map((property) => (
                                    <div
                                        key={property.id}
                                        className={styles.buttonElement}
                                    >
                                        <img src={getCdnUrl("assets/interacts", "Dynasty.svg")} alt=""/>
                                        <span>{property.maxPlaces} Places - {property.address}</span>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={styles.label} style={{marginTop: 25}}>Stockage</div>
                        <div className={styles.buttonList}>
                            {
                                properties.filter((p) => p.type == "Stockage").map((property) => (
                                    <div
                                        key={property.id}
                                        className={styles.buttonElement}
                                    >
                                        <img src={getCdnUrl("assets/interacts", "Stockage.svg")}
                                             alt=""/>
                                        <span>{property.address}</span>
                                    </div>
                                ))
                            }
                        </div>
                        {
                            type == 'crew' && (
                                <>
                                    <div className={styles.label} style={{marginTop: 25}}>Laboratoires</div>
                                    <div className={styles.buttonList}>
                                        {
                                            properties.filter((p) => p.type == "Laboratoire").map((property) => (
                                                <div
                                                    key={property.id}
                                                    className={styles.buttonElement}
                                                >
                                                    <img src={getCdnUrl("assets/interacts", "Stockage.svg")}
                                                         alt=""/>
                                                    <span>{property.address}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </>
                            )
                        }
                    </>
                )
            }
            {
                propertyType === "Garage" && (
                    <>
                        <div className={styles.label} style={{marginTop: 25}}>Vehicule</div>
                        <div className={styles.buttonList}>
                            {
                                vehs.map((veh) => (
                                    <div
                                        key={veh.plate}
                                        className={styles.buttonElement}
                                    >
                                        <img src={getCdnUrl("assets/interacts", "Dynasty.svg")} alt=""/>
                                        <span>{veh.vehName} - {veh.plate}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                )
            }
            {
                type === "crew" && propertyType === "Territories" && (
                    <>
                        <div className={styles.label} style={{marginTop: 25}}>Vehicule</div>
                        <div className={styles.buttonList}>
                            {
                                territories.map((terr) => (
                                    <div
                                        key={terr}
                                        className={styles.buttonElement}
                                    >
                                        <img src={getCdnUrl("assets/interacts", "Dynasty.svg")} alt=""/>
                                        <span>{terr}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default PropertyContainer;