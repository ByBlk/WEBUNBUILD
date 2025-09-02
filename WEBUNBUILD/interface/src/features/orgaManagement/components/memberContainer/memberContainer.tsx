import styles from "./memberContainer.module.scss";
import {useEffect, useState} from "react";
import {getCdnUrl} from "@/utils";
import {IDataMembers, Information, IPlayer} from "../../orga.type";
import {fetchNui} from "@/hook";


type Props = {
    type: "crew" | "company" | "faction",
    membersReceived: IDataMembers[]
    handleChangeGrade: (member: IPlayer, up: boolean) => void;
    actionMessage: string | null;
    selectedMember: { Information: Information } | null
    setSelectedMember: (member: { Information: Information } | null) => void;
    setSelectedName: (name: string | null) => void;
};

const filtreMembers = {
    crew: [
        {label: 'Hiérarchie', id: 'hierarchy'},
        {label: 'Influence', id: 'influence'},
        {label: 'Activité', id: 'activity'},
    ],
    faction: [
        {label: 'Hiérarchie', id: 'hierarchy'},
        {label: 'Activité', id: 'activity'},
    ],
    company: [
        {label: 'Hiérarchie', id: 'hierarchy'},
        {label: 'Activité', id: 'activity'},
    ]
};

export const RANK_LABEL_CREW = [
    '',
    'Recrues',
    'Membres',
    'Gradés',
    'Co-Lead',
    'Lead'
];


export const RANK_LABEL_COMPANY = [
    '',
    'Stagiaire',
    'Salarié',
    'DRH',
    'CO-PDG',
    'PDG'
]

export const RANK_LABEL_FACTION = [
    '',
    'Rookie',
    'Officer',
    'Supervisor',
    'Command Staff',
    'Chief Office'
]

export const ACTIVITY_LABEL_CREW = [
    '',
    'Heures de jeu',
]

export const XP_LABEL = [
    '',
    'xp',
]

const MemberContainer = ({
                             type,
                             membersReceived,
                             handleChangeGrade,
                             actionMessage,
                             setSelectedMember,
                             selectedMember,
                             setSelectedName
                         }: Props) => {
        const [memberData, setMemberData] = useState(false);
        const [memberSorting, setMemberSorting] = useState<string>('hierarchy')


        useEffect(() => {
            if (!selectedMember) {
                setMemberData(false);
            }
        }, [selectedMember]);

        const handleMemberClick = (member: IPlayer | IPlayer[]) => {
            const selected = Array.isArray(member) ? member[0] : member;
            if (selected && selected?.Information) {
                setSelectedMember(selected);
                setSelectedName(selected.fname + " " + selected.lname);
                setMemberData(true);
                fetchNui('nui:orgaManagement:requestMemberCam', {
                    identifier: selected.identifier,
                })
            } else {
                console.error("Invalid member data:", selected);
            }
        };

        const setSelectedMemberByName = (fname: string, lname: string) => {
            const membersData = membersReceived as any as IPlayer[];
            const selected = membersData.find((p) => p.fname === fname && p.lname === lname) as IPlayer;
            if (selected) {
                setSelectedMember(selected);
                setMemberData(true);
                setSelectedName(selected.fname + " " + selected.lname);
                fetchNui('nui:orgaManagement:requestMemberCam', {
                    identifier: selected.identifier,
                })
            }
        };
        return (
            <div className={`${styles.subContainer} ${styles.members}`}>
                <div className={styles.title} style={{
                    marginTop: -13,
                    transform: 'translateX(-3px)',
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}>
                    {selectedMember && (
                        <img
                            onClick={() => {
                                setSelectedMember(null);
                                setMemberData(false);
                                setSelectedName(null);
                                fetchNui('nui:orgaManagement:requestMemberCam', {
                                    identifier: null,
                                })

                            }}
                            style={{transform: "scaleX(-1)"}}
                            src={getCdnUrl("assets/xmenu/icon", "chevron.svg")}
                            alt="Retour"
                        />
                    )}
                    MEMBRES
                </div>

                {!memberData && (
                    <>
                        <div className={styles.sorting}>
                            {filtreMembers[type]?.map(e => (
                                <div
                                    key={`sorting-${e.id}`}
                                    className={`${styles.buttonElement} ${memberSorting === e.id ? styles.selected : ''}`}
                                    onClick={() => setMemberSorting(e.id)}
                                >
                                    {e.label}
                                </div>
                            ))}
                        </div>

                        {memberSorting === "hierarchy" && (
                            [5, 4, 3, 2, 1].map((typeFind) => (
                                <div key={`hierarchy-${typeFind}`}>
                                    <div className={styles.label} style={{marginTop: 25}}>
                                        {type == "crew" && RANK_LABEL_CREW[typeFind]}
                                        {type == "company" && RANK_LABEL_COMPANY[typeFind]}
                                        {type == "faction" && RANK_LABEL_FACTION[typeFind]}
                                    </div>
                                    <div className={styles.buttonList} style={{margin: '0 0 -1vh'}}>
                                        {((membersReceived as any as IPlayer[]) ?? []).filter((e) => e.rank === typeFind).map((p, i) => (
                                            <div
                                                key={`member-${typeFind}-${i}`}
                                                className={styles.buttonElement}
                                                onClick={() => handleMemberClick(p)}
                                            >
                                                {p.fname} {p.lname}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}

                        {memberSorting === "influence" && type === "crew" && (
                            <div key="influence-section">
                                <div className={styles.label} style={{marginTop: 25}}>
                                    {XP_LABEL?.[1] ?? 'Influence'}
                                </div>
                                <div className={styles.buttonList}>
                                    {membersReceived.map((p, i) => (
                                        <div
                                            key={`influence-${i}`}
                                            className={styles.buttonElementRight}
                                            onClick={() => setSelectedMemberByName(p.fname, p.lname)}
                                        >
                                            <span>{p.fname} {p.lname}</span>
                                            <div className={styles.textToRight}>
                                                <span>{p.xp}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {
                            memberSorting === "activity" && type === "crew" && (
                                <>
                                    {[1].map((type) => (
                                        <div key={type + 'type'}>
                                            <div className={styles.label} style={{marginTop: 25}}>
                                                {ACTIVITY_LABEL_CREW?.[type] ?? type}
                                            </div>
                                            <div className={styles.buttonList}>
                                                {(membersReceived as any as IDataMembers[]).sort((a, b) => b.time - a.time).map((p, i) => (
                                                    <div
                                                        key={type + 'place' + i}
                                                        className={styles.buttonElementRight}
                                                        onClick={() => setSelectedMemberByName(p.fname, p.lname)}
                                                    >
                                                        <span>{p.fname} {p.lname}</span>
                                                        <div className={styles.textToRight}>
                                                            <span>{p.PlayTime}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )
                        }
                    </>
                )
                }
                {memberData && selectedMember && (
                    <div className={styles.SubContainerMembers}>
                        <div className={styles.SubContainerMembersData}>
                            <div className={styles.Main}>
                                {selectedMember.Information.roles}
                                <div className={styles.mugshot}>
                                    <img src={selectedMember.Information.mugshot} alt=""/>
                                </div>
                            </div>
                            <div className={styles.infosBlock}>
                                <div className={styles.infoBlock}>
                                    <div className={styles.label}>Roles</div>
                                    <span>{selectedMember.Information.roles}</span>
                                </div>

                                <div className={styles.infoBlock}>
                                    <div className={styles.label}>Ancienneté</div>
                                    <span>{selectedMember.Information.seniority}</span>
                                </div>

                                <div className={styles.infoBlock}>
                                    <div className={styles.label}>Spécialité</div>
                                    <span>{selectedMember.Information.speciality || "Farmer"}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.containerInfoData}>
                            <div className={styles.containerInfoDataTop}>
                                <div className={styles.label} style={{marginTop: 25}}>
                                    Total
                                </div>
                                <div className={styles.containerInfoDataInfo} style={{margin: '0 0 -1vh'}}>
                                    {(selectedMember.Information.classements ?? []).filter((e) => e.type === "total").map((c) => (
                                        <div
                                            key={c.label + c.classement}
                                            className={styles.containerInfoDataInfoElement}
                                        >
                                            <p>{c.classement}</p>
                                            <p>{c.label}</p>
                                            <p>{c.score}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.containerInfoDataMiddle}>
                                <div className={styles.label} style={{marginTop: 25}}>
                                    Activités
                                </div>
                                <div className={styles.containerInfoDataInfo} style={{margin: '0 0 -1vh'}}>
                                    {(selectedMember.Information.classements ?? []).filter((e) => e.type === "activity").map((c) => (
                                        <div
                                            key={c.label + c.classement}
                                            className={styles.containerInfoDataInfoElement}
                                        >
                                            <p>{c.classement}</p>
                                            <p>{c.label}</p>
                                            <p>{c.score}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.containerInfoDataBottom}>
                                <div className={styles.label} style={{marginTop: 25}}>
                                    Status
                                </div>
                                <div>
                                                    <span
                                                        style={{background: selectedMember.Information.status ? "green" : "red"}}></span>
                                    <p>{selectedMember.Information.status ? "En ligne" : "Hors ligne"}</p>
                                </div>
                            </div>
                        </div>
                        {actionMessage && (<p style={{color: "white", fontFamily: "montserrat"}}>{actionMessage}</p>)}
                        <div className={styles.containerAction}>
                            <div className={styles.submit} onClick={() => {
                                handleChangeGrade(selectedMember as any, true);
                            }}>Promouvoir
                            </div>
                            <div className={styles.submit} onClick={() => {
                                handleChangeGrade(selectedMember as any, false);
                            }}>Rétrograder
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
            ;
    }
;

export default MemberContainer;