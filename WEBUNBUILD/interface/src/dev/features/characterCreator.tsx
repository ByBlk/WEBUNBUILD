import { ICharacterCreatorData } from "@/features/characterCration/types";
import { debugData } from "@/hook";
import { getCdnUrl } from "@utils/misc";

export const CharacterCreator = (visible: boolean) => {
  debugData([
    {
      action: 'nui:char-creator:data',
      data: characterCreatorMockData
    }
  ]);
  debugData([
    {
      action: 'nui:char-creator:visible',
      data: visible
    }
  ]);
}

const characterCreatorMockData: ICharacterCreatorData = {
  catalogue: [
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
      label: "test",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
      label: "test",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
      label: "test",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
      label: "test",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
      label: "test",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
      label: "test",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
      label: "test",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
      label: "test",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
      label: "test",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
      label: "test",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
      label: "test",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
    },
    {
      id: 1,
      category: "hair",
      img: "https://cdn.eltrane.cloud/3838384859/placeholder.webp",
    },
    {
      id: 0,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/assets/catalogues/binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
    },
    {
      label: "Variation N°1",
      subCategory: "variations",
      image: "https://cdn.eltrane.cloud/3838384859/assets/catalogues/binco/Hauts/0.webp",
      targetId: 0,
      id: 0,
      category: "haut",
    },
    {
      label: "Haut N°0",
      subCategory: "haut",
      image: "https://cdn.eltrane.cloud/3838384859/assets/catalogues/binco/Hauts/0.webp",
      idVariation: 0,
      id: 0,
      category: "haut",
    },
    {
      id: 10,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/assets/catalogues/binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
      idVariation: 1,
    },
    {
      id: 20,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/assets/catalogues/binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
    },
    {
      id: 30,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/assets/catalogues/binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
    },
    {
      id: 40,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/assets/catalogues/binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
    },
    {
      id: 50,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/assets/catalogues/binco/Hauts/0.webp",
      category: "haut",
      subCategory: "bras",
    },
    {
      id: 60,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/assets/catalogues/binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
    },
    {
      id: 70,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/assets/catalogues/binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
    },
    {
      id: 80,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/assets/catalogues/binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
    },
    {
      id: 90,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/assets/catalogues/binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
    },
    {
      id: 100,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/assets/catalogues/binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
    },
    {
      id: 110,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/assets/catalogues/binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
    },
    {
      id: 120,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/assets/catalogues/binco/Hauts/0.webp",
      category: "haut",
      subCategory: "haut",
    },
    {
      id: 130,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/assets/catalogues/binco/Hauts/0.webp",
      category: "haut",
      subCategory: "bras",
    },
    {
      id: 140,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/assets/catalogues/binco/Hauts/0.webp",
      category: "bas",
      subCategory: "haut",
    },
    {
      id: 160,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/assets/catalogues/binco/Hauts/0.webp",
      category: "haut",
      subCategory: "variations",
    },
    {
      id: 150,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/assets/catalogues/binco/Hauts/0.webp",
      category: "haut",
      subCategory: "sous-haut",
    },
    {
      id: 160,
      price: 20,
      image: "https://cdn.eltrane.cloud/3838384859/assets/catalogues/binco/Hauts/0.webp",
      category: "haut",
      subCategory: "bras",
    },
  ],
  buttons: [
    {
      name: "haut",
      price: 10,
      progressBar: [
        {
          name: "haut",
        },
        {
          name: "variations",
        },
        {
          name: "sous-haut",
        },
        {
          name: "bras",
        },
      ],
      width: "full",
      image: getCdnUrl("assets/character-creator", "outfitBackground1.png"),
      type: "coverBackground"
    },
    {
      name: "Bas",
      progressBar: [
        {
          name: "haut",
        },
        {
          name: "variations",
        },
        {
          name: "sous-haut",
        },
        {
          name: "bras",
        },
      ],
      width: "full",
      image: getCdnUrl("assets/character-creator", "outfitBackground2.png"),
      type: "coverBackground"
    },
    {
      name: "Chaussures",
      progressBar: [
        {
          name: "haut",
        },
        {
          name: "variations",
        },
        {
          name: "sous-haut",
        },
        {
          name: "bras",
        },
      ],
      width: "full",
      image: getCdnUrl("assets/character-creator", "outfitBackground3.png"),
      type: "coverBackground"
    },
    {
      name: "Chapeaux",
      progressBar: [
        {
          name: "haut",
        },
        {
          name: "variations",
        },
        {
          name: "sous-haut",
        },
        {
          name: "bras",
        },
      ],
      width: "full",
      image: getCdnUrl("assets/character-creator", "outfitBackground4.png"),
      type: "coverBackground"
    },
    {
      name: "Sacs",
      progressBar: [
        {
          name: "haut",
        },
        {
          name: "variations",
        },
        {
          name: "sous-haut",
        },
        {
          name: "bras",
        },
      ],
      width: "full",
      image: getCdnUrl("assets/character-creator", "outfitBackground5.png"),
      type: "coverBackground"
    },
    {
      name: "autres",
      progressBar: [
        {
          name: "haut",
        },
        {
          name: "variations",
        },
        {
          name: "sous-haut",
        },
        {
          name: "bras",
        },
      ],
      width: "full",
      image: getCdnUrl("assets/character-creator", "outfitBackground6.png"),
      type: "coverBackground"
    },
    {
      name: "autres",
      progressBar: [
        {
          name: "haut",
        },
        {
          name: "variations",
        },
        {
          name: "sous-haut",
        },
        {
          name: "bras",
        },
      ],
      width: "full",
      image: getCdnUrl("assets/character-creator", "outfitBackground7.png"),
      type: "coverBackground"
    },
  ],
  peds: [
    {
      category: "man",
      label: "a_f_m_bodybuild_01",
      id: 1,
    },
    {
      category: "man",
      label: "Ped 02",
      id: 2,
    },
    {
      category: "man",
      label: "Ped 03",
      id: 3,
    },
    {
      category: "woman",
      label: "Femme 01",
      id: 4,
    },
  ],
  pedsVariantes: [
    {
      category: "visage",
      subCategory: "man",
      id: 1,
      idVariante: 1,
    },
    {
      category: "visage",
      subCategory: "man",
      id: 2,
      idVariante: 2,
    },
    {
      category: "visage",
      subCategory: "man",
      id: 1,
      targetId: 1,
    },
    {
      category: "visage",
      subCategory: "man",
      id: 2,
      targetId: 1,
    },

    {
      category: "visage",
      subCategory: "man",
      id: 3,
      targetId: 1,
    },
    {
      category: "visage",
      subCategory: "man",
      id: 1,
      targetId: 2,
    },
    {
      category: "haut",
      subCategory: "man",
      id: 1,
      targetId: 2,
    },
  ],
  hideItemList: ["bras"],
  premium: true,
  recoverableCharacters: [{
    name: 'Bryan Anderson',
    data: {
      identity: {
        firstName: "Bryan",
        lastName: "Anderson",
        dateOfBirthdayr: "23/4/1990",
        birthplace: "New York",
        sex: 0,
      },
      skin: {
        face: 2,
        skin: 1,
        mom: 0,
        dad: 1,
        nose_1: 0.5,
        nose_2: 0.6,
        nose_3: 0.7,
        nose_4: 0.8,
        nose_5: 0.9,
        nose_6: 1.0,
        eyebrows_5: 0.4,
        eyebrows_6: 0.5,
        cheeks_1: 0.6,
        cheeks_2: 0.7,
        chin_height: 0.8,
        chin_lenght: 0.9,
        chin_width: 1.0,
        chin_hole: 0.3,
        jaw_1: 0.4,
        jaw_2: 0.5,
        neck_thick: 0.6,
        lips_thick: 0.7,
        cheeks_3: 0.8,
        eye_open: 0.9,
        hair_1: 1,
        hair_color_1: 2,
        hair_color_2: 3,
        beard_1: 4,
        beard_2: 5,
        beard_3: 6,
        eyebrows_1: 7,
        eyebrows_2: 8,
        eyebrows_3: 9,
        eyebrows_4: 10,
        chest_1: 11,
        chest_2: 12,
        chest_3: 13,
        eye_color: 14,
        makeup_1: 15,
        makeup_2: 16,
        makeup_3: 17,
        makeup_4: 18,
        blush_1: 19,
        blush_2: 20,
        blush_3: 21,
        lipstick_1: 22,
        lipstick_2: 23,
        lipstick_3: 24,
        bodyb_1: 25,
        bodyb_2: 26,
        age_1: 27,
        age_2: 28,
        blemishes_1: 29,
        blemishes_2: 30,
        moles_1: 31,
        moles_2: 32,
        complexion_1: 33,
        complexion_2: 34,
        sun_1: 35,
        sun_2: 36,
        head: 1,
        mask_1: 2,
        arms: 3,
        arms_2: 4,
        pants_1: 5,
        pants_2: 6,
        shoes_1: 7,
        shoes_2: 8,
        torso_1: 1,
        torso_2: 2,
        tshirt_1: 3,
        tshirt_2: 4,
        helmet_1: 11,
        helmet_2: 12,
        glasses_1: 13,
        glasses_2: 14,
        bags_1: 15,
        bags_2: 16,
      }
    }
  }]
}