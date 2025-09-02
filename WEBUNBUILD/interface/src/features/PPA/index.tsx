import "./style.scss";

import React from "react";
import {useNuiEvent} from "@/hook";
import useFitText from "@/utils/useFitText";

function getRandomStringOrIDontKnow(length: number, characters: string) {
	let result = "";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

const PPA: React.FC = () => {
	const [visible, setVisible] = React.useState(false);
	const [data, setData] = React.useState({ name: "", residence: "", address: "", occupation: "", business: "", photo: "", issuer: "" });

	useNuiEvent('nui:ppa:visible', (status: boolean) => {
		setVisible(status);
	});

	useNuiEvent('nui:ppa:setData', (value: never) => {
		setData(value);
	});

	const ori = getRandomStringOrIDontKnow(7, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
	const cii = getRandomStringOrIDontKnow(10, "0123456789");

	const { fontSize: fontSizeSign, textRef: signRef } = useFitText(20, 134);
	const { fontSize: fontSizeSign2, textRef: signRef2 } = useFitText(20, 113);

	return visible ? (
		<div className="PPA">
			<img src={"https://cdn.eltrane.cloud/3838384859/PPA/background.webp"} className="Background" />
			<div className="item-container">
				<div className="item">{data.name}</div>
				<div className="item">{data.residence}</div>
				<div className="item">{data.address}</div>
				<div className="item">{data.occupation}</div>
				<div className="item">{data.business}</div>
			</div>
			<div className="inline-item ori">{ori}</div>
			<div className="inline-item cii">{cii}</div>
			<div
				className="signature"
				style={{
					fontSize: `${fontSizeSign}px`,
					whiteSpace: "nowrap",
					width: "134px",
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}
				ref={signRef}>
				{data.name.replace(/\s/g, "")}
			</div>
			<div
				className="issuer"
				style={{
					fontSize: `${fontSizeSign2}px`,
					whiteSpace: "nowrap",
					width: "113px",
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}
				ref={signRef2}>
				{data.issuer.replace(/\s/g, "")}
			</div>
			<div
				className="photo "
				style={{
					backgroundImage: `url('${data.photo}')`,
				}}></div>
		</div>
	): null;
};

export default PPA;
