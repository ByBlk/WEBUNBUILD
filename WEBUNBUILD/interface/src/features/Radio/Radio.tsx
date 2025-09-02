import "./radio.scss";

import React, { useMemo, useState } from "react";
import {fetchNui, useNuiEvent} from "@/hook";
import {IRadio} from "@/features/Radio/types.ts";

const Radio = () => {
	const audioOn = useMemo(() => new Audio("https://cdn.eltrane.cloud/3838384859/old_a_trier/radio/on.ogg"), []);
	const audioOff = useMemo(() => new Audio("https://cdn.eltrane.cloud/3838384859/old_a_trier/radio/off.ogg"), []);
	const [visible, setVisible] = useState(false);
	const [data, setData] = useState<IRadio | null>(null);

	console.log("Radio data", data);

	useNuiEvent("nui:radio:visible", (status: boolean) => {
		setVisible(status);
	})

	useNuiEvent("nui:radio:data", (data: IRadio) => {
		setData(data);
	})

	const updateFrequence = (action: string) => {
		fetchNui("radio__callback", {
			action: "updateFrequence",
			args: action,
		});
	};

	const buttonAction = (action: string, data: any) => {
		fetchNui("radio__callback", {
			action: action,
			args: data,
		});
	};

	const toggleRadio = async () => {
		try {
			const newState = await fetchNui("radio__callback", {
				action: "toggle",
			})

			if (newState) {
				audioOn.play();
			} else {
				audioOff.play();
			}

		} catch (error) {
			console.error(error);
		}
	};

	const onMessage = React.useCallback(
		(event: any) => {
			if (event.data.type == "updateFrequence") setData(event.data.frequence);
			if (event.data.type == "audioOn") audioOn.play();
			if (event.data.type == "audioOff") audioOff.play();
		},
		[audioOn, audioOff],
	);

	React.useEffect(() => {
		window.addEventListener("message", onMessage);
		return () => window.removeEventListener("message", onMessage);
	}, [onMessage]);

	return visible ? (
		<div id="radio">
			<img style={{ height: 695 }} src={"https://cdn.eltrane.cloud/3838384859/old_a_trier/radio/radio@2x.webp"} />

			<div className="display">
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
					}}>
					<img
						style={{
							height: 16.5,
						}}
						src={"https://cdn.eltrane.cloud/3838384859/old_a_trier/radio/latence@2x.webp"}
					/>

					<div
						style={{
							display: "flex",
							flexDirection: "column",
						}}>
						<img src={"https://cdn.eltrane.cloud/3838384859/old_a_trier/radio/rx@2x.webp"} style={{ height: 9, marginBottom: 4 }} />
						<img src={"https://cdn.eltrane.cloud/3838384859/old_a_trier/radio/tx@2x.webp"} style={{ height: 9 }} />
					</div>
				</div>

				<div
					style={{
						display: "flex",
						marginTop: 37.5,
						marginLeft: 10,
						justifyContent: "end",
					}}>
					<img
						src={"https://cdn.eltrane.cloud/3838384859/old_a_trier/radio/ch@2x.webp"}
						style={{ height: 15, marginTop: 9, marginRight: 3 }}
					/>

					<p
						style={{
							fontFamily: "DigialNumbers",
							font: "normal normal bold 28px/18px DigialNumbers",
							letterSpacing: "-2.9px",
							margin: 0,
							color: "#4B5430",
							zIndex: 0,
						}}>
						{data?.frequence ? data?.frequence.toString() : ""}
					</p>
				</div>

				<div className="buttons">
					<img
						onClick={() => updateFrequence("add")}
						src={"https://cdn.eltrane.cloud/3838384859/old_a_trier/radio/f@2x.webp"}
						style={{ margin: "0 3px", height: 35 }}
					/>
					<img
						onClick={toggleRadio}
						src={"https://cdn.eltrane.cloud/3838384859/old_a_trier/radio/OFF@2x.webp"}
						style={{ margin: "0 3px", height: 37.5 }}
					/>
					<img
						onClick={() => updateFrequence("remove")}
						src={"https://cdn.eltrane.cloud/3838384859/old_a_trier/radio/e@2x.webp"}
						style={{ margin: "0 3px", height: 35 }}
					/>
				</div>

				<div className="buttons" style={{ marginTop: 78 }}>
					<img
						onClick={() => buttonAction("mute", {})}
						src={"https://cdn.eltrane.cloud/3838384859/old_a_trier/radio/VOLUME@2x.webp"}
						style={{ margin: "0 3px", height: 25 }}
					/>
					<img
						onClick={() => buttonAction("soundup", {})}
						src={"https://cdn.eltrane.cloud/3838384859/old_a_trier/radio/+@2x.webp"}
						style={{ margin: "0 3px", height: 25 }}
					/>
					<img
						onClick={() => buttonAction("sounddown", {})}
						src={"https://cdn.eltrane.cloud/3838384859/old_a_trier/radio/-@2x.webp"}
						style={{ margin: "0 3px", height: 25 }}
					/>
				</div>

				<div className="buttons" style={{ marginTop: 107 }}>
					<img
						onClick={() => buttonAction("man", {})}
						src={"https://cdn.eltrane.cloud/3838384859/old_a_trier/radio/MAN@2x.webp"}
						style={{ margin: "0 3px", height: 25 }}
					/>
					<img
						onClick={() => buttonAction("check", {})}
						src={"https://cdn.eltrane.cloud/3838384859/old_a_trier/radio/CHECK@2x.webp"}
						style={{ margin: "0 3px", height: 25 }}
					/>
				</div>
			</div>
		</div>
	) : null;
};

export default Radio;
