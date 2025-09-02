import { debugData } from "@/hook";

export const Craft = (visible: boolean) => {
  debugData([
    {
      action: 'nui:craft:visible',
      data: visible
    }
  ]);
  debugData([
    {
      action: 'nui:craft:data',
      data: {
        craft: [
            {
                name: "tpc",
                label: "Triple Cheese",
                timer: 10,
                recipe: [
                    {
                        name: "flour",
                        label: "Farine",
                        amount: 3
                    },
                    {
                        name: "water",
                        label: "Eau",
                        amount: 1
                    },
                    {
                        name: "bread",
                        label: "Pain",
                        amount: 2
                    }
                ]
            },
            {
                name: "bread2",
                label: "Pain2",
                timer: 5,
                recipe: [
                    {
                        name: "flour",
                        label: "Farine",
                        amount: 1
                    },
                    {
                        name: "water",
                        label: "Eau",
                        amount: 2
                    }
                ]
            },
            {
                name: "bread3",
                label: "Pain3",
                timer: 5,
                recipe: [
                    {
                        name: "flour2",
                        label: "Farine2",
                        amount: 1
                    },
                    {
                        name: "water2",
                        label: "Eau2",
                        amount: 1
                    }
                ]
            }
        ],
        recipePossible: [],
        inventory: [
            {
                name: "bread",
                label: "Pain",
                amount: 5
            },
            {
                name: "bread2",
                label: "Pain2",
                amount: 1
            },
            {
                name: "bread3",
                label: "Pain3",
                amount: 1
            },
            {
                name: "flour",
                label: "Farine",
                amount: 5
            },
            {
                name: "water",
                label: "Eau",
                amount: 1
            }
        ]
      }
    }
  ]);
}