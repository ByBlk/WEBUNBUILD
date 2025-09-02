import { debugData } from "@/hook";
export const NewGrandMenu = (visible: boolean) => {
  debugData([
    {
      action: 'nui:newgrandmenu:visible',
      data: visible
    }
  ]);
    setTimeout(() => {
      debugData([
      {
        action: 'nui:newgrandmenu:setData',
        data: {
          style : {
            menuStyle: "interim",
            backgroundType: 3,
            bannerType: 1,
            gridType: 1,
            lineColor: "linear-gradient(to right, rgba(255, 255, 255, .6) 0%, rgba(255, 255, 255, .6) 56%, rgba(255, 255, 255, 0) 100%)",
            title: "TENUE",
            bannerImg: "assets/catalogues/headers/jobcenter.webp",
            buyType: 0,
            buyText: "Premium"
          },
          eventName: "cardealer",
          showStats: {
            show: false,
            default: false,
            showButton: false,
          },
          showFavorites: false,
          mouseEvents: true,
          headCategory: {
            show: false,
            items: [
              {id: "", label: "Service"},
            ]
          },
          nameContainer: {
            show: true,
            top: false,
            firstLabel: "test",
            secondLabel: "~y~TEST",
          },
          color: { 
            show: false, 
            primary: true, 
            secondary: true, 
            opacity: true
          },
          category: {
              show: false,
              items: [
                {id: "qzd", label: "qzdqzdqzdqzdqzdqzdqzdqzd", image: "vehicules/sultan.webp"},
                {id: "qqq", label: "Test", image: "vehicules/sultan.webp"},
                {id: "ddddd", label: "Test", image: "vehicules/sultan.webp"},
                {id: "qgegr", label: "Test", image: "vehicules/sultan.webp"},
                {id: "qzdqzd", label: "Test", image: "vehicules/sultan.webp"},
                {id: "luluil", label: "Test", image: "vehicules/sultan.webp"},
                {id: "luluil", label: "Test", image: "vehicules/sultan.webp"},
                {id: "luluil", label: "Test", image: "vehicules/sultan.webp"},
              ]
          },
          cameras: {
              show: false,
              label: "Test",
              items: [
                {id: "2", image: "vehicules/sultan.webp"},,
                {id: "1", image: "vehicules/sultan.webp"},
                {id: "3", image: "vehicules/sultan.webp"},

              ]
          },
          interim: {
            primaryTitle: "LIVREUR",
            secondaryTitle: "GO POSTAL",
            backgroundImg: "assets/catalogues/interim/gopostal.webp",
            missions: [
              { title: "Récupère un fusil de chasse et des munitions au campement de chasse." },
              { title: "Traque et abat des animaux sauvages dans la forêt." },
              { title: "Dépose les carcasses à l'abattoir pour recevoir ta paye." }
            ],
            salary: 1456,
            duration: 14,
            members: "1 à 4 personnes",
          },
          securoserv: {
            primaryTitle: "ATM",
            secondaryTitle: "BRAQUAGE",
            backgroundImg: "assets/catalogues/interim/gopostal.webp",
            missions: [
              { title: "Procures toi une Batte Baseball" },
              { title: "Frappes l’ATM le jusqu’à qu’il sois endomagé" },
              { title: "Récupères les billets " }
            ],
            butin: 1456,
            influ: "30 Points",
            crew: "600 Points",
          },
          autoecole: {
            primaryTitle: "PERMIS A",
            secondaryTitle: "VEHICULE",
            missions: [
              { title: "Compléter l’itinéraire dans le temps imparti" },
              { title: "Respecter la vitesse et le code de la route (3 max)" },
              { title: "Provoquer un accident de la route est éliminatoire" }
            ],
            price: 250,
            requis: "Code de la route",
          },
          items: [
            {
              label: "Haut",
              model: "question1",
              price: 1000,
              type: 1,
              premium: true,
              image: "vehicules/sultan.webp",
              style: "small"
            },
            {
              label: "BAS",
              model: "question1",
              price: 1000,
              type: 1,
              premium: true,
              image: "vehicules/sultan.webp",
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 1,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
              
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },
            {
              label: "CHAUSSURESS",
              model: "question1",
              image: "vehicules/sultan.webp",
              price: 1000,
              type: 2,
              premium: true,
              style: "small",
              stats: {
                firstLabel: "OBEY",
                secondLabel: "Argento",
                info: [
                  {label: "Poids", value: "50"},
                  {label: "Vitesse", value: "100"},
                  {label: "Frein", value: "100"},
                  {label: "Acceleration", value: "100"}
                ]
              }
            },

          ]
        }
      }
    ]);
  }, 100);
}