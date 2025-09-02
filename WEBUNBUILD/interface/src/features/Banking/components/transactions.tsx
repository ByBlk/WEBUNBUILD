import { useState } from 'react';
import textToStyled from '@/utils/textToStyled';
import { getCdnUrl } from '@utils/misc';

interface TransactionsProps {
    data: {
        visible: boolean;
        history: any;
    };
}

const TransactionsComponent: React.FC<TransactionsProps> = ({ data }) => {
    const [isVisible] = useState(data.visible);
    const history = Array.isArray(data.history) ? data.history : [];

    return isVisible ? (
        <div className="banking">
            <div className="banking__component__transactions">
                <div className="banking__component__transactions__label">Transactions</div>
                <div className="banking__component__transactions__nav">
                    <div className="banking__component__transactions__nav__nom">Nom</div>
                    <div className="banking__component__transactions__nav__date">Date</div>
                    <div className="banking__component__transactions__nav__montant">Montant</div>
                    <div className="banking__component__transactions__nav__statut">Statut</div>
                </div>
                
                <div className="banking__component__transactions__list">
                    {history.map((transaction: any, index: number) => (
                        <div key={index} className="banking__component__transactions__list_item">
                            <img src={getCdnUrl("EntrepriseImage", transaction.name + ".webp")} alt="" />
                            <div className="banking__component__transactions__list_item__name">{transaction.label}</div>
                            <div className="banking__component__transactions__list_item__date">{transaction.date}</div>
                            <div className="banking__component__transactions__list_item__montant">{textToStyled(transaction.amount)}</div>
                            <div className="banking__component__transactions__list_item__status">{transaction.status}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : null;
}

export default TransactionsComponent;