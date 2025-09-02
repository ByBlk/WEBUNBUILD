import "./style.scss";
import React, { useEffect, useState } from "react";
import Button from "../../components/button/button";
import { fetchNui } from "@hooks/fetchNui";
import {useNuiEvent} from "@/hook";
import MediaCdn from "@/components/mediaCdn/mediaCdn.tsx";
import {useEscapeKey} from "@hooks/useKeys.tsx";

type WeazelNewsButton = {
	type: "info" | "music" | "price" | "interact" | "pos" | "time" | "default";
	text: string;
};

type IWeazelNewsData =  {
	job: string;
}

const CreateWeazelNews: React.FC = () => {

	const [data, setData] = useState<IWeazelNewsData | null>(null);

	const [type, setType] = useState<"news" | "media" | "fame" | "music" | "lifeinvader">("news");
	const [media, setMedia] = useState<"image" | "video">("image");
	const [media_url, setMediaUrl] = useState("");

	const [buttonOne, setButtonOne] = useState<WeazelNewsButton>({ type: "default", text: "" });
	const [buttonTwo, setButtonTwo] = useState<WeazelNewsButton>({ type: "default", text: "" });

	const [timeInput, setTimeInput] = useState("");
	const [programmations, setProgrammations] = useState<number[]>([]);
	const [visible, setVisible] = useState(false);

	useNuiEvent('nui:weazelNewsAnnouncement:visible', (status: boolean) => {
		setVisible(status);
	})

	useNuiEvent('nui:weazelNewsAnnouncement:data', (data: IWeazelNewsData) => {
		setData(data);
	});

	const handleClose = () => {
		fetchNui('nui:closeWeazelNewsAnnouncement');
	}

	useEscapeKey(() => {
		handleClose();
	}, visible)

	const isUrlAlive = (url: string) => {
		const urlRegex = new RegExp(/^(http|https):\/\/[^ "]+$/);
		if (!urlRegex.test(url)) {
			console.error("Invalid URL");
			return false;
		}

		return true;
	};

	const publish = async () => {
		if (!media_url) {
			console.error("Invalid media URL");
			return;
		}

		try {
			const isUrlActive = await isUrlAlive(media_url);

			if (!isUrlActive) {
				throw new Error("Invalid media URL");
			}

			const buttons = [buttonOne, buttonTwo].filter(button => button.type !== "default");
			fetchNui(data?.job === "weazelnews" ? "CreateWeazelNews" : "CreateLifeInvader", {
				type,
				media,
				media_url,
				buttons,
				programmations,
			});
		} catch (err) {
			console.error("Failed to preload media", err);
		}
	};

	const addProgrammation = () => {
		if (programmations.length >= 5) {
			console.error("Max 5 programmations");
			return;
		}

		const timeParts = timeInput.split(":");
		if (timeParts.length === 2) {
			const hours = parseInt(timeParts[0]);
			const minutes = parseInt(timeParts[1]);
			if (!isNaN(hours) && !isNaN(minutes)) {
				const date = new Date();
				date.setHours(hours, minutes, 0, 0);
				const timestamp = date.getTime();

				if (!programmations.includes(timestamp)) {
					setProgrammations(prev => [...prev, timestamp].sort((a, b) => a - b));
					setTimeInput("");
				} else {
					console.error("Programmation for this time already exists.");
				}
			} else {
				console.error("Invalid time format.");
			}
		}
	};

	const removeProgrammation = (timestamp: number) => {
		setProgrammations(prev => prev.filter(p => p !== timestamp));
	};

	useEffect(() => {
		if (data?.job === "weazelnews") {
			setType("news");
		} else {
			setType("lifeinvader");
		}
	}, [data?.job]);

	useEffect(() => {
		const buttons = [buttonOne, buttonTwo].filter(button => button.type !== "default");
		fetchNui(data?.job === "weazelnews" ? "PreviewWeazelNews" : "PreviewLifeInvader", {
			type,
			media,
			media_url,
			buttons,
		});
	}, [type, media_url, buttonOne, buttonTwo, data?.job, media]);


	const setAnnounceMedia = (url: string) => {
		if (url.includes(".mp4")) {
			setMedia("video");
		} else {
			setMedia("image");
		}

		setMediaUrl(url);
	};

	return visible ? (
		<div className="CreateWeazelNewsFA">
			<MediaCdn path={"assets/catalogues/headers"} name={`${type}.webp`} />
			<div className="container">
				<div
					className="span"
					style={{
						marginTop: 20,
					}}>
					TYPE DE L'ANNONCE
				</div>
				<div
					style={{
						marginTop: 10,
						display: "flex",
						gap: 13,
					}}>
					{data?.job === "weazelnews" ? (
						<>
							<Button
								label={"NEWS"}
								callback={() => setType("news")}
								color={"darkred"}
								disabled={false}
								width={100}
								height={25}
								fontSize={12}
								fontWeight={700}
							/>
							<Button
								label={"MEDIA"}
								callback={() => setType("media")}
								color={"blue"}
								disabled={false}
								width={100}
								height={25}
								fontSize={12}
								fontWeight={700}
							/>
							<Button
								label={"FAME"}
								callback={() => setType("fame")}
								color={"black"}
								disabled={false}
								width={100}
								height={25}
								fontSize={12}
								fontWeight={700}
							/>
							<Button
								label={"MUSIC"}
								callback={() => setType("music")}
								color={"yellow"}
								disabled={false}
								width={100}
								height={25}
								fontSize={12}
								fontWeight={700}
							/>
						</>
					) : (
						<Button
							label={"LIFE INVADER"}
							callback={() => setType("lifeinvader")}
							color={"red"}
							disabled={false}
							width={100}
							height={25}
							fontSize={12}
							fontWeight={700}
						/>
					)}
				</div>
				<div
					className="span"
					style={{
						marginTop: 20,
					}}>
					URL MEDIA ANNONCE
					<div className="info">400 x 360</div>
				</div>
				<input
					type="text"
					style={{ marginTop: 10 }}
					value={media_url}
					onChange={e => {
						setAnnounceMedia(e.target.value);
					}}></input>

				<div
					className="span"
					style={{
						marginTop: 20,
					}}>
					AJOUTER DES BOUTONS (MAX 2)
				</div>
				<div className="buttons-selection">
					<div className="button">
						<select onChange={e => setButtonOne({ ...buttonOne, type: e.target.value as any })}>
							<option value="default">Désactivé</option>
							<option value="info">Info</option>
							<option value="music">Musique</option>
							<option value="price">Prix</option>
							<option value="interact">Interaction (E)</option>
							<option value="pos">Position</option>
							<option value="time">Data/Heure</option>
						</select>
						<input
							type="text"
							placeholder="Texte (max 20 caractères)"
							onChange={e => {
								if (e.target.value.length > 20) return;
								setButtonOne({ ...buttonOne, text: e.target.value });
							}}
							disabled={buttonOne.type === "default"}></input>
					</div>
					<div className="button">
						<select onChange={e => setButtonTwo({ ...buttonTwo, type: e.target.value as any })}>
							<option value="default">Désactivé</option>
							<option value="info">Info</option>
							<option value="music">Musique</option>
							<option value="price">Prix</option>
							<option value="interact">Interaction (E)</option>
							<option value="pos">Position</option>
							<option value="time">Data/Heure</option>
						</select>
						<input
							type="text"
							placeholder="Texte (max 20 caractères)"
							onChange={e => {
								if (e.target.value.length > 20) return;
								setButtonTwo({ ...buttonTwo, text: e.target.value });
							}}
							disabled={buttonTwo.type === "default"}></input>
					</div>
				</div>

				<div
					className="span"
					style={{
						marginTop: 20,
					}}>
					PROGRAMMER L'ANNONCE (MAX 5 PROGRAMMATIONS)
				</div>

				<div className="weazel-programmations">
					<div className="input">
						<input
							value={timeInput}
							onChange={e => setTimeInput(e.target.value)}
							placeholder="HH:MM"
							disabled={programmations.length >= 5}
						/>
						<button onClick={addProgrammation}>Ajouter</button>
					</div>

					<div className="programmations">
						{programmations.map((p, i) => (
							<div key={i} className="programmation">
								<div className="time">
									{new Date(p).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
										hour12: false,
									})}
								</div>
								<button onClick={() => removeProgrammation(p)}>Supprimer</button>
							</div>
						))}
					</div>
				</div>

				<div className="footer">
					<Button
						label={"ANNULER"}
						callback={() => handleClose()}
						color={"red"}
						width={220}
						height={30}
						fontSize={12}
						fontWeight={700}
						submitSound={true}
					/>
					<Button
						label={"PUBLIER"}
						callback={() => publish()}
						color={"green"}
						width={220}
						height={30}
						fontSize={12}
						fontWeight={700}
						submitSound={true}
					/>
				</div>
			</div>
		</div>
	) : null;
};

export default CreateWeazelNews;