import React from "react";
import MediaCdn from "@/components/mediaCdn/mediaCdn.tsx";
import {useInvoiceStore} from "@/features/Invoice/store.ts";
import {fetchNui} from "@/hook";


const FooterReceiver: React.FC = () => {
    const check = useInvoiceStore((state) => state.check);
    const signature = useInvoiceStore((state) => state.signature);
    const setCheck = useInvoiceStore((state) => state.setCheck);
    const total = useInvoiceStore((state) => state.total);
    const list = useInvoiceStore((state) => state.list);
    const reduce = useInvoiceStore((state) => state.reduce);
    const clearList = useInvoiceStore((state) => state.clearList);
    const sendData = (payment: string) => {

        const invoiceData = {
            reduce: reduce,
            items: list,
            total: total,
            payment: payment,
            receipt: check,
        }

        clearList();

        fetchNui("nui:invoice:send", invoiceData);
    }

    return (
        <div className="footer__invoice">
            <div className="invoice__payment">
                <p className="title__payment">Mode de paiement</p>
                <div className="invoice_payment__group">
                    <div onClick={() => sendData("bank")}>
                        <p>Compte bancaire</p>
                    </div>
                    <div onClick={() => sendData("cash")}>
                        <p>Espèces</p>
                    </div>
                </div>
            </div>
            <div className="invoice__signature">
                <p className="signature">{signature}</p>
            </div>
            <div className="invoice__check">
                <p>Reçu</p>
                <div className="checkbox__recu" onClick={() => setCheck(!check)}>
                    {check && (
                        <MediaCdn path={"assets/icons"} name={"check_invoice.svg"} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default FooterReceiver;