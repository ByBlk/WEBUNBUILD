import "./style.scss";
import React, { useMemo, useState } from "react";
import { useNuiEvent } from "@hooks/nuiEvent";
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { ActivityCreationData } from "./types";
import { ACTIVITY_CREATION_DATA } from "./staticData";
import { fetchNui } from "@hooks/fetchNui";
import { useEscapeKey } from "@hooks/useKeys";

const activityCreationMenu: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('');
    const [motto, setMotto] = useState('');
    const [color, setColor] = useState(1);
    const [place, setPlace] = useState(1);
    const [activity, setActivity] = useState(1);
    const [data, setData] = useState<ActivityCreationData | undefined>(undefined);
    const [colorOffset, setColorOffset] = useState(0);

    useNuiEvent<boolean>('nui:activity-creation:visible', (status) => {
        setVisible(status);
    });

    useNuiEvent<ActivityCreationData>('nui:activity-creation:data', (data) => {
        setData(data);
    });

    const buildData = useMemo(() => {
        if (!data) return undefined;
        return ACTIVITY_CREATION_DATA[data.type]
    }, [data]);

    useEscapeKey(() => {
        fetchNui('nui:activity-creation:close');
    }, visible, 'keydown');

    return (
        <>
            {visible && buildData && <div className="activityCreationMenu" style={{ '--menuColor': buildData.menuColor } as React.CSSProperties}>
                <div className="activityName" style={{
                    background: `linear-gradient(to left, ${buildData?.colorList[color - 1]}86 0%, rgba(10, 10, 10, 0.16) 78%, rgba(19, 19, 19, 0) 100%)`
                }}>
                    {buildData?.activityList[activity - 1]?.diminutif} <b>{name}</b>
                </div>
                <div className="container">
                    <div className="headerImage">
                        <MediaCdn path={"assets/crew-creation"} name={buildData.headerImage} />
                    </div>
                    <div className="subTitle">{buildData.subTitle}</div>

                    <div className="subContainer">
                        <div className="title">INFORMATIONS</div>

                        <div className="label" style={{ marginTop: 41 }}>Nom</div>
                        <input value={name} onChange={(e) => setName(e.currentTarget.value)} />

                        <div className="label" style={{ marginTop: 20 }}>Devise</div>
                        <input value={motto} onChange={(e) => setMotto(e.currentTarget.value)} />

                        <div className="label" style={{ marginTop: 23 }}>Couleurs</div>
                        <div className="colorPick" onWheel={(ev) => {
                            if (ev?.deltaY < 0) {
                                if (colorOffset < 0) setColorOffset(colorOffset + 25);
                            }
                            if (ev?.deltaY > 0) {
                                if (colorOffset > 25 * buildData.colorList.length * -1 + 25 * 17) setColorOffset(colorOffset - 25);
                            }
                        }}>
                            {buildData.colorList.map((c, i) => (
                                <div
                                    key={'color' + i}
                                    className={["color", color === i + 1 ? 'selected' : ''].join(' ')}
                                    onClick={() => setColor(i + 1)}
                                    style={{
                                        background: `linear-gradient(180deg, ${c}FF  0%, ${c}66 100%)`,
                                        transform: `translateX(${colorOffset}px)`,
                                    }}><div style={{
                                        background: `linear-gradient(180deg, ${c}FF  0%, ${c}66 100%)`,
                                    }}></div></div>
                            ))}
                        </div>
                        <div className="label" style={{ marginTop: 42 }}>{buildData.activityLabel}</div>
                        <div className="buttonList">
                            {buildData.activityList.map((a, i) => (
                                <div
                                    key={'activity' + i}
                                    className={["buttonElement", activity === i + 1 ? 'selected' : ''].join(' ')}
                                    onClick={() => setActivity(i + 1)}
                                >{a.name}</div>
                            ))}
                        </div>
                        <div className="label" style={{ marginTop: 34 }}>Emplacement</div>
                        <div className="buttonList">
                            {buildData.places.map((p, i) => (
                                <div
                                    key={'place' + i}
                                    className={["buttonElement", place === i + 1 ? 'selected' : ''].join(' ')}
                                    onClick={() => setPlace(i + 1)}
                                >{p.name}</div>
                            ))}
                        </div>
                        <div className="submit" onClick={() => {
                            if (name === '' || motto === '') return;
                            fetchNui('nui:activity-creation:submit', {
                                type: data?.type,
                                name,
                                motto,
                                color,
                                place,
                                activity: buildData.activityList[activity - 1].diminutif
                            })
                        }}>Soumettre</div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default activityCreationMenu;
