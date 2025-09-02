import { debugData } from "@/hook";

export const illegalTablet = (visible: boolean) => {
  debugData([
    {
      action: 'nui:illegal-tablet:data',
      data: mockData
    }
  ]);
  debugData([
    {
      action: 'nui:illegal-tablet:visible',
      data: visible
    }
  ]);
}

const mockData = {
  "crewColor": "#FF0000",
  "crewDesc": "Vespucci - Trafic de drogues et d'armes",
  "crewInitials": "LS",
  "crewLevel": 2,
  "crewMotto": "Tip top coolos",
  "crewName": "Los Skateros",
  "crewXp": 800,
  "hourStart": 18,
  "hourStop": 2,
  "informations": {
      "mostOrdered": "Feuilles de coca",
      "totalCommands": 16,
      "totalSpent": 139000
  },
  "minStart": 2,
  "minStop": 2,
  "orders": [
      {
          "date": "2023-03-27T22:30:17-02:00",
          "items": [
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              }
          ],
          "price": 16200,
          "type": "armes"
      },
      {
          "date": "2022-12-05T22:30:17-01:00",
          "items": [
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              }
          ],
          "price": 16200,
          "type": "drogues"
      },
      {
          "date": "2022-12-05T22:30:17-01:00",
          "items": [
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              },
              {
                  "name": "Méthylamine",
                  "quantity": 2
              }
          ],
          "price": 16200,
          "type": "drogues"
      }
  ],
  "shop": {
      "armes": [
          {
              "id": 1,
              "image": "https://cdn.eltrane.cloud/3838384859/assets/tabletteIllegale/weapon_assaultrifle.webp",
              "name": "Pistolet à eau",
              "price": 1300,
              "stock": 5,
              "crewLevel":'A' 
          },
          {
              "cooldown": 5,
              "id": 1,
              "image": "https://cdn.eltrane.cloud/3838384859/assets/tabletteIllegale/weapon_assaultrifle.webp",
              "name": "Pistolet à eau",
              "price": 1300,
              "crewLevel": 'B'
          },
      ],
      "drogues": [
          {
              "id": 1,
              "image": "https://cdn.eltrane.cloud/3838384859/items/water.webp",
              "name": "Eau de chaux",
              "price": 300,
              "crewLevel": 'B'
          },
          {
              "id": 2,
              "image": "https://cdn.eltrane.cloud/3838384859/items/water.webp",
              "name": "Eau de chaux",
              "price": 300,
              "crewLevel": 'A'
          },
          {
              "id": 3,
              "image": "https://cdn.eltrane.cloud/3838384859/items/water.webp",
              "name": "Eau de chaux",
              "price": 300,
              "crewLevel": 'C'
          },
      ]
  }
}