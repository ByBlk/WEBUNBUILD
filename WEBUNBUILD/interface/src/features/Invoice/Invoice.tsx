import "./Invoice.scss";
import React, {useEffect, useState} from "react";
import {fetchNui, useNuiEvent} from "@/hook";
import {IInvoiceData} from "@/features/Invoice/types.ts";
import List from "@/features/Invoice/Components/List/List.tsx";
import EmptyList from "@/features/Invoice/Components/List/EmptyList.tsx";
import {useEscapeKey} from "@hooks/useKeys.tsx";
import {useInvoiceStore} from "@/features/Invoice/store.ts";
import FooterReceiver from "@/features/Invoice/Components/Footer/FooterReceiver.tsx";
import FooterSender from "@/features/Invoice/Components/Footer/FooterSender.tsx";

const Invoice: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState<IInvoiceData | null>(null);
    const total = useInvoiceStore((state) => state.total);
    const setTotal = useInvoiceStore((state) => state.setTotal);
    const setReduce = useInvoiceStore((state) => state.setReduce);
    const reduce = useInvoiceStore((state) => state.reduce);
    const setList = useInvoiceStore((state) => state.setList);
    const setSignature = useInvoiceStore((state) => state.setSignature);
    const setTotalWithReduce = useInvoiceStore((state) => state.setTotalWithReduce);
    const totalWithReduce = useInvoiceStore((state) => state.totalWithReduce);

    useNuiEvent("nui:invoice:visible", (status: boolean) => {
        setVisible(status);
    })

    useNuiEvent("nui:invoice:data", (data: IInvoiceData) => {
        setData(data);
    })

    const handleChange = (value: string) => {
        const newValue = Number(value);
        if (isNaN(newValue)) {
            setReduce(0);
            return;
        }
        setReduce(newValue);
        setTotal(total);
        setTotalWithReduce(total - newValue);
    }

    useEscapeKey(() => {
        fetchNui("nui:invoice:close");
    }, visible);

    useEffect(() => {
        setReduce(data?.reduce ?? 0);
        setTotal(data?.total ?? 0);
        setSignature(data?.sender ?? "");
        
        if(data?.items.length) {
            setList(data.items);
        }
        
    }, [data?.items, data?.reduce, data?.total, setList, setReduce, setTotal]);

    return visible ? (
        <div id="invoice__container">
            <div className="bg bg-1"></div>
            <div className="bg">
                <div className="invoice__header">
                    <div className="invoice__title">
                        <h1>Facture</h1>
                        <h2>Objet</h2>
                    </div>
                    <div className="header__info">
                        <div className="header__info__group">
                            <p className="label">Vendeur</p>
                            <p className="text">{data?.sender}</p>
                        </div>
                        <div className="header__info__group">
                            <p className="label">Client</p>
                            <p className="text">{data?.receiver}</p>
                        </div>
                        <div className="header__info__group">
                            <p className="label">Date</p>
                            <p className="text">{data?.date}</p>
                        </div>
                    </div>
                </div>
                <div className="line"></div>
                <div className="invoice__body">
                    {data?.items.length === 0 && data?.isSender ? (
                        <EmptyList />
                    ) : (
                        <List items={data?.items ?? []}/>
                    )}
                    <div className="invoice__footer">
                        <div className="invoice__total">
                            <div className="remise">
                                <p>Remise</p>
                                <p className="remise__input">
                                    {data?.items.length === 0 && data?.isSender ? (
                                        <>
                                        <input
                                            type="number"
                                            min="0"
                                            value={reduce}
                                            onChange={(e) => handleChange(e.target.value)}
                                        />
                                        $
                                        </>
                                    ) : (
                                        <>
                                            {data?.reduce}%
                                        </>
                                    )}

                                </p>
                            </div>
                            <div className="total">
                                <p>Paiement total</p>
                                <p>{reduce === 0 ? total : totalWithReduce}$</p>
                            </div>
                        </div>
                        <div className="line2"></div>
                        {data?.isSender ? (
                            <FooterSender />
                        ) : (
                            <FooterReceiver />
                        )}
                    </div>
                </div>
            </div>
            <div className="bg bg-2"></div>
        </div>
    ) : null
}

export default Invoice