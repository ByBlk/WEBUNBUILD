import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import CreationContexte from "../creationContexte";
import InputRange from "../utils/inputRange";
import { fetchNui } from "@/hook";
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { PARENT_LIST } from "../staticData";

const Character: React.FC = () => {
	const { setData, data, setCanContinue } = useContext(CreationContexte);
	const [lookingValue, setLookingValue] = useState((data?.character?.lookingValue ?? 0) * 10 || 5);
	const [skinValue, setSkinValue] = useState((data?.character?.skinValue ?? 0) * 10 || 5);
	const [parent1, setParent1] = useState(data?.character?.parent1 ?? null);
	const [parent2, setParent2] = useState(data?.character?.parent2 ?? null);
	const [pageParent1, setPageParent1] = useState(1);
	const [pageParent2, setPageParent2] = useState(1);

	const totalPages = useMemo(() => Math.ceil(PARENT_LIST.length / 4), [PARENT_LIST]);

	useEffect(() => {
		fetchNui("CreationPersonnage", {
			onglet: "personnage",
		});
	}, []);

	useEffect(() => {
		const characterData = {
			lookingValue: lookingValue / 10,
			skinValue: skinValue / 10,
			parent1: parent1,
			parent2: parent2,
		};
		if (JSON.stringify(data.character) === JSON.stringify(characterData)) return;
		setData({
			...data,
			character: structuredClone(characterData),
		});
		setCanContinue(parent1 && parent2);
	}, [parent1, parent2, skinValue, lookingValue]);

	const prevPage = useCallback((index: number) => {
		const PARENT = index === 1 ? pageParent1 : pageParent2;
		if (!PARENT) return;
		if (PARENT > 1) {
			index === 1 ? setPageParent1(old => old - 1) : setPageParent2(old => old - 1);
		}
	}, [pageParent1, pageParent2]);

	const nextPage = useCallback((index: number) => {
		const PARENT = index === 1 ? pageParent1 : pageParent2;
		if (!PARENT) return;
		const totalPages = Math.ceil(PARENT_LIST.length / 4);
		if (PARENT < totalPages) {
			index === 1 ? setPageParent1(old => old + 1) : setPageParent2(old => old + 1);
		}
	}, [pageParent1, pageParent2]);

	return (
		<div className="characterStep">
			<div className="stepTitle" style={{ marginTop: -4, marginLeft: 4 }}>HÉRITAGE</div>
			<div className="selectedParents" style={{ marginLeft: 4, marginTop: 7 }}>
				<MediaCdn path="assets/character-creator" name="parentsBackground.png" props={{ className: "selectedParentsBackground" }} />
				{parent1 && <MediaCdn
					path="assets/character-creator/parents"
					name={`${PARENT_LIST.find((_, i) => i + 1 === parent1)?.name}.png`}
					props={{
						className: "selectedParentsImage",
						style: { left: 20 }
					}}
				/>}
				{parent2 && <MediaCdn
					path="assets/character-creator/parents"
					name={`${PARENT_LIST.find((_, i) => i + 1 === parent2)?.name}.png`}
					props={{
						className: "selectedParentsImage",
						style: { right: 24 }
					}}
				/>}
			</div>
			<div className="parentSelectors">
				<div className="parentSelector">
					<label style={{ marginLeft: 4, fontSize: 13.5 }}>Parent 1</label>
					<div
						onClick={() => prevPage(1)}
						className="arrow left"
						style={pageParent1 > 1 ? {
							left: -11,
							top: 'calc(50% + 4px)',
						} : {
							filter: "brightness(0.6)",
							cursor: "initial",
							left: -11,
							top: 'calc(50% + 4px)',
						}
						}>
						<MediaCdn path="assets/icons" name="next.svg" props={{ style: { transform: "rotate(180deg)" } }} />
					</div>
					<div className="parentList" style={{ marginTop: 6, transform: 'translate(2px)' }}
						onWheel={(ev) => {
							if (ev?.deltaY > 0) {
								if (pageParent1 < (PARENT_LIST.length / 4)) setPageParent1(pageParent1 + 1);
							}
							if (ev?.deltaY < 0) {
								if (pageParent1 > 1) setPageParent1(pageParent1 - 1);
							}
						}}>
						{PARENT_LIST.slice((pageParent1 - 1) * 4, pageParent1 * 4).map((_parent, index) => (
							<div
								key={_parent.image}
								onClick={_ => setParent1(index + 1 + pageParent1 * 4 - 4)}
								className={`character ${parent1 === index + 1 + pageParent1 * 4 - 4 ? "selected" : ""}`}>
								<MediaCdn path="assets/character-creator/parents" name={_parent.name + ".png"} />
								<span className="characterName">
									{_parent.name}
								</span>
							</div>
						))}
					</div>
					<div
						onClick={() => nextPage(1)}
						className="arrow right"
						style={pageParent1 < totalPages ? {
							right: -18,
							top: 'calc(50% + 6px)',
						} : {
							filter: "brightness(0.6)", cursor: "initial",
							right: -18,
							top: 'calc(50% + 6px)',
						}}>
						<MediaCdn path="assets/icons" name="next.svg" />
					</div>
				</div>

				<div className="parentSelector" style={{ marginTop: 16 }}>
					<label style={{ marginLeft: 4, fontSize: 13.5 }}>Parent 2</label>
					<div
						onClick={() => prevPage(2)}
						className="arrow left"
						style={pageParent2 > 1 ? {
							left: -17,
							top: 'calc(50% + 5px)',
						} : {
							filter: "brightness(0.6)", cursor: "initial",
							left: -17,
							top: 'calc(50% + 5px)',
						}}>
						<MediaCdn path="assets/icons" name="next.svg" props={{ style: { rotate: "180deg" } }} />
					</div>
					<div className="parentList" style={{ marginTop: 6, transform: 'translate(2px)' }} onWheel={(ev) => {
						if (ev?.deltaY > 0) {
							if (pageParent2 < (PARENT_LIST.length / 4)) setPageParent2(pageParent2 + 1);
						}
						if (ev?.deltaY < 0) {
							if (pageParent2 > 1) setPageParent2(pageParent2 - 1);
						}
					}}>
						{PARENT_LIST.slice((pageParent2 - 1) * 4, pageParent2 * 4).map((_parent, index) => (
							<div
								key={_parent.image}
								onClick={_ => setParent2(index + 1 + pageParent2 * 4 - 4)}
								className={`character ${parent2 === index + 1 + pageParent2 * 4 - 4 ? "selected" : ""}`}>
								<MediaCdn path="assets/character-creator/parents" name={_parent.name + ".png"} />
								<span className="characterName">
									{_parent.name}
								</span>
							</div>
						))}
					</div>
					<div
						onClick={() => nextPage(2)}
						className="arrow right"
						style={pageParent2 < totalPages ? {
							right: -19,
							top: 'calc(50% + 5px)',
						} : {
							filter: "brightness(0.6)", cursor: "initial",
							right: -18,
							top: 'calc(50% + 5px)',
						}}>
						<MediaCdn path="assets/icons" name="next.svg" />
					</div>
				</div>
			</div>

			<div style={{ display: "flex", flexDirection: 'column', marginTop: 5, marginLeft: 3 }}>
				<InputRange
					onChange={(event) => {
						setLookingValue(event.target.valueAsNumber);
					}}
					defaultV={lookingValue}
					rangeName="Ressemblance"
					className="lookingRange"
					customStyle={{
						background:
							lookingValue < 5
								? `linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) ${lookingValue * 10}%, rgba(255, 255, 255, 1) ${lookingValue * 10
								}%, rgba(255, 255, 255, .5) 50%, rgba(255, 255, 255, 1) ${lookingValue * 10}%, rgba(0, 0, 0, 0.4) ${lookingValue * 10}%, rgba(0, 0, 0, 0.4) 100%)`
								: lookingValue === 5
									? ""
									: `linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(255, 255, 255, .5) 50%, rgba(255, 255, 255, 1) ${lookingValue * 10
									}%, rgba(0, 0, 0, 0.4) ${lookingValue * 10}%, rgba(0, 0, 0, 0.4) 100%)`,
					}}
					containerStyle={{
						width: 'calc(100% + 3px)',
					}}
				/>
				<div style={{ marginTop: 14 }}>
					<InputRange
						onChange={(event) => {
							setSkinValue(event.target.valueAsNumber);
						}}
						className="skinRange"
						rangeName="Peau"
						defaultV={skinValue}
						customStyle={{
							background:
								skinValue < 5
									? `linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) ${skinValue * 10}%, rgba(255, 255, 255, 1) ${skinValue * 10
									}%, rgba(255, 255, 255, 0.5) 50%,rgba(255, 255, 255, 1) ${skinValue * 10}%, rgba(0, 0, 0, 0.4) ${skinValue * 10}%, rgba(0, 0, 0, 0.4) 100%)`
									: skinValue === 5
										? ""
										: `linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 1) ${skinValue * 10
										}%, rgba(0, 0, 0, 0.4) ${skinValue * 10}%, rgba(0, 0, 0, 0.4) 100%)`,
						}}
						containerStyle={{
							width: 'calc(100% + 3px)',
							marginTop: 2
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Character;
