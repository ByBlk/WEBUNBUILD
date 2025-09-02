import { getCdnUrl } from "@utils/misc";

interface RecuProps {
    data : {
         visible: boolean;
         title: string;
         employee: string;
         customer: string;
         date: string;
         items: Array<{
             name: string;
             quantity: number; 
             price: number; 
             type: string
         }>;
        reduce: number;
        total: number;
    }
}

const RecuComponent: React.FC<RecuProps> = ({ data }) => {

    console.log("mon data ", data.visible)
    
    return data.visible ? (
        <div className='recu'>
            <img src={getCdnUrl("assets/others", "recuBack.svg")} className='recu__back' draggable={false} />
            <div className='recuContainer'>
                <h1 className='recuContainer__title'>Title</h1>
                <h2 className='recuContainer__subtitle'>Reçu</h2>
                <div className='hr'></div>
                
                <div className='recuContainer__info'>
                    <div className='case'>
                        <p className='recu-case__title' >Employé:</p>
                        <p className='recu-case__content'>{data.employee}</p> 
                    </div>
                    <div className='case'>
                        <p className='recu-case__title'>Client:</p>
                        <p className='recu-case__content'>{data.customer}</p> 
                    </div>
                    <div className='case'>
                        <p className='recu-case__title'>Date:</p>
                        <p className='recu-case__content'>{data.date}</p> 
                    </div>
                </div>
                <div className='hre'></div>
                <p className='Desc'>Description</p>

                <div className='recu-description_contain'>
                    {data.items.map((item, index) => {
                        return (
                            <div key={index} className="recu-item">
                                <div className="item-info">
                                    <div className="item-title">
                                    <p>
                                        {item.name} <span>X{item.quantity}</span>
                                    </p>
                                    <p className="item-type">{item.name}</p>
                                    </div>
                                    
                                </div>
                                <div className="item-price">
                                    <p>${item.price}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className='hree'></div>

                <div className='recu-total'>
                    <div className='Taxe'>
                        <p className='recu-total__title'>Taxe</p>
                        <p className='recu-total__content'>${data.reduce}</p>
                    </div>
                    <div className='PMT'>
                        <p className='recu-total__title'>Paiement total</p>
                        <p className='recu-total__content'>${data.total}</p>
                    </div>
                </div> 
                <div className='hreeee'></div>

                <div className='recu-bottom'>
                    <h4>Merci pour votre achat</h4>
                </div>
            </div>
        </div>
    ) : null;
};

export default RecuComponent;