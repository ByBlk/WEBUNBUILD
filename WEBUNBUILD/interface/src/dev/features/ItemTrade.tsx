import { IItem } from "@/features/ItemTrade/types.ts";
import { debugData } from "@/hook";

export const ItemTrade = (visible: boolean) => {
    debugData([
        {
            action: 'nui:itemTrade:visible',
            data: visible
        }
    ]);

    const mockItems: IItem[] = [
        { id: 1, type: 0, item_number: 1, item_image: 'montre.webp', time: 5 },
        { id: 2, type: 1, item_number: 2, item_image: 'water.webp', time: 5  },
        { id: 3, type: 0, item_number: 3, item_image: 'burger.webp', time: 5  },
        { id: 4, type: 1, item_number: 4, item_image: 'montre.webp', time: 5  },
        { id: 5, type: 2, item_number: 2, item_image: 'montre.webp', time: 20  },
        { id: 6, type: 2, item_number: 5, item_image: 'burger.webp', time: 40  }
    ];

    let currentIndex = 0;

    setInterval(() => {
        debugData([
            {
                action: 'nui:itemTrade:data',
                data: mockItems[currentIndex]
            }
        ]);
        currentIndex++;
    }, 500);
}