import {fetchNui} from "@/hook";
import {useState, useRef} from "react";
import styles from "./EmoteItem.module.scss"
import {getCdnUrl} from "@/utils";

interface ItemData {
    label?: string;
    category?: string;
    name: string;
    dist: string;
    shared?: boolean;
}

type Props = {
    item: ItemData,
    isFav: boolean;
    handleFav: () => void;
}

const EmoteItem = ({item, isFav, handleFav}: Props) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const [isInteract, setIsInteract] = useState(false);
    const [contextMenu, setContextMenu] = useState<{x: number, y: number} | null>(null);
    const [isOver, setIsOver] = useState(false);





    const handleInteract = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsInteract(true);

        // On récupère les coordonnées relatives à l'élément parent
        if (itemRef.current) {
            const rect = itemRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setContextMenu({x, y});
        }
    }

    const leaveInteract = () => {
        setIsInteract(false);
        setContextMenu(null);
    }

    const handleFavorite = (event : React.MouseEvent) => {
        event.stopPropagation();
        handleFav();
        leaveInteract();
    }



    return (
        <div
            ref={itemRef}
            key={item.name}
            className={styles.item}
            onClick={() => fetchNui('nui:animation:select', [
                item.name,
                item.dist,
                null,
                item.category,
                item.shared
            ])}
            onMouseEnter={() => {
                fetchNui('nui:animation:preview', [
                    item.name,
                    item.dist,
                    null,
                    item.category,
                    item.shared
                ])
                setIsOver(true);
            }}
            onMouseLeave={() => {
                fetchNui('nui:animation:stopPreview')
                setIsOver(false);
            }}
            onContextMenu={(e) => handleInteract(e)}
        >
            <span >{item.label}</span>

            {isOver && <span style={{
                position: 'absolute',
                top: '50%',
                right: '15%',
                transform: 'translateY(-50%)',
                color: '#fff',
                fontSize: 12,
                fontFamily: "montserrat",
                fontWeight: "lighter",
            }}>{item.name}</span>}

            {isInteract && contextMenu && (
                <div
                    className={styles.itemsContextMenu}
                    style={{
                        position: 'absolute',
                        top: `${contextMenu.y}px`,
                        left: `${contextMenu.x}px`
                    }}
                    onMouseLeave={leaveInteract}
                >
                    <div className={styles.itemContextMenu} onClick={(e) => handleFavorite(e)}>
                        <div className={styles.itemContextMenuIcon}>
                            <img src={getCdnUrl("assets/menu-anim/", isFav ? "fav.svg" : "unfav.svg")} width={20} alt=""/>
                        </div>
                        <div className={styles.itemContextMenuText}>Favoris</div>
                    </div>
                    <div className={styles.itemContextMenu}>
                        <div className={styles.itemContextMenuIcon}>
                            <img src={getCdnUrl("assets/menu-anim/", "numpad.svg")} width={20} alt=""/>
                        </div>
                        <div className={styles.itemContextMenuText}>Numpad</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmoteItem;