import { debugData } from "@/hook";
export const Recu = (visible: boolean) => {
  debugData([
    {
      action: 'nui:recu:visible',
      data: true
    }
  ]);
  debugData([
    {
      action: 'nui:recu:data',
      data: { visible : visible, 
        title: 'BENNY\'S MOTOR', 
        employee: 'BRYAN ANDERSON', 
        customer: 'KIPSTZ BEMEH', 
        date: '23/01/2025 - 20:05', 
        item: [
          {
            name: 'MisterRP',
            count: 1, 
            price: 50,
            type: 'Détraqué'
          },
          {
            name: 'MisdavterRP',
            count: 1, 
            price: 50,
            type: 'Détraqué'
          },
          {
            name: 'MbRP',
            count: 1, 
            price: 50,
            type: 'Détraqué'
          },
          {
            name: 'tttRP',
            count: 1, 
            price: 50,
            type: 'Détraqué'
          },
          {
            name: 'bbbRP',
            count: 1, 
            price: 50,
            type: 'Détraqué'
          },
          {
            name: 'vvvRP',
            count: 1, 
            price: 50,
            type: 'Détraqué'
          },
          {
            name: 'DDDRP',
            count: 1, 
            price: 50,
            type: 'Détraqué'
          },
          {
            name: 'MisttaerRP',
            count: 1, 
            price: 50,
            type: 'Détraqué'
          },
          {
            name: 'MisabterRP',
            count: 1, 
            price: 50,
            type: 'Détraqué'
          },
        ],
        paiement: {
          taxe: 12,
          totalPrice: 250,
        } 
      } 
    }
  ]);
}