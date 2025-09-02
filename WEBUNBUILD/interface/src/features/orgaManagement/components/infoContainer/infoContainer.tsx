import styles from "./infoContainer.module.scss"
import {orgaInfo} from "@/features/orgaManagement/orga.type.ts";
import React from "react";
import {fetchNui} from "@/hook";

type Props = {
    infos: orgaInfo[],
    percentage?: number | null,
    name: string,
    devise: string,
    colorsList: string[],
    color: number,
    setColor: React.Dispatch<React.SetStateAction<number>>
    type?: "crew" | "faction" | "company",

}

const EMPLACEMENT = [
    {name: "Blaine County"},
    {name: "Los Santos"},
    {name: "Cayo Perico"},
]

const InfoContainer = ({infos, percentage, name, devise, colorsList, color, setColor, type}: Props) => {

    const [nameInput, setNameInput] = React.useState(name);
    const [deviseInput, setDeviseInput] = React.useState(devise);
    const [place, setPlace] = React.useState(1);
    const [colorOffset, setColorOffset] = React.useState(0);

    return (
        <div className={`${styles.subContainer} ${styles.info}`}>
            <div className={styles.title}
                 style={{marginTop: -13, transform: 'translateX(-3px)'}}>INFORMATIONS
            </div>

            <div className={styles.informations} style={{marginTop: 29}}>
                {
                    infos.map((info) => (
                        <div className={styles.button} key={info.label}>
                            <p className={styles.title}>{info.value}</p>
                            <p className={styles.subtitle}>{info.label}</p>
                        </div>
                    ))
                }
            </div>

            {
                type == "crew" && (
                    <>
                        <div className={styles.label} style={{marginTop: 35}}>Rang suivant</div>
                        <div className={styles.progressBar}>
                            <div className={styles.track} style={{width: percentage + '%'}}></div>
                        </div>
                    </>
                )
            }
            <div className={styles.label} style={{marginTop: 28}}>Nom</div>
            <input value={nameInput} onChange={(e) => setNameInput(e.currentTarget.value)}/>

            <div className={styles.label} style={{marginTop: 24}}>Devise</div>
            <input value={deviseInput} onChange={(e) => setDeviseInput(e.currentTarget.value)}/>

            <div className={styles.label} style={{marginTop: 40}}>Emplacement</div>
            <div className={styles.buttonList}>
                {EMPLACEMENT.map((p, i) => (
                    <div
                        key={'place' + i}
                        className={`${styles.buttonElement} ${place == i + 1 ? styles.selected : ""}`}
                        onClick={() => setPlace(i + 1)}
                    >{p.name}</div>
                ))}
            </div>
            <div className={styles.label} style={{marginTop: 28}}>Couleurs</div>
            <div className={styles.colorPick} onWheel={(ev) => {
                if (ev?.deltaY < 0) {
                    if (colorOffset < 0) setColorOffset(colorOffset + 25);
                }
                if (ev?.deltaY > 0) {
                    if (colorOffset > 25 * colorsList.length * -1 + 25 * 17) setColorOffset(colorOffset - 25);
                }
            }}>
                {
                    colorsList.map((c, i) => (
                        <div
                            key={'color' + i}
                            className={`${styles.color} ${color === i ? styles.selected : ''}`}
                            onClick={() => setColor(i)}
                            style={{
                                background: `linear-gradient(180deg, ${c}FF 0%, ${c}66 100%)`,
                                transform: `translateX(${colorOffset}px)`,
                            }}
                        >
                            <div
                                style={{
                                    background: `linear-gradient(180deg, ${c}FF 0%, ${c}66 100%)`,
                                }}
                            ></div>
                        </div>

                    ))
                }
            </div>


            <div className={styles.submit} style={{marginTop: 65}} onClick={() => {
                if (name === "" || devise === "") return
                fetchNui('nui:orgaManagement:submit', {
                    type: type,
                    name: nameInput,
                    devise: deviseInput,
                    color,
                    place,
                })
                fetchNui('nui:orgaManagement:close');
            }}>
                Sauvegarder
            </div>

        </div>
    );
};

export default InfoContainer;