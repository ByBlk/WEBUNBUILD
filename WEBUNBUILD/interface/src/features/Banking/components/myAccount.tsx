import { useState } from 'react';
import { fetchNui } from '@hooks/fetchNui';

interface MyAccountProps {
    data: {
        visible: boolean;
        type: 'account' | 'deposit' | 'withdraw';
        society: boolean;
        bank: number;
        card: {
            number: string;
            date: string;
            name: string;
        };
    };
}

const MyAccountComponent: React.FC<MyAccountProps> = ({ data }) => {
    const [activeTab, setActiveTab] = useState<'account' | 'deposit' | 'withdraw'>(data.type);
    const [isVisible] = useState(data.visible);
    const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
    const [depositAmount, setDepositAmount] = useState<number>(0);

    const handlePresetAmount = (amount: number) => {
        setWithdrawAmount(amount);
    };

    if (!isVisible) return null;

    return (
        <div className="banking">
            {activeTab === 'account' && (
                <div className="banking__component__myaccount">
                    <div className="banking__component__myaccount__label">Mon compte</div>
                    <div className="banking__component__myaccount__solde">
                        <div className="banking__component__myaccount__solde__label">Solde</div>
                        <div className="banking__component__myaccount__solde__montant">{data.bank}$</div>
                        <div className="banking__component__myaccount__card">
                            {!data.society ? (
                                <img src="https://cdn.eltrane.cloud/3838384859/assets/banking/card.png" alt="" className="banking__component__myaccount__card__img"/>
                            ) : (
                                <img src="https://cdn.eltrane.cloud/3838384859/assets/banking/card_society.png" alt="" className="banking__component__myaccount__card__img"/>
                            )}
                            <div className="banking__component__myaccount__card__number">{data.card.number}</div>
                            <div className="banking__component__myaccount__card__date">{data.card.date}</div>
                            <div className="banking__component__myaccount__card__name">{data.card.name}</div>
                        </div>
                        <div className="banking__component__myaccount__retrait" onClick={() => setActiveTab('withdraw')}>Retrait</div>
                        <div className="banking__component__myaccount__depot" onClick={() => setActiveTab('deposit')}>Depôt</div>
                    </div>
                </div>
            )}

            {activeTab === 'deposit' && (
            <div className="banking__component__myaccount__deposit">
                <img className="banking__component__myaccount__deposit__back" src="https://cdn.eltrane.cloud/3838384859/assets/banking/back.png" alt="" onClick={() => setActiveTab('account')} />
                <div className="banking__component__myaccount__deposit__label" onClick={() => setActiveTab('account')}>Dépôt</div>

                    <div className="banking__component__myaccount__deposit__solde">
                        <div className="banking__component__myaccount__deposit__solde__label">Solde</div>
                        <div className="banking__component__myaccount__deposit__solde__montant">{data.bank}$</div>
                        <div className="banking__component__myaccount__deposit__card">
                            {!data.society ? (
                                <img src="https://cdn.eltrane.cloud/3838384859/assets/banking/card.png" alt="" className="banking__component__myaccount__deposit__card__img"/>
                            ) : (
                                <img src="https://cdn.eltrane.cloud/3838384859/assets/banking/card_society.png" alt="" className="banking__component__myaccount__deposit__card__img"/>
                            )}
                            <div className="banking__component__myaccount__deposit__card__number">{data.card.number}</div>
                            <div className="banking__component__myaccount__deposit__card__date">{data.card.date}</div>
                            <div className="banking__component__myaccount__deposit__card__name">{data.card.name}</div>
                        </div>
                        <div className="banking__component__myaccount__deposit__montant">
                            {/*<div className="banking__component__myaccount__deposit__montant__label">Limite de dépôt : 2 000$ par jour</div>*/}
                            {/*<div className="banking__component__myaccount__deposit__progress"></div>*/}
                            <input 
                                type="number" 
                                placeholder="Montant" 
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(Number(e.target.value))}
                                className="banking__component__myaccount__deposit__montant__input"
                            />
                        </div>
                        <div className="banking__component__myaccount__deposit__depot" onClick={() => fetchNui("nui:banking:deposit", depositAmount)}>Déposer</div>
                    </div>
                </div>
            )}

            {activeTab === 'withdraw' && (
                <div className="banking__component__myaccount__withdraw">
                    <img className="banking__component__myaccount__withdraw__back" src="https://cdn.eltrane.cloud/3838384859/assets/banking/back.png" alt="" onClick={() => setActiveTab('account')} />
                    <div className="banking__component__myaccount__withdraw__label" onClick={() => setActiveTab('account')}>Retrait</div>
                    <div className="banking__component__myaccount__withdraw__solde">
                        <div className="banking__component__myaccount__withdraw__solde__label">Solde</div>
                        <div className="banking__component__myaccount__withdraw__solde__montant">{data.bank}$</div>
                        <div className="banking__component__myaccount__withdraw__card">
                            {!data.society ? (
                                <img src="https://cdn.eltrane.cloud/3838384859/assets/banking/card.png" alt="" className="banking__component__myaccount__withdraw__card__img"/>
                            ) : (
                                <img src="https://cdn.eltrane.cloud/3838384859/assets/banking/card_society.png" alt="" className="banking__component__myaccount__withdraw__card__img"/>
                            )}
                            <div className="banking__component__myaccount__withdraw__card__number">{data.card.number}</div>
                            <div className="banking__component__myaccount__withdraw__card__date">{data.card.date}</div>
                            <div className="banking__component__myaccount__withdraw__card__name">{data.card.name}</div>
                        </div>
                        <div className="banking__component__myaccount__withdraw__montant">
                            <input 
                                type="number" 
                                placeholder="Montant" 
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                                className="banking__component__myaccount__withdraw__montant__input"
                            />
                        </div>
                        <div className="banking__component__myaccount__withdraw__depot__100" onClick={() => handlePresetAmount(100)}>100 $</div>
                        <div className="banking__component__myaccount__withdraw__depot__500" onClick={() => handlePresetAmount(500)}>500 $</div>
                        <div className="banking__component__myaccount__withdraw__depot__1000" onClick={() => handlePresetAmount(1000)}>1000 $</div>
                        <div className="banking__component__myaccount__withdraw__depot__2000" onClick={() => handlePresetAmount(2000)}>2000 $</div>
                        <div className="banking__component__myaccount__withdraw__depot" onClick={() => fetchNui("nui:banking:withdraw", withdrawAmount)}>Retirer</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAccountComponent;