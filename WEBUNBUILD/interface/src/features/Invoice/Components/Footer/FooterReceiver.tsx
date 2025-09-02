import React from "react";
import {fetchNui} from "@/hook";
import {useInvoiceStore} from "@/features/Invoice/store.ts";

const FooterReceiver: React.FC = () => {
    const total = useInvoiceStore((state => state.total));
    const signature = useInvoiceStore((state => state.signature));
    const handlePayment = () => {
        fetchNui("nui:invoice:payment", total);
    }

    return (
        <div className="footer__invoice">
            <div className="invoice__payment">
                <p className="title__payment">Mode de paiement</p>
                <div className="invoice_payment__group__sender">
                    <div>
                        <p>Compte bancaire</p>
                    </div>
                </div>
            </div>
            <div className="invoice__signature">
                <p className="signature">{signature}</p>
                <div className="payment__button" onClick={handlePayment}>
                    <p>Paiement</p>
                </div>
            </div>
        </div>
    )
}

export default FooterReceiver;