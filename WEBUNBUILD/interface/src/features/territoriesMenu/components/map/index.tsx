import "leaflet/dist/leaflet.css";
import { CUSTOM_CRS, viewBounds } from './map.config';
import { ImageOverlay, MapContainer, Polygon, TileLayer, Tooltip } from 'react-leaflet';
import { LatLngBoundsExpression, LeafletMouseEvent } from "leaflet";
import React, { useState } from 'react';
import { TTerritory } from "../../types";
import "./style.scss";

interface Props {
    territories: TTerritory[];
    changeTerritory: (territory: TTerritory | undefined) => void;
}

const Map: React.FC<Props> = ({ territories, changeTerritory }) => {
    const [map, setMap] = useState<L.Map | null>(null);

    const handleTerritoryClick = (e: LeafletMouseEvent, territory: TTerritory) => {
        if (!map) return;
        e.originalEvent.stopPropagation();
        map.fitBounds(e.target._bounds);
        changeTerritory(territory);
    };

    return (
        <div className="Map" onClick={() => changeTerritory(undefined)}>
            <MapContainer
                crs={CUSTOM_CRS}
                minZoom={3}
                maxZoom={5}
                zoom={5}
                center={[0, 0]}
                ref={setMap}
                scrollWheelZoom={true}
                maxBounds={viewBounds}
                maxBoundsViscosity={1.0}
                zoomControl={false}
                style={{ height: "100%", width: "100%", minWidth: "100%" }}
            >
                <TileLayer
                    url="https://cdn.eltrane.cloud/3838384859/assets/map/satelite/{z}/{x}/{y}.jpg"
                    noWrap
                />
                {territories.map((t) => (
                    <React.Fragment key={t.name}>
                        <ImageOverlay
                            url={t.image}
                            bounds={t.polygon as LatLngBoundsExpression}
                            zIndex={999}
                            className="leafletImage"
                        />
                        <Polygon
                            pathOptions={{ color: t.color, fillOpacity: 0.5, ...t.options }}
                            positions={t.polygon}
                            eventHandlers={{
                                click: (e) => handleTerritoryClick(e, t),
                            }}
                            className="leafletPolygon"
                        >
                            <Tooltip sticky opacity={1}>
                                {t.name}
                            </Tooltip>
                        </Polygon>
                    </React.Fragment>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;
