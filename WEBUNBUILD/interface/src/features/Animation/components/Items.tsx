import React from 'react';
import EmoteItem from "@/features/Animation/components/EmoteItem/EmoteItem.tsx";

interface ItemData {
    label?: string;
    category?: string;
    name: string;
    dist: string;
    shared?: boolean;
}

interface ItemsComponentProps {
    data: ItemData[];
    favoritesAnim: string[];
    toggleFavorite: (item: ItemData) => void;
}

const ItemsComponent: React.FC<ItemsComponentProps> = ({data, favoritesAnim, toggleFavorite}) => {


    return (
        <div className="Items">
            {data.map((item, index) => (
                <EmoteItem  key={index} item={item} isFav={favoritesAnim.includes(item.name)} handleFav={() => toggleFavorite(item)} />
            ))}
        </div>
    );
};

export default ItemsComponent;