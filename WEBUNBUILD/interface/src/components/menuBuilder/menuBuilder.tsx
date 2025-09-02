import "./style.scss";
import React, { useEffect, useState } from "react";
import Button from "../button/button";
import { ReactSVG } from "react-svg";
import canap from "./canap.webp";
import frame from "./frame.webp";
import plant from "./plant.webp";
import search from "./search.webp";
import { setArrayLength } from "./utils";
import { playOnHoverSound } from "@utils/playSound";
import { useEnterKey } from "@hooks/useKeys";
import { fetchNui } from "@hooks/fetchNui";
import { IMenuBuilderButtonElement, IMenuBuilderCategoryElement, IMenuBuilderListElement, IMenuBuilderProps } from "./types";
import { capitalize } from "@utils/misc";
import MediaCdn from "../mediaCdn/mediaCdn";
import _ from "lodash";

const getCurrency = (item: any) => {
	if (!item.price && item?.price !== 0) return;
	return <div className="VisionMenu-currency">$</div>;
};

const MenuBuilder: React.FC<IMenuBuilderProps> = ({
	tabs,
	headerImage,
	headerIcon,
	headerIconName,
	headerSubName = '',
	submitButton,
	style,
	progressBar,
	finalSubmit,
	selected,
	headerImageCallback,
	showTurnAroundButtons,
	stockage,
	onTabChange,
	buttonAditionnalColor,
	showValidationButtons,
	isBoutique,
	selectedParent,
	forceBoutiqueHeader,
	origin,
	sideButton,
	cameras = [],
	globalTitle,
	topGradient,
	preButton
}) => {
	const [currentTab, setCurrentTab] = useState(tabs?.[0] ?? null);
	const [camera, setCamera] = useState(0);
	const [spawnItem, setspawnItem] = useState("");
	const [sideButtonTitle, setSideButtonTitle] = useState(undefined);

	useEffect(() => {
		document
			.querySelectorAll(".VisionMenu-buttonElement span")
			?.forEach(e => e.setAttribute("style", `color: ${buttonAditionnalColor ?? "white"}`));
	});

	useEffect(() => {
		setCurrentTab(tabs?.[0] ?? null);
	}, [tabs]);

	const openInNewTab = (url: string) => {
		window.open(url, "_blank", "noreferrer");
	};

	// Renvoie le DOM pour afficher une liste d'objets, et remplis de placeholders pour atteindre le minimum
	const processItems = (_items: IMenuBuilderListElement[], minimumElements: number) => {
		const items = [..._items];
		let a = items.length;
		if (currentTab?.variation !== "no-image") {
			while (a % 3 !== 0 && a < minimumElements) {
				items.push({ isPlaceholder: true });
				a = items.length;
			}
		} else {
			minimumElements = 0;
		}

		return (
			<div className={"VisionMenu-itemList " + currentTab?.variation}>
				{(items.length >= minimumElements ? items : setArrayLength(items, minimumElements)).map((item, index) => (
					<div
						key={"key" + item?.id + index + item?.category + item?.subCategory}
						className={
							item?.isPlaceholder
								? "VisionMenu-placeholder"
								: "VisionMenu-item " +
								((
									Array.isArray(selected)
										? selected.filter(_e => {
											const a = JSON.stringify(_e) === JSON.stringify(item);
											return a;
										}).length > 0
										: JSON.stringify(selected) === JSON.stringify(item)
								)
									? "selected"
									: "") +
								(item?.isPremium ? " premium" : "") +
								(item?.owned ? " owned" : "") +
								(item?.isNew ? " new" : "") +
								(item?.isBanId ? " banId" : "")
						}
						onClick={() => {
							if (item.onClickCallback) {
								item.onClickCallback();
							}
							if (!item?.isPlaceholder) playOnHoverSound();
						}}>
						{currentTab?.variation === "no-image" && (
							<div className="VisionMenu-index">{item.price ? item.price + "$" : item?.id}</div>
						)}
						{!item?.isPlaceholder && (
							<>
								<img src={item.image} />
								{item.price ? (
									<React.Fragment>
										<div className={"VisionMenu-name "}>{item.label}</div>
										<div className={"price2"}>
											{item.price}
											{getCurrency(item)}
										</div>
									</React.Fragment>
								) : (
									<div className={"VisionMenu-name "}>
										{item.label ?? item.price}
										{getCurrency(item)}
									</div>
								)}
							</>
						)}

						{item?.isPlaceholder && (
							<>
								<div className={"VisionMenu-placeholder "}></div>
							</>
						)}
					</div>
				))}
			</div>
		);
	};

	useEnterKey(() => {
		if (origin === "decoration" && spawnItem != "") {
			console.log("Enter key");
			fetchNui("spawnItemDecoration", spawnItem);
			setspawnItem("");
		}
	});

	// Renvoie le DOM pour le système de shop
	const processShop = (items: IMenuBuilderListElement[], minimumElements: number) => {
		let a = items.length;
		while (a % 3 !== 0) {
			items.push({ isPlaceholder: true });
			a = items.length;
		}
		return (
			<div className="VisionMenu-itemList Shop">
				{(items.length >= minimumElements ? items : setArrayLength(items, minimumElements)).map((item, index) => (
					<div className="VisionMenu-shopItem">
						<div
							key={"key" + item?.id + index + item?.category + item?.subCategory}
							className={
								item?.isPlaceholder
									? "VisionMenu-placeholder"
									: "VisionMenu-item " + (JSON.stringify(selected) === JSON.stringify(item) ? "selected" : "")
							}
							onClick={() => {
								if (item.onClickCallback) {
									item.onClickCallback();
								}
							}}>
							{!item?.isPlaceholder && (
								<>
									<img src={item.image} />
									<div className={"VisionMenu-name "}>
										{item.label ?? item.price}
										{getCurrency(item)}
									</div>
								</>
							)}
							{item?.isPlaceholder && (
								<>
									<div className={"VisionMenu-placeholder "}></div>
								</>
							)}
						</div>
						{!item?.isPlaceholder && (
							<div className="Item" key={"ShopItem" + item.id}>
								<div className={"Input " + "Tab-" + currentTab?.name}>
									<div className="Price">{item.secondaryLabel}</div>
									<div
										className="Button"
										onClick={() => {
											if (stockage?.[currentTab?.name ?? ''].get[item.id] > 0) {
												const _stockage = { ...stockage?.[currentTab?.name ?? ''].get };
												_stockage[item.id] -= 1;
												stockage?.[currentTab?.name ?? ''].set(_stockage);
											}
										}}>
										–
									</div>
									<input
										type="number"
										pattern="[0-9]*"
										value={stockage?.[currentTab?.name ?? ''].get[item.id]}
										onChange={ev => {
											const _stockage = { ...stockage?.[currentTab?.name ?? ''].get };
											_stockage[item.id] = Number(ev.currentTarget.value);
											stockage?.[currentTab?.name ?? ''].set(_stockage);
										}}
									/>
									<div
										className="Button"
										style={{
											fontSize: 18,
										}}
										onClick={() => {
											const _stockage = { ...stockage?.[currentTab?.name ?? ''].get };
											_stockage[item.id] += 1;
											stockage?.[currentTab?.name ?? ''].set(_stockage);
										}}>
										+
									</div>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		);
	};

	return (
		<>
			{/* Bouton de transition dans les variations */}
			{showValidationButtons && (
				<div className="TurnAroundButton Validate">
					<div>
						ÉTAPE SUIVANTE<div className="Button">ENTRER</div>
					</div>
					<div>
						RETOUR<div className="Button">SUPPR</div>
					</div>
				</div>
			)}
			{/* Boutons d'information pour la rotation de la caméra */}
			{!showValidationButtons && showTurnAroundButtons && (
				<div className="TurnAroundButton">
					<div>
						TOURNER VERS LA GAUCHE<div className="Button">A</div>
					</div>
					<div>
						TOURNER VERS LA DROITE<div className="Button">E</div>
					</div>
				</div>
			)}
			{/* Affiche les caméras en haut à droite */}
			{cameras.length > 0 && (
				<div className="camerasWrapper">
					<div className="cameraTitle" style={{ marginLeft: -20, marginTop: -1 }}>
						<MediaCdn path="icons" name="eye.svg" props={{ width: 20, style: { marginTop: 2, marginRight: 7 } }} />
						Caméra
					</div>
					{
						cameras.map((e, i) => <div
							onClick={() => {
								setCamera(i);
								if (e?.cameraArgument) {
									fetchNui(e.callback, { value: e?.cameraArgument });
								} else {
									fetchNui(e.callback);
								}
							}}
							className={"camera" + (camera === i ? " active" : "")}>
							<MediaCdn
								props={{ style: { marginLeft: 1, marginTop: -2 } }}
								path={"characterCreator"} name={`camera${camera === i ? "Active" : ""}Background.png`} />
							<div style={{ marginLeft: 1, marginTop: -2 }}>{e.label}</div>
						</div>)
					}
				</div>
			)}
			<div
				className={"VisionMenu" + (currentTab?.type === 'buttons' ? ' ButtonsList' : '')}
				style={{
					width: style?.width ?? 490,
					height: style?.height ?? "fit-content",
				}}>
				{/* Header */}
				<div className={"VisionMenu-header " + style?.overrideClassName?.header}>
					<img
						className="VisionMenu-headerImage"
						src={headerImage}
						onClick={() => {
							if (headerImageCallback) headerImageCallback();
						}}
					/>
					<div className="VisionMenu-boutique">
						<span dangerouslySetInnerHTML={{ __html: headerIconName }}></span>
						<div className="VisionMenu-boutiqueContainer">
							<img src={headerIcon} />
							<span dangerouslySetInnerHTML={{ __html: headerSubName }}></span>
						</div>
					</div>
					{(isBoutique || forceBoutiqueHeader) && (
						<span className="VisionMenu-premium">
							<span>BOUTIQUE</span> VISION
						</span>
					)}
				</div>
				{/* Affiche les éléments des nouveaux header de la V2 */}
				{
					globalTitle && currentTab?.type === 'buttons' && <div className="VisionMenu-globalTitle">{globalTitle}</div>
				}
				{
					topGradient && currentTab?.type === 'buttons' && <div className="VisionMenu-topGradient" style={{ background: topGradient }}></div>
				}
				{/* Affiche les onglets si il y en a plusieurs */}
				{(tabs?.length ?? 0) > 1 && (
					<div className="VisionMenu-tabSelection">
						{tabs?.map(tab => {
							return (
								<div
									className={"VisionMenu-tab" + (JSON.stringify(tab) === JSON.stringify(currentTab) ? " selected" : "")}
									onClick={() => {
										setCurrentTab(tab);
										if (onTabChange)
											onTabChange(tab);
									}}
									style={{
										width: 100 / tabs.length + "%",
									}}>
									{tab.name ?? ""}
								</div>
							);
						})}
					</div>
				)}
				{/* Affiche le contenu de l'onglet actuel */}
				{tabs && (
					<div
						className={"VisionMenu-listContainer"}
						style={{
							maxHeight: 390 + (!submitButton ? 85 : 0) + (tabs?.length > 1 ? 0 : 45) - (origin === "decoration" ? 50 : 0),
							minHeight: 390 + (!submitButton ? 85 : 0) + (tabs?.length > 1 ? 0 : 45) - (origin === "decoration" ? 50 : 0),
						}}>
						<>
							{currentTab?.type === "categories" &&
								currentTab.elements.map((cat: IMenuBuilderCategoryElement, index) => {
									return (
										<>
											<div className={"VisionMenu-categoryName"} style={index > 0 ? { paddingTop: 20 } : {}}>
												{cat.name}
											</div>
											{processItems(cat?.elements ?? [], cat?.minimumElements ?? 1)}
										</>
									);
								})}
							{currentTab?.type === "elements" && processItems(currentTab.elements, currentTab?.minimumElements ?? 9)}
							{currentTab?.type === "shop" && processShop(currentTab.elements, 0)}
							{currentTab?.type === "buttons" && (
								<>{renderButtonList(currentTab.elements, undefined, setSideButtonTitle)}</>
							)}
						</>
					</div>
				)}
				{/* Affiche le résumé des choix et le bouton d'achat (de la V1) */}
				{finalSubmit && (
					<div className="VisionMenu-finalSubmit">
						<div className="VisionMenu-item">
							<img src={finalSubmit.item.image} />
							<span className="VisionMenu-name">{finalSubmit.item.label}</span>
						</div>
						<Button
							margin={"43px 0 13px"}
							callback={finalSubmit.onSubmit}
							color={"green"}
							width={224}
							height={26}
							fontSize={10}
							fontWeight={700}
							label={finalSubmit.submitLabel}
							selected={false}
							submitSound={true}
						/>
						<Button
							margin={0}
							callback={finalSubmit.onCancel}
							color={"red"}
							width={165}
							height={25}
							fontSize={10}
							fontWeight={700}
							label={finalSubmit.cancelLabel}
							selected={false}
						/>
					</div>
				)}
				{/* Affichage custom pour les décorations */}
				{origin === "decoration" && currentTab?.type === "buttons" ? (
					<div className="decoMenu">
						<div className="decoMenu-child1">
							<p>SPAWN PAR MODÈLE</p>
							<div className="decoMenu-child1-1">
								<div>
									<img
										src={search}
										alt=""
										onClick={() => {
											fetchNui("spawnItemDecoration", spawnItem);
											setspawnItem("");
										}}
									/>
								</div>
								<input type="text" name="spawn" id="spawn" value={spawnItem} onChange={e => setspawnItem(e.target.value)} />
							</div>
						</div>
						<div className="decoMenu-child2">
							<p>LISTING PROPS</p>
							<div className="decoMenu-child2-1" onClick={() => openInNewTab("https://gtahash.ru/")}>
								<img src={canap} alt="" />
								<img src={plant} alt="" />
								<img src={frame} alt="" />
							</div>
						</div>
					</div>
				) : undefined}
				{/* Affichage du DOM optionnel passé dans preButton */}
				{preButton}
				{/* Affichage du bouton de validation / d'achat */}
				{submitButton && !submitButton?.input?.isInput && (
					<div className="VisionMenu-submitButton" style={{ width: "fit-content", margin: "auto calc((100% - (140px * 3 + 6px * 2)) / 2) auto auto", position: "relative", height: 60, display: 'flex', alignItems: 'center' }}>
						<Button
							label={submitButton.label}
							callback={submitButton.onClickCallback}
							width={140}
							height={30}
							submitSound={true}
							disabled={submitButton.disabled}
							disabledType={submitButton.disabledType}
							color={submitButton?.color ?? "green"}
							fontSize={"12px"}
							customVisu={submitButton?.customVisu}
						/>
						{submitButton?.icon && (
							<img style={{ position: "absolute", zIndex: 3, top: 15, left: 30 }} src={submitButton.icon} />
						)}
					</div>
				)}
				{/* Affichage du bouton de validation avec input (de la V1) */}
				{submitButton && submitButton?.input?.isInput && (
					<input
						className={"VisionMenu-submit VisionMenu-submitInput " + style?.overrideClassName?.submitButton}
						value={submitButton.input.value}
						onBlur={e => { if (submitButton?.input?.onBlur) submitButton?.input?.onBlur(e.currentTarget.value) }}
						onChange={e => { if (submitButton?.input?.onChange) submitButton?.input?.onChange(e.currentTarget.value) }}
						placeholder={submitButton.input.placeholder}
					/>
				)}
				{/* Affichage de la progress-bar pour les variations */}
				{progressBar && (
					<div className="VisionMenu-progressBar">
						{progressBar.elements.map((_el, index) => {
							if (index < progressBar.current)
								return (
									<React.Fragment key={"progress" + index}>
										<div className="VisionMenu-progressBarElement">
											<div
												style={{
													background:
														"linear-gradient(180deg, rgba(30, 180, 90, 0.6) 0%, rgba(0, 255, 102, 0.6) 100%)",
												}}></div>
										</div>
									</React.Fragment>
								);
							if (index === progressBar.current)
								return (
									<React.Fragment key={"progress" + index}>
										<div className="VisionMenu-progressBarElement">
											<div
												style={{
													background: "linear-gradient(90deg, rgba(94, 108, 182, 0.62) 0%, #5E6CB6 100%)",
												}}></div>
										</div>
									</React.Fragment>
								);
							if (index > progressBar.current)
								return (
									<React.Fragment key={"progress" + index}>
										<div className="VisionMenu-progressBarElement">
											<div
												style={{
													background:
														"linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%)",
												}}></div>
										</div>
									</React.Fragment>
								);
						})}
					</div>
				)}
				{/* Affichage du bouton d'achat premium (Binco V1) */}
				{selectedParent && selectedParent?.isPremium && !selectedParent?.owned && (
					<div className="VisionMenu-toBoutique">
						<svg xmlns="http://www.w3.org/2000/svg" width="97" height="29" viewBox="0 0 97 19" fill="none">
							<path
								d="M2.69175 2.51651C2.9287 1.06549 4.18229 0 5.65253 0H93.5002C95.3399 0 96.7462 1.64061 96.4649 3.45866L94.4538 16.4587C94.2275 17.921 92.9688 19 91.489 19H3.52964C1.6798 19 0.270724 17.3422 0.568853 15.5165L2.69175 2.51651Z"
								fill="url(#paint0_linear_2135_369)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_2135_369"
									x1="47.0303"
									y1="5.69214e-09"
									x2="47.0303"
									y2="19"
									gradientUnits="userSpaceOnUse">
									<stop stopColor="#F98F02" />
									<stop offset="1" stopColor="#FE5301" />
								</linearGradient>
							</defs>
						</svg>
						<div
							className="VisionMenu-toBoutiquePrice"
							onClick={() => {
								fetchNui("buyItem", selectedParent);
							}}>
							{selectedParent.price}
							{getCurrency({ isPremium: true, price: 0 })}
						</div>
					</div>
				)}
				{/* Affichage du bouton d'achat premium (Binco V1) */}
				{selectedParent && selectedParent?.isPremium && !selectedParent?.owned && (
					<div className="VisionMenu-number">DÉBLOQUEZ +{currentTab?.elements.length} MODÈLES</div>
				)}
			</div>

			{/* Boutons latéraux */}
			{((sideButton?.elements?.length ?? 0) > 0 && (currentTab?.elements?.[0] as IMenuBuilderListElement)?.category)
				&& <div className={["SideButtons", sideButton?.type].join(' ')}>
					<div className="SideButtons-header">
						<span>{_.capitalize(sideButtonTitle ?? sideButton?.elements.find(button => button?.name === (currentTab?.elements?.[0] as IMenuBuilderListElement)?.category)?.name)}</span>
					</div>
					<div className={"VisionMenu-listContainer"}>
						{renderButtonList(
							(sideButton?.elements ?? []),
							(currentTab?.elements?.[0] as IMenuBuilderListElement)?.category ?? '', setSideButtonTitle)
						}
					</div>
				</div>}
		</>
	);
};

export default MenuBuilder;

{/* Affichage d'une liste de boutons */ }
const renderButtonList = (buttons: IMenuBuilderButtonElement[], currentCategory: string | undefined = undefined, setSideButtonTitle: Function) => {
	return <div className="VisionMenu-buttonElementContainer">
		{buttons.map((button, index) => {
			return (
				<React.Fragment key={"button" + index}>
					<div
						className={["VisionMenu-buttonElement", button.width, button.height, button?.type ?? "", button?.name === currentCategory ? 'selected' : ''].join(' ')}
						onClick={async () => {
							playOnHoverSound();
							if (button.onClickCallback) button.onClickCallback();
						}}
						onMouseEnter={() => { setSideButtonTitle(button?.name) }}
						onMouseLeave={() => { setSideButtonTitle(undefined) }}
					>
						{button.type !== "coverBackground" && (
							<ReactSVG
								className={"VisionMenu-svgContainer " + button.hoverStyle}
								src={button.image ?? ""}
							/>
						)}
						{button?.type === "coverBackground" && <div className="VisionMenu-buttonElementBackground" style={{
							backgroundImage: "url(" + button.image + ")",
						}}></div>}
						<div className="VisionMenu-buttonElementName-container" style={{ color: button.isPremium ? "#FBBC04" : "" }}>
							<div className="VisionMenu-buttonElementName">{capitalize(button.name ?? '')}</div>
						</div>
					</div>
				</React.Fragment>
			);
		})}
	</div>
}