import { debugData } from "@/hook";

export const jobCenter = (visible: boolean) => {
  debugData([
    {
      action: 'nui:job-center:data',
      data: mockData
    }
  ]);
  debugData([
    {
      action: 'nui:job-center:visible',
      data: visible
    }
  ]);
}

const mockData = {
  // headerIcon: "https://cdn.eltrane.cloud/3838384859/icons/image_homme.webp",
  headerIconName: "Job Center",
  premium: 0,
  items: [
    {
      name: "Ferme",
      location: "Grapeseed",
      duration: 35,
      reward: 4500,
      maxPlayers: 4,
      available: false,
      premium: false,
      limit: 4,
      image: "https://storage-api.abyss-project.fr/api/application-file-thumbnail/file-thumbnail/6e632b05-365b-4c8e-8b48-c3af52582477/download",
      thumbnail: "https://storage-api.abyss-project.fr/api/application-file-thumbnail/file-thumbnail/6e632b05-365b-4c8e-8b48-c3af52582477/download",
      instructions: [
        "Récupère un ~b~Tracteur auprès de ~g~Charles",
        "Plante, récolte et transforme des légumes de la ferme",
        "Vend tes légumes à un magasin de proximité",
      ],
    },
    {
      name: "Pêche",
      location: "Océan",
      duration: 35,
      reward: 450,
      maxPlayers: 4,
      available: true,
      premium: false,
      limit: 4,
      image: "https://storage-api.abyss-project.fr/api/application-file-thumbnail/file-thumbnail/6e632b05-365b-4c8e-8b48-c3af52582477/download",
      thumbnail: "https://storage-api.abyss-project.fr/api/application-file-thumbnail/file-thumbnail/40b46d71-9af5-4a09-8796-4f18b9cf309d/download",
      instructions: [
        "Récupère un ~b~Tracteur auprès de ~g~Charles",
        "Plante, récolte et transforme des légumes de la ferme",
        "Vend tes légumes à un magasin de proximité",
      ],
    },
    {
      name: "Chasse",
      location: "Mont chiliad",
      duration: 35,
      reward: 450,
      maxPlayers: 2,
      available: true,
      premium: true,
      limit: 4,
      image: "https://cdn.discordapp.com/attachments/667855303840235531/1148086176452988958/image.webp",
      thumbnail: "https://cdn.discordapp.com/attachments/667855303840235531/1148088922715455509/image.webp",
      instructions: [
        "Munis toi d'un ~b~Mousquet et d'un ~b~Couteau~s~ à l' ~o~Ammu-nation",
        "Active ta ~r~zone ~r~de ~r~chasse en passant par ~g~Michael",
        "Vends ta viande à ~g~Jacquie",
      ],
    },
    {
      name: "Bucheron",
      location: "Paleto bay",
      duration: 35,
      maxPlayers: 4,
      available: false,
      premium: true,
      reward: 450,
      image: "https://cdn.discordapp.com/attachments/667855303840235531/1148086206782001272/image.webp",
      thumbnail: "https://cdn.discordapp.com/attachments/667855303840235531/1148088922715455509/image.webp",
      instructions: [],
    },
    {
      name: "Eboueur",
      location: "Casse automobile",
      duration: 35,
      reward: 450,
      maxPlayers: 3,
      available: true,
      premium: true,
      image: "https://cdn.discordapp.com/attachments/667855303840235531/1148086231939436574/image.webp",
      thumbnail: "https://cdn.discordapp.com/attachments/667855303840235531/1148088922715455509/image.webp",
      instructions: [],
    },
  ],
}