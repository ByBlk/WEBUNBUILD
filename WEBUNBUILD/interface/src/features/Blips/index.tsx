import "./index.scss";

import React, { useState } from "react";
import { useNuiEvent, fetchNui } from "@/hook";
import { images, colors } from "./blips";
import { useEscapeKey } from "@hooks/useKeys";

interface Position {
  label: string;
  coords: {
    x: number;
    y: number;
    z: number;
  };
}

interface Blip {
  numero: number;
  nom: string;
  taille: string;
  couleur: number;
  image: string;
  sprite: number;
  positions: Position[];
}

const Blips: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [blips, setBlips] = useState<Blip[]>([]);
  const [show, setShow] = useState<number>(1);
  const [selectedBlip, setSelectedBlip] = useState<Blip | null>(null);
  const [nom, setNom] = useState<string>("");
  const [taille, setTaille] = useState<string>("");
  const [couleur, setCouleur] = useState<number>(0);
  const [image, setImage] = useState<string>("");
  const [sprite, setSprite] = useState<number>(0);
  const [positions, setPositions] = useState<Position[]>([]);

  useNuiEvent('nui:blips:visible', (status: boolean) => {
    setVisible(status);
  });

  useNuiEvent('nui:blips:blips', (blips: Blip[]) => {
    setBlips(blips);
  });

  useNuiEvent('nui:blips:getPos', (pos: any) => {
    setPositions(pos);
  });

  useEscapeKey(() => {
    fetchNui("nui:blips:close");
  }, visible);

  const createBlip = async () => {
    const newBlip: Blip = {
      numero: Date.now(),
      nom,
      taille,
      couleur,
      image,
      sprite,
      positions
    };
    await fetchNui('nui:blips:create', newBlip);
    setBlips([...blips, newBlip]);
  };

  const deleteBlip = async (numero: number) => {
    await fetchNui('nui:blips:delete', { numero });
    setBlips(blips.filter(blip => blip.numero !== numero));
  };

  return visible ? (
    <div className="blips">
      <h1>Gestion blips</h1>
      <h2>Actions</h2>
      <div className="blips-actions">
        <button onClick={() => setShow(1)}>Créer un blip</button>
        <button onClick={() => setShow(2)}>Blips actuels</button>
      </div>
  
      {show === 1 && (
        <>
          <span className="blips-name">Nom du blip</span>
          <input className="blips-name-input" type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
  
          <span className="blips-choice">Choisir un blip</span>
            <div className="blips-list">
            {Object.entries(images).map(([key, { url, rename }]) => (
                <div 
                key={key} 
                className={`blips-list-blip ${image === url ? 'active' : ''}`} 
                onClick={() => {
                setImage(url);
                setSprite(rename);
                }}
                >
                <img src={url} alt={`Blip ${rename}`} />
                <span>{rename}</span>
                </div>
            ))}
            </div>
  
            <span className="blips-taille">Taille du blip</span>
            <div className="blips-taille-list">
            <span 
              className={taille === "0.6" ? "active" : ""} 
              onClick={() => setTaille("0.6")}
            >
              Petit (0.6)
            </span>
            <span 
              className={taille === "0.8" ? "active" : ""} 
              onClick={() => setTaille("0.8")}
            >
              Moyen (0.8)
            </span>
            <span 
              className={taille === "1.0" ? "active" : ""} 
              onClick={() => setTaille("1.0")}
            >
              Grand (1.0)
            </span>
            </div>
  
          <span className="blips-color-text">Couleur du blip</span>
          <div className="blips-color">
            {Object.entries(colors).map(([key, { color, id }]) => (
              <div key={key} className="blips-color-color" style={{ backgroundColor: color }} onClick={() => setCouleur(id)}></div>
            ))}
          </div>
  
          <span className="blips-pos-button" onClick={() => fetchNui("nui:blips:getPos")}>Définir la position du blips</span>
            <span 
            className={`blips-comfirm ${!nom || !taille || !couleur || !image ? 'disabled' : ''}`} 
            onClick={() => {
              if (nom && taille && couleur && image) {
              createBlip();
              }
            }}
            >
            Créer
            </span>
        </>
      )}
  
      {show === 2 && (
        <>
          <span className="blips-choice">Listes des blips</span>
          <div className="blips-list">
            {blips.map((blip) => (
                <div key={blip.numero} className="blips-list-blip" onClick={() => setSelectedBlip(blip)}>
                <img 
                  src={images.find(img => img.rename === blip.numero)?.url || blip.image} 
                  alt={`Blip ${blip.nom}`} 
                />                
                <span>{blip.nom}</span>
                </div>
            ))}
          </div>
          {selectedBlip && (
            <>
              <span className="blips-info">Informations</span>
              <span className="blips-info-data">Numéro: {selectedBlip.numero}</span>
              <span className="blips-info-data">Nom: {selectedBlip.nom}</span>
              <span className="blips-info-data">Taille: {selectedBlip.taille}</span>
              <span className="blips-info-data">Couleur: {selectedBlip.couleur}</span>
              
              <span className="blips-pos">Positions</span>
              <div className="blips-pos-management">
                {selectedBlip.positions.map((pos, index) => (
                  <div key={index} className="blips-pos-row">
                    <span className="blips-pos-label">{pos.label || `Blips par défaut ${index + 1}`}</span>
                    <div className="blips-pos-buttons">
                      <button className="blips-pos-teleport" onClick={() => fetchNui('nui:blips:goto', pos)}>Goto</button>
                        {pos.label ? (
                        <button className="blips-pos-delete" onClick={() => fetchNui('nui:blips:remove', pos)}>Delete</button>
                        ) : (
                        <button className="blips-pos-deleteoff">Delete</button>
                        )}
                    </div>
                  </div>
                ))}
              </div>
              <span className="blips-new-pos">Nouvelle position</span>
              <span className="blips-comfirm">Modifier</span>
              <span className="blips-delete" onClick={() => deleteBlip(selectedBlip.numero)}>Supprimer</span>
            </>
          )}
        </>
      )}
    </div>
  ) : null;
};

export default Blips;