import React, { useCallback, useContext, useEffect, useState } from "react";
import Button from "../utils/button";
import CreationContexte from "../creationContexte";
import { fetchNui } from "@/hook";
import { ICharacterCreatorPedElement, ICharacterCreatorPedPhysique, ICharacterCreatorPedVariationElement } from "../types";
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { capitalize } from "@utils/misc";

const Ped: React.FC = () => {
	const { setHideNavigation, peds, setHidden2, pedsVariantes, setCurrent, setData, data } = useContext(CreationContexte);
	const [show] = useState<string | null>(null);
	const [pedList, setPedList] = useState<ICharacterCreatorPedElement[]>([]);
	const [colorList, setColorList] = useState<ICharacterCreatorPedVariationElement[]>([]);
	const [typeList, setTypeList] = useState<ICharacterCreatorPedVariationElement[]>([]);
	const [sexe, setSexe] = useState(data?.ped?.sexe ?? "man");
	const [selectedPed, setSelectedPed] = useState(data?.ped?.selectedPled ?? null);
	const [forceUpdate, setForceUpdate] = useState(false);
	const [local, setLocal] = useState<ICharacterCreatorPedPhysique>(data?.ped?.physique ?? {});
	const [page, setPage] = useState(1);

	useEffect(() => {
		fetchNui("CreationPersonnage", {
			onglet: "ped",
		});
		setHideNavigation(true);
	}, []);

	useEffect(() => {
		setData({
			...data,
			ped: {
				sexe,
				selectedPled: selectedPed,
				physique: local,
			},
		});
	}, [local, sexe, selectedPed]);

	useEffect(() => {
		if (show) {
			setTypeList(pedsVariantes.filter(e => e.category === show && e.idVariante && e.subCategory === sexe));
			_setLocal(show, "type", pedsVariantes.filter(e => e.category === show && e.idVariante && e.subCategory === sexe)[0]);
			setForceUpdate(true);
		}
	}, [show]);

	useEffect(() => {
		if (forceUpdate) {
			setForceUpdate(false);
			updateColorList();
		}
	}, [forceUpdate]);

	const updateColorList = () => {
		setColorList(
			pedsVariantes.filter(e => e.category === show && e.targetId === local?.[show ?? '']?.type?.idVariante && e.subCategory === sexe),
		);
		_setLocal(
			show ?? '',
			"color",
			pedsVariantes.filter(
				e => e.category === show && e.targetId && e.targetId === local?.[show ?? '']?.type?.idVariante && e.subCategory === sexe,
			)[0] ?? { default: true },
		);
	};

	useEffect(() => {
		setPedList(peds.filter(e => e.category === sexe));
	}, [sexe]);

	useEffect(() => {
		setSelectedPed(data?.ped?.selectedPled ?? pedList[0] ?? {});
	}, [pedList]);

	const _setLocal = (cat: string, subCat: string, value: ICharacterCreatorPedVariationElement) => {
		const _local = { ...local };
		if (!_local[cat]) _local[cat] = {};
		_local[cat][subCat] = value;
		setLocal(_local);
	};

	const prevPage = useCallback(() => {
		if (page > 1) {
			setPage(old => old - 1);
		}
	}, [page]);

	const nextPage = useCallback(() => {
		const totalPages = Math.ceil(pedList.length / 4);
		if (page < totalPages) {
			setPage(old => old + 1);
		}
	}, [page, pedList.length]);

	return (
		<div className="pedStep">
			<div className="stepTitle">PED</div>
			<label className="inputLabel" style={{ marginTop: 25, marginBottom: 10, paddingBottom: 0 }}>Personnage</label>
			<div style={{ display: "flex", flexDirection: 'column' }}>
				<div className={"characterTypeButton" + (sexe === 'man' ? " selected" : "")}
					onClick={() => setSexe('man')}
				>
					<MediaCdn path="assets/character-creator" name={"malePed.png"} />
					<label>Homme</label>
				</div>
				<div className={"characterTypeButton" + (sexe === 'woman' ? " selected" : "")}
					onClick={() => setSexe('woman')}
				>
					<MediaCdn path="assets/character-creator" name={"femalePed.png"} />
					<label>Femme</label>
				</div>
			</div>
			<div className="pedWrapper">
				<div className="parentSelectors">
					<div className="parentSelector" style={{ marginLeft: 4, fontSize: 13.5 }}>
						<label style={{ marginLeft: 11 }}>Visage</label>
						<div
							onClick={() => prevPage()}
							className="arrow left"
							style={page > 1 ? {
								left: -6,
								top: 'calc(50% + 2px)',
							} : {
								filter: "brightness(0.6)", cursor: "initial",
								left: -6,
								top: 'calc(50% + 2px)',
							}}>
							<MediaCdn path="assets/icons" name="next.svg" props={{ style: { rotate: "180deg" } }} />
						</div>
						<div className="parentList" style={{ marginLeft: 10, marginTop: 5 }}>
							{(pedList).slice((page - 1) * 4, page * 4).map((_parent, index) => (
								<div
									key={_parent.image}
									onClick={_ => setSelectedPed(pedList[index + page * 4 - 4])}
									className={`character ${selectedPed?.id === pedList[index + page * 4 - 4]?.id ? "selected" : ""}`}>
									<img src={`https://cdn.eltrane.cloud/3838384859/assets/PED/${_parent.label}.png`} />
									<span className="characterName">
										Ped {_parent.id}
									</span>
								</div>
							))}
						</div>
						<div
							onClick={() => nextPage()}
							className="arrow right"
							style={page < Math.ceil(pedList.length / 4) ? {
								right: -11,
								top: 'calc(50% + 6px)',
							} : {
								filter: "brightness(0.6)", cursor: "initial",
								right: -11,
								top: 'calc(50% + 6px)',
							}}>
							<MediaCdn path="assets/icons" name="next.svg" />
						</div>
					</div>
				</div>
				<div className="pedBottom" style={{ marginTop: 15 }}>
					<label style={{ paddingLeft: 15 }}>Vêtements</label>
					<label style={{ paddingLeft: 16, marginBottom: 10 }}>Variations</label>
					{
						['haut', 'bas', 'chaussures', 'accessoires'].map((_show,) => <>
							<div className="Selector">
								<div
									className="LeftArrow"
									onClick={() => {
										const i = typeList.findIndex(e => e.id === local[_show]?.type?.id);
										if (i === 0) {
											_setLocal(_show, "type", typeList[typeList.length - 1]);
										} else {
											_setLocal(_show, "type", typeList[i - 1]);
										}
										setForceUpdate(true);
									}}>
									<MediaCdn path="assets/icons" name="left.svg" />
								</div>
								<div className="Name">{local[_show]?.type?.id ?? capitalize(_show)}</div>
								<div
									className="RightArrow"
									onClick={() => {
										const i = typeList.findIndex(e => e.id === local[_show]?.type?.id);
										if (i === typeList.length - 1) {
											_setLocal(_show, "type", typeList[0]);
										} else {
											_setLocal(_show, "type", typeList[i + 1]);
										}
										setForceUpdate(true);
									}}>
									<MediaCdn path="assets/icons" name="right.svg" />
								</div>
							</div>
							<div className="Selector">
								<div
									className="LeftArrow"
									onClick={() => {
										const i = colorList.findIndex(e => e.id === local[_show]?.color?.id);
										if (i === 0) {
											_setLocal(_show, "color", colorList[colorList.length - 1]);
										} else {
											_setLocal(_show, "color", colorList[i - 1]);
										}
									}}>
									<MediaCdn path="assets/icons" name="left.svg" />
								</div>
								<div className="Name">{local[_show]?.color?.id ?? 0}</div>
								<div
									className="RightArrow"
									onClick={() => {
										const i = colorList.findIndex(e => e.id === local[_show]?.color?.id);
										if (i === colorList.length - 1) {
											_setLocal(_show, "color", colorList[0]);
										} else {
											_setLocal(_show, "color", colorList[i + 1]);
										}
									}}>
									<MediaCdn path="assets/icons" name="right.svg" />
								</div>
							</div>
						</>)}
				</div>
			</div>

			<div className={"menuNavigationButtons"} style={{ right: 38, bottom: 71 }}>
				<Button
					onClick={() => {
						setCurrent(0);
						setHideNavigation(false);
						setHidden2(false);
					}}
					type="warn"
					style={{
						width: 139,
						height: 32,
						fontSize: 13,
						background: 'linear-gradient(to bottom, rgba(0, 0, 0, .2), rgba(15, 15, 15, .2)',
						marginRight: 130
					}}
				>
					Précédent
				</Button>
				<Button
					onClick={() => {
						setCurrent(5);
					}}
					style={{
						width: 139,
						height: 32,
						fontSize: 13,
						background: 'linear-gradient(to bottom, rgba(42, 189, 83, .35), rgba(15, 131, 47, .35)'
					}}
					type="success">
					Suivant
				</Button>
			</div>
		</div>
	);
};

export default Ped;
