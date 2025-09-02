import { debugData } from "@/hook";

export const Xmenu = (visible: boolean) => {
  debugData([
    {
      action: 'nui:xmenu:visible',
      data: visible
    },
  ])
  debugData([
    {
      action: 'nui:xmenu:setData',
      data: {
        id: "1",
        title: "",
        subtitle: "Menu Administration",
        banner: "https://cdn.discordapp.com/attachments/1321943975258493039/1356570490478526504/8pIIZEc.png?ex=67ed0c38&is=67ebbab8&hm=81be6dfe998e5e7929d6963f19d07528a44336c90edd911a197749dafecf95ab&",
        itemsPerPage: 10,
        item: [
          {
            id: "checkbox",
            type: "checkbox",
            label: "~HUD_COLOUR_NET_PLAYER21~Mode Administration",
            style: {
                description: "Report #12",
            },
            checked: false,
            default: false,
          },
          {
            id: "button",
            type: "button",
            label: "Liste des Reports",
            style: {
              rightIcon: "arrow"
            }
          },
          {
            id: "button",
            type: "button",
            label: "Liste des Joueurs",
            style: {
              rightIcon: "arrow"
            }
          },
          {
            id: "button",
            type: "button",
            label: "Outils de Modération",
            style: {
              rightIcon: "arrow"
            }
          },
          {
            id: "button",
            type: "button",
            label: "Gestion du Serveur",
            style: {
              rightIcon: "arrow"
            }
          },
          {
            id: "button",
            type: "button",
            label: "Gestion Développeur",
            style: {
              rightIcon: "arrow"
            }
          },
          //  
          // {
          //   id: "separator",
          //   type: "separator",
          //   label: "Separator",
          // },
          // {
          //   id: "checkbox",
          //   type: "checkbox",
          //   label: "Checkbox",
          //   style: {
          //     description: "The best description checkbox",
          //   },
          //   checked: false,
          //   default: false,
          // },
          // {
          //   id: "slider",
          //   type: "slider",
          //   label: "Slider",
          //   style: {
          //     description: "The best description slider",
          //   },
          //   value: 50,
          //   min: 0,
          //   max: 100,
          // },
          //
          // {
          //   id: "list",
          //   type: "list",
          //   label: "List",
          //   style: {
          //     description: "The best description list",
          //   },
          //   value: ["Option 1", "Option 2", "Option 3"],
          // }
        ]
      },
    },
  ])
}