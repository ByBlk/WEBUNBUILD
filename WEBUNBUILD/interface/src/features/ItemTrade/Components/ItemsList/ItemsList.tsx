import "./ItemsList.scss";
import React from "react";
import Item from "../Item/Item";
import {IItemsList, IItem} from "@/features/ItemTrade/types.ts";

const ItemsList: React.FC<IItemsList> = ({items}) => {

    return (
        <div className="itemTrade_item_list">
            {
                items.map((item: IItem, index: number) => (
                    <Item key={index} {...item} />
                ))
            }
        </div>
    )
}

export default ItemsList;