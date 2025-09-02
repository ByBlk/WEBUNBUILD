import "swiper/swiper-bundle.css";

// Color Palette
import { ColorPicker, useColor } from "react-color-palette";
import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

// import AirIcon from "./AirIcon.svg";
// Boutique States
import { BoutiqueStates } from "../../../../components/boutiqueStates";
import CountUp from "react-countup";
import Input from "@/components/input";
import { Modal } from "@mui/material";
// import NauticIcon from "./NauticIcon.svg";
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
	reduction?: number | null; // Vehicule price with reduction (ex: 2000) - Optional or null
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

// interface State {
//   onTypeChange: (type: "vehicules" | "nautic" | "air") => void;
// } // (inutilisé)

export const Vehicules: React.FC = () => {
	useEscapeKey(() => {
		// fetchNui("nui:aaaaa:close");
		fetchNui("nui:boutique-razv4:close");
	});
	useMouseWheel();

	const context = useContext(GlobalContext);
	const [swiper, setSwiper] = useState<SwiperType | null>(null);

	const [storeState, setStoreState] = useState<"loading" | "error" | "loaded" | "maintenance" | "purchasing" | "trying">("loading");

	const [catalogue, setCatalogue] = useState<Catalogue[]>([]);
	const [filteredCatalogue, setFilteredCatalogue] = useState<Catalogue[]>([]);
	const [selectedVehicule, setSelectedVehicule] = useState<Catalogue | null>(null);
	const [selectedVehiculePrice, setSelectedVehiculePrice] = useState<number>(0);
	const [selectedVehiculeCategory, setSelectedVehiculeCategory] = useState<string>("");
	const [color, setColor] = useColor("rgb(255 255 255)");
	const [selectedPerformance, setSelectedPerformance] = useState<number>(1);
	const [colorSelectMode, setColorSelectMode] = useState<"predefined" | "custom">("predefined");

	const [vehiculeCategories, setVehiculeCategories] = useState<string[]>([]);

	const [searchValue, setSearchValue] = useState<string>("");
		

	const getBoutiqueData = () => {
		setStoreState("loading");

		// Table test avec le même format que l'API
	const testVehicules = [
	{
		name: "Yosemite1500",
		label: "Declasse Yosemite 1500",
		marque: "Declasse",
		model: "Yosemite 1500",
		image: "https://cdn.eltrane.cloud/3838384859/concess/Yosemite1500.webp",
		price: 2100,
		reduction: null,
		category: "toutterrain",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: true
	},
	{
		name: "Vorschlaghammer",
		label: "Benefactor Vorschlaghammer",
		marque: "Benefactor",
		model: "Vorschlaghammer",
		image: "https://cdn.eltrane.cloud/3838384859/concess/Vorschlaghammer.webp",
		price: 1600,
		reduction: null,
		category: "coupe",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: true
	},
	{
		name: "Pipistrello",
		label: "Overflod Pipistrello",
		marque: "Overflod",
		model: "Pipistrello",
		image: "https://cdn.eltrane.cloud/3838384859/concess/Pipistrello.webp",
		price: 7000,
		reduction: null,
		category: "supersportive",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: true
	},
	{
		name: "Paragon3",
		label: "Enus Paragon S",
		marque: "Enus",
		model: "Paragon S",
		image: "https://cdn.eltrane.cloud/3838384859/concess/Paragon3.webp",
		price: 5400,
		reduction: null,
		category: "sport",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: true
	},
	{
		name: "Niobe",
		label: "Ubermacht Niobe",
		marque: "Ubermacht",
		model: "Niobe",
		image: "https://cdn.eltrane.cloud/3838384859/concess/Niobe.webp",
		price: 5600,
		reduction: null,
		category: "sport",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: true
	},
	{
		name: "Eurosx32",
		label: "Annis Euros X32",
		marque: "Annis",
		model: "Euros X32",
		image: "https://cdn.eltrane.cloud/3838384859/concess/Eurosx32.webp",
		price: 3900,
		reduction: null,
		category: "sportclassic",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: true
	},
	{
		name: "Envisage",
		label: "Bollokan Envisage",
		marque: "Bollokan",
		model: "Envisage",
		image: "https://cdn.eltrane.cloud/3838384859/concess/Envisage.webp",
		price: 4250,
		reduction: null,
		category: "sportclassic",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: true
	},
	{
		name: "Driftvorschlag",
		label: "Benefactor Vorschlaghammer",
		marque: "Benefactor",
		model: "Vorschlaghammer",
		image: "https://cdn.eltrane.cloud/3838384859/concess/Driftvorschlag.webp",
		price: 2000,
		reduction: null,
		category: "sedans",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: true
	},
	{
		name: "Driftsentinel",
		label: "Sentinel Classic Widebody",
		marque: "Sentinel",
		model: "Classic Widebody",
		image: "https://cdn.eltrane.cloud/3838384859/concess/Driftsentinel.webp",
		price: 2100,
		reduction: null,
		category: "sedans",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: true
	},
	{
		name: "Driftnebula",
		label: "Nebula Nebula Turbo Drift Mode",
		marque: "Nebula",
		model: "Nebula Turbo Drift Mode",
		image: "https://cdn.eltrane.cloud/3838384859/concess/Driftnebula.webp",
		price: 2000,
		reduction: null,
		category: "sedans",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: false
	},
	{
		name: "Driftcypher",
		label: "Cypher Drift Mode Ubermacht",
		marque: "Cypher Drift Mode",
		model: "Ubermacht",
		image: "https://cdn.eltrane.cloud/3838384859/concess/Driftcypher.webp",
		price: 4000,
		reduction: null,
		category: "sport",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: true
	},
	{
		name: "Dominator10",
		label: "Dominator FX Vapid ",
		marque: "Dominator FX",
		model: "Vapid ",
		image: "https://cdn.eltrane.cloud/3838384859/concess/Dominator10.webp",
		price: 1900,
		reduction: null,
		category: "sportclassic",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: true
	},
	{
		name: "Coquette5",
		label: "Invetero Coquette D1",
		marque: "Invetero",
		model: "Coquette D1",
		image: "https://cdn.eltrane.cloud/3838384859/concess/Coquette5.webp",
		price: 2600,
		reduction: null,
		category: "sportclassic",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: true
	},
	{
		name: "Castigator",
		label: "Canis Castigator",
		marque: "Canis",
		model: "Castigator",
		image: "https://cdn.eltrane.cloud/3838384859/concess/Castigator.webp",
		price: 4000,
		reduction: null,
		category: "suv",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: true
	},
	{
		name: "primo2",
		label: "AlbanyAlbany Primo Custom",
		marque: "AlbanyAlbany",
		model: "Primo Custom",
		image: "https://cdn.eltrane.cloud/3838384859/concess/primo2.webp",
		price: 1800,
		reduction: null,
		category: "sedans",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: true
	},
	{
		name: "patriot2",
		label: "Mammoth Patriot Stretch",
		marque: "Mammoth",
		model: "Patriot Stretch",
		image: "https://cdn.eltrane.cloud/3838384859/concess/patriot2.webp",
		price: 5500,
		reduction: null,
		category: "suv",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: true
	},
	{
		name: "deity",
		label: "Enus Deity",
		marque: "Enus",
		model: "Deity",
		image: "https://cdn.eltrane.cloud/3838384859/concess/deity.webp",
		price: 3600,
		reduction: null,
		category: "sedans",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: true
	},
	{
		name: "baller8",
		label: "Gallivanter Baller ST-D",
		marque: "Gallivanter",
		model: "Baller ST-D",
		image: "https://cdn.eltrane.cloud/3838384859/concess/baller8.webp",
		price: 4200,
		reduction: null,
		category: "suv",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: true
	},
	{
		name: "rebla",
		label: "Ubermacht Rebla GTS",
		marque: "Ubermacht",
		model: "Rebla GTS",
		image: "https://cdn.eltrane.cloud/3838384859/concess/rebla.webp",
		price: 3950,
		reduction: null,
		category: "suv",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: false
	},
	{
		name: "paragon",
		label: "Enus Paragon",
		marque: "Enus",
		model: "Paragon",
		image: "https://cdn.eltrane.cloud/3838384859/concess/paragon.webp",
		price: 4100,
		reduction: null,
		category: "sport",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: false
	},
	{
		name: "kamacho",
		label: "Canis Kamacho",
		marque: "Canis",
		model: "Kamacho",
		image: "https://cdn.eltrane.cloud/3838384859/concess/kamacho.webp",
		price: 4000,
		reduction: null,
		category: "toutterrain",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: false
	},
	{
		name: "italirsx",
		label: "Grotti Itali RSX",
		marque: "Grotti",
		model: "Itali RSX",
		image: "https://cdn.eltrane.cloud/3838384859/concess/italirsx.webp",
		price: 7100,
		reduction: null,
		category: "supersportive",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: false
	},
	{
		name: "gbvivantgrb",
		label: "Bordeaux Vivant GRB",
		marque: "Bordeaux",
		model: "Vivant GRB",
		image: "https://cdn.eltrane.cloud/3838384859/concess/gbvivantgrb.webp",
		price: 2450,
		reduction: null,
		category: "compact",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: false
	},
	{
		name: "gbsidewinder",
		label: "Maxwell Sidewinder",
		marque: "Maxwell",
		model: "Sidewinder",
		image: "https://cdn.eltrane.cloud/3838384859/concess/gbsidewinder.webp",
		price: 2800,
		reduction: null,
		category: "sportclassic",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: false
	},
	{
		name: "gbronin",
		label: "Emperor Ronin",
		marque: "Emperor",
		model: "Ronin",
		image: "https://cdn.eltrane.cloud/3838384859/concess/gbronin.webp",
		price: 4000,
		reduction: null,
		category: "sport",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: false
	},
	{
		name: "gbraidillon",
		label: "Toundra Raidillon",
		marque: "Toundra",
		model: "Raidillon",
		image: "https://cdn.eltrane.cloud/3838384859/concess/gbraidillon.webp",
		price: 3000,
		reduction: null,
		category: "sportclassic",
		colors: ["#000000", "#FFFFFF", "#1600ff", "#ff0000"],
		performance: [250, 500, 750, 1000],
		new: false
	},
]

		// Simuler un délai de chargement
		setTimeout(() => {
			try {
				const res = { data: testVehicules };

				if (!res.data.length) {
					setStoreState("error");
					return;
				}

				setCatalogue(res.data);
				setSelectedVehicule(res.data[0]);
				setSelectedVehiculePrice(res.data[0].reduction ?? res.data[0].price ?? 0);

				// do the same thing commented above but always put dlc & addon categories first
				const allCategories = res.data.map((item: Catalogue) => item.category);
				const uniqueCategories: string[] = Array.from(new Set(allCategories)) as string[];
				const loreCategories = uniqueCategories.filter((item: string) => item.includes("lore"));
				const dlcCategories = (uniqueCategories as string[]).filter((item: string) => item.includes("dlc"));
				const addonCategories = (uniqueCategories as string[]).filter((item: string) => item.includes("addon"));
				const otherCategories = uniqueCategories.filter(
					(item: string) => !item.includes("dlc") && !item.includes("addon") && !item.includes("lore"),
				);
				const sortedCategories = [...loreCategories, ...dlcCategories, ...addonCategories, ...otherCategories];
				setVehiculeCategories(sortedCategories as string[]);

				setFilteredCatalogue(res.data.filter((item: Catalogue) => item.category === uniqueCategories[0]));

				setStoreState("loaded");
			} catch (err) {
				console.log(err);
				setStoreState("error");
			}
		}, 500); // Délai de 500ms pour simuler le chargement
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
			const userCredit = (context.data?.credit ?? 0) || (context.data?.balance ?? 0);
			if (selectedVehiculePrice < userCredit) {
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

	const getLinearGradientPerPerformance = (performance: number) => {
		switch (performance) {
			case 1:
				return "linear-gradient(90deg, #FFF 0%, #FFF 0%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.25) 100%)";
			case 2:
				return "linear-gradient(90deg, #FFF 0%, #FFF 25%, rgba(255, 255, 255, 0.25) 25%, rgba(255, 255, 255, 0.25) 100%)";
			case 3:
				return "linear-gradient(90deg, #FFF 0%, #FFF 50%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.25) 100%)";
			case 4:
				return "linear-gradient(90deg, #FFF 0%, #FFF 75%, rgba(255, 255, 255, 0.25) 75%, rgba(255, 255, 255, 0.25) 100%)";
			case 5:
				return "linear-gradient(90deg, #FFF 0%, #FFF 100%, rgba(255, 255, 255, 0.25) 100%, rgba(255, 255, 255, 0.25) 100%)";
			default:
				return "linear-gradient(90deg, #FFF 0%, #FFF 100%, rgba(255, 255, 255, 0.25) 100%, rgba(255, 255, 255, 0.25) 100%)";
		}
	};

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

	const updateSelectedPerformance = (value: number) => {
		setSelectedPerformance(value);

		if (value === 1) {
			setSelectedVehiculePrice(selectedVehicule?.reduction ?? selectedVehicule?.price ?? 0);
			return;
		}

		const performancePrice = selectedVehicule?.performance[value - 2];
		const price = (selectedVehicule?.reduction ?? selectedVehicule?.price ?? 0) + (performancePrice ?? 0);

		setSelectedVehiculePrice(price);
	};

	const buyConfirm = () => {
		playOnHoverSound();

		if (selectedVehicule) {
			selectedVehicule.price = selectedVehiculePrice ? selectedVehiculePrice : selectedVehicule.price;
		}

		try {
			axios.post("https://api-sex.sacul.cloud/buy/vehicule", {
				server: "FA",
				performance: selectedPerformance,
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

	const newCarInCategory = (category: string) => {
		return catalogue.filter(item => item.category === category && item.new).length > 0;
	};

	useEffect(() => {
		if (!catalogue.length) return;

		setFilteredCatalogue(catalogue.filter(item => item.category === selectedVehiculeCategory));
		setSelectedVehicule(catalogue.filter(item => item.category === selectedVehiculeCategory)[0]);
		setSelectedVehiculePrice(
			catalogue.filter(item => item.category === selectedVehiculeCategory)[0].reduction ??
				catalogue.filter(item => item.category === selectedVehiculeCategory)[0].price ?? 0,
		);
	}, [selectedVehiculeCategory]);

	useEffect(() => {
		if (!catalogue.length) return;

		if (searchValue) {
			setFilteredCatalogue(catalogue.filter(item => item.label.toLowerCase().includes(searchValue)));
		} else {
			setSelectedVehiculeCategory(vehiculeCategories[0]);
		}
	}, [searchValue]);

	useEffect(() => {
		fetchNui("boutiqueVehColor", { rgb: [color.rgb.r.toFixed(0), color.rgb.g.toFixed(0), color.rgb.b.toFixed(0)] });
	}, [color]);

	useEffect(() => {
		fetchNui("boutiqueVehPerf", selectedPerformance);
	}, [selectedPerformance]);

	useEffect(() => {
		fetchNui("boutiqueVehSelect", selectedVehicule);
	}, [selectedVehicule]);

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
								Vous êtes sur le point d'acheter {selectedVehicule?.label} pour
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
									{/* {data.premium ? "S'abonner" : "S'abonner"} */}
								</p>
								Premium
							</span>
							<span
								onClick={() => {
									fetchNui("buyVCoins");
									playOnHoverSound();
								}}>
								<p style={{ background: "linear-gradient(180deg, #fae293 0%, #ffad00 100%)" }}>
									{context.data?.credit ?? context.data?.balance ?? 0}
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
											<div className="color-title-wrapper">
												<img src="https://cdn.eltrane.cloud/3838384859/assets/boutique/icons/IconColor.svg" alt="" />
												<p className="title">Couleurs</p>
											</div>
										
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
								<div className="Performance">
									<p className="title">Performance</p>
									<div>
										<Input
											value={selectedPerformance}
											onChange={e => {
												updateSelectedPerformance(parseInt(e.target.value));
											}}
											min={1}
											max={5}
											style={{
												background: getLinearGradientPerPerformance(selectedPerformance),
											}}
											type="range"
										/>
										<output>{selectedPerformance}</output>
									</div>
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
										{/*
										<div className="button" onClick={() => onTypeChange("nautic")}>
											<img src={NauticIcon} />
										</div>
										<div className="button" onClick={() => onTypeChange("air")}>
											<img src={AirIcon} />
										</div>
										*/}
									</div>
									<div className="title">
										<img src={VehiculesIcon} />
										Véhicules
									</div>
								</div>
							</div>
							<div className="Right">
								<div className="Categories">
									<p className="title">Catégories</p>
									<div className="list">
										{vehiculeCategories.map((category, index) => (
											<div
												className={`Category ${category === selectedVehiculeCategory ? "active" : ""} ${
													category === "lore" ? "exclu" : newCarInCategory(category) ? "new" : ""
												}`}
												key={index}
												onClick={() => {
													setSearchValue("");
													setSelectedVehiculeCategory(category);
													setSelectedVehicule(catalogue.filter(item => item.category === category)[0]);
													setSelectedVehiculePrice(
														catalogue.filter(item => item.category === category)[0].reduction ??
															catalogue.filter(item => item.category === category)[0].price ?? 0,
													);
													setSelectedPerformance(1);

													playOnHoverSound();
												}}>
												<img src={`https://cdn.eltrane.cloud/3838384859/BoutiqueVehicules/${category}.webp`} />
												<h4>{category}</h4>
											</div>
										))}
									</div>
								</div>
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
					{catalogue.length > 0 && (
						<div className="Footer">
							<img
								src="https://cdn.eltrane.cloud/3838384859/assets/boutique/icons/arrow.svg"
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
										filteredCatalogue[swiper.activeIndex].reduction ?? filteredCatalogue[swiper.activeIndex].price ?? 0,
									);
									setSelectedPerformance(1);
								}}
								style={{ width: "100%", marginLeft: "30px", marginRight: "30px" }}>
								{filteredCatalogue.map((item, index) => (
									<SwiperSlide
										onClick={() => {
											setSelectedVehicule(item);
											setSelectedVehiculePrice(item.reduction ?? item.price ?? 0);
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
								src="https://cdn.eltrane.cloud/3838384859/assets/boutique/icons/arrow.svg"
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
