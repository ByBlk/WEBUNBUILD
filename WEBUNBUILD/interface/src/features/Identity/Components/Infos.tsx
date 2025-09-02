import React from "react";

export interface InfosProps {
    type: string;
    name: string;
}

const Infos: React.FC<InfosProps> = ({ type, name }) => {
    return (
        <div className="infos-container">
            {type === "ppa" && (
                <div>
                    <div className="infos-group">
                        <p className="label-info">Name of license</p>
                        <p className="">{name}</p>
                    </div>
                </div>
            )}
            {type === "driver" && (
                <div>
                    <div>
                        <p className="label-info">Name of license</p>
                        <p className="">{name}</p>
                    </div>
                </div>
            )}
            {type === "identity" && (
                <div>
                    <div>
                        <p className="label-info">Name of license</p>
                        <p className="">{name}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Infos;