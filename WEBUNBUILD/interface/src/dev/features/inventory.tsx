import { InventoryData } from "@/features/inventory/types";
import { debugData } from "@/hook";

export const Inventory = (visible: boolean) => {
  debugData([
    {
      action: 'nui:inventory:data',
      data: mockData
    }
  ]);
  debugData([
    {
      action: 'nui:inventory:visible',
      data: visible
    }
  ]);
}

const mockData: InventoryData = {
  thirst: 35,
  hunger: 69,
  maxWeight: 92,
  currentWeight: 34,
  shortcuts: {
    1: {
      id: '1',
      url: 'https://placehold.co/50',
      label: 'Baseball Bat',
      position: { x: 0, y: 0 },
      type: 'clothes'
    }
  },
  showShortcut: true,
  items: [
    {
      id: '1',
      url: 'https://placehold.co/50',
      label: 'Baseball Bat',
      position: { x: 0, y: 0 },
      type: 'items',
      count: 10,
      weight: 2.5
    },
    {
      id: '2',
      url: 'https://placehold.co/50',
      label: 'Test',
      position: { x: 0, y: 2 },
      type: 'items',
      count: 5,
      weight: 2
    },
  ],
  playerInfo: {
    firstname: 'Ach',
    lastname: 'Dev',
    mugshot: 'https://placehold.co/50',
    money: 5000
  },
  // target: {
  //   maxWeight: 100,
  //   currentWeight: 50,
  //   name: 'Coffre Peugeot Citroën C3 Picasso',
  //   search: true,
  //   items: [
  //     {
  //       id: '1',
  //       url: 'https://placehold.co/50',
  //       label: 'Baseball Bat',
  //       position: { x: 0, y: 0 },
  //       type: 'items',
  //       count: 1,
  //       weight: 2.5
  //     },
  //     {
  //       id: '2',
  //       url: 'https://placehold.co/50',
  //       label: 'Leather Jacket',
  //       position: { x: 1, y: 1 },
  //       type: 'items',
  //       count: 1,
  //       weight: 3
  //     },
  //     {
  //       id: '3',
  //       url: 'https://placehold.co/50',
  //       label: 'Medkit',
  //       position: { x: 2, y: 2 },
  //       type: 'items',
  //       count: 3,
  //       weight: 1.2
  //     },
  //     {
  //       id: '4',
  //       url: 'https://placehold.co/50',
  //       label: 'Phone',
  //       position: { x: 3, y: 3 },
  //       type: 'weapons',
  //       count: 1,
  //       weight: 0.8
  //     },
  //     {
  //       id: '5',
  //       url: 'https://placehold.co/50',
  //       label: 'Pistol',
  //       position: { x: 2, y: 5 },
  //       type: 'weapons',
  //       count: 1,
  //       weight: 2.3
  //     }
  //   ]
  // }
};
