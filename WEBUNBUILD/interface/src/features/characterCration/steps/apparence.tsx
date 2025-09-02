import React, { useContext, useEffect, useMemo, useState } from "react";
import ApperanceSelector from "../utils/apperanceSelector";
import { fetchNui } from "@/hook";
import CreationContexte from "../creationContexte";
import { IVisageMenuItem } from "../types";
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { capitalize } from "@utils/misc";
import Button from "../utils/button";
import { EYE_COLORS, FEMALE_VISAGE_MENU_DATA, MALE_VISAGE_MENU_DATA } from "../staticData";

const Apparence: React.FC = () => {
	const { setData, data, setCanContinue, setHideNavigation, hideNavigation, catalogue } = useContext(CreationContexte);
	const [localData, setLocalData] = useState(structuredClone(data.apparence) ?? {});
	const [currentCategory, setCurrentCategory] = useState<null | string>(null);
	const [currentCategoryValues, setCurrentCategoryValues] = useState<IVisageMenuItem | undefined>(undefined);

	useEffect(() => {
		fetchNui("CreationPersonnage", {
			onglet: "apparence",
		});
	}, []);

	useEffect(() => {
		setCurrentCategoryValues(DATA_LIST.find(e => e.items.filter(_e => _e.id === currentCategory).length > 0)?.items.find(_e => _e.id === currentCategory));
	}, [currentCategory]);

	useEffect(() => {
		if (JSON.stringify(data.apparence) === JSON.stringify(localData)) return;
		setData({
			...data,
			apparence: structuredClone(localData),
		});
		setCanContinue(true);
	}, [localData, data]);

	useEffect(() => {
		setHideNavigation(currentCategory && currentCategory !== "eyes" ? true : false);
	}, [currentCategory]);

	const handleItemClicked = (_a: IVisageMenuItem) => {
		setCurrentCategory(_a.id);
	};
	
	const DATA_LIST = useMemo(() => data?.identity?.characterChoice === 'women' ? FEMALE_VISAGE_MENU_DATA : MALE_VISAGE_MENU_DATA, [data]);
	return (
		<>
			<div className="apparenceStep" style={hideNavigation ? { padding: '30px 23px' } : {}}>
				{!hideNavigation && <div className="stepTitle" style={{ marginTop: 3, marginLeft: 1, marginBottom: 5 }}>APPARENCE</div>}
				{hideNavigation && <label style={{ marginBottom: 20 }}>{currentCategoryValues?.fullName}</label>}
				{!hideNavigation &&
					DATA_LIST.map((_apparence, i) => (
						<React.Fragment key={"apparenceElement" + i}>
							<label style={{ marginBottom: 0, marginTop: 20 }}>{_apparence.name}{(_apparence.name === 'Pilosité' && data?.identity?.characterChoice === 'women') && <label className="specialLabel">Maquillage</label>}</label>

							<div className={_apparence.name === 'Pilosité' ? "apparenceLargeButtonContainer" : "apparenceButtonContainer"}>

								{_apparence?.items.map((_apparenceItem, index) => (
									<React.Fragment key={index}>
										{_apparence.name === 'Pilosité' ? <div
											style={{ marginTop: 10 }}
											className="apparenceLargeButton"
											onClick={() => handleItemClicked(_apparenceItem)}
										>
											<MediaCdn path="assets/character-creator" name={_apparenceItem.image + ".png"} />
											<label>{capitalize(_apparenceItem.name)}</label>
										</div>
											: <div className="apparenceButton" onClick={() => handleItemClicked(_apparenceItem)}>
												{capitalize(_apparenceItem.name)}
											</div>}
									</React.Fragment>
								))}
							</div>
						</React.Fragment>
					))}
				{currentCategoryValues && (
					<ApperanceSelector
						items={catalogue.filter(e => e.category === currentCategory)}
						currentCategory={currentCategoryValues}
						setCurrentCategory={setCurrentCategory}
						showOpacity={currentCategoryValues?.choices.includes("opacity") ?? false}
						showColor1={currentCategoryValues?.choices.includes("color1") ?? false}
						showColor2={currentCategoryValues?.choices.includes("color2") ?? false}
						itemValue={localData[currentCategory ?? '']?.item}
						opacityValue={localData[currentCategory ?? '']?.opacity ?? 100}
						color1Value={localData[currentCategory ?? '']?.color1 ?? undefined}
						color2Value={localData[currentCategory ?? '']?.color2 ?? undefined}
						setValue={(type: 'color1' | 'color2' | 'opacity', e: number) => {
							if (!currentCategory) return;
							const temp = {
								...localData,
							};
							if (!temp[currentCategory]) {
								temp[currentCategory] = {};
							}
							temp[currentCategory][type] = e;
							setLocalData(temp);
						}}
						overrideColors={currentCategory === 'eyes' ? EYE_COLORS : undefined}
					/>
				)}
			</div>
			{hideNavigation &&
				<div className="menuNavigationButtons">
					<Button
						onClick={() => setCurrentCategory(null)}
						style={{
							width: 139,
							height: 32,
							fontSize: 13,
							background: 'linear-gradient(to bottom, rgba(42, 189, 83, .35), rgba(15, 131, 47, .35)',
						}}
						type="success">
						Sélectionner
					</Button>
				</div>
			}
		</>
	);
};

export default Apparence;
