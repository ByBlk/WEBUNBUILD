import { useState } from 'react';

interface TransferProps {
    data: {
        visible: boolean;
    };
}

const TransferComponent: React.FC<TransferProps> = ({ data }) => {
    const [isVisible] = useState(data.visible);

    return isVisible ? (
        <div className="banking">
            <div className="banking__component__transfer">
                <div className="banking__component__transfer__label">Virements</div>
                <div className="banking__component__transfer__iban">
                    <div className='banking__component__transfer__iban__label'>Iban</div>
                    <input type="number" className='banking__component__transfer__iban__input'/>
                </div>

                <div className="banking__component__transfer__montant">
                    <div className='banking__component__transfer__montant__label'>Montant</div>
                    <input type="number" className='banking__component__transfer__montant__input'/>
                </div>

                <div className="banking__component__transfer__message">
                    <div className='banking__component__transfer__message__label'>Message</div>
                    <textarea className='banking__component__transfer__message__input' style={{ resize: 'none' }}></textarea>
                </div>

                <div className="banking__component__transfer__valider">Paiement</div>
            </div>
        </div>
    ) : null;
};

export default TransferComponent;