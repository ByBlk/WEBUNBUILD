import './Item.scss';
import React from "react";
import MediaCdn from "@/components/mediaCdn/mediaCdn.tsx";
import { IItem } from "@/features/ItemTrade/types.ts";

const Item: React.FC<IItem> = ({type, item_number, item_image, time}) => {
    return (
        <div className={"itemTrade_item" + (type == 0 ? " itemTrade_item_lost" : type == 2 ? " itemTrade_item_craft" : "")}
            style={{ '--animation-duration': `${time}s` } as React.CSSProperties}>
            <div className="progressbar">
                <div className="track"></div>
            </div>
            <div className="item-info">
                <p className="item_number">{item_number}</p>
                <MediaCdn path={'items'} name={`${item_image}`} />
            </div>
        </div>
    )
}

export default Item;