import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";

import CreationContexte from "../creationContexte";
import { fetchNui } from "@/hook";
import MenuBuilder from "@/components/menuBuilder/menuBuilder";
import { useBackspaceKey, useEnterKey } from "@/hook/useKeys";
import { IMenuBuilderListElement, IMenuBuilderTabsData } from "@/components/menuBuilder/types";
import Button from "../utils/button";

const Outfit: React.FC = () => {
	const [show, setShow] = useState<string | null>("main");
	const [selections, setSelections] = useState<(IMenuBuilderListElement & {
		targetId?: string;
		idVariation?: string;
		default?: boolean;
	})[]>([]);
	const [selected, setSelected] = useState<(IMenuBuilderListElement & {
		targetId?: string;
		idVariation?: string;
		default?: boolean;
	}) | null>(null);
	const [currentCategory, setCurrentCategory] = useState<string | null>(null);
	const { setData, data, setHideNavigation: setHidden, hideNavigation, catalogue, dataButtons, hideItemList } = useContext(CreationContexte);

	useEffect(() => {
		fetchNui("CreationPersonnage", {
			onglet: "vetements",
		});
	}, []);

	useEnterKey(() => {
		if (selected) {
			setSelections([...selections, selected]);
			setSelected(null);
		}
	});

	useBackspaceKey(() => {
		setSelected(null);
		if (selections.length === 0) {
			setCurrentCategory(null);
			setShow("main");
			fetchNui("CreationPersonnageBackToMain");
		} else {
			const _a = [...selections];
			while (_a[_a.length - 1]?.default === true) {
				_a.pop();
			}
			_a.pop();
			setSelections(_a);
			if (show === "finalSubmit") {
				setShow(currentCategory);
			}
		}
	});

	useEffect(() => {
		if (selections.length > 0 && show !== "main") {
			const _data = { ...data };
			if (!_data.vetements) _data.vetements = {};
			_data.vetements[show ?? ''] = selections;
			setData(_data);
		}
		if (
			catalogue.filter(
				e =>
					e.category === show &&
					e.subCategory === buttons.find(_e => _e?.name === show)?.progressBar[selections.length]?.name &&
					(selections[selections.length - 1]?.idVariation === undefined
						? true
						: e?.targetId === selections[selections.length - 1]?.idVariation),
			).length === 0 &&
			show !== "main" &&
			show !== "finalSubmit"
		) {
			setSelections([...selections, { default: true }]);
		}
		if (selections.length === buttons.find(_e => _e.name === show)?.progressBar.length && selections.length > 0) {
			fetchNui("nui:char-creator:back-to-outfit", {
				origin: currentCategory
			});
			setShow("main");
			setCurrentCategory(null);
		}
	}, [selections]);

	const buttons = useMemo(() => ((dataButtons).map(e => {
		e.onClickCallback = () => {
			setShow(e.name ?? null);
			setCurrentCategory(e.name ?? null);
			setSelections([]);
			fetchNui("CreationPersonnageClickBouton", e.name);
		};
		return e;
	})), [dataButtons]);

	useEffect(() => {
		setHidden(currentCategory && currentCategory !== "eyes" ? true : false);
	}, [currentCategory]);

	const handleNext = useCallback(() => {
		if (selected) {
			setSelections([...selections, selected]);
			setSelected(null);
		}
	}, [selected, selections]);

	const getTab = (): IMenuBuilderTabsData => {
		if (show === "main") {
			return [
				{
					name: "",
					type: "buttons",
					elements: [...buttons],
				},
			];
		}
		return [
			{
				name: "",
				type: "elements",
				...(hideItemList?.includes(buttons.find(_e => _e?.name === show)?.progressBar[selections.length]?.name ?? '')
					? { variation: "no-image" }
					: {}),
				elements: (
					catalogue?.filter(
						e =>
							e.category === show &&
							e.subCategory === buttons.find(_e => _e?.name === show)?.progressBar[selections.length]?.name &&
							(selections[selections.length - 1]?.idVariation === undefined
								? true
								: e?.targetId === selections[selections.length - 1]?.idVariation),
					) ?? []
				).map((_e) => {
					_e.onClickCallback = () => {
						fetchNui("CreationPersonnageClickHabit", _e);
						setSelected(_e as IMenuBuilderListElement);
					};
					return _e;
				}),
			},
		];
	};

	return (
		<>
			<div className="outfitStep" style={hideNavigation ? { padding: '30px 29px' } : {}}>
				{!hideNavigation && <div className="outfitHeader">
					<div className="stepTitle" style={{ marginTop: 2 }}>
						VÊTEMENTS
					</div>
					<label style={{ marginTop: 38, fontSize: 14, marginLeft: 10, paddingBottom: 8 }}>Catégories</label>
				</div>}
				{show !== "finalSubmit" && (
					<MenuBuilder
						showTurnAroundButtons={false}
						headerIcon=""
						headerIconName=""
						headerImage=""
						selected={selected}
						tabs={getTab()}
						progressBar={
							show !== "main"
								? {
									current: selections.length,
									elements: buttons.find(e => e.name === show)?.progressBar ?? [],
								}
								: undefined
						}
					/>
				)}
			</div>

			{hideNavigation && (
				<div className="Hints">
					<div className="hint">
						<span className="title">Étape Suivante</span>
						<span className="key">ENTRER</span>
					</div>
					<div className="hint">
						<span className="title">Retour</span>
						<span className="key">SUPPR</span>
					</div>
				</div>
			)}
			{hideNavigation &&
				<div className="menuNavigationButtons">
					<Button
						onClick={() => {
							setCurrentCategory(null);
							setShow("main");
							fetchNui("CreationPersonnageBackToMain");
						}}
						style={{
							width: 139,
							height: 32,
							fontSize: 13,
							background: 'linear-gradient(to bottom, rgba(0, 0, 0, .2), rgba(15, 15, 15, .2)',
							marginRight: 'calc(100% - 375px)'
						}}
						type="secondary">
						Retour
					</Button>

					<Button
						onClick={handleNext}
						style={{
							width: 139,
							height: 32,
							fontSize: 13,
							background: 'linear-gradient(to bottom, rgba(42, 189, 83, .35), rgba(15, 131, 47, .35)'
						}}
						disabled={!selected}
						type="success">
						{selections.length + 1 < (buttons.find(e => e.name === show)?.progressBar?.length ?? 0) ? 'Suivant' : 'Sélectionner'}
					</Button>
				</div>
			}
		</>
	);
};

export default Outfit;
