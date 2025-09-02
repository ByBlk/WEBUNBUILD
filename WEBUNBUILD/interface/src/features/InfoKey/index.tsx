import './index.scss';
import React, { useState } from "react";
import { useNuiEvent } from "@/hook";
import { InfoKeyProp } from './types'
import { getCdnUrl } from "@/utils/misc";

const SpecialKey = [
    "leftclick",
    "enter",
];

const InfoKey: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState<InfoKeyProp[]>([]);

    useNuiEvent('nui:infokey:visible', (status: boolean) => {
        setVisible(status);
    });

    useNuiEvent('nui:infokey:data', (data: InfoKeyProp[]) => {
        setData(data);
    });

    return (
        <div className="infokey-container" style={{opacity: visible ? 1 : 0}}>
            {data.map((item, index) => (
                <div key={index} className="item">
                    {SpecialKey.includes(item.key) ? (
                        <img src={getCdnUrl('assets/icons', item.key + '.webp')} alt="" />
                    ) : (
                        <div className="key">
                            <h1>{item.key}</h1>
                        </div>
                    )}
                    <div className="desc">{item.desc}</div>
                </div>
            ))}
        </div>
    );
}

export default InfoKey;