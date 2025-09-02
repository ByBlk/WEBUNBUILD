import { ISpawnPoint, IVisageMenuData, PageNameStringType } from "@/features/characterCration/types";

export const MALE_VISAGE_MENU_DATA: IVisageMenuData[] = [
	{
		name: "Pilosité",
		items: [
			{
				name: "cheveux",
				image: "maleHairBackground",
				id: "hair",
				choices: ["items", "color1", "color2"],
				fullName: 'Coupes de cheveux'
			},
			{
				name: "barbe",
				id: "beard",
				image: "maleBeardBackground",
				choices: ["items", "color1", "opacity"],
			},
			{
				name: "sourcils",
				id: "sourcils",
				image: "maleEyebrowsBackground",
				choices: ["items", "color1", "color2", "opacity"],
			},
			{
				name: "torse",
				id: "pilosite",
				image: "maleTorsoBackground",
				choices: ["items", "color1", "opacity"],
			},
		],
	},
	{
		name: "Yeux",
		items: [
			{
				name: "couleurs",
				id: "eyes",
				choices: ["color1"],
			},
		],
	},
	{
		name: "Maquillage",
		items: [
			{
				name: "yeux",
				id: "eyesmaquillage",
				choices: ["items", "color1", "color2", "opacity"],
			},
			// {
			// 	name: "fard à joues",
			// 	id: "fard",
			// 	choices: ["items", "color1", "opacity"],
			// },
			{
				name: "lèvres",
				id: "rougealevre",
				choices: ["items", "color1", "opacity"],
			},
		],
	},
	{
		name: "Détails",
		items: [
			{
				name: "tâches cutanées",
				id: "taches",
				choices: ["items", "opacity"],
			},
			{
				name: "marques de la peau",
				id: "marques",
				choices: ["items", "opacity"],
			},
			{
				name: "acné",
				id: "acne",
				choices: ["items", "opacity"],
			},
			{
				name: "cicatrice",
				id: "cicatrice",
				choices: ["items", "opacity"],
			},
			{
				name: "teint",
				id: "teint",
				choices: ["items", "opacity"],
			},
			{
				name: "tâches de rousseur",
				id: "rousseur",
				choices: ["items", "opacity"],
			},
		],
	},
];

export const FEMALE_VISAGE_MENU_DATA: IVisageMenuData[] = [
	{
		name: "Pilosité",
		items: [
			{
				name: "cheveux",
				image: "femaleHairBackground",
				id: "hair",
				choices: ["items", "color1", "color2"],
				fullName: 'Coupes de cheveux'
			},
			{
				name: "Sourcils",
				id: "eyebrows",
				image: "femaleEyebrowBackground",
				choices: ["items", "color1", "opacity"],
			},
			{
				name: "Yeux",
				id: "eye_makeup",
				image: "femaleEyeBackground",
				choices: ["items", "color1", "opacity"],
			},
			{
				name: "Lèvres",
				id: "lips_makeup",
				image: "femaleLipsBackground",
				choices: ["items", "color1", "opacity"],
			},
		],
	},
	{
		name: "Yeux",
		items: [
			{
				name: "couleurs",
				id: "eyes",
				choices: ["color1"],
			},
		],
	},
	{
		name: "Détails",
		items: [
			{
				name: "tâches cutanées",
				id: "taches",
				choices: ["items", "opacity"],
			},
			{
				name: "marques de la peau",
				id: "marques",
				choices: ["items", "opacity"],
			},
			{
				name: "acné",
				id: "acne",
				choices: ["items", "opacity"],
			},
			{
				name: "cicatrice",
				id: "cicatrice",
				choices: ["items", "opacity"],
			},
			{
				name: "teint",
				id: "teint",
				choices: ["items", "opacity"],
			},
			{
				name: "tâches de rousseur",
				id: "rousseur",
				choices: ["items", "opacity"],
			},
		],
	},
];

export const PARENT_LIST = [
	{
		image: "parent_male_0",
		name: "Benjamin",
	},

	{
		image: "parent_male_1",
		name: "Daniel",
	},

	{
		image: "parent_male_2",
		name: "Joshua",
	},

	{
		image: "parent_male_3",
		name: "Noah",
	},

	{
		image: "parent_male_4",
		name: "Andrew",
	},

	{
		image: "parent_male_5",
		name: "Juan",
	},

	{
		image: "parent_male_6",
		name: "Alex",
	},

	{
		image: "parent_male_7",
		name: "Isaac",
	},

	{
		image: "parent_male_8",
		name: "Evan",
	},

	{
		image: "parent_male_9",
		name: "Ethan",
	},

	{
		image: "parent_male_10",
		name: "Vincent",
	},

	{
		image: "parent_male_11",
		name: "Angel",
	},

	{
		image: "parent_male_12",
		name: "Diego",
	},

	{
		image: "parent_male_13",
		name: "Adrian",
	},

	{
		image: "parent_male_14",
		name: "Gabriel",
	},

	{
		image: "parent_male_15",
		name: "Michael",
	},

	{
		image: "parent_male_16",
		name: "Santiago",
	},

	{
		image: "parent_male_17",
		name: "Kevin",
	},

	{
		image: "parent_male_18",
		name: "Louis",
	},

	{
		image: "parent_male_19",
		name: "Samuel",
	},

	{
		image: "parent_male_20",
		name: "Anthony",
	},
	// FEMMES
	{
		image: "parent_female_0",
		name: "Hanna",
	},

	{
		image: "parent_female_1",
		name: "Audrey",
	},

	{
		image: "parent_female_2",
		name: "Jasmine",
	},

	{
		image: "parent_female_3",
		name: "Giselle",
	},

	{
		image: "parent_female_4",
		name: "Amelia",
	},

	{
		image: "parent_female_5",
		name: "Isabella",
	},

	{
		image: "parent_female_6",
		name: "Zoe",
	},

	{
		image: "parent_female_7",
		name: "Ava",
	},

	{
		image: "parent_female_8",
		name: "Camila",
	},

	{
		image: "parent_female_9",
		name: "Violet",
	},

	{
		image: "parent_female_10",
		name: "Sophia",
	},

	{
		image: "parent_female_11",
		name: "Evelyn",
	},

	{
		image: "parent_female_12",
		name: "Nicole",
	},

	{
		image: "parent_female_13",
		name: "Ashley",
	},

	{
		image: "parent_female_14",
		name: "Grace",
	},

	{
		image: "parent_female_15",
		name: "Brianna",
	},

	{
		image: "parent_female_16",
		name: "Natalie",
	},

	{
		image: "parent_female_17",
		name: "Olivia",
	},

	{
		image: "parent_female_18",
		name: "Elizabeth",
	},

	{
		image: "parent_female_19",
		name: "Charlotte",
	},

	{
		image: "parent_female_20",
		name: "Emma",
	},
	{
		image: "parent_male_23",
		name: "Claude",
	},
	{
		image: "parent_male_22",
		name: "Niko",
	},
	{
		image: "parent_male_21",
		name: "John",
	},
	{
		image: "parent_female_21",
		name: "Misty",
	},
];

export const APPREARANCE_COLORS = [
    '#161319', '#1E1C19', '#4C382D', '#453622', '#7B3B1F', 
    '#954430', '#A5573E', '#AF6F47', '#9F694C', '#C6984C', 
    '#D5AA6E', '#DFB97C', '#CA9F6E', '#EEC67C', '#E5BE7E', 
    '#FAE1A7', '#BB8C60', '#A35C3C', '#903425', '#861516', 
    '#A41818', '#C3210A', '#DD4522', '#E54726', '#D0613A', 
    '#715032', '#846B5F', '#B9A496', '#DAC4B7', '#F7E6D9', 
    '#66495D', '#A2698A', '#AB6E0B', '#EF3DC8', '#FF4598', 
    '#FFAEBF', '#0CA892', '#08A9A5', '#0A528F', '#76BE75', 
    '#34A668', '#165655', '#98B128', '#7FA217', '#F1C862', 
    '#EEB212', '#E0860E', '#F79D0F', '#F38F0F', '#E74615', 
    '#FF6515', '#FE5B22', '#FC4315', '#C40C0F', '#8F0A0E', 
    '#2C1B16', '#503326', '#62362D', '#3C1F18', '#45291F', 
    '#080A0E', '#D4B99E', '#D4B99E', '#D5AA6E'
];

export const SPAWN_POINTS: ISpawnPoint[] = [
	{
		name: 'Los Santos',
		elements: [
			{
				image: 'vespucci',
				name: 'Vespucci',
				id: 'vespucci',
			},
			{
				image: 'cubes',
				name: 'Place des cubes',
				id: 'cubes',
			},
			{
				image: 'gouvernement',
				name: 'Gouvernement',
				id: 'gouvernement',
			},
		]
	},
	{
		name: 'Blaine County',
		elements: [
			{
				image: 'sandyshore',
				name: 'Sandy Shore',
				id: 'sandyshore',
			},
			{
				image: 'paletobay',
				name: 'Paleto Bay',
				id: 'paletobay',
			},
		]
	},
	{
		name: 'Cayo Perico',
		elements: [
			{
				image: 'aeroport',
				name: 'Aéroport',
				id: 'aeroport',
			},
		]
	},
]

export const EYE_COLORS = [
	"#10561F", "#186E94", "#091B51", "#722E21", "#452019", "#DF6F21",
	"#44C9E5", "#FFFFFF", "#F900FF", "#ECCA32", "#721EAA", "#151515",
	"#9F9F9F", "#BA7F22", "#6399E0", "#B34141", "#12583A", "#717171",
	"#C5C5C5", "#32A933", "#A9C5A9", "#C22525", "#3DA0D0", "#9A9A9A",
	"#ECBAE8", "#000000", "#3198AE", "#10407A", "#EBBB52", "#D7D7D7"
];

export const PAGES_LABEL: PageNameStringType[] = [
	'identity',
	'character',
	'visage',
	'apparence',
	'vetements'
]