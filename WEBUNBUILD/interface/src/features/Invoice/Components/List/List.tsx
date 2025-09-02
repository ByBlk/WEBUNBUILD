import "./List.scss";
import React from "react";
import {IPropsItems} from "@/features/Invoice/types.ts";


const List: React.FC<IPropsItems> = ({items}) => {

    return (
        <div className="invoice__List__container">
            <table className="invoice__list">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantité</th>
                    <th>Prix</th>
                </tr>
                </thead>
                <tbody>
                {(
                    items.map((item, index) => (
                        <tr key={index} className="invoice__list_row">
                            <td className="info">{item.name} </td>
                            <td className="info">{item.quantity}</td>
                            <td className="info">${item.price}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    )
}

export default List;