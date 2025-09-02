import './index.scss';
import React, { useEffect, useState } from "react";
import { useNuiEvent } from "@/hook";
import {ItemsList} from "@/features/ItemTrade/Components";
import {IItem} from "@/features/ItemTrade/types.ts";


const ItemTrade: React.FC = () => {

    const [visible, setVisible] = useState(false);
    const [data, setData] = useState<IItem | null>(null);
    const [itemGiveList, setItemGiveList] = useState<IItem[]>([]);
    const [itemReceiveList, setItemReceiveList] = useState<IItem[]>([]);
    const [itemCraftList, setItemCraftList] = useState<IItem[]>([]);

    useNuiEvent('nui:itemTrade:visible', (status: boolean) => {
        setVisible(status);
    });

    useNuiEvent('nui:itemTrade:data', (data: any) => {
        setData(data);
    });

    useEffect(() => {
        if (data) {
            if (data.type === 1) {
                setItemGiveList(prevList => [...prevList, { ...data, time: 5 }]);
                if (itemGiveList.length > 5)
                    setItemGiveList(prevList => prevList.slice(1));
                setTimeout(() => {
                    setItemGiveList(prevList => prevList.filter(item => item.id !== data.id));
                }, 5000);
            } else if (data.type === 2) {
                setItemCraftList(prevList => [...prevList, data]);
                if (itemCraftList.length > 5)
                    setItemCraftList(prevList => prevList.slice(1));
                setTimeout(() => {
                    setItemCraftList(prevList => prevList.filter(item => item.id !== data.id));
                }, data.time * 1000);
            } else { // type 0
                setItemReceiveList(prevList => [...prevList, { ...data, time: 5 }]);
                if (itemReceiveList.length > 5)
                    setItemReceiveList(prevList => prevList.slice(1));
                setTimeout(() => {
                    setItemReceiveList(prevList => prevList.filter(item => item.id !== data.id));
                }, 5000);
            }
        }
    }, [data]);

    return (
        <div className="itemTrade_container" style={{opacity: visible ? 1 : 0}}>
            <ItemsList items={itemGiveList} />
            <ItemsList items={itemReceiveList} />
            <ItemsList items={itemCraftList} />
        </div>
    );
}

export default ItemTrade;