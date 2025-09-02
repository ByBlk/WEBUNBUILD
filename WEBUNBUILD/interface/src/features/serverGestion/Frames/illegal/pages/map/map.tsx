import "leaflet/dist/leaflet.css";
import "./leaflet.scss";

import { CUSTOM_CRS, viewBounds } from './map.config';
import { MapContainer, Polygon, TileLayer, Tooltip, useMapEvent } from 'react-leaflet'

import L from "leaflet";
import { LeafletMouseEvent } from "leaflet";
import List from "@/features/serverGestion/components/List";
import React from 'react';
import { TTerrotory, TInfluences } from "../../types";
import styles from "./map.module.scss";
import { useNuiEvent, fetchNui } from "@/hook";
import { getCdnUrl } from "@utils/misc";
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { useAppContext } from '../../context';

interface Props { }

function AddPolygon({ points, setPoints }: { points: [number, number][], setPoints: React.Dispatch<React.SetStateAction<[number, number][]>> }) {

	useMapEvent('click', (e: LeafletMouseEvent) => {
		// Remove
		if (e.originalEvent.shiftKey && points.length > 0) {
			setPoints((prev: [number, number][]) => prev.slice(0, -1));
			console.log('Removed last point');
		}
		// Add
		else {
			const newPoint: [number, number] = [e.latlng.lat, e.latlng.lng];
			setPoints((prev: [number, number][]) => [...prev, newPoint]);
			console.log('Added point:', newPoint);
		}
	});

	return points.length > 0 && (
		<Polygon
			pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2, dashArray: '5, 5' }}
			positions={points}
		>
			<Tooltip sticky>
				New Territory ({points.length} points)<br />
				Click to add points<br />
				Shift+Click to remove last point
			</Tooltip>
		</Polygon>
	);
}

const Map: React.FC<Props> = () => {
	const { territories, setTerritories, influences, setInfluences } = useAppContext();
	const [map, setMap] = React.useState<L.Map | null>(null);
	const [points, setPoints] = React.useState<[number, number][]>([]);
	const [territory, setTerritory] = React.useState<TTerrotory | null>(null);

	const addTerritory = () => {
		if (points.length >= 3) {
			const newTerritory: TTerrotory = {
				crewid: 0, // Generate proper ID
				name: `Territory ${territories.length + 1}`,
				image: getCdnUrl("territories", "territory_default.svg"),
				polygon: points,
				options: { color: '#fff' },
				id: 0
			};

			fetchNui('server-gestion-illegal:addTerritory', newTerritory);

			setTerritories(prev => [...prev, newTerritory]);
			setPoints([]);
		}
	};

	const eventHandler = React.useMemo(
		() => ({
			click(e: LeafletMouseEvent) {
				if (map) {
					map.fitBounds(e.target._bounds);
				}
			},
		}),
		[map],
	)

	const handleSave = () => {
		if (territory) {
			fetchNui('server-gestion-illegal:saveTerritories', territory);
			setTerritories(prev => prev.map(t => 
				t.id === territory.id ? territory : t
			));
			setTerritory(null);
		}
	};

	const handleDelete = () => {
		if (!territory) return;
		
		fetchNui("server-gestion-illegal:removeTerritories", territory);
		
		// update ui & delete territory
		setTerritories(prev => prev.filter(t => t.id !== territory.id));
		// reset territory
		setTerritory(null);
	};

	const sendInfluence = (id: number, value: number, territoryId: number) => {
		const name = influences.find((r) => r.id === id)?.crew;
		if (!name) return;

		fetchNui("server-gestion-illegal:setInfluence", { id, name, value, territoryId });
	}

	useNuiEvent('server-gestion-illegal:setTerritories', (territories: TTerrotory[]) => {
		setTerritories(territories);
	});

	useNuiEvent('server-gestion-illegal:setInfluences', (influences: TInfluences[]) => {
		setInfluences(influences);
	});

	// useEffect(() => {
	// 	if (territories.length > 0) {
	// 		setTerritories([...territories]);
	// 	}
	// }, [setTerritories, territories]);

	// useEffect(() => {
	// 	if (influences.length > 0) {
	// 		setInfluences([...influences]);
	// 	}
	// }, [influences, setInfluences]);

	return (
		<div className={styles.Map}>
			{territory && (
				<div className={styles.influence}>

					<div className={styles.main}>
						<List title="Influences" maxHeight="30vh" elements={Array.isArray(influences) ? influences.find((r) => r.territoryId === territory.id) ? influences.filter((r) => r.territoryId === territory.id).map((r) => ({
							name: r.crew,
							endlabel: {
								value: r.value,
								input: true,
								max: 999999,
							},
							circle: {
								backgroundColor: r.color,
								padding: false
							},
							selected: false,
							onBlur: (e: React.FocusEvent<HTMLInputElement>) =>
								sendInfluence(r.id, parseInt(e.target.value), territory.id),
						})) : [] : []}
						/>
					</div>
				</div>
			)}
			<div className={`${styles.column} ${styles.list}`}>
				<List title="Zones" maxHeight="28vh" elements={Array.isArray(territories) ? territories.map((t) => ({
					name: `${t.name} (${t.polygon.length} points)`,
					onClick() {
						const bounds = L.latLngBounds(t.polygon as L.LatLngExpression[]);
						if (map) {
							map.fitBounds(bounds);
						}
						setTerritory(t);
					},
					selected: false
				})) : []} />
				<div className={styles.footer}>
					<div className={styles.buttons}>
						<button className={styles.button} onClick={addTerritory} disabled={points.length < 3}>
							Ajouter
						</button>
						<div className={styles.count}><span>{territories.length} territoires</span></div>
					</div>
				</div>
				<div className={styles.editTerritory} style={{ opacity: territory ? 1 : 0 }}>
					<div className={styles.title}>Territoire</div>
					<div className={styles.inputs}>
						<div className={styles.row}>
							<div className={styles.label}>
								<MediaCdn path="assets/gestion-serveur" name="name.svg" props={{}} />
								<label>Nom</label>
							</div>
							<input type="text" value={territory?.name || ''} onChange={(e) => setTerritory(territory ? { ...territory, name: e.target.value } : null)} />
						</div>
					</div>
				</div>
				<div className={styles.buttons}>
					<div className={styles.buttonSave} id="save" onClick={() => handleSave()} style={{ opacity: territory ? 1 : 0 }}>
						<span>Sauvegarder</span>
					</div>
					<div className={styles.buttonDelete} id="delete" onClick={handleDelete} style={{ opacity: territory ? 1 : 0 }}>
						<span>Supprimer</span>
					</div>
				</div>
			</div>

			<div className={`${styles.column} ${styles.map}`}>
				{territory && (
					<div className={styles.territoryTitle}>{territory.name}</div>
				)}
				<MapContainer
					crs={CUSTOM_CRS}
					minZoom={1.5}
					maxZoom={5}
					zoom={3}
					center={[0, 0]}
					ref={setMap}
					scrollWheelZoom={true}
					maxBounds={viewBounds}
					maxBoundsViscosity={1.0}
					className={styles.leafletMap}
					attributionControl={false}
					zoomControl={false}
				>
					<TileLayer
						url="https://cdn.eltrane.cloud/3838384859/assets/map/satelite/{z}/{x}/{y}.jpg"
						noWrap={true}
					/>

					{territories.map((t, i) => (
						<React.Fragment key={i}>
							<Polygon pathOptions={{ color: 'pink', fillOpacity: .5, ...t.options }} positions={t.polygon} eventHandlers={eventHandler}>
								<Tooltip sticky opacity={1}>
									{t.name}
								</Tooltip>
							</Polygon>
						</React.Fragment>
					))}

					<AddPolygon points={points} setPoints={setPoints} />

				</MapContainer>
				<div className={styles.shopContainer} style={{ opacity: territory ? 1 : 0 }}>
					<div className={styles.shop}>
						<input type="text" className={styles.shopName} placeholder="Magasin" value={territory?.shop1} onChange={(e) => setTerritories(prev => prev.map(t => t === territory ? { ...t, shop1: e.target.value } : t))} />
						<input type="number" className={styles.shopPrice} placeholder="x $ / 10 min" value={territory?.price1} onChange={(e) => setTerritories(prev => prev.map(t => t === territory ? { ...t, price1: parseInt(e.target.value) } : t))} />
					</div>
					<div className={styles.shop}>
						<input type="text" className={styles.shopName} placeholder="Magasin" value={territory?.shop2} onChange={(e) => setTerritories(prev => prev.map(t => t === territory ? { ...t, shop2: e.target.value } : t))} />
						<input type="number" className={styles.shopPrice} placeholder="x $ / 10 min" value={territory?.price2} onChange={(e) => setTerritories(prev => prev.map(t => t === territory ? { ...t, price2: parseInt(e.target.value) } : t))} />
					</div>
					<div className={styles.shop}>
						<input type="text" className={styles.shopName} placeholder="Magasin" value={territory?.shop3} onChange={(e) => setTerritories(prev => prev.map(t => t === territory ? { ...t, shop3: e.target.value } : t))} />
						<input type="number" className={styles.shopPrice} placeholder="x $ / 10 min" value={territory?.price3} onChange={(e) => setTerritories(prev => prev.map(t => t === territory ? { ...t, price3: parseInt(e.target.value) } : t))} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Map;
