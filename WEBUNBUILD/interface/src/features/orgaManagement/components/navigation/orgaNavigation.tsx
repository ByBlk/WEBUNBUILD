import styles from "./orgaNavigation.module.scss"

const NAVIGATIONS = [
    {label: 'Informations', id: 'info'},
    {label: 'Gestion', id: 'management'},
    {label: 'Membres', id: 'members'},
    {label: 'Propriétés', id: 'properties'},
]

type Props = {
    currentNavigation: string,
    setCurrentNavigation: (navigation: string) => void
}

const OrgaNavigation = ({currentNavigation, setCurrentNavigation}: Props) => {
    return (
        <div className={styles.navigation}>
            {
                NAVIGATIONS.map((e, i) => (
                    <div
                        key={'navigation' + i}
                        className={`${styles.buttonElement} ${currentNavigation == e.id ? styles.selected : ""}`}
                        onClick={() => {
                            setCurrentNavigation(e.id);
                        }}
                    >{e.label}</div>
                ))
            }
        </div>
    );
};

export default OrgaNavigation;