import styles from "./orgaManagement.module.scss"
import MediaCdn from "@/components/mediaCdn/mediaCdn.tsx";
import OrgaNavigation from "@/features/orgaManagement/components/navigation/orgaNavigation.tsx";
import {useState} from "react";
import InfoContainer from "@/features/orgaManagement/components/infoContainer/infoContainer.tsx";
import {fetchNui, useNuiEvent} from "@/hook";
import {IDataMembers, Information, IPlayer, OrgaManagementData} from "@/features/orgaManagement/orga.type.ts";
import {useEscapeKey} from "@hooks/useKeys.tsx";
import ManageContainer from "@/features/orgaManagement/components/manageContainer/manageContainer.tsx";
import MemberContainer from "@/features/orgaManagement/components/memberContainer/memberContainer.tsx";
import PropertyContainer from "@/features/orgaManagement/components/propertyContainer/propertyContainer.tsx";


const LABEL = {
    ["crew"] : "GANG",
    ["company"] : "ENTREPRISE",
    ["faction"] : "FACTION"
}

const OrgaManagement = () => {
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState<OrgaManagementData | null>(null)
    const [color, setColor] = useState(5)
    const [members, setMembers] = useState<IPlayer[]>([] as any as IPlayer[]);
    const [currentNavigation, setCurrentNavigation] = useState("info")
    const [actionMessage, setActionMessage] = useState<string | null>(null);
    const [selectedMember, setSelectedMember] = useState<{ Information: Information } | null>(null);
    const [selectedName, setSelectedName] = useState<string | null>(null);
    useNuiEvent<boolean>('nui:orgaManagement:visible', (status) => {
        setVisible(status)
    })

    const handleChangeGrade = (member: IPlayer, up: boolean) => {
        const identifier = member.identifier;

        fetchNui('nui:orgaManagement:UpdateRole', {
            type: data?.type,
            identifier: identifier,
            currentRole: member.Information.roles,
            up: up,
        }).then((res: any) => {
            if (res.status) {
                if (res.newRole === "nocrew" || res.newRole === "unemployed") {
                    setMembers((prev) => prev.filter((e) => e.identifier !== identifier));
                    setActionMessage(`Le membre a été exclu`);
                    setTimeout(() => {
                        setActionMessage(null)
                        setSelectedMember(null);
                        setSelectedName(null);

                        fetchNui('nui:orgaManagement:requestMemberCam', {
                            identifier: null,
                        })
                    }, 2000);
                    return;
                }

                const newRank = up
                    ? Math.min((member.rank ?? 1) + 1, 5)
                    : Math.max((member.rank ?? 1) - 1, 1);

                setMembers((prev) =>
                    prev.map((m) =>
                        m.identifier === identifier
                            ? {
                                ...m,
                                rank: newRank,
                                Information: {
                                    ...m.Information,
                                    roles: res.newRole,
                                },
                            }
                            : m
                    )
                );

                setSelectedMember((prev: any) => ({
                    ...prev,
                    Information: {
                        ...(prev?.Information || {}),
                        roles: res.newRole,
                    },
                }));

                setActionMessage(up ? "Le membre a été promu" : "Le membre a été rétrogradé");
                setTimeout(() => setActionMessage(null), 2000);
            } else {
                setActionMessage("Erreur lors de la modification du grade");
                setTimeout(() => setActionMessage(null), 2000);
            }
        });
    };

    useNuiEvent<OrgaManagementData>('nui:orgaManagement:data', (data) => {
        setData(data)
        const index = data.colorsList.findIndex(e => e === data.color);
        setColor((index ?? 0) + 1);
        setMembers(data.members as any as IPlayer[]);

    })

    useEscapeKey(() => {
        fetchNui('nui:orgaManagement:close');
        setSelectedMember(null);
        setSelectedName(null);
    }, visible, 'keydown');


    return (
        visible && data && <div className={styles.orgaManagementMenu} style={{'--menuColor': data.menuColor} as React.CSSProperties}>
            <div className={styles.activityName} style={{
                background: `linear-gradient(to left, ${data.colorsList[color]}86 0%, rgba(10, 10, 10, 0.16) 78%, rgba(19, 19, 19, 0) 100%)`
            }}>
                {
                    selectedName ? (<>{selectedName.split(" ")[0]} <b>{selectedName.split(" ")[1]}</b> </>) : (<>
                        {data.type == "crew" ? <>{data.crewType} <b>{data.label}</b></> : (<>{LABEL[data.type]} <b>{data.name}</b></>)}
                    </>)
                }
            </div>

            <div className={styles.container}>
                <div className={styles.headerImage}>
                    <MediaCdn path={"assets/crew-creation"} name={`${data.type}.png`} />
                </div>
                <OrgaNavigation currentNavigation={currentNavigation} setCurrentNavigation={setCurrentNavigation} />

                {currentNavigation == "info" &&   <InfoContainer name={data.name} infos={data.infos} colorsList={data.colorsList} color={color} setColor={setColor} devise={data.devise} percentage={data.type == "crew" ? data.nextRankPercent : null} type={data.type} />}
                {currentNavigation == "management" && <ManageContainer permissions={data.permissions} type={data.type} />}
                {currentNavigation == "members" && <MemberContainer type={data.type} membersReceived={members as any as IDataMembers[]} handleChangeGrade={handleChangeGrade} actionMessage={actionMessage} selectedMember={selectedMember} setSelectedMember={setSelectedMember} setSelectedName={setSelectedName} />}
                {currentNavigation == "properties" && <PropertyContainer properties={data.properties} vehs={data.vehs} territories={data.territories} type={data.type} />}
            </div>



        </div>
    );
};

export default OrgaManagement;