import './index.scss'
import { ActionButton, UrlInput } from "../../components";

const QueueView: React.FC = () => {
    const numbers: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <div>
            <UrlInput />
            <div className="btn-mediaplayer">
                <ActionButton buttonType="addButton" text="Ajouter à la file d'attente" />
                <div className="list-queue-container">
                    <p>File d'attente</p>
                    {numbers.map((number: number, index) => (
                        <ActionButton key={index} buttonType="queueButtonList" text="Nom de la musique" numerate={number} />
                    ))}
                </div>
                <div className="btn-group-footer">
                    <ActionButton buttonType="deleteButton" text="Vider la file d'attente" />
                    <ActionButton text="Ajouté aux favoris" />
                </div>
            </div>
        </div>
    )
}

export default QueueView;