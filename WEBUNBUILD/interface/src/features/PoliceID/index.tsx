import "./style.scss";

import React, {useState} from "react";
import useFitText from "../../hook/useFitText";
import IPoliceID from "@/features/PoliceID/types.ts";
import {fetchNui, useNuiEvent} from "@/hook";
import {useEscapeKey} from "@hooks/useKeys.tsx";

const PoliceID: React.FC = () => {
	const { fontSize: fontSizeName, textRef: fullNameRef } = useFitText(16, 175);
	const { fontSize: fontSizeSign, textRef: signRef } = useFitText(12, 98);
	const [data, setData] = useState<IPoliceID | null>(null);
	const [visible, setVisible] = useState(false);

	useNuiEvent('nui:PoliceID:visible', (status: boolean) => {
		setVisible(status);
	});

	useNuiEvent('nui:PoliceID:data', (data: IPoliceID) => {
		setData(data);
	})

	useEscapeKey(() => {
		handleClose()
	}, visible);

	const handleClose = () => {
		setVisible(false);
		fetchNui('nui:closePoliceID');
	}

	return visible ? (
		<div className="PoliceID">
			<img src={`https://cdn.eltrane.cloud/3838384859/old_a_trier/policebadge/${data?.service}-background.webp`} className="Background" />
			<div className="item-container">
				<div
					className="fullname"
					style={{
						fontSize: `${fontSizeName}px`,
						width: "175px",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "",
					}}
					ref={fullNameRef}>
					{data?.name}
				</div>
				<div className="matricule">{data?.matricule.padStart(3, "0")}</div>
				{/*{data?.service !== "usss" && (*/}
				{/*	<div className={"matricule-badge " + data?.service}>*/}
				{/*		<span>{data?.matricule.padStart(3, "0")[0]}</span>*/}
				{/*		<span>{data?.matricule.padStart(3, "0")[1]}</span>*/}
				{/*		<span>{data?.matricule.padStart(3, "0")[2]}</span>*/}
				{/*	</div>*/}
				{/*)}*/}
				<div className="grade">{data?.grade}</div>
				<div
					className="signature"
					style={{
						fontSize: `${fontSizeSign}px`,
						width: "98px",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
					ref={signRef}>
					{data?.name.replace(/\s/g, "").substring(0, 10)}
				</div>
				<div className={"divisions " + data?.service}>
					{"Assigned to the"} {data?.divisions}
				</div>
			</div>
			<div
				className={"photo " + data?.service}
				style={{
					backgroundImage: `url('${data?.photo}')`,
				}}></div>
		</div>
	) : null;
};

export default PoliceID;
