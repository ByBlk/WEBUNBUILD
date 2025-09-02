import "./style.scss";
import "react-circular-progressbar/dist/styles.css";
import React, { useEffect, useState } from "react";
import PlusSvg from "./plus.svg";
import UserSvg from "./user.svg";
import { JobParticipant, MenuJobData } from "./types";
import { useNuiEvent } from "@hooks/nuiEvent";
import { fetchNui } from "@hooks/fetchNui";
import { setArrayLength } from "@/components/menuBuilder";
import { playOnHoverSound } from "@utils/playSound";
import Button from "@/components/button/button";
import { useEscapeKey } from "@hooks/useKeys";

const JobMenu: React.FC = () => {
	const [selected, setSelected] = useState<number | null>(null);
	const [participants, setParticipants] = useState<JobParticipant[]>([]);
	const [visible, setVisible] = useState(false);
	const [data, setData] = useState<MenuJobData | undefined>(undefined);

	useNuiEvent<boolean>('nui:job:visible', (status) => {
		setVisible(status);
	});

	useNuiEvent<MenuJobData>('nui:job:data', (data) => {
		setData(data);
	});

	const getProfilePicture = (id: number) => {
		return fetch(`https://api-lifeinvader.visionrp.fr/public/profile-picture/FA/${id}`).then(res => {
			if (res.status === 200) return res.json();
			else return UserSvg;
		});
	};

	useEscapeKey(() => {
		fetchNui('nui:job-menu:close');
	}, visible, 'keydown');

	useEffect(() => {
		if (data && data.participants) {
			const participants = data.participants.map(async participant => {
				const profilePicture = participant.uniqueId ? await getProfilePicture(participant.uniqueId) : UserSvg;
				return { ...participant, profilePicture, hasProfilePicture: profilePicture !== UserSvg };
			});

			Promise.all(participants).then(participants => {
				setParticipants(participants);
			});
		}
	}, [data]);

	return (<>
		{visible && <div className="MenuJob">
			<img src={data?.headerBanner} className="Header" />
			<div className="Body">
				<div className="ChoiceLabel">
					{data?.choice.label.toUpperCase()}
					{data?.choice.isOptional && <div className="Optional">OPTIONNEL</div>}
				</div>
				<div className="Choices">
					{data?.choice.choices.map((choice, index) => (
						<div
							key={"key" + index}
							className={"VisionMenu-item " + (selected === choice.id ? "selected" : "")}
							onClick={() => {
								fetchNui(data?.callbackName, {
									choice,
									type: selected === choice.id ? "deselection" : "selection",
								});
								setSelected(selected === choice.id ? null : choice.id);
								if (!choice?.isPlaceholder) playOnHoverSound();
							}}>
							<img src={choice.img} />
							<div className={"VisionMenu-name "}>{choice.label ?? choice?.price + " $"}</div>
						</div>
					))}
				</div>
				<div className="Buttons">
					<Button
						color="green"
						fontWeight={700}
						fontSize={12}
						label={"COMMENCER L'ACTIVITÉ"}
						width={250}
						height={25}
						margin={"10px auto"}
						callback={() => {
							fetchNui(data?.callbackName ?? '', {
								button: "start",
								selected: data?.choice.choices.find(e => e.id === selected),
							});
						}}
						disabled={!data?.choice.isOptional && !selected}
					/>

					<Button
						color="red"
						fontWeight={700}
						fontSize={12}
						label={"ARRÊTER L'ACTIVITÉ"}
						width={210}
						height={25}
						margin={"10px auto"}
						callback={() => {
							fetchNui(data?.callbackName ?? '', {
								button: "stop",
							});
						}}
					/>
				</div>
			</div>
			<div className="Participants">
				<div className="ParticipantsLabel">PARTICIPANTS</div>
				<div className="ParticipantsList">
					{participants &&
						setArrayLength(participants, data?.participantsNumber ?? 1).map((participant, index) => {
							const isSelf = index === 0;
							return (
								<div
									key={"key" + index}
									className={
										"VisionMenu-item " +
										(selected === participant.id ? "selected" : "") +
										(participant.name ? "" : "empty")
									}
									onClick={() => {
										playOnHoverSound();
										fetchNui(data?.callbackName ?? '', {
											button: !isSelf && participant.name ? "removePlayer" : "addPlayer",
											selected: participant.id,
										});
									}}>
									{participant.hasProfilePicture && (
										<img
											src={participant.profilePicture}
											style={{
												width: "100%",
												height: "100%",
											}}
										/>
									)}
									{participant.name && !participant.hasProfilePicture && <img src={UserSvg} />}
									{!participant.name && <img src={PlusSvg} />}

									{participant.name && !isSelf && (
										<div className="VisionMenu-RemovePlayer">
											<div className="button">-</div>
										</div>
									)}
									{participant.name && <div className="VisionMenu-name">{participant.name}</div>}
								</div>
							);
						})}
				</div>
			</div>
		</div>}
	</>
	);
};

export default JobMenu;
