import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Input from "../utils/input";
import CreationContexte from "../creationContexte";
import { fetchNui } from "@/hook";
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { IRecoverData } from "../types";

const Identity: React.FC<{ isPremium: boolean }> = ({ isPremium }) => {
	const { setData, recoverableCharacters, data, setCanContinue, premium, setHideNavigation } = useContext(CreationContexte);
	const [firstName, setFirstName] = useState(data?.identity?.firstName ?? "");
	const [lastName, setLastName] = useState(data?.identity?.lastName ?? "");
	const [birthDay, setBirthDay] = useState(data?.identity?.birthDate?.split("/")[0] ?? 1);
	const [birthMonth, setBirthMonth] = useState(data?.identity?.birthDate?.split("/")[1] ?? 1);
	const [birthYear, setBirthYear] = useState(data?.identity?.birthDate?.split("/")[2] ?? 1970);
	const [birthPlace, setBirthPlace] = useState(data?.identity?.birthPlace ?? "");
	const [characterChoice, setCharacterChoice] = useState(data?.identity?.characterChoice ?? "men");
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	useEffect(() => {
		fetchNui("CreationPersonnage", {
			onglet: "identité",
		});
		setHideNavigation(false);
	}, []);

	useEffect(() => {
		setData({
			...data,
			identity: {
				firstName: firstName,
				lastName: lastName,
				birthDate: birthDay + "/" + birthMonth + "/" + birthYear,
				birthPlace: birthPlace,
				characterChoice: characterChoice,
			},
		});
		setCanContinue(firstName !== "" && lastName !== "" && birthPlace !== "");
	}, [characterChoice]);

	const updateDataWithRecoveredCharacter = useCallback((character: IRecoverData) => {
		const newData = {
			...data,
			identity: {
				firstName: character?.identity?.firstName,
				lastName: character?.identity?.lastName,
				birthDate: character?.identity?.dateOfBirthdayr,
				birthPlace: character?.identity?.birthplace,
				characterChoice: ['men', 'women', 'custom'][character?.identity?.sex ?? 0],
			},
			character: {
				lookingValue: character?.skin?.face,
				skinValue: character?.skin?.skin,
				parent1: (character?.skin?.mom ?? 0) + 1,
				parent2: (character?.skin?.dad ?? 0) + 1,
			},
			visage: {
				nose: {
					x: character?.skin?.nose_1 ?? 0,
					y: character?.skin?.nose_2 ?? 0,
				},
				nosePointe: {
					x: character?.skin?.nose_3 ?? 0,
					y: character?.skin?.nose_4 ?? 0,
				},
				noseProfile: {
					x: character?.skin?.nose_5 ?? 0,
					y: character?.skin?.nose_6 ?? 0,
				},
				sourcils: {
					x: character?.skin?.eyebrows_5 ?? 0,
					y: character?.skin?.eyebrows_6 ?? 0,
				},
				pommettes: {
					x: character?.skin?.cheeks_1 ?? 0,
					y: character?.skin?.cheeks_2 ?? 0,
				},
				menton: {
					x: character?.skin?.chin_height ?? 0,
					y: character?.skin?.chin_lenght ?? 0,
				},
				mentonShape: {
					x: character?.skin?.chin_width ?? 0,
					y: character?.skin?.chin_hole ?? 0,
				},
				machoire: {
					x: character?.skin?.jaw_1 ?? 0,
					y: character?.skin?.jaw_2 ?? 0,
				},
				joues: character?.skin?.cheeks_3 ?? 0,
				yeux: character?.skin?.eye_open ?? 0,
				levres: character?.skin?.lips_thick ?? 0,
				cou: character?.skin?.neck_thick ?? 0,
			},
			apparence: {
				hair: {
					item: {
						id: character?.skin?.hair_1 ?? undefined,
					},
					color1: character?.skin?.hair_color_1 ?? 0,
					color2: character?.skin?.hair_color_2 ?? 0,
				},
				beard: {
					item: {
						id: character?.skin?.beard_1 ?? undefined,
					},
					color1: character?.skin?.beard_3 ?? 0,
					color2: character?.skin?.beard_2 ?? 0,
				},
				sourcils: {
					item: {
						id: character?.skin?.eyebrows_1 ?? undefined,
					},
					color1: character?.skin?.eyebrows_3 ?? 0,
					color2: character?.skin?.eyebrows_4 ?? 0,
					opacity: (character?.skin?.eyebrows_2 ?? 0) * 10,
				},
				pilosite: {
					item: {
						id: character?.skin?.chest_1 ?? undefined,
					},
					color1: character?.skin?.chest_3 ?? 0,
					opacity: (character?.skin?.eyebrows_2 ?? 0) * 10,
				},
				eyes: {
					color1: character?.skin?.eye_color ?? 0,
				},
				eyesmaquillage: {
					item: {
						id: character?.skin?.makeup_1 ? (character.skin.makeup_1 + 1) : undefined,
					},
					color1: character?.skin?.makeup_3 ?? 0,
					color2: character?.skin?.makeup_4 ?? 0,
					opacity: (character?.skin?.makeup_2 ?? 0) * 10,
				},
				fard: {
					item: {
						id: character?.skin?.blush_1 ? (character.skin.blush_1 + 1) : undefined,
					},
					color1: character?.skin?.blush_3 ?? 0,
					opacity: (character?.skin?.blush_2 ?? 0) * 10,
				},
				rougealevre: {
					item: {
						id: character?.skin?.lipstick_1 ? (character.skin.lipstick_1 + 1) : undefined,
					},
					color1: character?.skin?.lipstick_3 ?? 0,
					opacity: (character?.skin?.lipstick_2 ?? 0) * 10,
				},
				taches: {
					item: {
						id: character?.skin?.bodyb_1 ?? undefined,
					},
					opacity: (character?.skin?.bodyb_2 ?? 0) * 10,
				},
				marques: {
					item: {
						id: character?.skin?.age_1 ?? undefined,
					},
					opacity: (character?.skin?.age_2 ?? 0) * 10,
				},
				acne: {
					item: {
						id: character?.skin?.blemishes_1 ?? undefined,
					},
					opacity: (character?.skin?.blemishes_2 ?? 0) * 10,
				},
				rousseur: {
					item: {
						id: character?.skin?.moles_1 ?? undefined,
					},
					opacity: (character?.skin?.moles_2 ?? 0) * 10,
				},
				teint: {
					item: {
						id: character?.skin?.complexion_1 ?? undefined,
					},
					opacity: (character?.skin?.complexion_2 ?? 0) * 10,
				},
				cicatrice: {
					item: {
						id: character?.skin?.sun_1 ?? undefined,
					},
					opacity: (character?.skin?.sun_2 ?? 0) * 10,
				},
			},
			ped: {
				visage: {
					type: {
						id: character?.skin?.head ?? 0,
					},
					color: {
						id: character?.skin?.mask_1 ?? 0,
					}
				},
				haut: {
					type: {
						id: character?.skin?.arms ?? 0,
					},
					color: {
						id: character?.skin?.arms_2 ?? 0,
					}
				},
				bas: {
					type: {
						id: character?.skin?.pants_1 ?? 0,
					},
					color: {
						id: character?.skin?.pants_2 ?? 0,
					}
				},
				chaussure: {
					type: {
						id: character?.skin?.shoes_1 ?? 0,
					},
					color: {
						id: character?.skin?.shoes_2 ?? 0,
					}
				},
			},
			vetements: {
				'haut': [
					character?.skin?.torso_1 ? { id: character.skin.torso_1, category: 'Hauts', subCategory: 'Hauts' } : undefined,
					character?.skin?.torso_2 ? { id: character.skin.torso_2 + 1, category: 'Hauts', subCategory: 'Variations' } : undefined,
					character?.skin?.tshirt_1 ? { id: character.skin.tshirt_1, category: 'Hauts', subCategory: 'Sous-haut' } : undefined,
					character?.skin?.tshirt_2 ? { id: character.skin.tshirt_2 + 1, category: 'Hauts', subCategory: 'Variations 2' } : undefined,
					character?.skin?.arms ? { id: character.skin.arms, category: 'Hauts', subCategory: 'Bras' } : undefined,
					character?.skin?.arms_2 ? { id: character.skin.arms_2 + 1, category: 'Hauts', subCategory: 'Variations 3' } : undefined,
				],
				'bas': [
					character?.skin?.pants_1 ? { id: character.skin.pants_1, category: 'Bas', subCategory: 'Bas' } : undefined,
					character?.skin?.pants_2 ? { id: character.skin.pants_2 + 1, category: 'Bas', subCategory: 'Variations' } : undefined,
				],
				'chaussures': [
					character?.skin?.shoes_1 ? { id: character.skin.shoes_1, category: 'Chaussures', subCategory: 'Chaussures' } : undefined,
					character?.skin?.shoes_2 ? { id: character.skin.shoes_2 + 1, category: 'Chaussures', subCategory: 'Variations' } : undefined,
				],
				'chapeaux': [
					character?.skin?.helmet_1 ? { id: character.skin.helmet_1, category: 'Chapeaux', subCategory: 'Chapeaux' } : undefined,
					character?.skin?.helmet_2 ? { id: character.skin.helmet_2 + 1, category: 'Chapeaux', subCategory: 'Variations' } : undefined,
				],
				'lunettes': [
					character?.skin?.glasses_1 ? { id: character.skin.glasses_1, category: 'Lunettes', subCategory: 'Lunettes' } : undefined,
					character?.skin?.glasses_2 ? { id: character.skin.glasses_2 + 1, category: 'Lunettes', subCategory: 'Variations' } : undefined,
				],
				'sacs': [
					character?.skin?.bags_1 ? { id: character.skin.bags_1, category: 'Sacs', subCategory: 'Sacs' } : undefined,
					character?.skin?.bags_2 ? { id: character.skin.bags_2 + 1, category: 'Sacs', subCategory: 'Variations' } : undefined,
				],
			}
		}
		setData(newData);
		fetchNui(`nui:char-creator:update-all`, {
			firstName: character.identity?.firstName,
			lastName: character.identity?.lastName,
		});
		setFirstName(character?.identity?.firstName ?? "");
		setLastName(character?.identity?.lastName ?? "");
		setBirthDay(Number(character?.identity?.dateOfBirthdayr?.split("/")[0]) ?? 1);
		setBirthMonth(Number(character?.identity?.dateOfBirthdayr?.split("/")[1]) ?? 1);
		setBirthYear(Number(character?.identity?.dateOfBirthdayr?.split("/")[2]) ?? 1970);
		setBirthPlace(character?.identity?.birthplace ?? "");
		setCharacterChoice(['men', 'women', 'custom'][character?.identity?.sex ?? 0]);

	}, []);

	useEffect(() => {
		setCanContinue(firstName !== "" && lastName !== "" && birthPlace !== "");
	}, [firstName, lastName, birthPlace]);

	const updateData = useCallback(() => {
		setData({
			...data,
			identity: {
				firstName: firstName,
				lastName: lastName,
				birthDate: birthDay + "/" + birthMonth + "/" + Math.max(Math.max(Number(1970)), Math.min(Number(new Date().getFullYear()), Number(birthYear))),
				birthPlace: birthPlace,
				characterChoice: characterChoice,
			},
		});
		setCanContinue(firstName !== "" && lastName !== "" && birthPlace !== "");
	}, [data, firstName, lastName, birthDay, birthMonth, birthYear, birthPlace, characterChoice]);

	const PED_BUTTONS = useMemo(() => [
		{
			value: "men",
			image: "maleBackground",
			label: "Homme",
			buttonColor: "NORMAL",
			style: { background: "linear-gradient(180deg, rgba(94, 108, 182, 0.8) 0%, rgba(94, 108, 182, 0.496) 100%)", fontSize: "12px" },
		},
		{
			value: "women",
			image: "femaleBackground",
			label: "Femme",
			buttonColor: "ERROR",
			style: { background: "linear-gradient(180deg, rgba(253, 127, 127, 0.5) 0%, rgba(224, 31, 31, 0.5) 100%)", fontSize: "12px" },
		},
		{
			value: "custom",
			image: "pedBackground",
			label: "Peds",
			buttonColor: "WARN",
			style: { background: "linear-gradient(180deg, rgba(251, 188, 4, 0.55) 0%, rgba(251, 157, 4, 0.55) 100%)", fontSize: "12px" },
		},
	], []);

	return (
		<div className="identityStep">
			<div className="stepTitle">IDENTITÉ</div>
			<Input
				value={firstName}
				setValue={setFirstName}
				label="Nom"
				onBlur={() => {
					updateData();
				}}
				style={{ marginTop: 20 }}
			/>
			<Input
				value={lastName}
				setValue={setLastName}
				label="Prénom"
				style={{ marginTop: 11 }}
				onBlur={() => {
					updateData();
				}}
			/>
			<div style={{ display: 'flex', flexDirection: 'column', marginTop: 13 }}>
				<label className="inputLabel">Date de naissance</label>
				<div style={{ display: "flex", gap: 4 }}>
					<input
						style={{ maxWidth: 75 }}
						type="number"
						value={birthDay}
						onChange={e => setBirthDay(Math.min(31, Number(e.currentTarget?.value) ?? 1))}
						onBlur={() => {
							updateData();
						}}
						min="1"
						max={31}
					/>
					<input
						style={{ maxWidth: 75 }}
						type="number"
						value={birthMonth}
						onChange={e => setBirthMonth(Math.min(12, Number(e.currentTarget?.value) ?? 1))}
						onBlur={() => {
							updateData();
						}}
						min="1"
						max="12"
					/>
					<input
						style={{ width: '100%' }}
						type="number"
						value={birthYear}
						onChange={e => { setBirthYear(e.currentTarget.value) }}
						onBlur={(e) => {
							let { value, min, max } = e.target;
							const _value = Math.max(Math.max(Number(min)), Math.min(Number(max), Number(value)));
							setBirthYear(_value)
							updateData();
						}}
						min="1970"
						max={new Date().getFullYear()}
					/>
				</div>
			</div>
			<Input
				value={birthPlace}
				setValue={setBirthPlace}
				onBlur={() => {
					updateData();
				}}
				label="Lieu de naissance"
			/>
			<label className="inputLabel" style={{ marginTop: 15 }}>Choix du personnage</label>
			<div style={{ display: "flex", marginTop: 20 }}>
				{PED_BUTTONS.map(button => {
					return (
						<div className={"characterTypeButton" + (characterChoice === button.value ? " selected" : "") + (button.value === 'custom' && !premium ? ' blocked' : '')}
							key={button.value}
							onClick={() => setCharacterChoice(button.value)}
						>
							{button.value === 'custom' && !premium && <MediaCdn path={"assets/icons"} name={"lock.svg"} props={{ style: { opacity: .2, width: 30 } }} />}
							<MediaCdn path="assets/character-creator" name={button.image + ".png"} />
							<label>{button.label}</label>
						</div>
					);
				})}
			</div>

			{recoverableCharacters.length > 0 && <>
				<label className="inputLabel" style={{ marginTop: 20, paddingBottom: 0 }}>
					Récupération de personnages
				</label>
				<div className="recoverable">
					{recoverableCharacters.map((character, index) => (
					<div
						key={character.name}
						className={`recoverableCharacter ${selectedIndex === index ? "selected" : ""}`}
						onClick={() => {
						if (isPremium) {
							updateDataWithRecoveredCharacter(character?.data);
							setSelectedIndex(index);
						}
						}}
					>
						{character.name}
						{!premium && (
						<div className="locked">
							<MediaCdn path="assets/icons" name="lock.svg" props={{ style: { height: 10 } }} />
						</div>
						)}
					</div>
					))}
				</div>
			</>}
		</div >
	);
};

export default Identity;
