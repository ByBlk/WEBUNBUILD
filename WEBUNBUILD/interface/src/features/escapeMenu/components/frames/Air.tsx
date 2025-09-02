import "swiper/swiper-bundle.css";

// Color Palette
import { ColorPicker, useColor } from "react-color-palette";
import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import AirIcon from "./AirIcon.svg";
// Boutique States
import { BoutiqueStates } from "../../../../components/boutiqueStates";
import CountUp from "react-countup";
import { Modal } from "@mui/material";
import NauticIcon from "./NauticIcon.svg";
// Swiper
import { Navigation } from "swiper/modules";
import SearchLoopIcon from "../search.svg";
import VehiculesIcon from "./VehiculesIcon.svg";
import axios from "axios";
import { playOnHoverSound } from "../../../../utils/playSound";
import { GlobalContext } from "@/hook/GlobalContext";
import { fetchNui } from "@/hook/fetchNui";
import { useEnterKey, useEscapeKey } from "@/hook/useKeys";
import { useMouseWheel } from "@/hook/useMouseWheel";

type RGB = { r: number; g: number; b: number; a: number };
type HSV = { h: number; s: number; v: number; a: number };

type Catalogue = {
	name: string; // Vehicule ID
	label: string; // Vehicule name
	marque: string; // Vehicule marque (ex: Obey)
	model: string; // Vehicule model (ex: Argento)
	image: string; // Vehicule image
	price: number; // Vehicule price (ex: 2500)
	reduction: number; // Vehicule price with reduction (ex: 2000)
	category: string; // Vehicule category (ex: "sport")
	colors: string[]; // Vehicule colors (ex: [{r: 235, g: 64, b: 52},{r: 235, g: 64, b: 52}])
	performance: number[]; // Vehicule performance price per level (ex: { 1: 1000, 2: 2000, 3: 3000, 4: 4000, 5: 5000 })
	new: boolean;
};

interface Props {
	balance: number;
	credit?: number;
	premium: boolean;
	nextCollection: string;
	unique_id: string;
	catalogue: Catalogue[];
	discord: string;
	license: string;
}

interface State {
	onTypeChange: (type: "vehicules" | "nautic" | "air") => void;
}

export const Air: React.FC<State> = ({ onTypeChange }) => {
	useEscapeKey(() => {
		fetchNui("close");
	})
	useMouseWheel();

	const context = useContext(GlobalContext);
	const [swiper, setSwiper] = useState<SwiperType | null>(null);

	const [storeState, setStoreState] = useState<"loading" | "error" | "loaded" | "maintenance" | "purchasing" | "trying">("loading");

	const [filteredCatalogue, setFilteredCatalogue] = useState<Catalogue[]>([]);
	const [selectedVehicule, setSelectedVehicule] = useState<Catalogue | null>(null);
	const [selectedVehiculePrice, setSelectedVehiculePrice] = useState<number>(0);
	// const [selectedVehiculeCategory, setSelectedVehiculeCategory] = useState<string>(""); // (inutilisé)
	const [color, setColor] = useColor("rgb(255 255 255)");
	const [selectedPerformance, setSelectedPerformance] = useState<number>(1);
	const [colorSelectMode, setColorSelectMode] = useState<"predefined" | "custom">("predefined");

	const [vehiculeCategories, setVehiculeCategories] = useState<string[]>([]);

	const [searchValue, setSearchValue] = useState<string>("");

	const getBoutiqueData = async () => {
		setStoreState("loading");
		await axios
			.get("https://api-sex.sacul.cloud/data/airs", {
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
				},
			})
			.then(res => {
				if (res.data.maintenance) {
					setStoreState("maintenance");
					return;
				}

				if (res.data.error || !res.data.length) {
					setStoreState("error");
					return;
				}

				console.log(res.data);

				setFilteredCatalogue(res.data.filter((item: Catalogue) => item.category === res.data[0].category));
				setSelectedVehicule(res.data[0]);
				setSelectedVehiculePrice(res.data[0].reduction ? res.data[0].reduction : res.data[0].price);
				// setSelectedVehiculeCategory(res.data[0].category); // (inutilisé)

				// do the same thing commented above but always put dlc & addon categories first
				const allCategories = res.data.map((item: Catalogue) => item.category);
				const uniqueCategories = [...new Set(allCategories)];
				const dlcCategories = (uniqueCategories as string[]).filter((item: string) => item.includes("dlc"));
				const addonCategories = (uniqueCategories as string[]).filter((item: string) => item.includes("addon"));
				const otherCategories = (uniqueCategories as string[]).filter((item: string) => !item.includes("dlc") && !item.includes("addon"));
				const sortedCategories = [...dlcCategories, ...addonCategories, ...otherCategories];
				setVehiculeCategories(sortedCategories as string[]);

				setFilteredCatalogue(res.data.filter((item: Catalogue) => item.category === uniqueCategories[0]));
				setStoreState("loaded");
			})
			.catch(err => {
				console.log(err);
				setStoreState("error");
			});
	};

	useEffect(() => {
		getBoutiqueData();
	}, []);

	useEffect(() => {
		const onKeyPressed = (e: KeyboardEvent) => {
			if (e.key === "e") {
				setStoreState("trying");
			}
		};
		document.addEventListener("keydown", onKeyPressed);
		return () => document.removeEventListener("keydown", onKeyPressed);
	});

	useEnterKey(() => {
		if (storeState === "purchasing") {
			if (selectedVehiculePrice < ((context.data?.credit ?? 0) || (context.data?.balance ?? 0))) {
				buyConfirm();
			}
		} else if (storeState === "trying") {
			tryConfirm();
		}
	});

	const isDev = process.env.NODE_ENV === 'development';
	const data: Props = isDev
		? {
				balance: 1545,
				premium: true,
				nextCollection: "2023/08/26",
				unique_id: "69",
				discord: "618228507000045599",
				license: "69",
			}
		: context.data;

	const premium = context.data?.premium ?? false;
	const balance = context.data?.balance ?? 0;
	const safeCatalogue = context.data?.catalogue ?? [];


	const prev = () => {
		swiper?.slidePrev();
	};
	const next = () => {
		swiper?.slideNext();
	};


	const hexToRgb = (hex: string): RGB => {
		const bigint = parseInt(hex.replace("#", ""), 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;
		return { r, g, b, a: 1 };
	};

	const rgbToHsv = (rgb: RGB): HSV => {
		const { r, g, b } = rgb;
		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		const v = max / 255.0;
		const d = max - min;
		const s = max === 0 ? 0 : d / max;
		const h = max === min ? 0 : (max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4) / 6;
		return { h, s, v, a: 1 };
	};

	const setPredifinedColor = (color: string) => {
		const hex = color;
		const rgb = hexToRgb(hex);
		const hsv = rgbToHsv(rgb);
		setColor({ hex, rgb, hsv });
	};


	const buyConfirm = () => {
		playOnHoverSound();

		if (selectedVehicule) {
			selectedVehicule.price = selectedVehiculePrice ? selectedVehiculePrice : selectedVehicule.price;
		}

		try {
			axios.post("https://api-sex.sacul.cloud/buy/air", {
				server: "FA",
				color: color,
				price: selectedVehiculePrice,
				name: selectedVehicule?.name,
				label: selectedVehicule?.label,
				marque: selectedVehicule?.marque,
				model: selectedVehicule?.model,
				image: selectedVehicule?.image,
				category: selectedVehicule?.category,
				unique_id: data.unique_id,
				license: data.license,
			});
		} catch (error) {
			console.log("Error with Boutique API: ", error);
		}

		fetchNui("boutiqueVehBuy", selectedVehicule);
	};

	const tryConfirm = () => {
		playOnHoverSound();
		fetchNui("boutiqueVehTry", selectedVehicule);
	};

	const buyCancel = () => {
		playOnHoverSound();
		setStoreState("loaded");
	};

	// const newCarInCategory = (category: string) => {
	// 	return safeCatalogue.filter((item: Catalogue) => item.category === category && item.new).length > 0;
	// }; // (fonction inutilisée)

	// const handleCategoryChange = (category: string) => {
	// 	if (!safeCatalogue.length) {
	// 		console.error("Catalogue is empty", category);
	// 		return;
	// 	}

	// 	if (selectedVehiculeCategory === category) return;

	// 	setSelectedVehicule(safeCatalogue.filter((item: Catalogue) => item.category === category)[0]);
	// 	setSelectedVehiculePrice(
	// 		safeCatalogue.filter((item: Catalogue) => item.category === category)[0].reduction
	// 			? safeCatalogue.filter((item: Catalogue) => item.category === category)[0].reduction
	// 			: safeCatalogue.filter((item: Catalogue) => item.category === category)[0].price,
	// 	);
	// 	setSelectedVehiculeCategory(category);
	// 	setFilteredCatalogue(safeCatalogue.filter((item: Catalogue) => item.category === category));
	// 	setSearchValue("");

	// 	playOnHoverSound();
	// };

	useEffect(() => {
		if (!safeCatalogue.length) return;

		if (searchValue) {
			setFilteredCatalogue(safeCatalogue.filter((item: Catalogue) => item.label.toLowerCase().includes(searchValue)));
		} else {
			// setSelectedVehiculeCategory(vehiculeCategories[0]); // (inutilisé)
		}
	}, [searchValue]);

	useEffect(() => {
		fetchNui("boutiqueVehColor", { rgb: [color.rgb.r.toFixed(0), color.rgb.g.toFixed(0), color.rgb.b.toFixed(0)] });
	}, [color]);

	useEffect(() => {
		fetchNui("boutiqueVehPerf", selectedPerformance);
	}, [selectedPerformance]);

	useEffect(() => {
		if (!selectedVehicule) return;

		fetchNui("boutiqueVehSelect", { ...selectedVehicule, category: "avion" });
	}, [selectedVehicule]);

	console.log("Catégories disponibles (Air) :", vehiculeCategories);
	console.log("safeCatalogue (Air) :", safeCatalogue);

	return (
		<>
			{storeState === "loading" && <BoutiqueStates state="loading" retry={getBoutiqueData} />}

			{storeState === "error" && <BoutiqueStates state="error" retry={getBoutiqueData} />}

			{storeState === "maintenance" && <BoutiqueStates state="maintenance" retry={getBoutiqueData} />}

			{storeState === "purchasing" && (
				<Modal open={true}>
					<div className="Confirmation-Container">
						<div className="header">
							<div className="Title">
								Vous êtes sur le point d'acheter {selectedVehicule?.label} pour{" "}
								<div className="Price">
									<div className="Background">
										<svg xmlns="http://www.w3.org/2000/svg" width="295" height="59" viewBox="0 0 295 59" fill="none">
											<path
												d="M7.41664 6.72825C8.04097 2.85083 11.3875 0 15.3149 0H286.687C291.586 0 295.334 4.36344 294.596 9.20638L288.036 52.2064C287.44 56.1136 284.08 59 280.128 59H8.39118C3.46548 59 -0.290126 54.5913 0.49291 49.7282L7.41664 6.72825Z"
												fill="url(#paint0_linear_2135_325)"
											/>
											<defs>
												<linearGradient
													id="paint0_linear_2135_325"
													x1="143"
													y1="1.76756e-08"
													x2="143"
													y2="59"
													gradientUnits="userSpaceOnUse">
													<stop stopColor="#FAE293" />
													<stop offset="1" stopColor="#FFAD00" />
												</linearGradient>
											</defs>
										</svg>
									</div>
									<div className="span">{selectedVehiculePrice}</div>
									<img src="https://cdn.eltrane.cloud/3838384859/icons/logo.webp" />
								</div>
							</div>
						</div>
						{selectedVehiculePrice <= ((context.data?.credit ?? 0) || (context.data?.balance ?? 0)) && (
							<div className="Confirmation">
								<div className="Buttons">
									<div className="Button" onClick={buyConfirm}>
										<div className="Key Green">ENTRER</div>
										<div className="Label">CONFIRMER</div>
									</div>
									<div className="Button" onClick={buyCancel}>
										<div className="Key Red">SUPPR</div>
										<div className="Label">RETOUR</div>
									</div>
								</div>
							</div>
						)}

						{selectedVehiculePrice > ((context.data?.credit ?? 0) || (context.data?.balance ?? 0)) && (
							<div className="Confirmation">
								<div className="Text">
									<div>
										<div className="Title">Solde insuffisant</div>
										<div className="Subtitle">
											Vous n'avez pas assez de Coins pour acheter ce véhicule
											<br />
											Rechargez votre solde pour pouvoir l'acheter
										</div>
									</div>
								</div>
								<div className="Buttons">
									<div className="Button" onClick={buyCancel}>
										<div className="Key Red">SUPPR</div>
										<div className="Label">RETOUR</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</Modal>
			)}

			{storeState === "trying" && (
				<Modal open={true}>
					<div className="Confirmation-Container">
						<div className="header">
							<div className="Title">
								Vous êtes sur le point d'essayer le véhicule {selectedVehicule?.label} pendant 2 minutes
							</div>
						</div>
						<div className="Confirmation">
							<div className="Buttons">
								<div className="Button" onClick={tryConfirm}>
									<div className="Key Green">ENTRER</div>
									<div className="Label">CONFIRMER</div>
								</div>
								<div className="Button" onClick={buyCancel}>
									<div className="Key Red">SUPPR</div>
									<div className="Label">RETOUR</div>
								</div>
							</div>
						</div>
					</div>
				</Modal>
			)}

			{storeState === "loaded" && (
				<div className="BoutiqueVehicules">
					<div className="Header">
						<div className="BoutiqueTitle">
							<p className="title">Vehicules</p>
							<div className="separator"></div>
							{selectedVehicule && <p className="subtitle">{selectedVehicule.label}</p>}
						</div>
						<div className="TopButton">
							<span
								onClick={() => {
									fetchNui("buyPremium");
									playOnHoverSound();
								}}>
								<p style={{ background: "linear-gradient(180deg, #d850ca 0%, #db6bdd 100%)" }}>
									{premium ? "Premium" : "Non Premium"}
								</p>
								Premium
							</span>
							<span
								onClick={() => {
									fetchNui("buyVCoins");
									playOnHoverSound();
								}}>
								<p style={{ background: "linear-gradient(180deg, #fae293 0%, #ffad00 100%)" }}>
									{balance}
									<img src="https://cdn.eltrane.cloud/3838384859/icons/logo.webp" alt="logo" />
								</p>
								Coins
							</span>
							<span
								onClick={() => {
									navigator.clipboard.writeText(context.data?.unique_id ?? "");
									playOnHoverSound();
								}}>
								<p style={{ background: "linear-gradient(180deg, #5e6cb6 0%, #5e6cb6 100%)" }}>{(context.data?.unique_id ?? "")}</p>
								ID Boutique
							</span>
						</div>
					</div>
					{selectedVehicule && (
						<div className="Content">
							<div className="Left">
								<div className="Colors">
									{colorSelectMode === "predefined" ? (
										<div className="PredefinedColors">
											<p className="title">Couleurs</p>
											<div className="colors">
												{selectedVehicule?.colors.map((color, index) => (
													<div
														className="dot"
														key={index}
														onClick={() => {
															playOnHoverSound();
															setPredifinedColor(color);
														}}>
														<div className="color" style={{ backgroundColor: color }}></div>
													</div>
												))}
												<div
													className="dot"
													onClick={() => {
														playOnHoverSound();
														setColorSelectMode("custom");
													}}>
													<div
														className="color"
														style={{
															background:
																"linear-gradient(202.91deg, #FF0000 21.47%, #FFC700 31.54%, #24FF00 41.61%, #00F0FF 51.67%, #001AFF 62.71%, #FF00C7 72.46%, #FF0000 83.82%),linear-gradient(270deg, #FFFFFF 0%, #838383 100%)",
														}}></div>
												</div>
											</div>
										</div>
									) : (
										<div className="CustomColors">
											<div className="title">
												<img
													src={"https://cdn.eltrane.cloud/3838384859/BoutiqueVehicules/arrow_left.webp"}
													onClick={() => {
														playOnHoverSound();
														setColorSelectMode("predefined");
													}}
												/>
												<span>Couleur Custom</span>
											</div>
											<div className="custom-layout">
												<div className="picker">
													<ColorPicker
														height={125}
														color={color}
														onChange={setColor}
														hideInput={["hsv"]}
														hideAlpha
													/>
												</div>
											</div>
										</div>
									)}
								</div>
								<div className="Search">
									<div className="input">
										<div className="icon">
											<img src={SearchLoopIcon} />
										</div>
										<input
											placeholder="Rechercher"
											type="text"
											value={searchValue}
											onChange={e => {
												setSearchValue(e.target.value.toLowerCase());
											}}
										/>
									</div>
								</div>
								<div className="TypeChange">
									<div className="buttons">
										<div className="button" onClick={() => onTypeChange("vehicules")}> <img src={VehiculesIcon} /> </div>
										<div className="button" onClick={() => onTypeChange("nautic")}> <img src={NauticIcon} /> </div>
										<div className="button active"> <img src={AirIcon} /> </div>
									</div>
									<div className="title">
										<img src={AirIcon} />
										Aériens
									</div>
								</div>
							</div>
							<div className="Right">
								{/* --- DÉBUT DÉSACTIVATION TEMPORAIRE DES CATÉGORIES AÉRIENNES --- */}
								{/*
								<div className="Categories">
									<p className="title">Catégories</p>
									<div className="list">
										{vehiculeCategories.map((category, index) => (
											<div
												className={`Category ${category === selectedVehiculeCategory ? "active" : ""} ${
													newCarInCategory(category) ? "new" : ""
												}`}
												key={index}
												onClick={() => handleCategoryChange(category)}>
												<img
													src={`https://cdn.eltrane.cloud/3838384859/BoutiqueVehicules/vision/${category}.webp`}
												/>
												<h4>{category}</h4>
											</div>
										))}
									</div>
								</div>
								*/}
							</div>
							<div className="Buy">
								<div className="Cta">
									<div
										className="Button"
										onClick={() => {
											playOnHoverSound();
											setStoreState("purchasing");
										}}>
										<p>Acheter</p>
									</div>
									<div className="Price">
										<CountUp
											className="amount"
											start={0}
											end={selectedVehiculePrice}
											duration={0.5}
											decimals={0}
											separator=" "
										/>
										<img src={"https://cdn.eltrane.cloud/3838384859/icons/logo.webp"} />
									</div>
								</div>
								<div
									className="VehTry"
									onClick={() => {
										playOnHoverSound();
										setStoreState("trying");
									}}>
									<span className="Key">E</span>
									<span className="Label">Essayer le véhicule</span>
								</div>
							</div>
						</div>
					)}
					{safeCatalogue.length > 0 && (
						<div className="Footer">
							<img
								src="https://cdn.eltrane.cloud/3838384859/concessvoiture/fast-forward.webp"
								className="LeftArrow"
								onClick={() => {
									prev();
									playOnHoverSound();
								}}
							/>
							<Swiper
								modules={[Navigation]}
								slidesPerView={4}
								grabCursor={true}
								centeredSlidesBounds={true}
								initialSlide={0}
								slideToClickedSlide={true}
								className="SwiperContainer"
								onSlideChange={swiper => {
									setSwiper(swiper);
									setSelectedVehicule(filteredCatalogue[swiper.activeIndex]);
									setSelectedVehiculePrice(
										filteredCatalogue[swiper.activeIndex].reduction || filteredCatalogue[swiper.activeIndex].price,
									);
									setSelectedPerformance(1);
								}}
								style={{ width: "100%", marginLeft: "30px", marginRight: "30px" }}>
								{filteredCatalogue.map((item, index) => (
									<SwiperSlide
										onClick={() => {
											setSelectedVehicule(item);
											setSelectedVehiculePrice(item.reduction || item.price);
											setSelectedPerformance(1);
											playOnHoverSound();
										}}
										key={index}
										style={{ height: "129px", width: "380px" }}>
										<div className={`Item ${[item.name == selectedVehicule?.name ? "selected" : ""]}`}>
											<div className="Picture">
												<img src={item.image} />
											</div>
											<div className="Texts">
												<span className="Model">{item.model}</span>
												<span className="Marque">{item.marque}</span>
											</div>
											{item.reduction && (
												<div className="Reduction">
													<div className="Prices">
														<CountUp
															className="amount"
															start={0}
															end={item.price}
															duration={1}
															decimals={0}
															separator=" "
														/>
														<CountUp
															className="amount2"
															start={0}
															end={item.reduction}
															duration={1}
															decimals={0}
															separator=" "
														/>
													</div>
													<img src={"https://cdn.eltrane.cloud/3838384859/icons/logo.webp"} />
												</div>
											)}

											{!item.reduction && (
												<div className="Price">
													<CountUp
														className="amount"
														start={0}
														end={item.price}
														duration={1}
														decimals={0}
														separator=" "
													/>
													<img src={"https://cdn.eltrane.cloud/3838384859/icons/logo.webp"} />
												</div>
											)}
										</div>
									</SwiperSlide>
								))}
							</Swiper>
							<img
								src="https://cdn.eltrane.cloud/3838384859/concessvoiture/fast-forward.webp"
								className="RightArrow"
								onClick={() => {
									next();
									playOnHoverSound();
								}}
							/>
						</div>
					)}
				</div>
			)}

		</>
	);
};
