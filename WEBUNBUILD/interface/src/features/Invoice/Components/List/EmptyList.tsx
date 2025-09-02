import "./List.scss";
import React from "react";
import MediaCdn from "@/components/mediaCdn/mediaCdn.tsx";
import {useInvoiceStore} from "@/features/Invoice/store.ts";

const EmptyList: React.FC = () => {
    const setTotal = useInvoiceStore((state) => state.setTotal);
    const list = useInvoiceStore((state) => state.list);
    const setList = useInvoiceStore((state) => state.setList);


    const handleAddItem = async () => {
        const newItem = {
            name: "Entrez un nom",
            quantity: 0,
            price: 0
        };
        const newList = [...list, newItem];
        setList(newList);
    }

    const handleDeleteItem = (index: number) => {
        const newList = list.filter((_, i) => i !== index);
        setList(newList);
    }

    const handleChange = (
        index: number,
        field: "name" | "quantity" | "price",
        value: string
    ) => {
        const newList = [...list];
        if (field === "quantity" || field === "price") {
            newList[index][field] = Number(value);
            totalPrice();
        } else {
            newList[index][field] = value;
        }
        setList(newList);
    };

    const totalPrice = () => {
        let total= 0;
        list.forEach(item => {
            total += item.quantity * item.price;
        });

        setTotal(total);
    }

    return (
        <div className="invoice__List__container">
            <table className="invoice__list">
                <thead>
                <tr>
                    <th></th>
                    <th>Description</th>
                    <th>Quantité</th>
                    <th>Prix</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {list.map((item, index) => (
                        <tr key={index} className="invoice__list_row">
                            {index === list.length - 1 ? (
                                <td className="action" onClick={handleAddItem}>
                                    <button className="add">
                                        <MediaCdn path="assets/icons" name="plus-gradient.svg" />
                                    </button>
                                </td>
                            ) : (
                                <td className="action"></td>
                            )}
                            <td className="info">
                                <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => handleChange(index, "name", e.target.value)}
                                />
                            </td>
                            <td className="info">
                                <input
                                    type="number"
                                    min="0"
                                    value={item.quantity}
                                    onChange={(e) => handleChange(index, "quantity", e.target.value)}
                            /></td>
                            <td className="info price">
                                <input
                                    type="number"
                                    min="0"
                                    value={item.price}
                                    onChange={(e) => handleChange(index, "price", e.target.value)}
                                />
                            </td>
                            {index === 0 ? (
                                <td className="action">
                                    <div style={{width: "2.19vw", marginLeft: "0.21vw"}}></div>
                                </td>
                            ) : (
                                <td className="action" onClick={() => handleDeleteItem(index)}>
                                    <button className="delete">
                                        <MediaCdn path="assets/icons" name="cross-gradient.svg" />
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default EmptyList;