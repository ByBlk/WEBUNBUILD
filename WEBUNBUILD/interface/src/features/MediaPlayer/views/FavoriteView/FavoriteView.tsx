import './index.scss';
import { ActionButton, UrlInput } from "../../components";

const FavoriteView: React.FC = () => {
    const numbers: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <div>
            <UrlInput />
            <ActionButton buttonType="addButton" text="Ajouté aux favoris" />
            <div className="list-favoris-container">
                <p>Favoris</p>
                {numbers.map((index, number: number) => (
                    <ActionButton key={index} buttonType="favoriteButtonList" text="Nom de la musique" numerate={number} />
                ))}
            </div>
            <div className="btn-group-footer">
                <ActionButton buttonType="readButton" text="Lecture aléatoire" />
                <ActionButton text="Ajouté à la file d'attente" />
            </div>
        </div>
    )
}

export default FavoriteView;