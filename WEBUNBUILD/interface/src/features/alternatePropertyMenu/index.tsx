import "./style.scss";
import "react-circular-progressbar/dist/styles.css";
import React, {useState} from "react";
import { AlternatePropertyMenuData } from "./types";
import { useNuiEvent } from "@hooks/nuiEvent";
import { fetchNui } from "@hooks/fetchNui";
import Button from "@/components/button/button";
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { useEscapeKey } from "@hooks/useKeys";

// TODO envoyer nui:alternate-property-menu:close au back
const alternatePropertyMenu: React.FC = () => {
	const [visible, setVisible] = useState(false);
	const [data, setData] = useState<AlternatePropertyMenuData | undefined>(undefined);

	const words = data?.name.split(' ');
	const lastWord = words?.pop();
	const zoneWord = words?.join(' ') + ' <b>' + lastWord + '</b>';


	useNuiEvent<boolean>('nui:alternate-property-menu:visible', (status) => {
		setVisible(status);
	});

	useNuiEvent<AlternatePropertyMenuData>('nui:alternate-property-menu:data', (data) => {
		setData(data);
	});


	useEscapeKey(() => {
		fetchNui('nui:alternate-property-menu:close');
	}, visible, 'keydown');

	return (<>
		{visible && data && <div>
			<div className="altPropertyMenu">
				<div className="mainContainer">
					<div className="ownerContainer">
						<div className="owner">
							<img src={data.playerFace} style={{ filter: `grayscale(${data.hideIdentity ? 1 : 0})`}} draggable={false} />
							{data.owner}
						</div>
						<div className="mailBox" onClick={() => fetchNui("nui:alternate-property-menu:button", {
							button: "addToBoite",
						})}>
							<MediaCdn path="assets/icons" name="add-circle.svg" />
							<div className="mailBoxLabel">Boîte aux lettres {data.boiteWeight === 3 && '(complète)'}</div>
						</div>
					</div>

					<div className="buttons">
						{!data.isLocked && <Button
							color="green"
							fontWeight={300}
							fontSize={18}
							label="Entrer"
							width={425}
							height={68}
							callback={() => fetchNui("nui:alternate-property-menu:button", { type: "entrer" })}
							margin={"10px auto"}
						/>}
						{data.isLocked && <Button
							color="yellow"
							fontWeight={300}
							fontSize={18}
							label="Sonner"
							width={425}
							height={68}
							callback={() => fetchNui("nui:alternate-property-menu:button", { type: "sonner" })}
							margin={"10px auto"}
						/>}
						{data.canPerqui && <Button
							color="red"
							fontWeight={300}
							fontSize={18}
							label="Perquisitionner"
							width={425}
							height={68}
							callback={() => fetchNui("nui:alternate-property-menu:button", { type: "perquisitionner" })}
							margin={"10px auto"}
						/>}
					</div>
				</div>
				<div className="adress" dangerouslySetInnerHTML={{ __html: zoneWord }}>
				</div>
			</div>
		</div>}
	</>
	);
};

export default alternatePropertyMenu;
