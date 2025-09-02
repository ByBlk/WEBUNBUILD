import React, { useEffect } from 'react';
import { useNuiEvent, fetchNui } from "@/hook";
import MediaCdn from '@/components/mediaCdn/mediaCdn';
import styles from './catalogue.module.scss';
import ServerGestion from '../../index';

interface CatalogueProps {
    navigateTo: (component: React.ReactNode) => void;
}

const CatalogueComponent: React.FC<CatalogueProps> = ({ navigateTo }) => {
	const [items, setItems] = React.useState<{ id: number, name: string, svg: React.ReactNode }[]>([]);

    const navigateBack = () => {
        navigateTo(<ServerGestion />);
    };

    const handleItemClick = (id: number) => {
        fetchNui('nui:server-gestion:catalogueClick', { id });
    };

	useEffect(() => {
		items.length === 0 && setItems([
			{ id: 1, name: 'Binco', svg: <MediaCdn path="assets/gestion-serveur/grand-catalogues" name="binco.svg" props={{}} />},
			{ id: 2, name: 'Vangelico', svg: <MediaCdn path="assets/gestion-serveur/grand-catalogues" name="vangelico.svg" props={{}} /> },
			{ id: 3, name: 'Barber', svg: <MediaCdn path="assets/gestion-serveur/grand-catalogues" name="barber.svg" props={{}} /> },
			{ id: 4, name: 'Ammunation', svg: <MediaCdn path="assets/gestion-serveur/grand-catalogues" name="ammunation.svg" props={{}} /> },
			{ id: 5, name: 'Concessionnaire', svg: <MediaCdn path="assets/gestion-serveur/grand-catalogues" name="concessionnaire.svg" props={{}} /> },
			{ id: 6, name: 'Location', svg: <MediaCdn path="assets/gestion-serveur/grand-catalogues" name="location.svg" props={{}} /> },
			{ id: 7, name: 'LTD', svg: <MediaCdn path="assets/gestion-serveur/grand-catalogues" name="ltd.svg" props={{}} /> },
			{ id: 8, name: 'Masquerade', svg: <MediaCdn path="assets/gestion-serveur/grand-catalogues" name="masquerade.svg" props={{}} /> },
			{ id: 9, name: 'SheNails', svg: <MediaCdn path="assets/gestion-serveur/grand-catalogues" name="shenails.svg" props={{}} /> },
			{ id: 10, name: 'SkateShop', svg: <MediaCdn path="assets/gestion-serveur/grand-catalogues" name="skateshop.svg" props={{}} /> },
			{ id: 11, name: 'Tattoo', svg: <MediaCdn path="assets/gestion-serveur/grand-catalogues" name="tattoo.svg" props={{}} /> },
    	]);
	}, []);

	useNuiEvent('nui:server-gestion-catalogue:addEntreprises', (data: { entreprises: { id: number, name: string }[] }) => {
		const entreprises = data.entreprises.map(e => ({ id: e.id, name: e.name, svg: <MediaCdn path="serverGestion" name={`${e.name.toLowerCase()}.svg`} props={{}} />, category: 'Entreprises' }));
		setItems([...items, ...entreprises]);
	});

    return (
        <div className={styles.Catalogue}>
			<div className={styles.topbuttons}>
				<div className={styles.window} onClick={() => console.log("Je sais pas ce que ca fait ce truc")}>
					<MediaCdn path="assets/gestion-serveur" name="window.svg" />
				</div>
				<div className={styles.close} onClick={() => console.log("Fermer")}>
				<MediaCdn path="assets/gestion-serveur" name="close.svg" />
				</div>
			</div>
			<div className={styles.header}>
				<div className={styles.goBack} onClick={navigateBack}><MediaCdn path="assets/icons" name="left.svg" props={{ width: 12, height: 12 }} /></div>
				<div className={styles.titles}>
					<span className={styles.titleGestion}>Gestion</span>
					<br/><span className={styles.subtitleGestion}>Grand catalogues</span>
				</div>
			</div>
			<div className={styles.body}>
				<div className={`${styles.column}`}>
					<div className={styles.main}>
						<div className={styles.title}>Liste des items</div>
						<div className={styles.subtitle}>Grand catalogues</div>
						<div className={`${styles.content} ${styles.scrollbar}`}>
							{items
								.map((item, i) => (
									<div key={i} className={styles.item} onClick={() => { handleItemClick(item.id) }}>
										<div className={styles.icon}>{item.svg}</div>
										<div className={styles.label}>{item.name}</div>
									</div>
								))}
						</div>
					</div>
				</div>
            </div>
        </div>
    );
}

export default CatalogueComponent;